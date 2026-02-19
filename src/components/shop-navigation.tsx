"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

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

export function ShopNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-160 pt-1 pb-4 px-3">
              <div className="flex justify-between">
                <div>
                  <p className="font-poppins text-sm font-bold">
                    Our Floral World
                  </p>
                  <p className="font-poppins text-[11px] mt-1.5">
                    Explore our complete floral collection
                  </p>
                </div>
                <p className="font-poppins text-sm font-bold">Shop All</p>
              </div>
              <div className="w-full h-[0.5px] bg-black/9 my-3.5" />
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <div className="grid grid-cols-2 gap-6">
                    {shopMenu.map((section, idx) => (
                      <div key={idx} className="flex flex-col gap-3">
                        <p className="font-poppins text-sm font-semibold">
                          {section.title}
                        </p>
                        <div className="flex flex-col gap-2">
                          {section.label.map((item, index) => (
                            <Link
                              key={index}
                              href={item.link}
                              className="font-poppins text-xs text-black hover:underline flex justify-between"
                            >
                              {item.name}
                              <ChevronRight className="w-3 h-3" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Image
                    src="/shop-dropdown.avif"
                    alt="Shop Navigation Illustration"
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// function ListItem({
//   title,
//   children,
//   href,
//   ...props
// }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
//   return (
//     <li {...props}>
//       <NavigationMenuLink asChild>
//         <Link href={href}>
//           <div className="flex flex-col gap-1 text-sm">
//             <div className="leading-none font-medium">{title}</div>
//             <div className="text-muted-foreground line-clamp-2">{children}</div>
//           </div>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   );
// }
