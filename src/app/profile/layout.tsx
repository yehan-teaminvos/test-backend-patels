import Image from "next/image";
import SideMenu from "./side-menu";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <section>
        <div className="relative w-full h-123.5 overflow-hidden">
          <Image
            src="/forgot-pw/forgot-pw-bg.avif"
            alt="Event Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/35"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="font-laluxes text-2xl font-normal md:text-[32px] max-w-xl stroke-medium">
              Manage your account
            </h1>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto lg:px-8 px-4 pt-12 lg:pb-24.5 pb-18 ">
          <div className="grid lg:grid-cols-4 items-start gap-15">
            <div className="max-lg:col-span-4">
              <SideMenu />
            </div>
            <div className="lg:col-span-3 col-span-4">{children}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
