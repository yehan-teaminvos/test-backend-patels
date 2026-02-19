import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/videoplayer";
import RecentEvents from "@/components/recent-events";
import TestimonialSlider from "@/components/sliders/testimonial-slider";

const servicesData = {
  weddings: {
    title: "Weddings",
    subtitle: "Elevated floral designs for unforgettable weddings.",
    heroImage: "/event/event-services/wedding.avif",
    sec2Image: "/event/event-services/wedding/wedding2.avif",

    description:
      "At Petals, we understand that your wedding day is one of the most significant moments of your life. Our wedding floral design service is dedicated to creating breathtaking arrangements that perfectly capture your love story and complement your unique style.",

    testimonials: [
      {
        name: "Nethmi Perera",
        feedback:
          "The floral arrangements were absolutely stunning and exceeded our expectations. Every detail was perfect from start to finish and the ceremony decorations speechless.",
        image: "/home/testimonial/image1.avif",
        role: "Bride",
        stars: 5,
      },
      {
        name: "Chaminda & Sanduni",
        feedback:
          "Our wedding flowers were breathtaking! The bridal bouquet was exactly what I dreamed of, and the ceremony decorations left our guests speechless.",
        image: "/home/testimonial/image2.avif",
        role: "Wedding Couple",
        stars: 5,
      },
      {
        name: "Kavindi Silva",
        feedback:
          "From consultation to the big day, the team was professional and attentive. The flowers were fresh, beautiful, and perfectly matched our wedding theme.",
        image: "/home/testimonial/image3.avif",
        role: "Bride",
        stars: 5,
      },
      {
        name: "Dilshan & Hasini",
        feedback:
          "The reception centerpieces were elegant and sophisticated. Many guests asked where we found such talented florists. Highly recommend for weddings!",
        image: "/home/testimonial/image1.avif",
        role: "Wedding Couple",
        stars: 5,
      },
    ],

    featuresCards: [
      {
        slug: "bridal-florals",
        cardTitle: "Bridal Florals",
        cardImage: "/event/event-services/wedding/w1.avif",
        cardDescription:
          "Stunning bridal bouquets and bridesmaid arrangements that complement your wedding style.",
      },
      {
        slug: "ceremony-design",
        cardTitle: "Ceremony Design",
        cardImage: "/event/event-services/wedding/w2.avif",
        cardDescription:
          "Grand ceremony arches and aisle arrangements that create a memorable entrance.",
      },
      {
        slug: "reception-decor",
        cardTitle: "Reception Decor",
        cardImage: "/event/event-services/wedding/w3.avif",
        cardDescription:
          "Elegant centerpieces and floral installations for your reception celebration.",
      },
      {
        slug: "special-touches",
        cardTitle: "Special Touches",
        cardImage: "/event/event-services/wedding/w4.avif",
        cardDescription:
          "Boutonnières, corsages, and cake flowers to complete every detail.",
      },
      {
        slug: "bridal-party-florals",
        cardTitle: "Bridal Florals",
        cardImage: "/event/event-services/wedding/w5.avif",
        cardDescription:
          "Stunning bridal bouquets and bridesmaid arrangements that complement your wedding style.",
      },
      {
        slug: "ceremony-arrangements",
        cardTitle: "Ceremony Design",
        cardImage: "/event/event-services/wedding/w6.avif",
        cardDescription:
          "Grand ceremony arches and aisle arrangements that create a memorable entrance.",
      },
      {
        slug: "reception-centerpieces",
        cardTitle: "Reception Decor",
        cardImage: "/event/event-services/wedding/w7.avif",
        cardDescription:
          "Elegant centerpieces and floral installations for your reception celebration.",
      },
      {
        slug: "finishing-touches",
        cardTitle: "Special Touches",
        cardImage: "/event/event-services/wedding/w3.avif",
        cardDescription:
          "Boutonnières, corsages, and cake flowers to complete every detail.",
      },
    ],
    video: {
      thumbnail: "/event/event-services/wedding/video-thumb.avif",
      videoSrc: "/event/event-services/wedding/video.webm",
    },
  },

  "corporate-events": {
    title: "Corporate Event Florals",
    subtitle: "Sophisticated floral installations for business excellence",
    heroImage: "/event/service2.png",
    sec2Image: "/event/service2.png",
    description:
      "Elevate your corporate events with stunning floral designs that reflect your brand's sophistication and values. From product launches to gala dinners, we create memorable floral experiences that leave lasting impressions on clients and colleagues.",

    testimonials: [
      {
        name: "Chamath Fernando",
        feedback:
          "Professional service and beautiful designs. The flowers transformed our event space and received so many compliments from our clients.",
        image: "/home/testimonial/image2.avif",
        role: "Event Manager",
        stars: 5,
      },
      {
        name: "Sarah Thompson",
        feedback:
          "We've used Petals for multiple corporate events. Their attention to detail and ability to match our brand aesthetic is outstanding.",
        image: "/home/testimonial/image1.avif",
        role: "Marketing Director",
        stars: 5,
      },
      {
        name: "Rajesh Kumar",
        feedback:
          "The floral installations at our product launch were spectacular. They created exactly the professional yet creative atmosphere we needed.",
        image: "/home/testimonial/image3.avif",
        role: "CEO",
        stars: 5,
      },
      {
        name: "Amanda Lee",
        feedback:
          "Reliable, professional, and creative. Perfect for our quarterly gala dinners and corporate celebrations.",
        image: "/home/testimonial/image2.avif",
        role: "Events Coordinator",
        stars: 4,
      },
    ],

    featuresCards: [
      {
        slug: "conference-florals",
        cardTitle: "Conference Florals",
        cardImage: "/event/service2.png",
        cardDescription:
          "Professional floral arrangements for conferences and seminars.",
      },
      {
        slug: "product-launches",
        cardTitle: "Product Launches",
        cardImage: "/event/service2.png",
        cardDescription:
          "Eye-catching installations for product launch events.",
      },
      {
        slug: "gala-dinners",
        cardTitle: "Gala Dinners",
        cardImage: "/event/service2.png",
        cardDescription:
          "Sophisticated centerpieces for corporate gala dinners.",
      },
      {
        slug: "office-events",
        cardTitle: "Office Events",
        cardImage: "/event/service2.png",
        cardDescription:
          "Elegant arrangements for office celebrations and gatherings.",
      },
    ],
    video: {
      thumbnail: "/event/service2.png",
      videoSrc: "/about/video-player/video1.webm",
    },
  },
  "private-celebrations": {
    title: "Private Celebration Florals",
    subtitle: "Personalized floral artistry for life's milestone moments",
    heroImage: "/event/service3.png",
    sec2Image: "/event/service3.png",
    description:
      "Celebrate life's precious moments with custom floral designs that make every occasion unforgettable. From intimate birthday dinners to grand anniversary celebrations, we create floral experiences that reflect your personal style and the significance of your special day.",

    testimonials: [
      {
        name: "Tharindu Silva",
        feedback:
          "Fresh flowers, elegant arrangements, and on-time delivery. Made my mother's 60th birthday party absolutely memorable.",
        image: "/home/testimonial/image3.avif",
        role: "Customer",
        stars: 5,
      },
      {
        name: "Priya Jayasinghe",
        feedback:
          "The baby shower decorations were adorable and so thoughtfully designed. Everyone was impressed with the floral arrangements.",
        image: "/home/testimonial/image1.avif",
        role: "Mother-to-be",
        stars: 5,
      },
      {
        name: "Michael & Emma",
        feedback:
          "For our 25th anniversary celebration, Petals created the most romantic floral setup. It brought tears to our eyes!",
        image: "/home/testimonial/image2.avif",
        role: "Anniversary Couple",
        stars: 5,
      },
      {
        name: "Nisha Fernando",
        feedback:
          "They understood exactly what I wanted for my daughter's graduation party. Beautiful work and excellent service!",
        image: "/home/testimonial/image3.avif",
        role: "Customer",
        stars: 5,
      },
    ],

    featuresCards: [
      {
        slug: "birthday-parties",
        cardTitle: "Birthday Parties",
        cardImage: "/event/service3.png",
        cardDescription:
          "Vibrant floral designs for memorable birthday celebrations.",
      },
      {
        slug: "anniversaries",
        cardTitle: "Anniversaries",
        cardImage: "/event/service3.png",
        cardDescription: "Romantic arrangements for anniversary milestones.",
      },
      {
        slug: "baby-showers",
        cardTitle: "Baby Showers",
        cardImage: "/event/service3.png",
        cardDescription:
          "Delicate florals for baby showers and gender reveals.",
      },
      {
        slug: "special-occasions",
        cardTitle: "Special Occasions",
        cardImage: "/event/service3.png",
        cardDescription:
          "Custom designs for graduations, retirements, and holidays.",
      },
    ],
    video: {
      thumbnail: "/event/service3.png",
      videoSrc: "/about/video-player/video1.webm",
    },
  },
  workshops: {
    title: "Floral Design Workshops",
    subtitle: "Hands-on learning experiences in the art of floral design",
    sec2Image: "/event/service4.png",
    heroImage: "/event/service4.png",
    description:
      "Discover the art of floral design through our immersive workshops. Whether you're a beginner or looking to refine your skills, our expert florists guide you through creating beautiful arrangements while sharing professional techniques and botanical knowledge.",

    testimonials: [
      {
        name: "Lisa Anderson",
        feedback:
          "The workshop was so much fun! I learned so many professional techniques and left with a beautiful arrangement I created myself.",
        image: "/home/testimonial/image1.avif",
        role: "Workshop Participant",
        stars: 5,
      },
      {
        name: "Kaveesha Dias",
        feedback:
          "As a complete beginner, I felt welcomed and supported. The instructors are patient and knowledgeable. Highly recommended!",
        image: "/home/testimonial/image2.avif",
        role: "Beginner Student",
        stars: 5,
      },
      {
        name: "Jennifer Wong",
        feedback:
          "We did the team building workshop for our office. It was a perfect mix of creativity, learning, and team bonding.",
        image: "/home/testimonial/image3.avif",
        role: "HR Manager",
        stars: 5,
      },
      {
        name: "Ayesha Khan",
        feedback:
          "The bridal masterclass gave me the confidence to create my own bouquet. Such a rewarding and enjoyable experience!",
        image: "/home/testimonial/image1.avif",
        role: "Workshop Graduate",
        stars: 5,
      },
    ],

    featuresCards: [
      {
        slug: "beginner-classes",
        cardTitle: "Beginner Classes",
        cardImage: "/event/service4.png",
        cardDescription:
          "Learn the fundamentals of floral design in beginner-friendly workshops.",
      },
      {
        slug: "seasonal-workshops",
        cardTitle: "Seasonal Workshops",
        cardImage: "/event/service4.png",
        cardDescription:
          "Create beautiful seasonal arrangements with expert guidance.",
      },
      {
        slug: "bridal-masterclass",
        cardTitle: "Bridal Masterclass",
        cardImage: "/event/service4.png",
        cardDescription: "Master the art of creating stunning bridal bouquets.",
      },
      {
        slug: "team-building",
        cardTitle: "Team Building",
        cardImage: "/event/service4.png",
        cardDescription:
          "Corporate team building through creative floral design.",
      },
    ],
    video: {
      thumbnail: "/event/service4.png",
      videoSrc: "/about/video-player/video1.webm",
    },
  },
};

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug: slug,
  }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData[slug as keyof typeof servicesData];

  if (!service) {
    notFound();
  }

  return (
    <>
      <section>
        <div className="relative w-full h-124.5 overflow-hidden">
          <Image
            src={service.heroImage}
            alt={service.title}
            fill
            className="object-cover object-center"
            priority
          />

          <div className="absolute inset-0 bg-black/10"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="font-laluxes text-2xl font-normal md:text-[32px] stroke-medium">
              {service.title}
            </h1>
            <p className="text-[16px] md:text-[20px] font-light text-light-gray/70 font-poppins mt-3 max-w-xl">
              {service.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto lg:px-5 px-4 sm:mt-25 mt-20">
          <div className="flex flex-col md:flex-row gap-8 md:gap-22 items-center">
            <Image
              src={service.sec2Image}
              alt={service.title}
              width={558}
              height={394}
              className="w-full md:w-139.5 h-auto object-cover"
            />

            <div>
              <h1 className="font-laluxes text-2xl md:text-[32px] font-normal text-start max-w-md stroke-medium">
                {service.title}
              </h1>

              <p className="text-base font-light text-[#00000080] font-poppins mt-5 max-w-2xl">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/contact-us">
                  <Button className="text-light-gray font-normal  px-10">
                    Contact us
                  </Button>
                </Link>

                <Link href="/products">
                  <Button
                    variant="secondary"
                    className="text-secondary-black border border-border-gray px-12 font-normal"
                  >
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto lg:px-5 px-4 sm:mt-24 mt-19">
          <h1 className="font-laluxes text-2xl md:text-[36px] text-secondary-black text-start stroke-medium">
            What We Offer
          </h1>
          <p className="text-[16px] md:text-[20px] font-light text-[#00000080] font-poppins mt-3 max-w-2xl">
            From personalized designs to full-service support, discover the
            comprehensive range of services we provide
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
            {service.featuresCards.map((feature, index) => (
              <Link
                key={index}
                href={`/event/${slug}/${feature.slug}`}
                className="group cursor-pointer"
              >
                <div className="transition-transform duration-300 group-hover:scale-102">
                  <Image
                    src={feature.cardImage}
                    alt={feature.cardTitle}
                    width={300}
                    height={200}
                    className="w-full h-auto"
                  />

                  <h2 className="font-poppins text-secondary-black font-bold text-[20px] mt-3 group-hover:text-primary transition-colors">
                    {feature.cardTitle}
                  </h2>

                  <p className="text-[16px] font-light text-[#00000080] font-poppins mt-3 max-w-lg">
                    {feature.cardDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto lg:px-5 px-4 sm:mt-24 mt-19 sm:mb-22 mb-18">
          <VideoPlayer
            thumbnail={service.video.thumbnail}
            videoSrc={service.video.videoSrc}
            overlayClass="bg-black/10"
          />
        </div>
      </section>

      <section>
        <div className="container mx-auto lg:px-5 px-4 sm:mb-23 mb-18">
          <div className="text-center mb-10">
            <h1 className="font-laluxes text-2xl md:text-[36px] text-secondary-black stroke-medium">
              Loved by Our Customers
            </h1>
            <p className="text-[16px] md:text-[20px] font-light text-[#00000080] font-poppins mt-3 max-w-2xl mx-auto">
              Real experiences shared by those who celebrated life’s moments
              with our floral designs.
            </p>
          </div>
          <div className="container mx-auto pt-19 overflow-hidden px-0.5">
            <TestimonialSlider testimonials={service.testimonials} />
          </div>
        </div>
      </section>

      <RecentEvents />
    </>
  );
}
