import React from "react";
import Image from "next/image";

const recentEvents = [
  {
    image: "/event/recent-event/recent1.avif",
    location: "Cinnamon Gardens, Colombo | August 18, 2025",
    title: "Garden Wedding Celebration",
  },
  {
    image: "/event/recent-event/recent2.avif",
    location: "Nuwara Eliya | July 02, 2025",
    title: "Elegant Hill Country Wedding",
  },
  {
    image: "/event/recent-event/recent3.avif",
    location: "Galle Fort | June 14, 2025",
    title: "Luxury Destination Wedding",
  },
  {
    image: "/event/recent-event/recent4.avif",
    location: "Bentota | May 08, 2025",
    title: "Beachfront Wedding Ceremony",
  },
];

const RecentEvents = () => {
  return (
    <section>
      <div className="container mx-auto lg:px-5 px-4 sm:pb-23 pb-18 sm:mt-24 mt-19">
        <h1 className="font-laluxes text-2xl md:text-[36px] text-secondary-black text-start stroke-medium">
          Recent events
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
          {recentEvents.map((event, index) => (
            <div key={index}>
              <Image
                src={event.image}
                alt={event.title}
                width={300}
                height={400}
                className="w-full h-auto "
                priority
              />

              <p className="text-[10px] md:text-[12px] font-light text-[#00000080] font-poppins mt-3">
                {event.location}
              </p>

              <h2 className="font-poppins text-secondary-black font-bold text-[20px] mt-1 max-w-[200px]">
                {event.title}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentEvents;
