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
  LogOut,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShopNavigation } from "./shop-navigation";
import MobileMenuAccordion from "./mobile-menu-accordion";
import { LoginPopup } from "./login-popup";
import { SignupPopup } from "./signup-popup";
import { CartSidebar } from "./cart-sidebar";

type SessionUser = { id: number; name: string; email: string } | null;

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ── Auth state
  const [user, setUser] = useState<SessionUser>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  // ── Cart count
  const [cartCount, setCartCount] = useState(0);

  const isPrimaryBg =
    pathname.includes("/cart") ||
    pathname.includes("/billing-details") ||
    pathname.includes("/products/single-product") ||
    pathname.includes("/shipping-details");

  const siteMap = [
    { title: "Shop", link: "/" },
    { title: "Events", link: "/event" },
    { title: "About Us", link: "/about" },
    { title: "Contact Us", link: "/contact-us" },
  ];

  // ── Fetch session on mount & whenever login/signup succeed
  const refreshSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json() as { user: SessionUser };
      setUser(data.user);
      if (data.user) await refreshCart();
    } catch {
      setUser(null);
    } finally {
      setSessionLoading(false);
    }
  }, []);

  // ── Fetch cart item count
  const refreshCart = async () => {
    try {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const items = await res.json() as { id: number }[];
        setCartCount(items.length);
      } else {
        setCartCount(0);
      }
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  // Listen for login/signup/logout events to refresh state
  useEffect(() => {
    const onLogin = () => refreshSession();
    const onLogout = () => { setUser(null); setCartCount(0); };
    window.addEventListener("auth-change", onLogin);
    window.addEventListener("auth-logout", onLogout);
    return () => {
      window.removeEventListener("auth-change", onLogin);
      window.removeEventListener("auth-logout", onLogout);
    };
  }, [refreshSession]);

  // Listen for cart-update events
  useEffect(() => {
    const onCartUpdate = () => refreshCart();
    window.addEventListener("cart-update", onCartUpdate);
    return () => window.removeEventListener("cart-update", onCartUpdate);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const [isShopOpen, setIsShopOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setCartCount(0);
    window.dispatchEvent(new CustomEvent("auth-logout"));
    window.location.reload();
  };

  const handleCartClick = () => {
    if (!user) {
      // Not logged in — open login popup instead
      window.dispatchEvent(new CustomEvent("open-login"));
      return;
    }
    setIsCartOpen(!isCartOpen);
  };

  const firstNameDisplay = user?.name?.split(" ")[0] ?? "";

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
              src="https://pub-708b43c93ac047cda95d8fca43011c2c.r2.dev/header-logo.png"
              alt="Petal Logo"
              width={128}
              height={46}
            />
          </Link>
          <div className="hidden lg:flex gap-8 items-center relative z-50 ">
            {siteMap.map((item, index) => (
              <div key={index}>
                {item.title === "Shop" ? (
                  <ShopNavigation />
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

              {/* ── User / Auth area ── */}
              {sessionLoading ? (
                <div className="w-5 h-5 rounded-full bg-white/20 animate-pulse" />
              ) : user ? (
                // Logged in: show name + logout
                <div className="flex items-center gap-2">
                  <Link href="/profile">
                    <div className="flex items-center gap-1.5 cursor-pointer group">
                      <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-light-gray" />
                      </div>
                      <span className="font-poppins text-sm text-light-gray group-hover:text-white transition">
                        {firstNameDisplay}
                      </span>
                    </div>
                  </Link>
                  <button
                    onClick={handleLogout}
                    title="Logout"
                    className="ml-1"
                  >
                    <LogOut className="w-4 h-4 text-light-gray hover:text-white transition cursor-pointer" />
                  </button>
                </div>
              ) : (
                // Not logged in: show login + signup triggers
                <>
                  <LoginPopup onLoginSuccess={refreshSession} />
                  <SignupPopup />
                </>
              )}

              <Link href="/wishlist">
                <Heart className="w-5 h-5 text-light-gray cursor-pointer" />
              </Link>

              {/* ── Cart icon with count badge ── */}
              <button
                onClick={handleCartClick}
                className="relative"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-5 h-5 text-light-gray cursor-pointer" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-primary text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </button>
            </div>
            <div className="lg:hidden flex items-center relative z-50">
              <button
                onClick={toggleMobileMenu}
                aria-label="Open mobile menu"
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
                src="https://pub-708b43c93ac047cda95d8fca43011c2c.r2.dev/header-logo-black.png"
                alt="Petal Logo"
                width={120}
                height={40}
              />
              <button
                onClick={toggleMobileMenu}
                aria-label="Close mobile menu"
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

                  {/* Mobile auth */}
                  <div className="mt-4 border-t pt-4">
                    {user ? (
                      <div className="flex items-center justify-between">
                        <span className="font-poppins text-secondary-black">
                          Hi, {firstNameDisplay}
                        </span>
                        <button
                          onClick={handleLogout}
                          className="font-poppins text-sm text-red-500"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-4">
                        <button
                          onClick={() => { toggleMobileMenu(); window.dispatchEvent(new CustomEvent("open-login")); }}
                          className="font-poppins text-secondary-black"
                        >
                          Login
                        </button>
                        <button
                          onClick={() => { toggleMobileMenu(); window.dispatchEvent(new CustomEvent("open-signup")); }}
                          className="font-poppins text-primary"
                        >
                          Sign Up
                        </button>
                      </div>
                    )}
                  </div>
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
