"use client";

import { RecipientForm } from "@/components/recipient-form";
import { SenderForm } from "@/components/sender-form";
import { SavedAddresses } from "@/components/saved-addresses";
import { OrderSummary } from "@/components/order-summary";
import { useEffect, useState } from "react";

type CartItem = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  quantity: number;
  image: string;
};

const BillingDetails = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch("/api/cart");
        if (res.ok) {
          const data = (await res.json()) as { items: any[]; subtotal: number };
          // Map API data to component structure
          const items = data.items.map((item: any) => ({
            id: item.id.toString(),
            name: item.productName,
            subtitle: "Flower Bouquet", // generic subtitle
            price: item.price,
            quantity: item.quantity,
            image: item.productImage,
          }));
          setCartItems(items);
          setSubtotal(data.subtotal);
        }
      } catch (e) {
        console.error("Failed to fetch cart", e);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  if (loading) return <div className="h-screen flex justify-center items-center">Loading...</div>;

  return (
    <>
      <div className="relative w-full h-25 overflow-hidden" />
      <section>
        <div className="container mx-auto lg:px-8 px-4 pt-20 sm:pt-24 pb-10 ">
          <h2 className="font-poppins font-medium text-2xl md:text-[36px] text-secondary-black text-start lg:pb-9 pb-5">
            Billing Details
          </h2>
          <div className="w-full h-[0.5px] bg-[#E9E9E9]" />
        </div>
      </section>

      <section>
        <div className="container mx-auto lg:px-8 px-4 sm:pb-23 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <SavedAddresses />
              <RecipientForm />
              <SenderForm />
            </div>

            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8">
                <OrderSummary
                  route="/shipping-details"
                  subtotal={subtotal}
                  discount={0.0}
                  total={subtotal} // + shipping? handled in next step maybe
                  showCartItems={true}
                  cartItems={cartItems}
                  buttonText="Continue To Shipping"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BillingDetails;
