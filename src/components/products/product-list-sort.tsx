"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const ProductListSort = () => {
  const SORT_OPTIONS = [
    { value: "default", label: "Default Sorting", urlParam: undefined },
    { value: "price-low-to-high", label: "Low to High", urlParam: "lth" },
    { value: "price-high-to-low", label: "High to Low", urlParam: "htl" },
    { value: "newest-first", label: "Newest First", urlParam: "new" },
  ];

  const URL_TO_UI = Object.fromEntries(
    SORT_OPTIONS.map((opt) => [opt.urlParam ?? "default", opt.value]),
  );

  const UI_TO_URL = Object.fromEntries(
    SORT_OPTIONS.map((opt) => [opt.value, opt.urlParam]),
  );

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState("default");

  useEffect(() => {
    const sort = searchParams.get("sort") ?? "default";
    setSelected(URL_TO_UI[sort] || "default");
  }, [searchParams]);

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    setSelected(value);

    const urlValue = UI_TO_URL[value];

    if (!urlValue) {
      params.delete("sort");
    } else {
      params.set("sort", urlValue);
    }

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <Select value={selected} onValueChange={handleChange}>
      <SelectTrigger className="w-55 text-[16px] font-poppins font-light">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="text-[#00000080] font-poppins font-light text-[16px]"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ProductListSort;
