"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type ProductCardProps = {
  id?: number | string; // ID is needed for API calls
  imageStyle?: string;
  isHaveFavIcon?: boolean;
  src: string;
  name: string;
  price: string | number;
  installment: string;
  iconStyle?: string;
  currency?: string;
};

const ProductCard = ({
  id,
  imageStyle,
  isHaveFavIcon,
  src,
  name,
  price,
  installment,
  iconStyle,
  currency = "Rs.",
  initialInWishlist = false,
}: ProductCardProps & { initialInWishlist?: boolean }) => {
  const router = useRouter();
  const [inWishlist, setInWishlist] = useState(initialInWishlist);

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();

    try {
      const method = inWishlist ? "DELETE" : "POST";
      
      const res = await fetch("/api/wishlist", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      });
      
      if (res.ok) {
         setInWishlist(!inWishlist);
      } else {
         if (res.status === 401) alert("Please login to save items.");
         // If we tried to ADD and it's already there (400), maybe we should just setInWishlist(true)?
         if (res.status === 400 && !inWishlist) setInWishlist(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="relative group cursor-pointer" onClick={() => id && router.push(`/products/single-product?id=${id}`)}>
        <Image
          src={src}
          alt={name}
          width={1920}
          height={1080}
          className={cn(
            `w-full lg:h-110.5 sm:h-80 object-cover mask-b-black`,
            imageStyle,
          )}
        />
        {isHaveFavIcon && (
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 z-10 hover:scale-110 transition-transform"
          >
            <Heart
              className={cn(
                `text-white transition-colors`, 
                iconStyle,
                inWishlist ? "fill-red-500 text-red-500" : ""
              )}
            />
          </button>
        )}
        <div className=" mt-4">
          <p className="font-laluxes text-secondary-black text-base font-semibold">
            {name}
          </p>
          <p className="font-poppins font-bold text-secondary-black text-xl mt-2">
            {currency} {price}
          </p>
          <p className="font-poppins text-sm mt-2 text-black/50">
            3 X {installment} with
            <span>
              <Image
                src="/home/koko.avif"
                alt="Afterpay Logo"
                width={37}
                height={12}
                className="inline-block ml-2 object-contain"
              />
            </span>{" "}
            or
            <span>
              <Image
                src="/home/mintpay.avif"
                alt="Afterpay Logo"
                width={37}
                height={12}
                className="inline-block ml-2 object-contain"
              />
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
