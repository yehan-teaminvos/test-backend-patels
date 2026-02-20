"use client";
import ProductCard from "@/components/product-card";
import WishlistCategorySelector from "@/components/wishlist-category-selector";
import Image from "next/image";
import React, { useState, useEffect } from "react";

type WishlistProduct = {
  id: string;
  name: string;
  price: string;
  installment: string;
  src: string;
  link: string;
};

function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString()}.00`;
}
function formatInstallment(price: number) {
  return `Rs ${(price / 3).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const Wishlist = () => {
  const [productData, setProductData] = useState<WishlistProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWishlist() {
      try {
        const res = await fetch("/api/wishlist");
        if (!res.ok) {
          setProductData([]);
          return;
        }
        const data = await res.json() as {
          items: {
            id: number;
            productId: string;
            product?: { name?: string; productImage?: string; price?: number };
          }[];
        };
        setProductData(
          data.items.map((item) => ({
            id: item.productId,
            name: item.product?.name || "Product",
            price: formatPrice(item.product?.price || 0),
            installment: formatInstallment(item.product?.price || 0),
            src: item.product?.productImage || "/home/flower1.avif",
            link: `/products/single-product?id=${item.productId}`,
          }))
        );
      } catch {
        setProductData([]);
      } finally {
        setLoading(false);
      }
    }
    loadWishlist();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="font-poppins text-secondary-black/50">Loading wishlist...</p>
      </div>
    );
  }

  return (
    <div>
      <section>
        <div className="relative w-full h-123.5 overflow-hidden">
          <Image
            src="/wishlist/wishlist-bg.avif"
            alt="Event Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/35"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="font-laluxes text-2xl font-normal md:text-[32px] max-w-xl stroke-medium">
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
        <div className="container mx-auto lg:px-8 px-4 pt-12 lg:pb-24.5 pb-18 ">
          <h2 className="font-poppins font-semibold text-2xl md:text-[36px] text-secondary-black text-start lg:pb-12 pb-5">
            Wishlist
          </h2>
          <div className="w-full h-[0.5px] bg-[#E9E9E9]" />
          <div className="flex justify-end py-7.5">
            <WishlistCategorySelector />
          </div>
          {productData.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-poppins text-secondary-black/50 text-lg">
                Your wishlist is empty
              </p>
              <p className="font-poppins text-secondary-black/30 text-sm mt-2">
                Browse our products and save your favorites!
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-5 ">
              {productData.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  imageStyle="lg:h-110.5 sm:h-80 h-60"
                  iconStyle="fill-white"
                  isHaveFavIcon={true}
                  initialInWishlist={true}
                  src={item.src}
                  name={item.name}
                  price={item.price}
                  installment={item.installment}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
