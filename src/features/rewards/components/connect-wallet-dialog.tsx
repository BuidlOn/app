"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { useToast } from "@/providers/toast-provider";

const PROVIDERS = [
  { id: "metamask", name: "MetaMask", icon: "account_balance_wallet" },
  { id: "walletconnect", name: "WalletConnect", icon: "qr_code_2" },
  { id: "coinbase", name: "Coinbase Wallet", icon: "contactless" },
];

export function ConnectWalletDialog({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const connect = (name: string) => {
    // Real wallet connection is handled by the wallet SDK / backend later.
    toast({
      variant: "info",
      title: `${name} connect is stubbed`,
      description: "Wallet SDK integration comes with the backend.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-[12px]">
          {PROVIDERS.map((provider) => (
            <button
              key={provider.id}
              type="button"
              onClick={() => connect(provider.name)}
              className="group flex w-full items-center justify-between rounded-[12px] border-[1.5px] border-outline/15 bg-white p-[16px] transition-all hover:border-primary-deep/60 hover:bg-primary/5"
            >
              <div className="flex items-center gap-[16px]">
                <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-outline/5">
                  <Icon name={provider.icon} className="text-[20px] text-primary-deep" />
                </div>
                <span className="text-[15px] font-bold text-on-surface">
                  {provider.name}
                </span>
              </div>
              <Icon
                name="chevron_right"
                className="text-[20px] text-on-surface-variant transition-colors group-hover:text-primary-deep"
              />
            </button>
          ))}
        </div>

        <p className="mt-8 text-center font-caption text-caption text-on-surface-variant">
          New to Web3?{" "}
          <a href="#" className="text-primary hover:underline">
            Learn more about wallets
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
}
