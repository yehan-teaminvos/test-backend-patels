"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Star, SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import PriceRangeFilter from "./price-change-filter";

// --- Utility: Move outside to keep component clean ---
const normalize = (v: string) => v.trim().toLowerCase().replace(/\s+/g, "-");

function toggleParam(params: string, key: string, value: string, multi = true) {
  const next = new URLSearchParams(params.toString());
  if (!multi) {
    if (next.get(key) === value) next.delete(key);
    else next.set(key, value);
    return next;
  }
  const current = next.get(key);
  const values = current ? current.split(",").filter(Boolean) : [];
  const exists = values.includes(value);
  const updated = exists
    ? values.filter((v) => v !== value)
    : [...values, value];
  if (updated.length === 0) next.delete(key);
  else next.set(key, updated.join(","));
  return next;
}

export default function FilterPanel() {
  const [isOpen, setIsOpen] = useState(false);

  const FilterContent = () => (
    <div className="space-y-5">
      <CheckBoxFilterCard
        title="By Flower Type"
        options={["Roses", "Tulips", "Lilies", "Daisies", "Sunflowers"]}
        filterKey="flower"
      />
      <CheckBoxFilterCard
        title="By Occasion"
        options={[
          "Weddings",
          "Birthday",
          "Anniversary",
          "Thank You",
          "Graduation",
        ]}
        filterKey="occasion"
      />
      <PriceRangeFilter />
      <CheckBoxFilterCard title="Review" disableScrollBar>
        <RatingFilter />
      </CheckBoxFilterCard>
      <CheckBoxFilterCard
        title="By Color"
        options={["Red", "Pink", "White", "Yellow", "Mixed"]}
        filterKey="color"
      />
      <CheckBoxFilterCard
        disableScrollBar
        title="Availability"
        filterKey="availability"
        multi={false}
        options={["In Stock", "Out of Stock"]}
      />
    </div>
  );

  return (
    <div className="w-full">
      {/* Mobile Trigger: Shows below 'lg' break point */}
      <div className="lg:hidden mb-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button className="w-fit flex items-center justify-between py-6 border-black/10">
              <span className="flex items-center gap-2 font-poppins">
                <SlidersHorizontal className="h-4 w-4" />
                Filter Options
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[400px] overflow-y-auto pt-10"
          >
            <SheetHeader className="mb-5">
              <SheetTitle className="text-left font-laluxes text-2xl">
                Filters
              </SheetTitle>
            </SheetHeader>
            <FilterContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View: Always visible on large screens */}
      <div className="hidden lg:block">
        <h3 className="font-laluxes leading-2.5 text-2xl mb-7">
          Filter options
        </h3>
        <FilterContent />
      </div>
    </div>
  );
}

// --- Sub-Components ---

export const CheckBoxFilterCard = ({
  title,
  filterKey,
  options,
  children,
  disableScrollBar = false,
  multi = true,
}: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onToggle = (labelValue: string) => {
    if (!filterKey) return;
    const value = normalize(labelValue);
    const next = toggleParam(searchParams.toString(), filterKey, value, multi);
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const isChecked = (labelValue: string) => {
    if (!filterKey) return false;
    const raw = searchParams.get(filterKey);
    if (!raw) return false;
    const value = normalize(labelValue);
    return multi ? raw.split(",").includes(value) : raw === value;
  };

  return (
    <div className="bg-white shadow-[0px_0px_4.1px_0px_rgba(0,0,0,0.15)] py-6 px-7">
      <h3 className="text-lg font-poppins font-medium mb-4 text-black">
        {title}
      </h3>
      <div
        className={cn(
          "max-h-40 overflow-y-auto custom-scrollbar-filter-box",
          (disableScrollBar || (options && options.length <= 5)) &&
            "max-h-full overflow-y-visible",
        )}
      >
        {options ? (
          <div className="space-y-3">
            {options.map((item: string, idx: number) => (
              <label
                key={idx}
                className="flex items-center gap-4 cursor-pointer group"
              >
                <Checkbox
                  checked={isChecked(item)}
                  onCheckedChange={() => onToggle(item)}
                />
                <span className="text-sm font-poppins font-light text-black/60 group-hover:text-black transition-colors">
                  {item}
                </span>
              </label>
            ))}
          </div>
        ) : (
          <div>{children}</div>
        )}
      </div>
    </div>
  );
};

function RatingFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ratings = [5, 4, 3, 2, 1];
  const selected = searchParams.get("rating");

  const setRating = (r: number) => {
    const next = new URLSearchParams(searchParams.toString());
    if (next.get("rating") === String(r)) next.delete("rating");
    else next.set("rating", String(r));
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <div className="space-y-3">
      {ratings.map((r) => (
        <label key={r} className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={selected === String(r)}
            onChange={() => setRating(r)}
            className="w-4 h-4 accent-black border-gray-300 rounded"
          />
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < r
                    ? "text-[#FFE864] fill-[#FFE864]"
                    : "text-[#FFE864] fill-transparent",
                )}
              />
            ))}
            <span className="text-sm font-poppins font-light text-black/60 ml-1">
              {r} Star
            </span>
          </div>
        </label>
      ))}
    </div>
  );
}
