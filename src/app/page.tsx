import ProductCard from "@/components/product-card";
import TestimonialSlider from "@/components/sliders/testimonial-slider";
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// ← NEW: fetch products from the database
import { getDb } from "@/lib/get-db";
import { getProducts } from "@/db/product-queries";

// Helper to format price for display
function formatPrice(price: number) {
  return `Rs. ${price.toLocaleString()}.00`;
}
function formatInstallment(price: number) {
  return `Rs ${(price / 3).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default async function Home() {
  // ← OLD: const justBloomed = [...8 hardcoded products...]
  // ← NEW: fetch latest products from the DB
  const db = await getDb();
  const { products } = await getProducts(db, { limit: 8, sort: "newest" });

  const justBloomed = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: formatPrice(p.price),
    installment: formatInstallment(p.price),
    src: p.productImage,
    link: `/products/single-product?id=${p.id}`,
  }));
  const social = [
    {
      name: "Facebook",
      src: "/social/facebook.svg",
      link: "https://www.facebook.com/PetalsByHasa/",
      width: 10,
      height: 10.5,
    },
    {
      name: "Instagram",
      src: "/social/instar.svg",
      link: "https://www.instagram.com/petalsflowershoplk",
      width: 20,
      height: 20,
    },
    {
      name: "Tiktok",
      src: "/social/tiktok.svg",
      link: "https://www.tiktok.com/@petalsbyhasa?is_from_webapp=1&sender_device=pc",
      width: 15.68,
      height: 18,
    },
  ];

  const category = [
    { name: "Fresh Flowers", src: "/home/cat1.avif", link: "/" },
    { name: "Fresh Bouquets", src: "/home/cat2.avif", link: "/" },
    { name: "Wedding & Events", src: "/home/cat3.avif", link: "/" },
    { name: "Gifts & Hampers", src: "/home/cat4.avif", link: "/" },
  ];

  const category2 = [
    {
      name: "Fresh Flowers",
      src: "/home/cat5.avif",
      description:
        "Discover our latest floral creations, thoughtfully arranged for every moment.",
      link: "/",
    },
    {
      name: "Arrangements",
      src: "/home/flower1.avif",
      description:
        "Discover our latest floral creations, thoughtfully arranged for every moment.",
      link: "/",
    },
    {
      name: "Individual Flowers",
      src: "/home/cat6.avif",
      description:
        "Discover our latest floral creations, thoughtfully arranged for every moment.",
      link: "/",
    },
  ];

  const mansonry = [
    { src: "/home/mansonry/image1.avif", alt: "Image1" },
    { src: "/home/mansonry/image2.avif", alt: "Image2" },
    { src: "/home/mansonry/image3.avif", alt: "Image3" },
    { src: "/home/mansonry/image4.avif", alt: "Image4" },
    { src: "/home/mansonry/image5.avif", alt: "Image5" },
    { src: "/home/mansonry/image6.avif", alt: "Image6" },
    { src: "/home/mansonry/image7.avif", alt: "Image7" },
    { src: "/home/mansonry/image8.avif", alt: "Image8" },
  ];
  const bloomStories = [
    {
      name: "Wedding Wonders: Floral Inspirations",
      src: "/home/bloom-stories/image1.avif",
      description:
        "Explore stunning wedding floral arrangements, creative décor ideas, and tips to make your special day bloom with elegance.",
      link: "/",
    },
    {
      name: "Seasonal Blooms & Trends",
      src: "/home/bloom-stories/image2.avif",
      description:
        "Stay updated with the latest flower trends, seasonal blooms, and tips for choosing the perfect flowers for every occasion.",
      link: "/",
    },
    {
      name: "DIY Flower Arrangements at Home",
      src: "/home/bloom-stories/image3.avif",
      description:
        "Learn easy and creative ways to arrange flowers at home, turning your living space into a fresh and vibrant oasis.",
      link: "/",
    },
  ];

  return (
    <>
      <section>
        <div className="w-full h-screen overflow-hidden relative container mx-auto lg:px-8 px-4 py-20">
          <div className="z-10 relative h-full flex flex-col justify-center gap-5">
            <div className="h-full flex flex-col justify-center">
              <div className="flex lg:justify-start justify-center lg:pl-20">
                <h1 className="  h-fit w-fit font-laluxes leading-none lg:text-9xl sm:text-7xl text-6xl bg-linear-to-r from-light-gray via-light-gray lg:to-light-gray/40 to-light-gray/60 text-transparent bg-clip-text">
                  PURELY
                </h1>
              </div>
              <div className="flex lg:justify-end justify-center lg:pr-20">
                <h1 className="  h-fit w-fit font-laluxes leading-none lg:text-9xl sm:text-7xl text-6xl bg-linear-to-r from-light-gray via-light-gray/50 lg:to-light-gray to-light-gray text-transparent bg-clip-text">
                  BLOOMED
                </h1>
              </div>
            </div>
            <div className="flex items-end flex-col h-fit justify-end">
              <div className="flex justify-center  w-full">
                <Button className="" variant="secondary">
                  Choose Bouquet
                </Button>
              </div>
              <div className="flex gap-x-5  absolute sm:bottom-0 -bottom-10 sm:justify-end justify-center w-full ">
                {social.map((item) => (
                  <Link
                    href={item.link}
                    target="_blank"
                    key={item.name}
                    className="flex items-center group p-1.5"
                  >
                    <Image
                      src={item.src}
                      alt={item.name}
                      width={item.width}
                      height={item.height}
                      className="object-contain group-hover:scale-150 duration-100"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Image
          src="/home/home-bg.avif"
          alt="Hero Background"
          fill
          className="object-cover object-center"
        />
      </section>
      <section>
        <div className="container mx-auto lg:px-8 px-4 lg:pt-22 pt-18 ">
          <h2 className="font-laluxes text-[32px] text-center text-shadow-xl text-shadow-red stroke-medium">
            FLOWERS FOR EVERY STORY
          </h2>
          <p className="text-center font-poppins font-light text-xl mt-3 text-black/50">
            Unique arrangements crafted to express what words cannot.
          </p>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-5 mt-11">
            {category.map((item, id) => (
              <div key={id} className="relative">
                <Image
                  src={item.src}
                  alt={item.name}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover mask-b-black"
                />
                <div className="absolute w-full h-25 bottom-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#000000_100%)]" />
                <p className="font-laluxes text-light-gray absolute sm:bottom-6 bottom-4 sm:left-8 left-4 font-semibold lg:text-lg">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto lg:px-8 px-4 lg:py-22 py-18">
          <h2 className="font-laluxes text-[32px] text-center stroke-3  text-shadow-xl text-shadow-red stroke-medium">
            Just Bloomed
          </h2>
          <p className="text-center font-poppins font-light text-xl mt-3 text-black/50">
            Discover our latest floral creations, thoughtfully arranged for
            every moment.
          </p>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-5 mt-13">
            {justBloomed.slice(0, 84).map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                imageStyle="lg:h-110.5 sm:h-80 h-60"
                isHaveFavIcon={true}
                src={item.src}
                name={item.name}
                price={item.price}
                installment={item.installment}
              />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="lg:pb-22 pb-18 sm:mt-2">
          <div className="grid md:grid-cols-3">
            {category2.slice(0, 3).map((item, id) => (
              <div key={id} className="relative lg:h-[849px] sm:h-150 h-100">
                <div className="">
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    className="w-full h-full object-cover mask-b-black"
                  />
                </div>
                <div className="absolute w-full h-40 bottom-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#000000_100%)]" />
                <div className="w-full h-full p-5 relative">
                  <div className="flex flex-col justify-end h-full gap-3.5">
                    <p className="font-laluxes text-light-gray   font-semibold lg:text-[30px] text-2xl">
                      {item.name}
                    </p>
                    <p className="font-poppins font-light text-white/50 lg:text-xl text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container lg:px-8 px-4 mx-auto lg:pb-23 pb-18 ">
          <h2 className="font-laluxes text-[32px] text-center stroke-3  text-shadow-xl text-shadow-red stroke-medium">
            Everything You Need to Brighten Your Day
          </h2>
          <p className="text-center font-poppins font-light text-xl mt-3 text-black/50">
            Discover our latest floral creations, thoughtfully arranged for
            every moment.
          </p>
          <div className="relative sm:h-[567px] h-100 mt-13">
            <Image
              src="/home/mansonry/image1.avif"
              alt="Image1"
              fill
              className="w-full h-full object-cover "
            />
          </div>
          <div className="max-lg:hidden grid lg:grid-cols-3 grid-cols-2 gap-5 mt-5">
            {mansonry.slice(1, 4).map((item, id) => (
              <div key={id} className="relative h-[282px]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="w-full h-full object-cover "
                />
              </div>
            ))}
          </div>
          <div className="lg:hidden grid lg:grid-cols-3 grid-cols-2 gap-5 mt-5">
            {mansonry.slice(1, 5).map((item, id) => (
              <div key={id} className="relative h-50">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="w-full h-full object-cover "
                />
              </div>
            ))}
          </div>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-5 mt-5">
            {mansonry.slice(4, 8).map((item, id) => (
              <div key={id} className="relative sm:h-[282px] h-50">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="w-full h-full object-cover "
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center ">
            <p className="text-center font-laluxes text-xl text-secondary-black font-semibold mt-8.5 w-fit cursor-pointer">
              SEE MORE
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="relative lg:mb-22 mb-18">
          <div className="container relative mx-auto lg:px-8 px-4 lg:py-34 sm:py-25 py-20 z-20">
            <p className="font-laluxes lg:text-[64px] text-4xl text-light-gray max-w-sm lg:leading-17.75 leading-12 stroke-medium">
              Seasonal Specials
            </p>
            <p className="font-poppins font-light text-xl mt-3 text-light-gray max-w-132.5">
              Brighten your celebrations with our handpicked seasonal flowers.
              Fresh, vibrant, and ready to delight.
            </p>
            <div className="flex sm:flex-row flex-col gap-3 mt-11">
              <Button className="" variant="secondary">
                Explore Collection
              </Button>
              <Button className="text-light-gray" variant="default">
                Explore Events
              </Button>
            </div>
          </div>
          <div className="absolute inset-0 z-10 bg-[linear-gradient(270deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.331834)_33.99%,rgba(0,0,0,0.64)_100%)] pointer-events-none" />
          <Image
            src="/home/section-bg.avif"
            alt="Hero Background"
            fill
            className="object-cover object-center -z-10"
          />
        </div>
      </section>
      <section>
        <div className="container mx-auto lg:px-8 px-4 lg:pb-22 pb-18 ">
          <h2 className="font-laluxes text-[32px] text-center stroke-3  text-shadow-xl text-shadow-red stroke-medium">
            Fresh from our garden
          </h2>
          <p className="text-center font-poppins font-light text-xl mt-3 text-black/50">
            Check out the latest blooms we’ve curated just for you.
          </p>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-5 mt-13">
            {justBloomed.slice(0, 4).map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                imageStyle="lg:h-110.5 sm:h-80 h-60"
                isHaveFavIcon={true}
                src={item.src}
                name={item.name}
                price={item.price}
                installment={item.installment}
              />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto lg:px-8 px-4 lg:pb-22 pb-18 ">
          <h2 className="font-laluxes text-[32px] text-center stroke-3  text-shadow-xl text-shadow-red stroke-medium">
            Bloom stories & inspirations
          </h2>
          <p className="text-center font-poppins font-light text-xl mt-3 text-black/50">
            Discover the latest floral trends event highlights and creative
            ideas to brighten every occasion.
          </p>
          <div className="grid lg:grid-cols-3 grid-cols-2 sm:gap-5 gap-3 mt-11 relative">
            {bloomStories.map((item, id) => (
              <div
                key={id}
                className="relative sm:h-109 h-80 hover:scale-103 transition-transform duration-300 ease-in-out cursor-pointer"
              >
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  className="w-full h-full object-cover mask-b-black"
                />
                <div className="w-full h-full sm:p-6.5 p-2 relative z-20">
                  <div className="flex flex-col justify-end h-full gap-5">
                    <p className="font-laluxes text-light-gray sm:text-xl text-[15px] max-w-[320px]">
                      {item.name}
                    </p>
                    <p className="font-poppins font-light text-white/50 sm:text-base text-sm line-clamp-3 leading-[19px]">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="absolute w-full h-full bottom-0 z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,#000000_100%)] pointer-events-none" />
                <MoveUpRight className="p-1 bg-light-gray rounded-full absolute top-5 right-5 " />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto lg:px-8 px-4 lg:pb-24 pb-20 ">
          <h2 className="font-laluxes text-[32px] text-center stroke-3  text-shadow-xl text-shadow-red stroke-medium">
            Loved by Our Customers
          </h2>
          <p className="text-center font-poppins font-light text-xl mt-3 text-black/50">
            Real experiences shared by those who celebrated life’s moments with
            our floral designs.
          </p>
          <div className="container mx-auto pt-19 overflow-hidden px-0.5">
            <TestimonialSlider />
          </div>
        </div>
      </section>
    </>
  );
}
