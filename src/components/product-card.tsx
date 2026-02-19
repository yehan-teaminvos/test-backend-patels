import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

type ProductCardProps = {
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
  imageStyle,
  isHaveFavIcon,
  src,
  name,
  price,
  installment,
  iconStyle,
  currency,
}: ProductCardProps) => {
  return (
    <div>
      <div className="relative">
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
          <Heart
            className={cn(`absolute top-4 right-4 text-white`, iconStyle)}
          />
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
