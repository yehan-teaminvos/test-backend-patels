import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const OrderPlacedSuccessfully = () => {
  const orderData = {
    orderNumber: "#PTLS1538",
    date: "Feb 24, 2025",
    paymentMethod: "Visa Card",
    subtotal: 5750.0,
    discount: 0.0,
    delivery: 450.0,
    total: 5750.0,
  };

  const cartItems = [
    {
      id: "1",
      name: "Blush Harmony",
      subtitle: "Flower Bouquet",
      price: 5750,
      quantity: 1,
      image: "/home/flower1.avif",
    },
    {
      id: "2",
      name: "Blush Harmony",
      subtitle: "Flower Bouquet",
      price: 5750,
      quantity: 1,
      image: "/home/flower2.avif",
    },
    {
      id: "3",
      name: "Blush Harmony",
      subtitle: "Flower Bouquet",
      price: 5750,
      quantity: 1,
      image: "/home/flower3.avif",
    },
  ];

  return (
    <>
      <section>
        <div className="relative w-full h-93.75 overflow-hidden">
          <Image
            src="/order-placed-succesfully.avif"
            alt="Terms of Use Background"
            fill
            className="object-cover object-center"
            priority
          />

          <div className="absolute inset-0 bg-black/40"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="font-laluxes text-2xl font-normal md:text-[32px]">
              Placed success
            </h1>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto lg:px-5 px-4 py-20 md:py-25">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-12 h-12 rounded-full bg-[#d7f5e1] flex items-center justify-center">
                  <Check className="w-6 h-6 text-[#00c746]" />
                </div>
              </div>
              <h1 className="font-poppins text-2xl md:text-[36px] font-medium text-secondary-black mb-2">
                Thank You
              </h1>
              <p className="font-poppins text-2xl md:text-[36px] font-medium text-secondary-black">
                Your Order Placed Successfully
              </p>
            </div>

            <Card className="p-6 md:p-10 space-y-3 bg-[#F2F2F2]">
              <div>
                <h2 className="text-2xl font-poppins font-semibold text-secondary-black mb-4">
                  Order Details
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-poppins text-base font-medium text-secondary-black">
                      Order Number:
                    </span>
                    <span className="font-poppins font-semibold text-base text-secondary-black">
                      {orderData.orderNumber}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-poppins text-base font-medium text-secondary-black">
                      Date:
                    </span>
                    <span className="font-poppins font-medium text-base text-secondary-black">
                      {orderData.date}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-poppins text-base font-medium text-secondary-black">
                      Payment Method:
                    </span>
                    <span className="font-poppins font-medium text-base text-secondary-black">
                      {orderData.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-dashed bg-[#000D0E4D]" />

              <div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-poppins text-base font-medium text-secondary-black">
                      Subtotal:
                    </span>
                    <span className="font-poppins font-medium text-base text-secondary-black">
                      Rs. {orderData.subtotal.toLocaleString()}.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-poppins text-base font-medium text-secondary-black">
                      Discount:
                    </span>
                    <span className="font-poppins font-medium text-base text-[#448AFF]">
                      Rs. {orderData.discount.toLocaleString()}.00
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-poppins text-base font-medium text-secondary-black">
                      Delivery:
                    </span>
                    <span className="font-poppins font-medium text-base text-secondary-black">
                      Rs. {orderData.delivery.toLocaleString()}.00
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-dashed bg-[#000D0E4D]" />

              <div className="flex justify-between items-center">
                <span className="font-poppins text-lg font-semibold text-secondary-black">
                  Total:
                </span>
                <span className="font-poppins text-lg font-bold text-secondary-black">
                  Rs. {orderData.total.toLocaleString()}.00
                </span>
              </div>

              <div className="border-t border-dashed bg-[#000D0E4D]" />

              <div>
                <h3 className="font-poppins text-lg font-semibold text-secondary-black mb-4">
                  Order Items
                </h3>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 items-start">
                      <div className="w-16 h-16 flex-shrink-0 rounded relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full rounded"
                        />

                        <div className="absolute z-10 -top-1 -right-1 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                          <span className="text-[10px] font-poppins font-semibold">
                            {item.quantity}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-laluxes text-sm text-[#383838] truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs font-poppins text-secondary-black/40">
                          {item.subtitle}
                        </p>
                      </div>

                      <div className="flex-shrink-0">
                        <p className="font-poppins font-medium text-sm text-secondary-black">
                          Rs. {item.price.toLocaleString()}.00
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Link href="/contact-us" className="flex-1">
                <Button
                  variant="secondary"
                  className="w-full py-6 text-base text-primary font-poppins font-medium border border-primary"
                  size="lg"
                >
                  Contact Us
                </Button>
              </Link>
              <Link href="/products" className="flex-1">
                <Button
                  className="w-full py-6 text-base font-poppins font-medium"
                  size="lg"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderPlacedSuccessfully;
