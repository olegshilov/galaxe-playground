"use client";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { Button } from "./button";
import { useEffect, useState } from "react";

export function ConnectButton() {
  const { connectAsync, isLoading, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { address, isConnecting, isConnected = false } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (!isConnected) {
    return (
      <Button
        onClick={async () => {
          await connectAsync({ connector: connectors[0] });
        }}
        isLoading={isConnecting}
      >
        Connect wallet
      </Button>
    );
  }

  return (
    <div className="flex flex-row gap-8 items-center">
      <div className="font-guise text-[14px] leading-[22px] text-white/50">
        {address}
      </div>
      <div>
        <Button
          onClick={async () => {
            await disconnectAsync();
          }}
        >
          Disconnect
        </Button>
      </div>
    </div>
  );
}
