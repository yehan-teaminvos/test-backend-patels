import { OrderTab } from "@/components/order-tab";

export default function OrderHistory() {
    return (
        <>
            <section>
                <div className="flex  max-sm:flex-col justify-between sm:items-end">
                    <div className="">
                        <h2 className="font-poppins font-medium text-2xl md:text-4xl text-secondary-black text-start sm:pb-4 pb-1.5">
                            Order History
                        </h2>
                        <p className="font-poppins font-light text-black/50 max-w-xl">
                            Manage your orders.
                        </p>
                    </div>
                </div>
            </section>
            <section>
                <div>
                    <OrderTab />
                </div>
            </section>
        </>
    )
}
