"use client";
import { PropsWithChildren, useMemo, createContext, useContext } from "react";
import {
  Connector,
  WagmiConfig,
  configureChains,
  createConfig,
  mainnet,
} from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import type { Chain } from "wagmi/chains";

export function WagmiProvider({
  children,
  walletConnectProjectId,
}: PropsWithChildren<{
  walletConnectProjectId?: string;
  isProduction?: boolean;
  supportedChains?: Chain[];
}>) {
  const { publicClient, webSocketPublicClient, chains } = useMemo(() => {
    return configureChains(
      [mainnet],
      [
        publicProvider(),
        jsonRpcProvider({
          rpc: (chain) => {
            return {
              http: chain.rpcUrls.default.http[0],
            };
          },
        }),
      ]
    );
  }, []);

  const connectors = useMemo(() => {
    const connectors: Connector[] = [
      new InjectedConnector({
        chains,
        options: {
          shimDisconnect: true,
        },
      }),
    ];

    if (walletConnectProjectId) {
      connectors.push(
        new WalletConnectConnector({
          chains,
          options: {
            projectId: walletConnectProjectId,
            showQrModal: true,
          },
        })
      );
    }

    return connectors;
  }, [chains, walletConnectProjectId]);

  const config = useMemo(() => {
    return createConfig({
      publicClient,
      webSocketPublicClient,
      connectors,
      autoConnect: true,
    });
  }, [connectors, publicClient, webSocketPublicClient]);

  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
