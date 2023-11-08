import { GQlProvider } from "@/providers/gql-provider";
import { WagmiProvider } from "@/providers/wagmi-provider";
import { CampaignDetails, Header, Page } from "@/components";

export default function CampaignPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <WagmiProvider>
      <GQlProvider>
        <Page header={<Header isBlurred />}>
          <CampaignDetails id={id} />
        </Page>
      </GQlProvider>
    </WagmiProvider>
  );
}
