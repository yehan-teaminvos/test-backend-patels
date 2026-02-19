"use client";
import { cn } from "@/lib/utils";
import {
  Heart,
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShopNavigation } from "./shop-navigation";
import MobileMenuAccordion from "./mobile-menu-accordion";
import { LoginPopup } from "./login-popup";
import { SignupPopup } from "./signup-popup";
import { CartSidebar } from "./cart-sidebar";

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const isPrimaryBg =
    pathname.includes("/cart") ||
    pathname.includes("/billing-details") ||
    pathname.includes("/products/single-product") ||
    pathname.includes("/shipping-details");

  const siteMap = [
    {
      title: "Shop",
      link: "/",
    },
    {
      title: "Events",
      link: "/event",
    },
    {
      title: "About Us",
      link: "/about",
    },
    {
      title: "Contact Us",
      link: "/contact-us",
    },
  ];

  const headerIcons = [
    {
      icon: Search,
      link: "",
    },
    {
      icon: User,
      link: "",
    },
    {
      icon: Heart,
      link: "",
    },
    {
      icon: ShoppingCart,
      link: "",
    },
  ];

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [isShopOpen, setIsShopOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="z-50 relative w-full">
      <div className="py-8 fixed top-0 left-0 right-0 ">
        <div
          className={cn(
            "absolute w-full inset-0 top-0 duration-400 backdrop-blur-[0px]",
            {
              "bg-primary": isPrimaryBg,
              "bg-[linear-gradient(0deg,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_100%)]":
                !isPrimaryBg,
              "opacity-100 backdrop-blur-sm": isScrolled,
            },
          )}
        />
        <div className="container mx-auto lg:px-8 px-4 flex justify-between items-center">
          <Link href="/" className="relative z-50">
            <Image
              src="/header-logo.png"
              alt="Petal Logo"
              width={128}
              height={46}
              className=""
            />
          </Link>
          <div className="hidden lg:flex gap-8 items-center relative z-50 ">
            {siteMap.map((item, index) => (
              <div key={index}>
                {item.title === "Shop" ? (
                  <>
                    <ShopNavigation />
                  </>
                ) : (
                  <Link href={item.link}>
                    <p className="font-poppins text-base text-light-gray cursor-pointer">
                      {item.title}
                    </p>
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="flex space-x-5 items-center relative z-50">
            <div className=" flex space-x-5 items-center relative z-50">
              <Search className="w-5 h-5 text-light-gray cursor-pointer" />
              <LoginPopup />
              <SignupPopup />
              <Link href="/wishlist">
                <Heart className="w-5 h-5 text-light-gray cursor-pointer" />
              </Link>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative"
              >
                <ShoppingCart className="w-5 h-5 text-light-gray cursor-pointer" />
              </button>
            </div>
            <div className="lg:hidden flex items-center relative z-50">
              <button
                onClick={toggleMobileMenu}
                aria-label="Open mobile menu"
                className=""
              >
                <Menu className="w-6 h-6 text-light-gray" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden h-full">
          <div className="absolute inset-0 bg-white" />
          <div className="relative z-60 container mx-auto px-4 py-6 h-screen">
            <div className="flex items-center justify-between pt-2">
              <Image
                src="/header-logo-black.png"
                alt="Petal Logo"
                width={120}
                height={40}
              />
              <button
                onClick={toggleMobileMenu}
                aria-label="Close mobile menu"
                className=""
              >
                <X className="w-6 h-6 text-secondary-black" />
              </button>
            </div>

            <div className="mt-8">
              {!isShopOpen ? (
                <div className="flex flex-col gap-6">
                  {siteMap.map((item, idx) => (
                    <div key={idx}>
                      {item.title === "Shop" ? (
                        <button
                          onClick={() => setIsShopOpen(true)}
                          className="flex items-center justify-between w-full text-xl font-poppins text-secondary-black"
                        >
                          <span>Shop</span>
                          <ChevronDown className="w-5 h-5 -rotate-90" />
                        </button>
                      ) : (
                        <Link
                          href={item.link}
                          className="text-xl font-poppins text-secondary-black"
                        >
                          {item.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col ">
                  <button
                    onClick={() => setIsShopOpen(false)}
                    className="flex items-center gap-4 text-secondary-black"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="text-lg font-poppins">Back</span>
                  </button>

                  <div className="flex flex-col gap-5 mt-4">
                    <MobileMenuAccordion />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Header;
