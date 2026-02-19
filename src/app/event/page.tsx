import Image from "next/image";
import Link from "next/link";
import RecentEvents from "@/components/recent-events";
import EventGallery from "@/components/event-gallery";

const services = [
  {
    title: "Weddings",
    slug: "weddings",
    image: "/event/service1.png",
    description:
      "Romantic, bespoke floral designs for your special day, from intimate ceremonies to grand celebrations.",
  },
  {
    title: "Corporate Events",
    slug: "corporate-events",
    image: "/event/service2.png",
    description:
      "Sophisticated floral installations that elevate brand experiences and corporate gatherings with elegance.",
  },
  {
    title: "Private Celebrations",
    slug: "private-celebrations",
    image: "/event/service3.png",
    description:
      "Personalized floral artistry for milestone moments, from intimate dinners to grand soirées.",
  },
  {
    title: "Workshops",
    slug: "workshops",
    image: "/event/service4.png",
    description:
      "Hands-on floral design experiences where artistry meets education in intimate, inspiring settings.",
  },
];

const Event = () => {
  return (
    <>
      <section>
        <div className="relative w-full h-124.5 overflow-hidden">
          <Image
            src="/event/event-bg1.avif"
            alt="Event Background"
            fill
            className="object-cover object-center"
            priority
          />

          <div className="absolute inset-0 bg-black/10"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="font-laluxes text-2xl font-normal md:text-[32px] stroke-medium">
              Our Events
            </h1>
            <p className="text-[16px] md:text-[20px] font-light text-light-gray/70 font-poppins mt-3 max-w-xl ">
              Creating extraordinary floral experiences for life&apos;s most
              meaningful moments
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto lg:px-5 px-4 sm:mt-23 mt-19">
          <h2 className="font-laluxes text-2xl md:text-[36px]  text-secondary-black text-start stroke-medium ">
            Crafting Unforgettable Moments
          </h2>

          <div className="flex flex-col md:flex-row items-start gap-18 mt-10">
            <div className="shrink-0">
              <Image
                src="/event/section2-image1.avif"
                alt="Event Main"
                width={486}
                height={338}
                className=""
                priority
              />
            </div>

            <div className="space-y-4 max-w-240">
              <p className="font-poppins font-light text-base leading-relaxed text-[#00000080]">
                At Petals, we believe that flowers have the power to transform
                spaces and elevate experiences. Each event we design is a
                carefully curated celebration of nature&apos;s beauty, artistry,
                and emotion — tailored to reflect your unique vision and story.
              </p>

              <p className="font-poppins font-light text-base leading-relaxed text-[#00000080]">
                From intimate gatherings to grand celebrations, our approach is
                deeply personal and intentional. We work closely with you to
                understand the essence of your event, drawing inspiration from
                your style, venue, and the emotions you wish to evoke. Whether
                it&apos;s a romantic wedding, a sophisticated corporate affair,
                or a private celebration, we craft floral designs that are both
                timeless and unforgettable.
              </p>

              <p className="font-poppins font-light text-base leading-relaxed text-[#00000080]">
                Our commitment to excellence extends beyond aesthetics. We
                source the finest seasonal blooms from trusted growers, ensuring
                each stem is at its peak beauty. With meticulous attention to
                detail and a passion for botanical artistry, we create immersive
                floral experiences that tell your story and leave a lasting
                impression.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto lg:px-5 px-4 sm:mt-22 mt-17">
          <h1 className="font-laluxes text-2xl md:text-[36px] text-secondary-black text-start stroke-medium ">
            Our Event Services
          </h1>
          <p className="text-[16px] md:text-[20px] font-light text-[#00000080] font-poppins mt-3 max-w-2xl">
            From weddings to private celebrations, we specialize in creating
            bespoke floral designs that elevate every occasion
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
            {services.map((service, index) => (
              <Link
                key={index}
                href={`/event/${service.slug}`}
                className="group cursor-pointer"
              >
                <div className="transition-transform duration-300 group-hover:scale-102">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={300}
                    height={200}
                    className="w-full h-auto"
                    priority
                  />

                  <h2 className="font-poppins text-secondary-black font-bold text-[20px] mt-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h2>

                  <p className="text-[16px] font-light text-[#00000080] font-poppins mt-3 max-w-lg">
                    {service.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <EventGallery />
      <RecentEvents />
    </>
  );
};

export default Event;
