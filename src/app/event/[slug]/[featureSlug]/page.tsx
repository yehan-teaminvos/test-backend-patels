import Image from "next/image";
import { notFound } from "next/navigation";
import RecentEvents from "@/components/recent-events";
import { servicesData } from "@/data/event-services-data";

export async function generateStaticParams() {
  const params: { slug: string; featureSlug: string }[] = [];

  Object.entries(servicesData).forEach(([serviceSlug, service]) => {
    service.featuresCards.forEach((feature) => {
      params.push({
        slug: serviceSlug,
        featureSlug: feature.slug,
      });
    });
  });

  return params;
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ slug: string; featureSlug: string }>;
}) {
  const { slug, featureSlug } = await params;
  const service = servicesData[slug as keyof typeof servicesData];

  if (!service) {
    notFound();
  }

  const feature = service.featuresCards.find((f) => f.slug === featureSlug);

  if (!feature) {
    notFound();
  }

  return (
    <>
      <section>
        <div className="relative w-full h-100 md:h-124.5 overflow-hidden">
          <Image
            src={feature.cardImage}
            alt={feature.cardTitle}
            fill
            className="object-cover object-center"
            priority
          />

          <div className="absolute inset-0 bg-black/30"></div>

          <div className="absolute bottom-[10%] w-full">
            <div className="container mx-auto px-4 lg:px-8 flex flex-col text-white">
              <h1>{feature.cardsectitle}</h1>
              <h1 className="font-laluxes text-3xl font-normal md:text-[40px]">
                {feature.cardTitle}
              </h1>
              <p className="text-[16px] ">{feature.cardDescription}</p>
            </div>
          </div>
        </div>
      </section>

      {"storySection" in feature && (feature as any).storySection && (
        <section>
          <div className="container mx-auto px-4 lg:px-8 sm:mt-24 mt-19">
            <h1 className="font-laluxes text-2xl sm:text-4xl stroke-medium text-secondary-black max-w-xl">
              {(feature as any).storySection.title}
            </h1>
            <div className="flex flex-col md:flex-row sm:gap-20 gap-4 items-start">
              <div className="md:w-full">
                {(feature as any).storySection.paragraphs.map(
                  (paragraph: string, index: number) => (
                    <p
                      key={index}
                      className="text-base font-poppins font-light text-secondary-black/50 mt-4 "
                    >
                      {paragraph}
                    </p>
                  ),
                )}
              </div>

              <div className="lg:w-full lg:relative lg:h-65 mt-5 flex flex-row gap-4 lg:block w-full">
                {(feature as any).storySection.images.map(
                  (imageSrc: string, index: number) => (
                    <div
                      key={index}
                      className={
                        index === 0
                          ? "relative w-full lg:w-78.75 h-48 md:h-60 lg:h-45.5 flex-1 lg:flex-none"
                          : "relative lg:absolute lg:top-16 lg:left-50 w-full lg:w-78.75 h-48 md:h-60 lg:h-45.5 lg:z-20 flex-1 lg:flex-none"
                      }
                    >
                      <Image
                        src={imageSrc}
                        alt={`${(feature as any).storySection.title} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {"flowersUsed" in feature &&
        (feature as any).flowersUsed &&
        Array.isArray((feature as any).flowersUsed) &&
        (feature as any).flowersUsed.length > 0 && (
          <section>
            <div className="container mx-auto px-4 lg:px-8 sm:mt-20 mt-19">
              <h1 className="font-laluxes text-2xl md:text-[36px] text-secondary-black text-start stroke-medium">
                Flowers Used
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {(feature as any).flowersUsed.map(
                  (flower: { name: string; image: string }, index: number) => (
                    <div
                      key={index}
                      className="relative w-full aspect-427/272 overflow-hidden"
                    >
                      <Image
                        src={flower.image}
                        alt={flower.name}
                        fill
                        className="object-cover"
                      />

                      <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/65" />

                      <p className="absolute bottom-0 left-0 w-full text-white stroke-medium text-base font-laluxes px-3 py-2 z-10">
                        {flower.name}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </section>
        )}

      {"gallery" in feature &&
        (feature as any).gallery &&
        Array.isArray((feature as any).gallery) &&
        (feature as any).gallery.length > 0 && (
          <section>
            <div className="container mx-auto px-4 lg:px-8 sm:mt-24 mt-19 sm:pb-0 pb-1">
              <h1 className="font-laluxes text-2xl md:text-[36px] text-secondary-black text-start stroke-medium">
                Event Gallery
              </h1>
              <div className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[270px] gap-5">
                  {(feature as any).gallery.map((image: any, index: number) => (
                    <Image
                      key={index}
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className={image.className}
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
