"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Minus, Plus, Check, Star } from "lucide-react";
import { useState } from "react";
import RelatedProducts from "@/components/related-products";
import ProductTabs from "@/components/product-tabs";

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(2);
  const [deliveryOption, setDeliveryOption] = useState("pickup");
  const [activeTab, setActiveTab] = useState("description");

  const product = {
    name: "Blush Harmony",
    mainImage: "/single-product/image1.avif",
    thumbnails: [
      "/single-product/image2.avif",
      "/single-product/image3.avif",
      "/single-product/image4.avif",
    ],
    rating: 4.5,
    reviews: 10,
    price: 5750.0,
    oldPrice: 5750.0,
    installment: {
      count: 3,
      amount: 1316.66,
    },
    paymentMethods: [
      "/shipping-details/payment/payment1.avif",
      "/shipping-details/payment/payment2.avif",
    ],
    description:
      "A delicate blend of blush and pink blooms, thoughtfully arranged to bring warmth, charm, and timeless beauty to any space.",
    details: {
      sku: "FLW-2",
      category: "Bouquets",
      availability: "In Stock",
    },
  };

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <>
      <section>
        <div className="container mx-auto lg:px-8 px-4 lg:pt-50 pt-42 sm:pb-25 pb-20">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <Image
                src={product.mainImage}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-auto object-cover"
              />
              <div className="grid grid-cols-3 mt-5 gap-5">
                {product.thumbnails.map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                ))}
              </div>
            </div>

            <div className="relative">
              <h1 className="text-3xl font-laluxes mb-3">{product.name}</h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`product-star-${i}`}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating)
                          ? "text-[#FFE864] fill-[#FFE864]"
                          : i < product.rating
                            ? "text-[#FFE864] fill-[#FFE864]/50"
                            : "text-[#FFE864] fill-transparent"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-base font-poppins text-[#000D0E80] font-medium">
                  {product.rating}
                </span>
                <span className="text-base font-poppins font-light text-[#000D0E80]">
                  ({product.reviews} Review)
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-medium font-poppins">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  <span
                    className="text-lg line-through font-poppins"
                    style={{ color: "#000D0E4D" }}
                  >
                    Rs. {product.oldPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm font-poppins">
                  <span className="font-poppins text-[#000D0E80]">
                    {product.installment.count} X Rs{" "}
                    {product.installment.amount.toLocaleString()} with
                  </span>
                  {product.paymentMethods.map((method, index) => (
                    <>
                      <Image
                        key={index}
                        src={method}
                        alt="Payment method"
                        width={40}
                        height={25}
                        className="h-5 w-auto"
                      />
                      {index < product.paymentMethods.length - 1 && (
                        <span className="font-poppins">or</span>
                      )}
                    </>
                  ))}
                </div>
              </div>

              <p className="text-[#000D0E80] mb-6 leading-relaxed font-poppins">
                {product.description}
              </p>

              <div className=" border-gray-300 p-4 mb-6">
                <h3 className="font-medium text-[24px] mb-3 font-poppins">
                  Product Details
                </h3>
                <div className="space-y-2 font-poppins">
                  <div className="flex justify-between">
                    <span className="text-[20px] font-light font-poppins">
                      SKU:
                    </span>
                    <span className="text-[20px] font-light font-poppins">
                      {product.details.sku}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[20px] font-light font-poppins">
                      Category:
                    </span>
                    <span className="text-[20px] font-light font-poppins">
                      {product.details.category}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[20px] font-light font-poppins">
                      Availability:
                    </span>
                    <span className="text-[20px] text-[#17E100]  font-light font-poppins">
                      {product.details.availability}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-t border-border py-5" />

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center w-max">
                  <button
                    onClick={handleIncrease}
                    className="px-3 border border-black/8"
                  >
                    +
                  </button>
                  <div className="px-3 border-b border-t border-black/8">
                    {quantity}
                  </div>
                  <button
                    onClick={handleDecrease}
                    className="px-3 border border-black/8"
                  >
                    −
                  </button>
                </div>

                <div className="flex gap-3 ml-auto">
                  <button className="p-3 px-8 border border-gray-200 hover:bg-gray-100 transition">
                    <Heart strokeWidth={1} className="w-5 h-5" />
                  </button>

                  <button className="p-3 px-8 border border-gray-200 hover:bg-gray-100 transition">
                    <Share2 strokeWidth={1} className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-6 text-lg font-poppins">
                <span className="font-medium">Subtotal</span>
                <span className="font-bold">
                  Rs. {(product.price * quantity).toLocaleString()}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white font-poppins text-base">
                  Add To Cart
                </Button>
                <Button className="w-full bg-white text-primary border border-primary ext-base hover:bg-white hover:text-primary transition font-poppins">
                  Buy Now
                </Button>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="deliveryOption"
                    checked={deliveryOption === "pickup"}
                    onChange={() => setDeliveryOption("pickup")}
                    className="hidden"
                  />
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center transition ${
                      deliveryOption === "pickup"
                        ? "border-[#17E100]"
                        : "border-gray-300"
                    }`}
                  >
                    {deliveryOption === "pickup" && (
                      <Check
                        className="w-5 h-5 text-[#17E100]"
                        strokeWidth={2}
                      />
                    )}
                  </div>
                  <span className="font-poppins text-[20px] font-light text-secondary-black">
                    Pickup available at Petals
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        rating={product.rating}
        reviews={product.reviews}
      />

      <RelatedProducts />
    </>
  );
};

export default SingleProduct;
