import Image from "next/image";
const termsOfUseSections = [
  {
    items: [
      {
        type: "header",
        title: "1. Acceptance of Terms",
        description:
          "By using our website, you acknowledge that you have read, understood, and agreed to these Terms of Use and our Privacy Policy. We reserve the right to update these terms at any time, and your continued use of the site constitutes acceptance of any changes.",
      },
    ],
  },
  {
    items: [
      {
        type: "header",
        title: "2. Use of Our Website",
        description:
          "You agree to use our website only for lawful purposes and in accordance with these Terms of Use. You must not use the site in any way that could harm, disrupt, or interfere with the functioning of the website or the enjoyment of other users.",
      },
      {
        type: "list",
        description:
          "Use the website for any fraudulent or unauthorized purposes.",
      },
      {
        type: "list",
        description:
          "Attempt to access accounts, systems, or networks without permission.",
      },
      {
        type: "list",
        description:
          "Post or transmit content that is unlawful, harmful, or offensive.",
      },
    ],
  },
  {
    items: [
      {
        type: "header",
        title: "3. Intellectual Property",
        description:
          "All content on our website, including text, images, graphics, logos, and designs, is the property of Petals or its licensors. You may not:",
      },
      {
        type: "list",

        description:
          "Use any content for commercial purposes without explicit consent.",
      },
    ],
  },
  {
    items: [
      {
        type: "header",
        title: "4. Products and Services",
        description:
          "We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or storage is 100% secure.",
      },
    ],
  },
  {
    items: [
      {
        type: "header",
        title: "5. Payments and Transactions",
      },

      {
        type: "list",
        description:
          "All payments must be made through our secure checkout system.",
      },
      {
        type: "list",
        description:
          "You are responsible for providing accurate billing and shipping information.",
      },
      {
        type: "list",
        description:
          "We are not liable for payment issues resulting from third-party payment processors.",
      },
    ],
  },
  {
    items: [
      {
        type: "header",
        title: "6. Third-Party Links",
        description:
          "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external websites. We encourage you to read their privacy policies before providing any personal information.",
      },
    ],
  },
  {
    items: [
      {
        type: "header",
        title: "7. Limitation of Liability",
        description:
          'We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated "Effective Date." Your continued use of our website indicates your acceptance of the updated policy.',
      },
    ],
  },
  {
    items: [
      {
        type: "header",
        title: "8. Contact Us",
        description:
          "If you have any questions about this Privacy Policy or how your information is handled, you can reach us at:",
      },
      { type: "list", title: "Email", description: ": info@petals.com" },
      { type: "list", title: "Phone", description: ": +94 77 123 4567" },
      {
        type: "list",
        title: "Address",
        description: ": 123 Flower Street, Colombo, Sri Lanka",
      },
    ],
  },
];

const TermsOfUse = () => {
  return (
    <>
      <section>
        <div className="relative w-full h-124.5 overflow-hidden">
          <Image
            src="/terms-of-use/terms-of-use.avif"
            alt="Terms of Use Background"
            fill
            className="object-cover object-center"
            priority
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="font-laluxes text-2xl font-normal md:text-[32px]">
              Terms of use
            </h1>
            <p className="text-[16px] md:text-[20px] font-light text-light-gray/90 font-poppins mt-3 max-w-2xl">
              Effective Date: January 28, 2026
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto lg:px-5 px-4 sm:pt-24 pt-19  sm:pb-24 pb-19">
          <h1 className="font-laluxes text-2xl font-normal text-secondary-black stroke-medium">
            Terms of use
          </h1>
          <p className="text-[16px] md:text-[16px] font-light text-[#00000080] font-poppins mt-3 max-w-5xl">
            Welcome to Petals. By accessing or using our website, services, or
            purchasing our products, you agree to comply with and be bound by
            these Terms of Use. Please read them carefully. If you do not agree,
            please do not use our site.
          </p>

          <div>
            {termsOfUseSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {section.items.map((item, index) => {
                  if (item.type === "header") {
                    return (
                      <div key={index}>
                        <h1 className="font-laluxes text-2xl font-normal text-secondary-black mt-10 stroke-medium">
                          {item.title}
                        </h1>
                        <p className="text-[16px] font-light text-[#00000080] font-poppins mt-3 max-w-2xl">
                          {item.description}
                        </p>
                      </div>
                    );
                  }

                  return (
                    <ul key={index} className="list-disc pl-6 mt-4 max-w-2xl">
                      <li className="text-[16px] font-light text-[#00000080] font-poppins">
                        <span className="font-medium text-secondary-black">
                          {item.title}
                        </span>{" "}
                        {item.description}
                      </li>
                    </ul>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsOfUse;
