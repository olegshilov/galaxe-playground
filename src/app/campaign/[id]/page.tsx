import { CampaignDetails } from "@/components/campaign-details";

export default function CampaignPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <CampaignDetails id={id} />;
}
