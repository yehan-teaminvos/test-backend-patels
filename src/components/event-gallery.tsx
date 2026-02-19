"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { galleryData, GalleryCategory } from "@/data/galleryData";

const EventGallery = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategory>("weddings");

  const currentGalleryImages = galleryData[selectedCategory];

  return (
    <section>
      <div className="container mx-auto lg:px-5 px-4 sm:mt-22 mt-17">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="font-laluxes text-2xl md:text-[36px] text-secondary-black text-start stroke-medium ">
              Event Gallery
            </h1>
            <p className="text-[16px] md:text-[20px] font-light text-[#00000080] font-poppins mt-3 max-w-lg">
              A curated collection of our floral artistry across various
              celebrations
            </p>
          </div>

          <div className="flex flex-row md:items-end">
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
        <div>
          <div className="mt-10">
            <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[270px] gap-5">
              {currentGalleryImages.map((image, index) => (
                <Image
                  key={index}
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className={image.className}
                  priority
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventGallery;
