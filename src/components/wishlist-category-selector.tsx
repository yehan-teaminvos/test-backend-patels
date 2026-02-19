"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { GalleryCategory } from "@/data/galleryData";

const WishlistCategorySelector = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategory>("weddings");

  // const currentGalleryImages = galleryData[selectedCategory];

  return (
    <div>
      <div className="flex items-end">
        <h3 className="font-poppins text-[#00000080] text-[16px] mb-4 justify-center ">
          Filter by Category:
        </h3>

        <Select
          value={selectedCategory}
          onValueChange={(value) =>
            setSelectedCategory(value as GalleryCategory)
          }
        >
          <SelectTrigger className="w-37.5 text-[16px] font-poppins ml-10">
            <SelectValue placeholder="Weddings" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              value="weddings"
              className="text-[#00000080] text-[16px] font-poppins"
            >
              Weddings
            </SelectItem>
            <SelectItem
              value="corporate"
              className="text-[#00000080] font-poppins text-[16px]"
            >
              Corporate Events
            </SelectItem>
            <SelectItem
              value="private"
              className="text-[#00000080] font-poppins text-[16px]"
            >
              Private Celebrations
            </SelectItem>
            <SelectItem
              value="workshops"
              className="text-[#00000080] font-poppins text-[16px]"
            >
              Workshops
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default WishlistCategorySelector;
