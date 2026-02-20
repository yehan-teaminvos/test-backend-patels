import Image from "next/image";
import { notFound } from "next/navigation";
import RecentEvents from "@/components/recent-events";
// ← OLD: import { servicesData } from "@/data/event-services-data";  ← static file
// ← NEW: query the database directly ↓
import { getDb } from "@/lib/get-db";
import { getEvents, getEventBySlug } from "@/db/event-queries";

export async function generateStaticParams() {
  // Get all events from the DB to build all possible routes
  const db = await getDb();
  const { events } = await getEvents(db);

  // We need to get the event type slug for each event
  // The route is /event/[slug]/[featureSlug] where slug = event type slug
  const { getEventTypes } = await import("@/db/event-queries");
  const eventTypes = await getEventTypes(db);

  const params: { slug: string; featureSlug: string }[] = [];

  for (const event of events) {
    const eventType = eventTypes.find((et) => et.id === event.eventTypeId);
    if (eventType) {
      params.push({
        slug: eventType.slug,
        featureSlug: event.slug,
      });
    }
  }

  return params;
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string; featureSlug: string }>;
}) {
  const { slug, featureSlug } = await params;

  // ← OLD: const service = servicesData[slug];
  //         const feature = service.featuresCards.find(f => f.slug === featureSlug);
  // ← NEW: query the database ↓
  const db = await getDb();
  const event = await getEventBySlug(db, featureSlug);

  if (!event) {
    notFound();
  }

  return (
    <>
      {/* ── HERO BANNER ── */}
      <section>
        <div className="relative w-full h-100 md:h-124.5 overflow-hidden">
          <Image
            src={event.coverImage}
            alt={event.title}
            fill
            className="object-cover object-center"
            priority
          />

          <div className="absolute inset-0 bg-black/30"></div>

          <div className="absolute bottom-[10%] w-full">
            <div className="container mx-auto px-4 lg:px-8 flex flex-col text-white">
              <h1>{event.sectionTitle}</h1>
              <h1 className="font-laluxes text-3xl font-normal md:text-[40px]">
                {event.title}
              </h1>
              <p className="text-[16px] ">{event.shortDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORY SECTION ── */}
      {event.storyTitle && (
        <section>
          <div className="container mx-auto px-4 lg:px-8 sm:mt-24 mt-19">
            <h1 className="font-laluxes text-2xl sm:text-4xl stroke-medium text-secondary-black max-w-xl">
              {event.storyTitle}
            </h1>
            <div className="flex flex-col md:flex-row sm:gap-20 gap-4 items-start">
              <div className="md:w-full">
                {event.storyParagraph1 && (
                  <p className="text-base font-poppins font-light text-secondary-black/50 mt-4 ">
                    {event.storyParagraph1}
                  </p>
                )}
                {event.storyParagraph2 && (
                  <p className="text-base font-poppins font-light text-secondary-black/50 mt-4 ">
                    {event.storyParagraph2}
                  </p>
                )}
              </div>

              {event.storyImages.length > 0 && (
                <div className="lg:w-full lg:relative lg:h-65 mt-5 flex flex-row gap-4 lg:block w-full">
                  {event.storyImages.map((img, index) => (
                    <div
                      key={img.id}
                      className={
                        index === 0
                          ? "relative w-full lg:w-78.75 h-48 md:h-60 lg:h-45.5 flex-1 lg:flex-none"
                          : "relative lg:absolute lg:top-16 lg:left-50 w-full lg:w-78.75 h-48 md:h-60 lg:h-45.5 lg:z-20 flex-1 lg:flex-none"
                      }
                    >
                      <Image
                        src={img.src}
                        alt={`${event.storyTitle} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── FLOWERS USED ── */}
      {event.flowersUsed.length > 0 && (
        <section>
          <div className="container mx-auto px-4 lg:px-8 sm:mt-20 mt-19">
            <h1 className="font-laluxes text-2xl md:text-[36px] text-secondary-black text-start stroke-medium">
              Flowers Used
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {event.flowersUsed.map((flower) => (
                <div
                  key={flower.id}
                  className="relative w-full aspect-427/272 overflow-hidden"
                >
                  {flower.image && (
                    <Image
                      src={flower.image}
                      alt={flower.name}
                      fill
                      className="object-cover"
                    />
                  )}

                  <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/65" />

                  <p className="absolute bottom-0 left-0 w-full text-white stroke-medium text-base font-laluxes px-3 py-2 z-10">
                    {flower.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── EVENT GALLERY ── */}
      {event.gallery.length > 0 && (
        <section>
          <div className="container mx-auto px-4 lg:px-8 sm:mt-24 mt-19 sm:pb-0 pb-1">
            <h1 className="font-laluxes text-2xl md:text-[36px] text-secondary-black text-start stroke-medium">
              Event Gallery
            </h1>
            <div className="mt-10">
              <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[270px] gap-5">
                {event.gallery.map((image, index) => (
                  <Image
                    key={image.id}
                    src={image.src}
                    alt={image.alt || `${event.title} Gallery Image ${index + 1}`}
                    width={image.width || 427}
                    height={image.height || 270}
                    className={image.className || "w-full h-[270px] object-cover"}
                    priority={index < 3}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <RecentEvents />
    </>
  );
}
