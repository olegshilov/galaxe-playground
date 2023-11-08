"use client";
import { useCampaignDetails } from "@/hooks/use-campaign-details";
import Link from "next/link";
import Markdown from "marked-react";
import clsx from "clsx";
import { Container } from "./layout-components";
import { PendingPage } from "./pending-page";
import { useCredentialDetails } from "@/hooks/use-credential-details";
import { useState } from "react";
import { Button } from "./button";
import { SpinnerLoader } from "./spinner-loader";
import { useAccount } from "wagmi";

export function CampaignDetails({ id }: { id: string }) {
  const { address } = useAccount();
  const { loading, error, data } = useCampaignDetails(id, address);
  console.log("CampaignDetails", { loading, error, data });

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
    <section className="pb-[128px]">
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
                  fillRule="evenodd"
                  clipRule="evenodd"
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
          <div className="flex flex-col gap-[24px] md:gap-[40px]">
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

            {data.campaign.credentialGroups.length > 0 && (
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-row items-center">
                  <h3 className="font-clash text-[16px] font-[500] leading-[1.2em] sm:text-[18px] lg:text-[22px]">
                    Challenges
                  </h3>
                </div>
                <div>
                  <CampaignCredentials
                    groups={data.campaign.credentialGroups}
                  />
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}

function CampaignCredentials({ groups }: { groups: any[] }) {
  return (
    <div>
      {groups.map((group) => {
        return (
          <div key={group.id}>
            {group.credentials.map((credential: any) => {
              return (
                <CredentialDetails key={credential.id} id={credential.id} />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function CredentialDetails({ id }: { id: string }) {
  const { address } = useAccount();
  const { loading, error, data } = useCredentialDetails(id, address);
  // console.log("CredentialDetails", { loading, error, data });
  const [isOpen, setOpen] = useState(false);

  return (
    <div
      className={clsx(
        "border-t border-[#FFFFFF26] transition-[background] duration-75 last:border-b",
        !loading && "hover:bg-white hover:bg-opacity-[2.5%]"
      )}
    >
      <div className="flex flex-col">
        <div
          className={clsx("flex flex-row", !loading && "cursor-pointer")}
          onClick={() => {
            if (!loading) {
              setOpen(!isOpen);
            }
          }}
        >
          <div className="py-[8px] md:py-[12px] pr-[0px] pl-[8px]">
            {loading ? (
              <div className="flex items-center justify-center w-[18px] h-[18px] md:w-[26px] md:h-[26px]">
                <SpinnerLoader className="!w-[12px] !h-[12px] md:!w-[18px] md:!h-[18px]" />
              </div>
            ) : (
              <svg
                viewBox="0 0 22 22"
                fill="none"
                className={clsx(
                  "mb-[-2px]",
                  "transition-[transform] duration-75 ease-in",
                  "w-[18px] h-[18px] md:w-[26px] md:h-[26px]",
                  isOpen && "scale-y-[-1]"
                )}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.85156 8.89817L6.14793 7.60181L10.9997 12.4536L15.8516 7.60181L17.1479 8.89817L10.9997 15.0464L4.85156 8.89817Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </div>
          <div>
            {loading && (
              <div className="text-[11px] leading-[18px] md:text-[16px] md:leading-[26px] p-[8px] md:p-[12px]">
                Loading...
              </div>
            )}
            {error && (
              <div className="text-[11px] leading-[18px] md:text-[16px] md:leading-[26px] p-[8px] md:p-[12px]">
                Error
              </div>
            )}
            {data && !error && !loading && (
              <div className="text-[11px] leading-[18px] md:text-[16px] md:leading-[26px] p-[8px] md:p-[12px]">
                {data.credential.name}
              </div>
            )}
          </div>
        </div>
        {data && !error && !loading && isOpen && (
          <div className="flex flex-row">
            <div className="py-[8px] md:py-[12px] pr-[0px] pl-[8px]">
              <div className="flex items-center justify-center w-[18px] h-[18px] md:w-[26px] md:h-[26px]" />
            </div>
            <div className="p-[8px] md:p-[12px] !pt-0">
              <div className="flex flex-col gap-[16px] !pb-[8px]">
                <div className="flex flex-col gap-[4px]">
                  <div className="font-guise text-[11px] leading-[18px] text-white/50 md:text-[12px] md:leading-[18px]">
                    Description
                  </div>
                  <div className="text-[12px] font-[500] leading-[18px] text-white md:text-[14px] md:leading-[22px]">
                    <Markdown gfm breaks>
                      {data.credential.description
                        .replace(/\+\+/g, "")
                        .replace(/\\n/g, "\n")}
                    </Markdown>
                  </div>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="font-guise text-[11px] leading-[18px] text-white/50 md:text-[12px] md:leading-[18px]">
                    Call to action
                  </div>
                  <div className="text-[12px] font-[500] leading-[18px] text-white md:text-[14px] md:leading-[22px]">
                    <Link
                      href={data.credential.referenceLink}
                      className="text-[#EC5728] hover:text-[#FF8D69] cursor-pointer transition-colors duration-100 ease-out"
                    >
                      {data.credential.referenceLink}
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col gap-[4px]">
                  <div className="font-guise text-[11px] leading-[18px] text-white/50 md:text-[12px] md:leading-[18px]">
                    Check
                  </div>
                  <div className="text-[12px] font-[500] leading-[18px] text-white md:text-[14px] md:leading-[22px]">
                    <Button
                      onClick={() => {
                        console.log("check challenge eligibility", {
                          id: data.credential.id,
                        });
                      }}
                      disabled={!address}
                    >
                      Check
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
