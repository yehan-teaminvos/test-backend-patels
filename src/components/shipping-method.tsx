"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const stores = [
  "Colombo - Main Branch",
  "Kandy - City Center",
  "Galle - Beach Road",
  "Negombo - Town",
  "Jaffna - Market Street",
];

export function ShippingMethod() {
  const [selectedMethod, setSelectedMethod] = useState<
    "delivery" | "pickup" | null
  >(null);
  const [selectedStore, setSelectedStore] = useState<string>("");

  return (
    <div>
      <h2 className="text-2xl font-poppins font-semibold mb-6">
        Shipping Method
      </h2>

      <div className="space-y-4">
        <div
          onClick={() => setSelectedMethod("delivery")}
          className={cn(
            "border rounded-lg p-5 cursor-pointer transition-all hover:border-primary/50",
            selectedMethod === "delivery"
              ? "border-primary bg-primary/5"
              : "border-gray-200",
          )}
        >
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all",
                selectedMethod === "delivery"
                  ? "border-primary"
                  : "border-gray-300",
              )}
            >
              {selectedMethod === "delivery" && (
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-poppins font-semibold text-base text-secondary-black">
                Get Delivered
              </h3>
              <p className="text-sm font-poppins text-secondary-black/60 mt-1">
                Get delivered to your door step
              </p>
            </div>
          </div>
        </div>

        <div
          onClick={() => setSelectedMethod("pickup")}
          className={cn(
            "border rounded-lg p-5 cursor-pointer transition-all hover:border-primary/50",
            selectedMethod === "pickup"
              ? "border-primary bg-primary/5"
              : "border-gray-200",
          )}
        >
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all mt-1",
                selectedMethod === "pickup"
                  ? "border-primary"
                  : "border-gray-300",
              )}
            >
              {selectedMethod === "pickup" && (
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-poppins font-semibold text-base text-secondary-black">
                    Store Pickup
                  </h3>
                  <p className="text-sm font-poppins text-secondary-black/60 mt-1">
                    Pickup From Your Nearest Branch
                  </p>
                </div>

                {selectedMethod === "pickup" && (
                  <div className="sm:w-64">
                    <Select
                      value={selectedStore}
                      onValueChange={setSelectedStore}
                    >
                      <SelectTrigger
                        className="w-full bg-[#F2F2F2] border-transparent focus-within:border-black/40 h-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <SelectValue placeholder="Select Pickup Store" />
                      </SelectTrigger>
                      <SelectContent className="text-poppins text-[#0e000166]">
                        {stores.map((store) => (
                          <SelectItem key={store} value={store}>
                            {store}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
