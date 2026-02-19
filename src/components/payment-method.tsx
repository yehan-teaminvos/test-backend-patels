"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

type PaymentMethodType = "payhere" | "mintpay" | "koko" | "cod" | null;

export function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(null);

  return (
    <div>
      <h2 className="text-2xl font-poppins font-semibold mb-3">Payment</h2>
      <p className="text-sm font-poppins text-secondary-black/70 mb-6">
        All transactions are secure and encrypted.
      </p>

      <div className="space-y-4">
        <div
          onClick={() => setSelectedMethod("payhere")}
          className={cn(
            "border rounded-lg p-5 cursor-pointer transition-all hover:border-primary/50",
            selectedMethod === "payhere"
              ? "border-primary bg-primary/5"
              : "border-gray-200",
          )}
        >
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all mt-1",
                selectedMethod === "payhere"
                  ? "border-primary"
                  : "border-primary/70",
              )}
            >
              {selectedMethod === "payhere" && (
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="font-poppins font-semibold text-base text-secondary-black">
                  Bank Card / Bank Account - PayHere
                </h3>
                <div className="flex items-center gap-2">
                  <Image
                    src="/shipping-details/payment/payment1.avif"
                    alt="Visa"
                    width={40}
                    height={25}
                    className="object-contain"
                  />
                  <Image
                    src="/shipping-details/payment/payment2.avif"
                    alt="MasterCard"
                    width={40}
                    height={25}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setSelectedMethod("mintpay")}
          className={cn(
            "border rounded-lg p-5 cursor-pointer transition-all hover:border-primary/50",
            selectedMethod === "mintpay"
              ? "border-primary bg-primary/5"
              : "border-gray-200",
          )}
        >
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all mt-1",
                selectedMethod === "mintpay"
                  ? "border-primary"
                  : "border-primary/70",
              )}
            >
              {selectedMethod === "mintpay" && (
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="font-poppins font-semibold text-base text-secondary-black">
                  Mintpay | Shop Now. Pay Later
                </h3>
                <div className="flex items-center gap-2">
                  <Image
                    src="/shipping-details/payment/payment4.avif"
                    alt="Visa"
                    width={40}
                    height={25}
                    className="object-contain"
                  />
                  <Image
                    src="/shipping-details/payment/payment1.avif"
                    alt="MasterCard"
                    width={40}
                    height={25}
                    className="object-contain"
                  />
                  <Image
                    src="/shipping-details/payment/payment2.avif"
                    alt="Payment Option"
                    width={40}
                    height={25}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setSelectedMethod("koko")}
          className={cn(
            "border rounded-lg p-5 cursor-pointer transition-all hover:border-primary/50",
            selectedMethod === "koko"
              ? "border-primary bg-primary/5"
              : "border-gray-200",
          )}
        >
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all mt-1",
                selectedMethod === "koko"
                  ? "border-primary"
                  : "border-primary/70",
              )}
            >
              {selectedMethod === "koko" && (
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="font-poppins font-semibold text-base text-secondary-black">
                  KoKo | Buy Now Pay Later
                </h3>
                <div className="flex items-center gap-2">
                  <Image
                    src="/shipping-details/payment/payment3.avif"
                    alt="Visa"
                    width={40}
                    height={25}
                    className="object-contain"
                  />
                  <Image
                    src="/shipping-details/payment/payment1.avif"
                    alt="MasterCard"
                    width={40}
                    height={25}
                    className="object-contain"
                  />
                  <Image
                    src="/shipping-details/payment/payment2.avif"
                    alt="Payment Option"
                    width={40}
                    height={25}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setSelectedMethod("cod")}
          className={cn(
            "border rounded-lg p-5 cursor-pointer transition-all hover:border-primary/50",
            selectedMethod === "cod"
              ? "border-primary bg-primary/5"
              : "border-gray-200",
          )}
        >
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all mt-1",
                selectedMethod === "cod"
                  ? "border-primary"
                  : "border-primary/70",
              )}
            >
              {selectedMethod === "cod" && (
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-poppins font-semibold text-base text-secondary-black">
                Cash on Delivery (COD)
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
