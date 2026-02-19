import Image from "next/image";
import FilterPanel from "../../components/products/filter-panel";
import { Suspense } from "react";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <section className="">
        <div className="relative w-full h-123.5 overflow-hidden">
          <Image
            src="/product-list/product-list-bg.avif"
            alt="Event Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/35"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="font-laluxes text-2xl font-normal md:text-[32px]">
              Fresh Flowers for Every Occasion
            </h1>
            <p className="text-[16px] md:text-[20px] font-light text-light-gray/70 font-poppins mt-3 max-w-xl">
              Discover our handpicked collection of beautiful blooms, delivered
              fresh to your door
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container w-full mx-auto lg:px-8 px-4 pt-4 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-5 gap-5 pt-16">
            <div className="lg:col-span-2 xl:col-span-1">
              <Suspense
                fallback={<div className="text-black">Panel Loading...</div>}
              >
                <FilterPanel />
              </Suspense>
            </div>
            <div className="lg:col-span-4 xl:col-span-4 sm:pb-25 pb-20">
              {children}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
