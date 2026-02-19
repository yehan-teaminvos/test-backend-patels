"use client";
import { Star } from "lucide-react";

interface ProductTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  rating: number;
  reviews: number;
}

const ProductTabs = ({
  activeTab,
  setActiveTab,
  rating,
  reviews,
}: ProductTabsProps) => {
  const tabs = [
    { id: "description", label: "Description" },
    { id: "additional", label: "Additional Information" },
    { id: "reviews", label: "Reviews" },
  ];

  const descriptionParagraphs = [
    "This exquisite bouquet features premium, hand-selected flowers arranged with care by our expert florists. Each arrangement is unique and may vary slightly from the image shown, ensuring you receive a one-of-a-kind creation.",
    "Our flowers are sourced from the finest growers and arrive fresh daily. We carefully inspect each bloom to ensure only the highest quality flowers make it into your arrangement. Whether you're celebrating a special occasion or simply want to brighten someone's day, this bouquet is sure to impress.",
  ];

  const features = [
    "Professionally arranged by expert florists",
    "Delivered fresh in protective packaging",
    "Includes flower food for extended vase life",
    "Perfect for gifting or home decoration",
  ];

  const additionalInfo = [
    { label: "Weight", value: "1.5 kg" },
    { label: "Dimensions", value: "30 × 20 × 40 cm" },
    {
      label: "Care Instructions",
      value: "Keep in cool place, change water daily",
    },
    { label: "Delivery Time", value: "Same day delivery available" },
  ];

  const customerReviews = [
    {
      id: 1,
      rating: 5,
      title: "Beautiful arrangement",
      author: "Customer Name",
      date: "January 15, 2026",
      comment:
        "Absolutely stunning! The flowers were fresh and the arrangement was even more beautiful than in the pictures. Highly recommend!",
    },
  ];

  return (
    <section>
      <div className="container mx-auto lg:px-8 px-4 ">
        <div className="flex gap-8 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-lg font-poppins font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary"
                  : "text-black hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="border-t border-border py-5" />

        <div className="font-poppins">
          {activeTab === "description" && (
            <div>
              <h3 className="text-2xl font-medium mb-4">About This Bouquet</h3>
              <div className="space-y-4 text-[#000D0E80] leading-relaxed">
                {descriptionParagraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
                <ul className="list-disc list-inside space-y-2 mt-4">
                  {features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "additional" && (
            <div>
              <h3 className="text-2xl font-medium mb-4">
                Additional Information
              </h3>
              <div className="space-y-3 text-[#000D0E80]">
                {additionalInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b border-gray-200"
                  >
                    <span className="font-medium">{info.label}</span>
                    <span>{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <h3 className="text-2xl font-medium mb-4">Customer Reviews</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl font-bold">{rating}</div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(rating)
                              ? "text-[#FFE864] fill-[#FFE864]"
                              : "text-[#FFE864] fill-transparent"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-[#000D0E80]">
                      Based on {reviews} reviews
                    </p>
                  </div>
                </div>

                {customerReviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-t border-gray-200 pt-6"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating
                                ? "text-[#FFE864] fill-[#FFE864]"
                                : "text-[#FFE864] fill-transparent"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{review.title}</span>
                    </div>
                    <p className="text-sm text-[#000D0E80] mb-2">
                      by {review.author} - {review.date}
                    </p>
                    <p className="text-[#000D0E80]">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductTabs;
