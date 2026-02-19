"use client";

import React, { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function PriceRangeFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const MIN_LIMIT = 0;
  const MAX_LIMIT = 20000;

  const [range, setRange] = useState([
    Number(searchParams.get("min")) || MIN_LIMIT,
    Number(searchParams.get("max")) || MAX_LIMIT,
  ]);

  // Sync state if URL changes externally (e.g. "Clear Filters" button)
  useEffect(() => {
    setRange([
      Number(searchParams.get("min")) || MIN_LIMIT,
      Number(searchParams.get("max")) || MAX_LIMIT,
    ]);
  }, [searchParams]);

  const handleCommit = (values: number[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("min", values[0].toString());
    params.set("max", values[1].toString());
    params.delete("page"); // Reset pagination when filtering

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white border border-light-gray shadow-[0px_0px_4.1px_0px_rgba(0,0,0,0.15)] p-6">
      <h3 className="text-xl font-poppins leading-6.25 font-light mb-5.5 text-black">
        Price
      </h3>
      <div className="text-base font-poppins font-light text-black/50 mb-6">
        LKR {range[0].toLocaleString()} - LKR {range[1].toLocaleString()}
      </div>
      <Slider
        value={range}
        min={MIN_LIMIT}
        max={MAX_LIMIT}
        step={100}
        onValueChange={setRange} // Immediate visual feedback
        onValueCommit={handleCommit} // URL update only on release
        className="mx-auto w-full max-w-xs"
      />
    </div>
  );
}
