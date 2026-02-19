import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Address() {
  const address = [
    {
      name: "John Doe",
      addressLine: "123, Main Street, City, Country",
      postalCode: "00300",
      phoneNumber: "+94 77 123 45 678",
      isDefault: true,
    },
    {
      name: "John Doe",
      addressLine: "123, Main Street, City, Country",
      postalCode: "00300",
      phoneNumber: "+94 77 123 45 678",
      isDefault: false,
    },
  ];

  return (
    <div>
      <section>
        <div className="flex max-sm:flex-col justify-between sm:items-end">
          <div className="">
            <h2 className="font-poppins font-medium text-2xl md:text-4xl text-secondary-black text-start sm:pb-4 pb-1.5">
              Addresses
            </h2>
            <p className="font-poppins font-light text-black/50 max-w-xl">
              Manage your saved addresses.
            </p>
          </div>
          <div className="pt-4">
            <Button className="font-poppins font-light h-11  has-[>svg]:px-8.5">
              <Plus />
              Add New Address
            </Button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 sm:gap-5 gap-10 mt-10.5">
          {address.map((addr, index) => (
            <div key={index} className="h-full flex flex-col gap-3">
              <div className="bg-[#F2F2F2] h-full flex flex-col justify-end p-5 space-y-2">
                {addr.isDefault && (
                  <div className="font-poppins font-medium text-sm text-white bg-primary px-1.5 py-px  w-fit">
                    Default
                  </div>
                )}
                <p className="font-poppins font-bold text-[#383838] ">
                  {addr.name}
                </p>
                <p className="font-poppins font-medium text-sm text-secondary-black/40 ">
                  {addr.addressLine}
                </p>
                <p className="font-poppins font-medium text-sm text-secondary-black/40 ">
                  {addr.postalCode}
                </p>
                <p className="font-poppins font-medium text-sm text-secondary-black/40 ">
                  {addr.phoneNumber}
                </p>
              </div>
              <div className="flex xl:flex-row flex-col gap-3 w-full">
                <Button className="bg-transparent w-full shrink text-primary border border-primary font-poppins font-light hover:text-primary/70 hover:border-primary/50 hover:bg-transparent">
                  Remove Address
                </Button>
                <Button className="font-poppins w-full shrink font-light">
                  Edit Address
                </Button>
              </div>
            </div>
          ))}
          <div></div>
        </div>
      </section>
    </div>
  );
}
