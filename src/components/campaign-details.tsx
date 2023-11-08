"use client";
import { useCampaignDetails } from "@/hooks/use-campaign-details";
import Link from "next/link";
import Markdown from "marked-react";
import clsx from "clsx";
import { Container } from "./layout-components";
import { PendingPage } from "./pending-page";

export function CampaignDetails({ id }: { id: string }) {
  const { loading, error, data } = useCampaignDetails(id);
  console.log({ loading, error, data });

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
      <div>
        <Container>
          <div className="py-[18px] sm:py-[26px] lg:py-[34px]">
            <Link
              href="/"
              className="inline-flex flex-row items-center transition-colors duration-100 ease-out hover:text-white/50"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.41436 11L11.7073 6.70712L10.293 5.29291L3.58594 12L10.293 18.7071L11.7073 17.2929L7.41437 13H19.0002V11H7.41436Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span className="font-guise ml-[8px] cursor-pointer text-[10px] font-[600] uppercase leading-[1.2em]">
                Campaigns
              </span>
            </Link>
          </div>
        </Container>
      </div>

      <div>
        <Container>
          <div className="flex flex-col gap-[28px]">
            <h1 className="font-clash text-[24px] font-[500] leading-[30px] md:text-[32px] md:leading-[42px]">
              {data.campaign.name}
            </h1>
            <div
              className={clsx(
                "prose prose-sm max-w-3xl text-[12px] font-[500] leading-[18px] text-white md:text-[14px] md:leading-[22px]",
                "prose-headings:text-white prose-a:text-[#EC5728] hover:prose-a:text-[#FF8D69] prose-strong:text-white",
                "prose-code:text-white prose-code:text-[12px] prose-code:font-mono prose-code:md:leading-[22px] prose-code:md:text-[14px] prose-code:leading-[18px]"
              )}
            >
              <Markdown gfm breaks>
                {data.campaign.description
                  .replace(/\+\+/g, "")
                  .replace(/\\n/g, "\n")}
              </Markdown>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
