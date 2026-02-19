"use client";
import React, { useState } from "react";
import { X, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export interface CartItem {
  id: string;
  name: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items?: CartItem[];
}

export function CartSidebar({ isOpen, onClose, items = [] }: CartSidebarProps) {
  const dummyItems: CartItem[] = [
    {
      id: "item-1",
      name: "Blush Harmony",
      category: "Flower Bouquet",
      image: "/home/flower1.avif",
      price: 5750,
      quantity: 2,
    },
    {
      id: "item-2",
      name: "Blush Harmony",
      category: "Flower Bouquet",
      image: "/home/flower1.avif",
      price: 5750,
      quantity: 2,
    },
    {
      id: "item-3",
      name: "Blush Harmony",
      category: "Flower Bouquet",
      image: "/home/flower1.avif",
      price: 5750,
      quantity: 2,
    },
  ];
  const [cartItems, setCartItems] = useState<CartItem[]>(
    items.length ? items : dummyItems,
  );

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
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
          <div className="flex items-center justify-between pb-6 border-b">
            <h2 className="text-2xl font-poppins font-medium">Cart</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto mt-10 space-y-7">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 py-10">
                Your cart is empty
              </p>
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

                    <div className="flex items-center  mt-3">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="w-6 h-6 flex items-center justify-center border border-black/8"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        readOnly
                        className="w-10 h-6 font-poppins text-center border border-black/8  text-sm appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="w-6 h-6 flex items-center justify-center border  border-black/8"
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
              <div className="">
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
