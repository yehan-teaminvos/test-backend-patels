"use client";

import React, { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const toLabel = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

type Chip = {
  key: string;
  value: string;
  label: string;
};

export default function ActiveFilter({
  className,
  hideKeys = ["sort"],
}: {
  className?: string;
  hideKeys?: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const chips = useMemo(() => {
    const list: Chip[] = [];

    for (const [key, raw] of searchParams.entries()) {
      if (!raw) continue;
      if (hideKeys.includes(key)) continue;
      const values = raw.split(",").filter(Boolean);
      for (const v of values) {
        let label = toLabel(v);
        if (key === "rating") label = `${v} Star`;
        if (key === "availability")
          label = v === "in-stock" ? "In Stock" : "Out of Stock";

        list.push({
          key,
          value: v,
          label: `${key === "rating" ? "" : ""}${label}`,
        });
      }
    }

    return list;
  }, [searchParams, hideKeys]);

  const removeChip = (chip: Chip) => {
    const next = new URLSearchParams(searchParams.toString());
    const raw = next.get(chip.key);
    if (!raw) return;

    const parts = raw.split(",").filter(Boolean);
    if (parts.length > 1) {
      const updated = parts.filter((p) => p !== chip.value);
      if (updated.length === 0) next.delete(chip.key);
      else next.set(chip.key, updated.join(","));
    } else {
      next.delete(chip.key);
    }

    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const clearAll = () => {
    router.push(pathname, { scroll: false });
  };

  if (chips.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <p className="font-poppins text-base text-light-black/50 pr-2">
        Active Filters
      </p>
      {chips.map((chip) => (
        <div
          key={`${chip.key}:${chip.value}`}
          className="inline-flex items-center gap-2 text-white px-3 py-1.5 text-xs font-poppins font-light bg-primary"
        >
          <span>{chip.key}:</span>
          <span>{chip.label}</span>
          <button
            type="button"
            onClick={() => removeChip(chip)}
            className="cursor-pointer group"
          >
            <X className="h-4 w-4 group-hover:text-red-400" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={clearAll}
        className="ml-1 text-xs font-poppins text-primary underline cursor-pointer pt-3"
      >
        Clear all
      </button>
    </div>
  );
}
