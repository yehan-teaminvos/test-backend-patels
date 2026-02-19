import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const MobileMenuAccordion = () => {
  const shopMenu = [
    {
      title: "Collections",
      label: [
        { name: "Flower Bunches", link: "/" },
        { name: "Flower Arrangement", link: "/" },
        { name: "Individual Flowers", link: "/" },
        { name: "Bridal Collection", link: "/" },
        { name: "Petals Collection", link: "/" },
      ],
    },
    {
      title: "Occasions",
      label: [
        { name: "Birthday", link: "/" },
        { name: "Anniversary", link: "/" },
        { name: "Graduation", link: "/" },
        { name: "Wedding", link: "/" },
        { name: "Outdoor Events", link: "/" },
      ],
    },
  ];

  return (
    <div>
      <Accordion type="single" collapsible>
        {shopMenu.map((item, idx) => (
          <AccordionItem
            className="border-transparent!"
            value={item.title}
            key={idx}
          >
            <AccordionTrigger
              className="w-full text-left py-4 text-black cursor-pointer justify-between font-poppins font-medium text-xl"
              //   iconClass="text-white"
            >
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="mt-0">
              <div className="flex flex-col gap-3">
                {item.label.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className="font-poppins w-full text-lg text-black hover:underline flex justify-between"
                  >
                    {item.name}
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}{" "}
      </Accordion>
    </div>
  );
};

export default MobileMenuAccordion;
