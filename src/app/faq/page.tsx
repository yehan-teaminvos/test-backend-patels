import React from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    value: "item-1",
    trigger: "How do I reset my password?",
    content:
      "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours.",
  },
  {
    value: "item-2",
    trigger: "Can I change my subscription plan?",
    content:
      "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.",
  },
  {
    value: "item-3",
    trigger: "What payment methods do you accept?",
    content:
      "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through our payment partners.",
  },
];

const Faq = () => {
  return (
    <>
      <section>
        <div className="relative w-full h-98.25 overflow-hidden">
          <Image
            src="/faq.avif"
            alt="Privacy Policy Background"
            fill
            className="object-cover object-center"
            priority
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 stroke-medium">
            <h1 className="font-laluxes text-2xl font-normal md:text-[32px]">
              Frequently asked questions
            </h1>
            <p className="text-[16px] md:text-[20px] font-light text-light-gray/50 font-poppins mt-3 max-w-2xl">
              We’re here to help with any questions.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto lg:px-5 px-4 sm:pt-24 pt-19  sm:pb-24 pb-19">
          <div>
            <Accordion
              type="single"
              collapsible
              defaultValue="item-1"
              className="max-w-4xl mx-auto space-y-4 w-full"
            >
              {items.map((item) => (
                <AccordionItem
                  key={item.value}
                  value={item.value}
                  className="bg-[#F2F2F2] p-2 w-full px-7"
                >
                  <AccordionTrigger className="text-base font-bold w-full">
                    {item.trigger}
                  </AccordionTrigger>
                  <AccordionContent className="sm:text-base text-[15px] font-light text-[#00000080] w-full max-w-4xl">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
