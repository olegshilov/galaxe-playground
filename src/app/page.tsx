import { GQlProvider } from "@/providers/gql-provider";
import { WagmiProvider } from "@/providers/wagmi-provider";
import { Header, Page, CampaignList } from "@/components";

export default function Home() {
  return (
    <WagmiProvider>
      <GQlProvider>
        <Page header={<Header isBlurred />}>
          <CampaignList />
        </Page>
      </GQlProvider>
    </WagmiProvider>
  );
}
