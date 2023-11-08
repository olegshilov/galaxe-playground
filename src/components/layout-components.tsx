import { ReactElement, ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "mx-auto w-full",
        "px-[16px] sm:px-[48px] lg:px-[79px]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Header({
  rightSlot,
  darkBackground = false,
  isBlurred = false,
}: {
  rightSlot?: ReactNode;
  darkBackground?: boolean;
  isBlurred?: boolean;
}) {
  return (
    <header
      className={clsx(
        "z-50 h-[62px] w-full transform-gpu border-y border-[#464647] sm:h-[72px]",
        darkBackground ? "bg-haqq-black" : "bg-transparent",
        isBlurred && !darkBackground && "backdrop-blur"
      )}
    >
      <div className="mx-auto flex h-full w-full flex-row items-center pr-[16px] sm:pr-[64px] lg:pr-[80px]">
        <div className="flex h-full w-[48px] items-center justify-center border-r border-[#464647] sm:w-[64px] lg:w-[80px]">
          <div className="relative h-[26px] w-[26px] sm:h-[32px] sm:w-[32px]">
            <Link href="/">
              <Image src="/images/logo.svg" alt="HAQQ" width={90} height={91} />
            </Link>
          </div>
        </div>
        <div className="font-clash ml-[20px] text-[24px] font-medium leading-none lg:ml-[32px]">
          <Link href="/">HAQQ</Link>
        </div>
        <div className="flex-1" />

        {rightSlot && (
          <div className="flex flex-row items-center space-x-2">
            {rightSlot}
          </div>
        )}
      </div>
    </header>
  );
}

export function Layout({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "relative flex min-h-screen flex-col",
        "bg-[url(https://shell.haqq.network/assets/sunrise.jpg)] bg-no-repeat bg-top bg-contain",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Page({
  children,
  header,
  footer,
  banner,
  className,
}: {
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  banner?: ReactNode;
  className?: string;
}): ReactElement {
  return (
    <Layout className={className}>
      {header && (
        <div className="flex-0 sticky top-0 z-50">
          {banner}
          {header}
        </div>
      )}
      <div className="relative flex flex-1 flex-col overflow-x-clip">
        {children}
      </div>
      {footer}
    </Layout>
  );
}
