"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { OrderSummary } from "@/components/order-summary";

export default function Cart() {
  const cartList = [
    {
      id: "1",
      name: "Blush Harmony",
      subtitle: "Flower Bouquet",
      price: 5750,
      quantity: 2,
      image: "/home/flower1.avif",
    },
    {
      id: "2",
      name: "Morning Bliss",
      subtitle: "Mixed Flowers",
      price: 4200,
      quantity: 1,
      image: "/home/flower2.avif",
    },
    {
      id: "3",
      name: "Evening Charm",
      subtitle: "Rose Bouquet",
      price: 3300,
      quantity: 2,
      image: "/home/flower3.avif",
    },
  ];

  const [items, setItems] = useState(cartList);
  const router = useRouter();

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = 0;
  const deliveryFee = 750;
  const total = subtotal - discount + deliveryFee;

  const handleCheckout = () => {
    router.push("/billing-details");
  };

  const increment = (id: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, quantity: it.quantity + 1 } : it,
      ),
    );
  };

  const decrement = (id: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, quantity: Math.max(1, it.quantity - 1) } : it,
      ),
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const formatPrice = (n: number) => {
    return `Rs. ${n.toLocaleString()}.00`;
  };

  return (
    <>
      <div className="relative w-full h-25 overflow-hidden" />
      <section>
        <div className="container mx-auto lg:px-8 px-4 pt-20 sm:pt-24 pb-10 ">
          <h2 className="font-poppins font-semibold text-2xl md:text-[36px] text-secondary-black text-start lg:pb-9 pb-8">
            Shopping Cart
          </h2>
          <div className="w-full h-[0.5px] bg-[#E9E9E9]" />
        </div>
      </section>
      <section>
        <div className="pb-19 sm:pb-24 container mx-auto lg:px-8 px-4 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="w-full">
                <div className="hidden md:bg-[#F2F2F2] md:col-span-5 md:h-12 md:px-4 md:flex md:items-center">
                  <p className="font-poppins font-medium text-base w-3/6">
                    Product
                  </p>
                  <p className="font-poppins font-medium text-base w-1/6">
                    Price
                  </p>
                  <p className="font-poppins font-medium text-base w-1/6">
                    Quantity
                  </p>
                  <p className="font-poppins font-medium text-base w-1/6">
                    Subtotal
                  </p>
                </div>

                {items.map((item) => (
                  <div key={item.id}>
                    <div
                      className={cn(
                        "hidden md:flex border w-full p-5 items-center",
                        item.id === `1` ? "mt-5" : "mt-3",
                      )}
                    >
                      <div className="flex w-3/6">
                        <div className="w-20 h-20 overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="ml-4 gap-2 flex flex-col justify-center">
                          <h3 className="font-laluxes text-base text-[#383838]">
                            {item.name}
                          </h3>
                          <p className="text-xs font-poppins text-secondary-black/40">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="font-poppins font-medium text-base w-1/6">
                        {formatPrice(item.price)}
                      </div>
                      <div className="font-poppins font-medium text-base w-1/6">
                        <div className="flex items-center w-max">
                          <button
                            onClick={() => increment(item.id)}
                            className="px-3 border border-black/8"
                          >
                            +
                          </button>
                          <div className="px-3 border-b border-t border-black/8">
                            {item.quantity}
                          </div>
                          <button
                            onClick={() => decrement(item.id)}
                            className="px-3 border border-black/8"
                          >
                            −
                          </button>
                        </div>
                      </div>
                      <div className="font-poppins font-medium flex justify-between text-base w-1/6">
                        {formatPrice(item.price * item.quantity)}
                        <div className="w-10 text-center">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#919191] hover:text-black"
                          >
                            <Trash2 />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Card Layout */}
                    <div
                      className={cn(
                        "md:hidden border rounded-lg p-4 space-y-4",
                        item.id === `1` ? "mt-0" : "mt-4",
                      )}
                    >
                      {/* Product Info with Image */}
                      <div className="flex gap-3">
                        <div className="w-20 h-20 overflow-hidden flex-shrink-0 rounded">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-center gap-1">
                          <h3 className="font-laluxes text-base text-[#383838]">
                            {item.name}
                          </h3>
                          <p className="text-xs font-poppins text-secondary-black/40">
                            {item.subtitle}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#919191] hover:text-black self-start"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-poppins text-sm text-secondary-black/60">
                            Price
                          </span>
                          <span className="font-poppins font-medium text-base">
                            {formatPrice(item.price)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="font-poppins text-sm text-secondary-black/60">
                            Quantity
                          </span>
                          <div className="flex items-center">
                            <button
                              onClick={() => decrement(item.id)}
                              className="px-3 py-1 border border-black/8"
                            >
                              −
                            </button>
                            <div className="px-4 py-1 border-b border-t border-black/8">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => increment(item.id)}
                              className="px-3 py-1 border border-black/8"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t">
                          <span className="font-poppins font-medium text-base">
                            Subtotal
                          </span>
                          <span className="font-poppins font-semibold text-base">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <OrderSummary
                subtotal={subtotal}
                discount={discount}
                total={total}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
