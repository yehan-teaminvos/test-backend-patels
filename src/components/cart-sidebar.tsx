"use client";
import React, { useState, useEffect } from "react";
import { X, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export interface CartItem {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
  productId: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Shared fetch helper
  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart");
      if (!res.ok) {
        setCartItems([]);
        return;
      }
      const data = await res.json() as {
        items: {
          id: number;
          quantity: number;
          productId: string;
          price: number;
          productName: string;
          productImage: string;
        }[];
        subtotal: number;
      };
      setCartItems(
        data.items.map((item) => ({
          id: item.id,
          name: item.productName || "Product",
          category: "Flower",
          image: item.productImage || "",
          price: item.price,
          quantity: item.quantity,
          productId: item.productId,
        }))
      );
    } catch {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when sidebar opens; clear when it closes
  useEffect(() => {
    if (isOpen) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Always listen for cart-update events and refresh if sidebar is open
  useEffect(() => {
    const onCartUpdate = () => {
      if (isOpen) fetchCart();
    };
    window.addEventListener("cart-update", onCartUpdate);
    return () => window.removeEventListener("cart-update", onCartUpdate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleQuantityChange = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)),
    );
    await fetch("/api/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItemId: id, quantity: newQuantity }),
    });
    window.dispatchEvent(new CustomEvent("cart-update"));
  };

  const handleRemoveItem = async (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItemId: id }),
    });
    window.dispatchEvent(new CustomEvent("cart-update"));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      )}
      <div
        className={`fixed right-0 top-0 h-screen p-6 w-full max-w-[600px] bg-white shadow-lg transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b">
            <h2 className="text-2xl font-poppins font-medium">Cart</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto mt-10 space-y-7">
            {loading ? (
              <div className="flex justify-center py-10">
                <p className="text-gray-400 font-poppins text-sm">Loading cart...</p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                <ShoppingBag className="w-12 h-12 text-gray-200" />
                <p className="font-poppins text-gray-400">Your cart is empty</p>
                <Link href="/products" onClick={onClose}>
                  <Button className="mt-2 font-poppins">Browse Products</Button>
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 border-b border-b-gray-200 pb-7"
                >
                  <div className="w-20 h-20 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-laluxes text-base text-[#383838]">
                      {item.name}
                    </h3>
                    <p className="text-xs font-poppins text-secondary-black/40">
                      {item.category}
                    </p>
                    <div className="flex items-center mt-3">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center border border-black/8"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        readOnly
                        className="w-10 h-6 font-poppins text-center border border-black/8 text-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center border border-black/8"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => handleRemoveItem(item.id)}>
                      <Trash2 className="w-5 h-5 text-[#919191]" />
                    </button>
                    <p className="font-medium font-poppins text-secondary-black">
                      Rs.{" "}
                      {(item.price * item.quantity).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer — only shown when there are items */}
          {cartItems.length > 0 && (
            <div className="border-t p-6 space-y-5">
              <div className="flex justify-between items-center">
                <span className="font-bold font-poppins">Subtotal</span>
                <span className="font-bold font-poppins">
                  Rs.{" "}
                  {subtotal.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div>
                <Link href="/cart" onClick={onClose}>
                  <Button className="w-full py-3 border border-primary text-primary font-medium hover:border-primary/50 hover:text-primary/70 hover:bg-transparent font-poppins bg-transparent">
                    Go to Cart
                  </Button>
                </Link>
              </div>
              <div>
                <Link href="/billing-details" onClick={onClose}>
                  <Button className="w-full py-3 bg-primary text-white font-medium hover:bg-primary/80 font-poppins">
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
