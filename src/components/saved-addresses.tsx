"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MapPin, Phone, Check } from "lucide-react";

interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  phoneNumber: string;
}

const savedAddresses: Address[] = [
  {
    id: "1",
    name: "John Doe",
    addressLine1: "No. 251/A, Rose Lane",
    addressLine2: "Colombo 3",
    postalCode: "00300",
    phoneNumber: "+94 77 123 45 678",
  },
  {
    id: "2",
    name: "Jane Smith",
    addressLine1: "No. 45/B, Ocean View, Galle",
    addressLine2: "Near Beach Road",
    postalCode: "80000",
    phoneNumber: "+94 77 987 65 432",
  },
];

export function SavedAddresses() {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );

  const handleSelectAddress = (id: string) => {
    setSelectedAddressId(id);
    console.log("Selected address ID:", id);
  };

  return (
    <div>
      <h3 className="font-poppins font-semibold text-xl mb-5">
        Your Saved Addresses
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
        {savedAddresses.map((address) => (
          <div
            key={address.id}
            onClick={() => handleSelectAddress(address.id)}
            className={cn(
              "border p-5 cursor-pointer transition-all hover:shadow-md relative",
              selectedAddressId === address.id
                ? "border-primary bg-primary/5 ring-2 ring-primary"
                : "border-gray-200 hover:border-primary/50",
            )}
          >
            {/* Checkbox in top-right corner */}
            <div className="absolute top-4 right-4">
              <div
                className={cn(
                  "w-6 h-6 rounded-full  flex items-center justify-center transition-all",
                  selectedAddressId === address.id
                    ? "bg-primary border-primary"
                    : "border-gray-300 bg-white",
                )}
              >
                {selectedAddressId === address.id && (
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                )}
              </div>
            </div>

            {/* Name */}
            <div className="mb-3 pr-10">
              <h4 className="font-poppins font-semibold text-base">
                {address.name}
              </h4>
            </div>

            {/* Address Details */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="text-sm font-poppins text-secondary-black/70">
                  <p>{address.addressLine1}</p>
                  {address.addressLine2 && <p>{address.addressLine2}</p>}
                  <p className="mt-1 font-medium">{address.postalCode}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-sm font-poppins text-secondary-black/70">
                  {address.phoneNumber}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
