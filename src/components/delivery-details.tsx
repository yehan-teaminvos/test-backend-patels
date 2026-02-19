"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomTextArea } from "@/components/ui/custom-text-area";
import { Calendar } from "@/components/ui/calendar";

const timeSlots = [
  "09:00 AM - 12:00 PM",
  "12:00 PM - 03:00 PM",
  "03:00 PM - 06:00 PM",
  "06:00 PM - 09:00 PM",
];

export function DeliveryDetails() {
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [orderNote, setOrderNote] = useState<string>("");
  const [showCalendar, setShowCalendar] = useState(false);

  // Format date for display
  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day} ${year}`;
  };

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-poppins font-semibold mb-6">
        Delivery Details
      </h2>

      {/* Delivery Date and Time Slot - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="mb-2 block w-fit font-poppins font-bold">
            Delivery Date
          </label>
          <div className="relative">
            <CalendarIcon className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-black/40 z-10 pointer-events-none" />
            <div
              onClick={() => setShowCalendar(!showCalendar)}
              className={cn(
                "w-full pl-15 pr-5 py-5 bg-[#F2F2F2] border border-transparent focus-within:border-black/40 font-poppins outline-none transition-all cursor-pointer text-[#000D0E66]  sm:text-base text-sm",
                !deliveryDate && "text-black/40",
              )}
            >
              {deliveryDate
                ? `Delivery Date: ${formatDate(deliveryDate)}`
                : "Select delivery date"}
            </div>
            {showCalendar && (
              <div className="absolute z-50 mt-2 bg-white">
                <Calendar
                  mode="single"
                  selected={deliveryDate}
                  onSelect={(date) => {
                    setDeliveryDate(date);
                    setShowCalendar(false);
                  }}
                  className="rounded-lg border"
                />
              </div>
            )}
          </div>
        </div>

        {/* Delivery Time Slot */}
        <div>
          <label
            htmlFor="timeSlot"
            className="mb-2 block w-fit font-poppins font-bold"
          >
            Delivery Time Slot(s)
          </label>
          <div className="relative">
            <Clock className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-black/40 z-10" />
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger className="w-full bg-[#F2F2F2] border-transparent focus-within:border-black/40 h-auto pl-15 font-poppins text-[#0e000166] sm:text-base text-sm">
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent className="font-poppins text-[#0e000166]">
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Order Note */}
      <div>
        <CustomTextArea
          value={orderNote}
          onChange={(e) => setOrderNote(e.target.value)}
          label="Order Note (optional)"
          placeholder="Note about your order"
          id="orderNote"
          rows={4}
          className="resize-none"
        />
      </div>
    </div>
  );
}
