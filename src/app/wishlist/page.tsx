import ProductCard from "@/components/product-card";
import WishlistCategorySelector from "@/components/wishlist-category-selector";
import Image from "next/image";
import React from "react";

const Wishlist = () => {
  const productData = [
    {
      name: "Blush Harmony",
      price: "Rs. 5,750.00",
      installment: "Rs 1,316.66",
      src: "/home/flower1.avif",
      link: "/",
    },
    {
      name: "Petal Whisper",
      price: "Rs. 4,500.00",
      installment: "Rs 1,316.66",
      src: "/home/flower2.avif",
      link: "/",
    },
    {
      name: "Golden Dawn Bouquet",
      price: "Rs. 6,200.00",
      installment: "Rs 1,316.66",
      src: "/home/flower3.avif",
      link: "/",
    },
    {
      name: "Velvet Bloom",
      price: "Rs. 5,800.00",
      installment: "Rs 1,316.66",
      src: "/home/flower4.avif",
      link: "/",
    },
  ];
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
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-5 ">
            {productData.map((item, id) => (
              <ProductCard
                key={id}
                imageStyle="lg:h-110.5 sm:h-80 h-60"
                iconStyle="fill-white"
                isHaveFavIcon={true}
                src={item.src}
                name={item.name}
                price={item.price}
                installment={item.installment}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
