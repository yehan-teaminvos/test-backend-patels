"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Ticket } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderSummaryProps {
  subtotal?: number;
  discount?: number;
  total?: number;
  onCheckout?: () => void;
  showCartItems?: boolean;
  cartItems?: CartItem[];
  buttonText?: string;
  route?: string;
}

export function OrderSummary({
  subtotal = 5750.0,
  discount = 0.0,
  total = 6500.0,
  onCheckout,
  showCartItems = false,
  cartItems = [],
  buttonText = "Proceed To Checkout",
  route,
}: OrderSummaryProps) {
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    console.log("Applying coupon:", couponCode);
  };

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      console.log("Proceeding to checkout");
    }
  };

  return (
    <Card className="p-7 space-y-2">
      <h2 className="text-2xl font-poppins font-medium">Order Summary</h2>
      <div className="border-t border-border" />

      {showCartItems && cartItems.length > 0 && (
        <>
          <div className="space-y-3 py-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 items-start">
                <div className="w-16 h-16 flex-shrink-0 rounded relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full rounded"
                  />

                  <div className="absolute z-10 -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                    <span className="text-[10px] font-poppins font-semibold">
                      {item.quantity}
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-laluxes text-sm text-[#383838] truncate">
                    {item.name}
                  </h4>
                  <p className="text-xs font-poppins text-secondary-black/40">
                    {item.subtitle}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <p className="font-poppins font-medium text-sm text-secondary-black">
                    Rs. {item.price.toLocaleString()}.00
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border" />
        </>
      )}

      <div className="space-y-3">
        <label className="text-base font-medium font-poppins text-secondary-black">
          Coupon Code
        </label>
        <div className="flex gap-2 items-center mt-5">
          <div className="relative flex-1">
            <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter Your Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full pl-10 pr-3 text-[12px] font-poppins h-12 sm:placeholder:text-[12px] placeholder:text-[10px]"
            />
          </div>
          <Button
            variant="secondary"
            onClick={handleApplyCoupon}
            className="bg-primary text-white hover:bg-primary/90 font-poppins text-[14px] h-12 px-7 whitespace-nowrap flex-shrink-0"
          >
            Apply
          </Button>
        </div>
      </div>

      <div className="border-t border-border" />

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-medium text-secondary-black font-poppins text-base">
            Subtotal
          </span>
          <span className="font-medium text-secondary-black font-poppins text-base">
            Rs. {subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-medium text-secondary-black font-poppins text-base">
            Discount
          </span>
          <span className="font-medium text-poppins text-[#448AFF]">
            Rs. {discount.toFixed(2)}
          </span>
        </div>

        <div className="border-t border-border" />

        <div className="flex justify-between items-center ">
          <span className="font-medium text-secondary-black font-poppins text-base">
            Total
          </span>
          <span className="font-medium text-secondary-black font-poppins text-base">
            Rs. {total.toFixed(2)}
          </span>
        </div>
      </div>

      {route ? (
        <Link href={route} className="block">
          <Button
            className="w-full py-6 text-base font-poppins font-medium"
            size="lg"
          >
            {buttonText}
          </Button>
        </Link>
      ) : (
        <Button
          onClick={handleCheckout}
          className="w-full py-6 text-base font-poppins font-medium"
          size="lg"
        >
          {buttonText}
        </Button>
      )}
    </Card>
  );
}
