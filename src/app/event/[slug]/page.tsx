import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/videoplayer";
import RecentEvents from "@/components/recent-events";
import TestimonialSlider from "@/components/sliders/testimonial-slider";
// ← OLD: const servicesData = { ...350 lines of inline data... }
// ← NEW: query the database directly ↓
import { getDb } from "@/lib/get-db";
import { getEvents, getEventTypes } from "@/db/event-queries";

// ─── Testimonials (UI-only data, not in DB yet) ───
// These are kept static because they're review/testimonial content
// that's separate from event portfolio data.
const testimonialsByType: Record<
  string,
  { name: string; feedback: string; image: string; role: string; stars: number }[]
> = {
  weddings: [
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
  "corporate-events": [
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
  "private-celebrations": [
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
  workshops: [
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
};

// Video data per event type (not in DB yet — UI-only)
const videoByType: Record<string, { thumbnail: string; videoSrc: string }> = {
  weddings: {
    thumbnail: "/event/event-services/wedding/video-thumb.avif",
    videoSrc: "/event/event-services/wedding/video.webm",
  },
  "corporate-events": {
    thumbnail: "/event/service2.png",
    videoSrc: "/about/video-player/video1.webm",
  },
  "private-celebrations": {
    thumbnail: "/event/service3.png",
    videoSrc: "/about/video-player/video1.webm",
  },
  workshops: {
    thumbnail: "/event/service4.png",
    videoSrc: "/about/video-player/video1.webm",
  },
};

export async function generateStaticParams() {
  const db = await getDb();
  const allEventTypes = await getEventTypes(db);
  return allEventTypes.map((et) => ({ slug: et.slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // ← OLD: const service = servicesData[slug];
  // ← NEW: query the database ↓
  const db = await getDb();
  const { eventType, events: typeEvents } = await getEvents(db, slug);

  if (!eventType) {
    notFound();
  }

  const testimonials = testimonialsByType[slug] || [];
  const video = videoByType[slug] || {
    thumbnail: "/event/service1.png",
    videoSrc: "/about/video-player/video1.webm",
  };

  return (
    <>
      {/* ── HERO BANNER ── */}
      <section>
        <div className="relative w-full h-124.5 overflow-hidden">
          <Image
            src={eventType.image || "/event/service1.png"}
            alt={eventType.name}
            fill
            className="object-cover object-center"
            priority
          />

          <div className="absolute inset-0 bg-black/10"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="font-laluxes text-2xl font-normal md:text-[32px] stroke-medium">
              {eventType.name}
            </h1>
            <p className="text-[16px] md:text-[20px] font-light text-light-gray/70 font-poppins mt-3 max-w-xl">
              {eventType.description}
            </p>
          </div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section>
        <div className="container mx-auto lg:px-5 px-4 sm:mt-25 mt-20">
          <div className="flex flex-col md:flex-row gap-8 md:gap-22 items-center">
            <Image
              src={eventType.image || "/event/service1.png"}
              alt={eventType.name}
              width={558}
              height={394}
              className="w-full md:w-139.5 h-auto object-cover"
            />

            <div>
              <h1 className="font-laluxes text-2xl md:text-[32px] font-normal text-start max-w-md stroke-medium">
                {eventType.name}
              </h1>

              <p className="text-base font-light text-[#00000080] font-poppins mt-5 max-w-2xl">
                {eventType.description}
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

      {/* ── FEATURES CARDS (from DB events) ── */}
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
            {typeEvents.map((event, index) => (
              <Link
                key={event.id}
                href={`/event/${slug}/${event.slug}`}
                className="group cursor-pointer"
              >
                <div className="transition-transform duration-300 group-hover:scale-102">
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    width={300}
                    height={200}
                    className="w-full h-auto"
                  />

                  <h2 className="font-poppins text-secondary-black font-bold text-[20px] mt-3 group-hover:text-primary transition-colors">
                    {event.title}
                  </h2>

                  <p className="text-[16px] font-light text-[#00000080] font-poppins mt-3 max-w-lg">
                    {event.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO SECTION ── */}
      <section>
        <div className="container mx-auto lg:px-5 px-4 sm:mt-24 mt-19 sm:mb-22 mb-18">
          <VideoPlayer
            thumbnail={video.thumbnail}
            videoSrc={video.videoSrc}
            overlayClass="bg-black/10"
          />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      {testimonials.length > 0 && (
        <section>
          <div className="container mx-auto lg:px-5 px-4 sm:mb-23 mb-18">
            <div className="text-center mb-10">
              <h1 className="font-laluxes text-2xl md:text-[36px] text-secondary-black stroke-medium">
                Loved by Our Customers
              </h1>
              <p className="text-[16px] md:text-[20px] font-light text-[#00000080] font-poppins mt-3 max-w-2xl mx-auto">
                Real experiences shared by those who celebrated life's moments
                with our floral designs.
              </p>
            </div>
            <div className="container mx-auto pt-19 overflow-hidden px-0.5">
              <TestimonialSlider testimonials={testimonials} />
            </div>
          </div>
        </section>
      )}

      <RecentEvents />
    </>
  );
}
