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

        <div className="space-y-3">
          {PROVIDERS.map((provider) => (
            <button
              key={provider.id}
              type="button"
              onClick={() => connect(provider.name)}
              className="group flex w-full items-center justify-between border border-outline-variant p-4 transition-all hover:border-primary hover:bg-surface-container"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center bg-surface-container-high">
                  <Icon name={provider.icon} className="text-primary" />
                </div>
                <span className="font-body font-bold text-on-surface">
                  {provider.name}
                </span>
              </div>
              <Icon
                name="chevron_right"
                className="text-on-surface-variant transition-colors group-hover:text-primary"
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
