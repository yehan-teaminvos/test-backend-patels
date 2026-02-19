import ContactForm from "@/components/contact-form";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ContactUs() {
  const contactDetails = [
    {
      id: 1,
      icon: MapPin,
      label: "Head Branch",
      description: "14 Pentrieve Gardens, Colombo 00300",
      url: "https://maps.app.goo.gl/LP2J22KL5Wzv9Yrb7",
    },
    {
      id: 2,
      icon: Mail,
      label: "Email Us",
      description: "petalsbyhasa@gmail.com",
      url: "mailto:petalsbyhasa@gmail.com",
    },
    {
      id: 3,
      icon: Phone,
      label: "Contact Us",
      description: "077 596 2000",
      url: "tel:0775962000",
    },
  ];

  const followUs = [
    {
      id: 1,
      icon: Facebook,
      url: "https://web.facebook.com/PetalsByHasa/?_rdc=1&_rdr#",
    },
    {
      id: 2,
      icon: Instagram,
      url: "https://www.instagram.com/petalsflowershoplk/?hl=en",
    },
    { id: 3, icon: Twitter, url: "" },
  ];
  return (
    <div>
      <section>
        <div className="relative w-full h-143.25 overflow-hidden">
          <Image
            src="/contact/contact-hero.avif"
            alt="Event Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] h-[90%]" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="flex flex-col items-center justify-center text-center px-4 relative h-full z-10">
            <h1 className="font-laluxes text-2xl sm:text-[40px] stroke-medium text-gray">
              Contact Us
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
      <section>
        <div className="container mx-auto lg:px-8 px-4 lg:pt-22 pt-18 sm:pb-25 pb-20">
          <div className="p-6 sm:p-12 bg-white -mt-44 relative z-20 shadow-[0px_0px_4.1px_0px_#00000026]">
            <div>
              <h2 className="font-laluxes stroke-medium text-2xl sm:text-3xl">
                Get in touch
              </h2>
              <p className="font-poppins text-black/50 mt-2 sm:mt-7 max-w-xl font-light">
                Have a question or planning a special event? Get in touch with
                us and let’s create something beautiful together.
              </p>
            </div>
            <div className="mt-7 sm:mt-10 lg:grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="max-w-md">
                <ul className="space-y-5 sm:space-y-7.5">
                  {contactDetails.map((contact) => (
                    <Link
                      href={contact.url}
                      target="_blank"
                      key={contact.id}
                      className="w-fit flex gap-6 items-center cursor-pointer group"
                    >
                      <div className="p-3 bg-primary">
                        <contact.icon className="text-white group-hover:scale-125 duration-200" />
                      </div>
                      <div>
                        <h6 className="font-poppins font-medium sm:text-xl text-lg group-hover:text-primary duration-200">
                          {contact.label}
                        </h6>
                        <p className="font-poppins text-[14px] sm:text-base text-black/50 mt-1">
                          {contact.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </ul>
                <div className="my-8 lg:my-10 w-full h-px bg-[#E9E9E9]" />
                <div>
                  <p className="text-xl font-poppins font-medium">Follow Us</p>
                  <div className="flex items-center gap-5 mt-7.5">
                    {followUs.map((social) => (
                      <Link
                        href={social.url}
                        target="_blank"
                        key={social.id}
                        className="group"
                      >
                        <div className="bg-primary p-2.5 cursor-pointer">
                          <social.icon className="size-6 text-white group-hover:scale-110 duration-100" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:mt-0 mt-7 sm:mt-10">
                <ContactForm />
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80392195148!2d79.81500587491165!3d6.921922084794473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo!5e0!3m2!1sen!2slk!4v1770035662454!5m2!1sen!2slk"
              width="100%"
              height="100%"
              loading="lazy"
              className="h-100 sm:h-120 xl:h-153.5"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
