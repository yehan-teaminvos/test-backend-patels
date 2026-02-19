"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight, StarIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  feedback: string;
  image: string;
  role: string;
  stars: number;
}

interface TestimonialSliderProps {
  testimonials?: Testimonial[];
}

export default function TestimonialSlider({
  testimonials,
}: TestimonialSliderProps) {
  const defaultTestimonials = [
    {
      name: "Nethmi Perera",
      feedback:
        "“The floral arrangements were absolutely stunning and exceeded our expectations. Every detail was perfect from start to finish.”",
      image: "/home/testimonial/image1.avif",
      role: "Bride",
      stars: 5,
    },
    {
      name: "Chamath Fernando",
      feedback:
        "“Professional service and beautiful designs. The flowers transformed our event space and received so many compliments.”",
      image: "/home/testimonial/image2.avif",
      role: "Event Manager",
      stars: 4,
    },
    {
      name: "Tharindu Silva",
      feedback:
        "“Fresh flowers, elegant arrangements, and on-time delivery. Highly recommended for both personal and corporate events.”",
      image: "/home/testimonial/image3.avif",
      role: "Marketing Manager",
      stars: 5,
    },
    {
      name: "Chamath Fernando",
      feedback:
        "“Professional service and beautiful designs. The flowers transformed our event space and received so many compliments.”",
      image: "/home/testimonial/image2.avif",
      role: "Event Manager",
      stars: 4,
    },
    {
      name: "Tharindu Silva",
      feedback:
        "“Fresh flowers, elegant arrangements, and on-time delivery. Highly recommended for both personal and corporate events.”",
      image: "/home/testimonial/image3.avif",
      role: "Marketing Manager",
      stars: 5,
    },
    {
      name: "Chamath Fernando",
      feedback:
        "“Professional service and beautiful designs. The flowers transformed our event space and received so many compliments.”",
      image: "/home/testimonial/image2.avif",
      role: "Event Manager",
      stars: 5,
    },
    {
      name: "Tharindu Silva",
      feedback:
        "“Fresh flowers, elegant arrangements, and on-time delivery. Highly recommended for both personal and corporate events.”",
      image: "/home/testimonial/image3.avif",
      role: "Marketing Manager",
      stars: 5,
    },
  ];

  const Testimonial = testimonials || defaultTestimonials;

  return (
    <div>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        slidesPerGroup={1}
        modules={[Navigation]}
        className=""
        navigation={{
          prevEl: ".testimonial-swiper-button-prev",
          nextEl: ".testimonial-swiper-button-next",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
      >
        <div className="">
          {Testimonial.map((item, index) => (
            <SwiperSlide key={index} className="">
              <div className="shadow-[0px_0px_4.1px_0px_#00000026] relative p-5 ">
                <div className="justify-between">
                  <div>
                    <div className="flex gap-2.5 mt-9">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon
                          key={`${item.name}-star-${i}`}
                          className={`h-6 w-6 ${i < item.stars ? "text-[#FFE864] fill-[#FFE864]" : "text-[#FFE864] fill-transparent"}`}
                        />
                      ))}
                    </div>
                    <p className="font-poppins text-black/50 leading-6.25 mt-6">
                      {item.feedback}
                    </p>
                  </div>
                  <div>
                    {" "}
                    <div className="mt-6 w-full h-px bg-[#E9E9E9]" />
                    <div className="flex gap-4 items-center mt-4 mb-3.5">
                      <div className="flex items-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="font-poppins font-semibold text-base ">
                          {item.name}
                        </p>
                        <p className="font-poppins text-black/50 text-xs">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 left-5 z-10">
                  <Image
                    src="/home/testimonial/comma.avif"
                    alt="Quote Icon"
                    width={51}
                    height={51}
                    className=""
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
        <div className="flex items-end justify-end  gap-4.5 mt-6">
          <button
            className={cn(
              "testimonial-swiper-button-prev bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed text-[90px] flex items-center justify-center w-13 aspect-square cursor-pointer",
            )}
          >
            <ArrowLeft
              className="w-7 text-[#F1F1F1] testimonial-swiper-button-prev "
              strokeWidth={2}
            />
          </button>
          <button
            className={cn(
              "testimonial-swiper-button-next bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed text-[90px] flex items-center justify-center w-13 aspect-square cursor-pointer",
            )}
          >
            <ArrowRight
              className="w-7 text-[#F1F1F1] testimonial-swiper-button-next  "
              strokeWidth={2}
            />
          </button>
        </div>
      </Swiper>
    </div>
  );
}
