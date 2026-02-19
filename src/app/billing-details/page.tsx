import { RecipientForm } from "@/components/recipient-form";
import { SenderForm } from "@/components/sender-form";
import { SavedAddresses } from "@/components/saved-addresses";
import { OrderSummary } from "@/components/order-summary";

const BillingDetails = () => {
  const cartItems = [
    {
      id: "1",
      name: "Blush Harmony",
      subtitle: "Flower Bouquet",
      price: 5750,
      quantity: 2,
      image: "/home/flower1.avif",
    },
    {
      id: "2",
      name: "Morning Bliss",
      subtitle: "Mixed Flowers",
      price: 4200,
      quantity: 1,
      image: "/home/flower2.avif",
    },
    {
      id: "3",
      name: "Evening Charm",
      subtitle: "Rose Bouquet",
      price: 3300,
      quantity: 2,
      image: "/home/flower3.avif",
    },
  ];

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
                  subtotal={5750.0}
                  discount={0.0}
                  total={6500.0}
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
