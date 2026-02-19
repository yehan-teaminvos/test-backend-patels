import Image from "next/image";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/videoplayer";
import {
  Flower,
  Flower2,
  PartyPopper,
  Sprout,
  SunSnow,
  Truck,
} from "lucide-react";
const features = [
  {
    icon: Flower,
    title: "Fresh Flower Bouquets",
    description:
      "Handcrafted bouquets made with fresh, premium blooms, perfect for gifting, celebrations, or everyday moments.",
  },
  {
    icon: PartyPopper,
    title: "Custom Floral Arrangements",
    description:
      "Personalized flower designs created to match your style, occasion, and color preferences with careful attention to detail.",
  },
  {
    icon: Sprout,
    title: "Event & Wedding Decorations",
    description:
      "Handcrafted bouquets made with fresh, premium blooms, perfect for gifting, celebrations, or everyday moments.",
  },
  {
    icon: Flower2,
    title: "Same-Day Flower Delivery",
    description:
      "Reliable and timely delivery services to ensure your flowers arrive fresh, beautiful, and right on time.",
  },
  {
    icon: Truck,
    title: "Corporate & Office Flowers",
    description:
      "Professional floral solutions for offices, hotels, and commercial spaces that add warmth and sophistication.",
  },
  {
    icon: SunSnow,
    title: "Seasonal & Festive Collections",
    description:
      "Specially curated floral collections designed for festivals, holidays, and seasonal celebrations throughout the year.",
  },
];

const About = () => {
  return (
    <>
      <section>
        <div className="relative w-full h-124.5 overflow-hidden">
          <Image
            src="/about/about-us.avif"
            alt="About Us Background"
            fill
            className="object-cover object-center"
            priority
          />

          <div className="absolute inset-0 bg-black/40"></div>
          <div className="flex flex-col items-center justify-center text-center px-4 relative h-full z-10">
            <h1 className="font-laluxes text-2xl sm:text-[40px] stroke-medium text-gray">
              about us
            </h1>
            <p className="text-xl font-poppins font-light text-gray mt-3">
              Unique arrangements crafted to express what words cannot.
            </p>
          </div>

          <div className="absolute bottom-0 left-0 w-full leading-none z-20">
            <svg
              viewBox="0 0 1440 140"
              className="w-full h-20"
              preserveAspectRatio="none"
            >
              <path
                d="
                M0,140
                Q720,0 1440,140
                L1440,140
                L0,140
                Z
              "
                fill="#ffffff"
              />
            </svg>
          </div>
        </div>
      </section>
      <section className="hidden lg:block">
        <div className="container mx-auto lg:px-5 px-4 relative z-30 -mt-25">
          <div className="flex justify-center items-center gap-6">
            <Image
              src="/about/about-over-lap1.avif"
              alt="About Us Main"
              width={333}
              height={338}
              className="w-83.25 h-83.25 object-cover"
            />

            <Image
              src="/about/about-over-lap2.avif"
              alt="About Us Main"
              width={283}
              height={224}
              className="w-70.75 h-56 object-cover self-center"
            />

            <Image
              src="/about/about-over-lap3.avif"
              alt="About Us Main"
              width={333}
              height={338}
              className="w-83.25 h-83.25 object-cover"
            />

            <Image
              src="/about/about-over-lap4.avif"
              alt="About Us Main"
              width={283}
              height={224}
              className="w-70.75 h-56 object-cover self-center"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto lg:px-5 px-4 mt-24 ">
          <h1 className="font-laluxes text-2xl font-normal md:text-[32px] text-start mt-14 max-w-lg stroke-medium">
            Crafting Beauty Through Flowers
          </h1>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-15 mt-2">
            <p className="text-textbase font-light text-[#00000080] font-poppins mt-3 max-w-2xl">
              We are a dedicated floral studio specializing in beautifully
              crafted arrangements made from premium, fresh flowers. With a
              strong focus on quality and design, we create floral pieces that
              enhance spaces, elevate events, and bring elegance to everyday
              moments. Our approach combines modern aesthetics with timeless
              floral artistry.
            </p>
            <p className="text-textbase font-light text-[#00000080] font-poppins mt-3 max-w-2xl">
              From personal bouquets to large-scale decorations, we work closely
              with our customers to understand their vision and bring it to
              life. Every order is handled with care, from flower selection to
              final presentation and delivery. Through creativity, consistency,
              and attention to detail, we strive to provide a floral experience
              that exceeds expectations.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto lg:px-5 px-4 sm:mt-24 mt-10 ">
          <div className="flex flex-col md:flex-row gap-8 md:gap-22 items-center">
            <Image
              src="/about/about-section2.avif"
              alt="About Us Main"
              width={558}
              height={394}
              className="w-full md:w-139.5 h-auto object-cover"
            />

            <div>
              <h1 className="font-laluxes text-2xl md:text-[32px] font-normal text-start stroke-medium max-w-md">
                More Than Just Flowers
              </h1>

              <p className="text-textbase font-light text-[#00000080] font-poppins mt-5 max-w-2xl">
                Flowers play an important role in life’s most meaningful
                moments, and we take pride in being part of those memories. Our
                designs are inspired by nature and created to reflect emotion,
                beauty, and individuality. Each arrangement is carefully made to
                feel personal, thoughtful, and full of life.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <Button className="text-light-gray font-normal sm:px-7 px-9">
                  Shop Now
                </Button>

                <Button
                  variant="secondary"
                  className="text-secondary-black border border-border-gray px-12 font-normal"
                >
                  Events
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto lg:px-5 px-4 mt-10 mb-26">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="font-laluxes text-2xl md:text-[32px] font-normal mt-14 max-w-2xl stroke-medium">
              Our Floral Services
            </h1>

            <p className="text-[20px] font-light text-[#00000080] font-poppins mt-5 max-w-2xl">
              Beautiful crafted floral solutions for every occasion big or small
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-start text-start sm:p-9 p-5  bg-[#D9D9D933]"
                >
                  <div className="mb-4  p-3 bg-primary">
                    <Icon className="w-5 h-5  text-white " />
                  </div>

                  <h3 className="font-laluxes font-normal text-secondary-black text-[20px] mt-4 max-w-62.5">
                    {item.title}
                  </h3>

                  <p className="text-text-base text-[#0000004D] mt-6 font-light font-poppins">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto lg:px-5 px-4 mt-14 mb-23">
          <VideoPlayer
            thumbnail="/about/video-player/video-thumb1.avif"
            videoSrc="/about/video-player/video1.webm"
          />
        </div>
      </section>
    </>
  );
};

export default About;
