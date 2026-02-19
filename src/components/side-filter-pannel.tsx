"use client";
import { Star } from "lucide-react";
import { useState } from "react";

const SideFilterPannel = () => {
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([
    "In Stock",
  ]);

  const handleFlowerChange = (flower: string) => {
    setSelectedFlowers((prev) =>
      prev.includes(flower)
        ? prev.filter((f) => f !== flower)
        : [...prev, flower],
    );
  };

  const handleOccasionChange = (occasion: string) => {
    setSelectedOccasions((prev) =>
      prev.includes(occasion)
        ? prev.filter((o) => o !== occasion)
        : [...prev, occasion],
    );
  };

  const handleColorChange = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color],
    );
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating],
    );
  };

  const handleAvailabilityChange = (status: string) => {
    setSelectedAvailability((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  };

  // const hasActiveFilters =
  //   selectedFlowers.length > 0 ||
  //   selectedOccasions.length > 0 ||
  //   selectedColors.length > 0 ||
  //   selectedRatings.length > 0 ||
  //   selectedAvailability.length > 0;

  const flowers = ["Roses", "Tulips", "Lilies", "Daisies", "Sunflowers"];

  const occasions = [
    "Weddings",
    "Birthday",
    "Anniversary",
    "Thank You",
    "Graduation",
  ];

  const ratings = [5, 4, 3, 2, 1];

  const colors = ["Red", "Pink", "White", "Yellow", "Mixed"];

  return (
    <div>
      <p className="font-laluxes text-base text-secondary-black font-semibold mb-6">
        Filter options
      </p>
      <div className="">
        <div className="mb-6 bg-white border border-light-gray shadow-[0px_0px_4.1px_0px_rgba(0,0,0,0.15)] p-6">
          <h3 className="text-xl font-poppins font-light mb-3 text-black">
            By Flower Type
          </h3>
          <div className="space-y-2">
            {flowers.map((item, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-primary"
                  checked={selectedFlowers.includes(item)}
                  onChange={() => handleFlowerChange(item)}
                />
                <span className="text-base font-poppins font-light text-black/50">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6 bg-white border border-light-gray shadow-[0px_0px_4.1px_0px_rgba(0,0,0,0.15)] p-6">
          <h3 className="text-xl font-poppins font-light mb-3 text-black">
            By Occasion
          </h3>
          <div className="space-y-2">
            {occasions.map((item, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-primary"
                  checked={selectedOccasions.includes(item)}
                  onChange={() => handleOccasionChange(item)}
                />
                <span className="text-base font-poppins font-light text-black/50">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6 bg-white border border-light-gray shadow-[0px_0px_4.1px_0px_rgba(0,0,0,0.15)] p-6">
          <h3 className="text-xl font-poppins font-light mb-3 text-black">
            Price
          </h3>
          <div className="text-base font-poppins font-light text-black/50">
            LKR 1000 - LKR 5000
          </div>

          <input
            type="range"
            min="0"
            max="100000"
            className="w-full accent-primary mb-2"
          />
        </div>

        <div className="mb-6 bg-white border border-light-gray shadow-[0px_0px_4.1px_0px_rgba(0,0,0,0.15)] p-6">
          <h3 className="text-xl font-poppins font-light mb-3 text-black">
            Review
          </h3>
          <div className="space-y-2">
            {ratings.map((item, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-primary"
                  checked={selectedRatings.includes(item)}
                  onChange={() => handleRatingChange(item)}
                />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`${item}-star-${i}`}
                      className={`h-4 w-4 ${i < item ? "text-[#FFE864] fill-[#FFE864]" : "text-[#FFE864] fill-transparent"}`}
                    />
                  ))}
                  <span className="text-base font-poppins font-light text-black/50 ml-1">
                    {item} Star
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6 bg-white border border-light-gray shadow-[0px_0px_4.1px_0px_rgba(0,0,0,0.15)] p-6">
          <h3 className="text-xl font-poppins font-light mb-3 text-black">
            By Color
          </h3>
          <div className="space-y-2">
            {colors.map((item, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-primary"
                  checked={selectedColors.includes(item)}
                  onChange={() => handleColorChange(item)}
                />
                <span className="text-base font-poppins font-light text-black/50">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6 bg-white border border-light-gray shadow-[0px_0px_4.1px_0px_rgba(0,0,0,0.15)] p-6">
          <h3 className="text-xl font-poppins font-light mb-3 text-black">
            Availability
          </h3>
          <div className="space-y-2">
            {["In Stock", "Out of Stocks"].map((status) => (
              <label
                key={status}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-primary"
                  checked={selectedAvailability.includes(status)}
                  onChange={() => handleAvailabilityChange(status)}
                />
                <span className="text-base font-poppins font-light text-black/50">
                  {status}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideFilterPannel;
