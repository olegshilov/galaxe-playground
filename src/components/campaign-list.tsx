"use client";
import { useCampaigns } from "@/hooks/use-campaigns";
import Link from "next/link";
import { Container } from "./layout-components";
import { PendingPage } from "./pending-page";

export function CampaignList() {
  const { data, error, loading } = useCampaigns();

  if (loading) {
    return (
      <Container className="py-24">
        <PendingPage />
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container>
        <div>Error</div>
      </Container>
    );
  }

  return (
    <section>
      <div className="py-[32px] lg:py-[68px]">
        <Container>
          <div className="font-clash text-[28px] uppercase leading-none sm:text-[48px] lg:text-[70px]">
            galxe: {data.space.alias}
          </div>
        </Container>
      </div>

      <div>
        <Container>
          <div className="flex flex-col">
            {data.space.campaigns.list.map((campaign: any) => {
              return (
                <Link
                  href={`/campaign/${campaign.id}`}
                  key={campaign.id}
                  className="p-[8px] md:p-[12px] cursor-pointer border-t border-[#FFFFFF26] text-[11px] leading-[18px] transition-[background] duration-75 hover:bg-white hover:bg-opacity-[2.5%] md:text-[16px] md:leading-[26px] last:border-b"
                >
                  {campaign.name}
                </Link>
              );
            })}
          </div>
        </Container>
      </div>

      {/* <div>
        <h1 className="text-2xl font-semibold py-4">CampaignList:</h1>
        <div className="text-md my-2">{data.space.info}</div>
      </div> */}
    </section>
  );
}
