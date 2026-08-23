"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/providers/toast-provider";
import { walletChallenge, walletVerify } from "../api/settings.api";

/** Shorten an EVM address to e.g. 0x7c3a…2f10 */
function shortenAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

type Step =
  | "idle"
  | "connecting"
  | "signing"
  | "verifying"
  | "done"
  | "error";

interface Props {
  /** Currently verified wallet address (if any) */
  currentAddress?: string | null;
}

/**
 * WalletConnectCard — full challenge/sign/verify flow using the
 * browser's injected ethereum provider (MetaMask, Core Wallet, etc.)
 * without any heavyweight Web3 library.
 *
 * Flow:
 *  1. User clicks "Connect Wallet" → request accounts from window.ethereum
 *  2. Fetch a one-time nonce from backend (POST /auth/wallet/challenge)
 *  3. Call personal_sign with the nonce
 *  4. POST address + signature to backend (POST /auth/wallet/verify)
 *  5. Refresh the current-user query cache on success
 */
export function WalletConnectCard({ currentAddress }: Props) {
  const [step, setStep] = useState<Step>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const hasProvider =
    typeof window !== "undefined" && Boolean((window as any).ethereum);

  const handleConnect = useCallback(async () => {
    setErrorMsg("");
    setStep("connecting");

    try {
      const eth = (window as any).ethereum;
      if (!eth) throw new Error("No wallet detected. Install MetaMask or Core Wallet.");

      // Step 1: Request account access
      const accounts: string[] = await eth.request({
        method: "eth_requestAccounts",
      });
      if (!accounts.length) throw new Error("No accounts returned by wallet.");
      const address = accounts[0];

      // Step 2: Fetch nonce from backend
      setStep("signing");
      const { nonce } = await walletChallenge();

      // Step 3: Sign the nonce (EIP-191 personal_sign)
      const signature: string = await eth.request({
        method: "personal_sign",
        params: [nonce, address],
      });

      // Step 4: Verify signature on the backend
      setStep("verifying");
      await walletVerify(address, signature);

      // Step 5: Update cache so header/profile refreshes immediately
      queryClient.invalidateQueries({ queryKey: ["current-user"] });

      setStep("done");
      toast({ variant: "success", title: "Wallet verified and linked!" });
    } catch (err: any) {
      const msg: string =
        err?.message?.includes("User rejected") || err?.code === 4001
          ? "You rejected the signature request."
          : (err?.message ?? "Something went wrong. Please try again.");
      setErrorMsg(msg);
      setStep("error");
    }
  }, [queryClient, toast]);

  const reset = () => {
    setStep("idle");
    setErrorMsg("");
  };

  const labelClass =
    "mb-2 block font-mono-label text-[10.5px] uppercase tracking-widest text-on-surface-muted";

  return (
    <Card className="overflow-hidden">
      <div className="border-b-[1.5px] border-outline/10 px-[28px] py-[20px]">
        <h3 className="m-0 font-page-title text-[17px] font-bold text-on-surface">
          Payout wallet
        </h3>
        <p className="m-0 mt-1 text-[13px] text-on-surface-variant">
          Reward allocations are sent to this address. Prove ownership by
          signing a message — your private key never leaves your device.
        </p>
      </div>

      <div className="p-[28px]">
        {/* Currently linked address */}
        {currentAddress && (
          <div className="mb-5 flex items-center gap-2 rounded-[12px] border-[1.5px] border-secondary/30 bg-secondary/5 px-4 py-3">
            <Icon
              name="check_circle"
              className="text-[18px] text-secondary"
              filled
            />
            <div className="flex-1">
              <p className={cn(labelClass, "mb-0")}>Verified wallet</p>
              <p className="font-mono-label text-[13px] text-on-surface">
                {shortenAddress(currentAddress)}
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="font-mono-label text-[11px] uppercase tracking-widest text-on-surface-variant underline-offset-2 hover:text-on-surface hover:underline"
            >
              Change
            </button>
          </div>
        )}

        {/* No wallet provider detected */}
        {!hasProvider && (
          <div className="flex items-start gap-3 rounded-[12px] border-[1.5px] border-outline/20 bg-surface-container px-4 py-3">
            <Icon name="info" className="mt-px text-[17px] text-primary" />
            <p className="text-[13px] text-on-surface-variant">
              No wallet detected. Install{" "}
              <a
                href="https://core.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                Core Wallet
              </a>{" "}
              or{" "}
              <a
                href="https://metamask.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2"
              >
                MetaMask
              </a>{" "}
              to connect.
            </p>
          </div>
        )}

        {/* Connect button */}
        {hasProvider && step !== "done" && (
          <button
            type="button"
            onClick={handleConnect}
            disabled={step === "connecting" || step === "signing" || step === "verifying"}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-[12px] border-[1.5px] border-outline/20 bg-surface px-5 py-[11px]",
              "font-mono-label text-[13px] font-semibold text-on-surface transition-colors",
              "hover:border-primary/40 hover:bg-surface-container",
              "disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            <Icon name="account_balance_wallet" className="text-[18px]" />
            {step === "idle" || step === "error"
              ? currentAddress
                ? "Re-verify wallet"
                : "Connect wallet"
              : step === "connecting"
                ? "Connecting…"
                : step === "signing"
                  ? "Sign the message in your wallet…"
                  : "Verifying…"}
          </button>
        )}

        {/* Success state */}
        {step === "done" && (
          <div className="flex items-center gap-2 rounded-[12px] bg-secondary/10 px-4 py-3">
            <Icon
              name="check_circle"
              className="text-[18px] text-secondary"
              filled
            />
            <p className="font-mono-label text-[13px] text-secondary">
              Wallet successfully verified!
            </p>
          </div>
        )}

        {/* Error state */}
        {step === "error" && errorMsg && (
          <div className="mt-3 flex items-start gap-2 rounded-[12px] border-[1.5px] border-error/30 bg-error/5 px-4 py-3">
            <Icon name="error" className="mt-px text-[16px] text-error" />
            <p className="text-[13px] text-error">{errorMsg}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
