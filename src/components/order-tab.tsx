"use client"
import {
    Card,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ChevronRight, Search } from "lucide-react"
import Image from "next/image"
import { useMemo, useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { orderedData } from "@/data/ordered-data"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
export function OrderTab() {
    const toTabValue = (tab: string) => tab.toLowerCase().replace(/\s+/g, "")
    const tabs = Array.from(new Set(orderedData.map((order) => order.tab))).filter((tab) => tab !== "View All")
    const allTabs = ["View All", ...tabs]
    const [activeTab, setActiveTab] = useState("viewall")
    const [query, setQuery] = useState("")


    const filteredOrders = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase()
        if (!normalizedQuery) {
            return orderedData
        }
        return orderedData.filter((order) => {
            const orderNumMatch = String(order.orderNum).toLowerCase().includes(normalizedQuery)
            const productMatch = order.product.some((item) =>
                item.title.toLowerCase().includes(normalizedQuery)
            )
            return orderNumMatch || productMatch
        })
    }, [query])

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex xl:flex-row flex-col xl:items-center justify-between ">
                <TabsList className="max-sm:hidden mt-10 rounded-none py-7 px-1.5">
                    {allTabs.map((tab) => (
                        <TabsTrigger
                            key={tab}
                            className="rounded-none py-4.5 px-5 data-[state=active]:text-white"
                            value={toTabValue(tab)}
                        >
                            {tab}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <div className="sm:hidden mt-10">
                    <Select value={activeTab} onValueChange={setActiveTab}>
                        <SelectTrigger className="w-full focus-visible:ring-0 text-base focus-visible:ring-offset-0 bg-[#F2F2F2]">
                            <SelectValue placeholder="View All" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none bg-[#F2F2F2]">
                            <SelectGroup className="">
                                {allTabs.map((tab) => (
                                    <SelectItem key={tab} value={toTabValue(tab)} className="focus:bg-primary focus:text-white text-base">
                                        {tab}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                </div>
                <div className="w-full relative max-xl:mt-10 max-w-[275px] border border-black/10 flex xl:items-end xl:self-end">
                    <input
                        placeholder="Order ID, Product Name"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        className="outline-none bg-light-gray relative placeholder:text-base w-full py-2 px-6 pr-10 ml-5 text-base font-poppins font-light placeholder:text-black/50  placeholder:text-right"
                    />
                    <Search className="absolute left-3 bottom-2.5 w-5 h-5 text-black/50" />
                </div>
            </div>

            <TabsContent value="viewall">
                {filteredOrders.map((order, idx) => (
                    <Card key={`viewall-${idx}`} className="flex w-full rounded-none p-5 justify-between mt-5">
                        <Accordion
                            type="single"
                            collapsible
                            defaultValue="item-1"
                            className=""
                        >

                            <AccordionItem value={idx.toString()}>
                                <AccordionTrigger className="w-full pt-0 "  >
                                    <div className="flex lg:flex-row flex-col gap-8 w-full lg:items-center">
                                        <div className="w-18 h-18 overflow-hidden">
                                            <Image
                                                src={order.image1}
                                                alt="Product Image"
                                                width={70}
                                                height={70}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="sm:flex flex-row grid grid-cols-2 lg:gap-15 gap-5">
                                            <div>
                                                <p className="text-secondary-black/40 text-sm font-poppins">Order Number</p>
                                                <p className="text-secondary-black text-base font-poppins font-semibold">{order.orderNum}</p>

                                            </div>
                                            <div>
                                                <p className="text-secondary-black/40 text-sm font-poppins">Order Date</p>
                                                <p className="text-secondary-black text-base font-poppins font-semibold">{order.date}</p>

                                            </div>
                                            <div>
                                                <p className="text-secondary-black/40 text-sm font-poppins">Status</p>
                                                {order.status === 'Delivered' && (
                                                    <p className="text-[#40BC45] text-base font-poppins font-semibold">Delivered</p>)}
                                                {order.status === 'Out For Delivery' && (
                                                    <p className="text-[#40BC45] text-base font-poppins font-semibold">Out For Delivery</p>)}
                                                {order.status === 'Cancelled' && (
                                                    <p className="text-[#F44336] text-base font-poppins font-semibold">Cancelled</p>)}

                                            </div>
                                        </div>
                                    </div>

                                </AccordionTrigger>

                                <AccordionContent className="pt-5 pb-2.5">
                                    <div className="flex flex-col gap-1">
                                        <p className="font-poppins font-semibold text-xl text-secondary-black">Deliver Today by 1.00PM - 2.30PM</p>
                                        <p className="font-poppins text-sm text-secondary-black/40">Your order is with the delivery driver</p>
                                    </div>
                                    <div className="w-full h-px bg-[#E9E9E9] my-6" />
                                    <div className="flex max-md:grid grid-cols-2 gap-x-10 justify-between ">
                                        <div className="">
                                            <p className="font-poppins font-semibold text-base text-secondary-black mb-2">Recipient Name</p>
                                            <p className="font-poppins font-medium text-sm text-secondary-black/40">{order.name}</p>
                                        </div>
                                        <div>
                                            <p className="font-poppins font-semibold text-base text-secondary-black mb-2">Recipient Address</p>
                                            <p className="font-poppins font-medium text-sm text-secondary-black/40">{order.address}</p>
                                        </div>
                                        <div>
                                            <p className="font-poppins font-semibold text-base text-secondary-black mb-2">Shipping Method</p>
                                            <p className="font-poppins font-medium text-sm text-secondary-black/40">{order.shippingMethod}</p>
                                        </div>
                                        <div>
                                            <p className="font-poppins font-semibold text-base text-secondary-black mb-2">Payment Method</p>
                                            <p className="font-poppins font-medium text-sm text-secondary-black/40">{order.paymentMethod}</p>
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-[#E9E9E9] mt-6 mb-7.5" />
                                    <div >
                                        {order.product.map((item, index) => (
                                            <div key={index}>
                                                <div className="flex md:flex-row flex-col md:gap-8 gap-5 w-full md:items-center">
                                                    <div className="w-18 h-18 overflow-hidden">
                                                        <Image
                                                            src={item.src}
                                                            alt="Product Image"
                                                            width={70}
                                                            height={70}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                    <div className="flex justify-between w-full md:gap-15">
                                                        <div>
                                                            <p className="text-secondary-black sm:text-base font-laluxes font-semibold">{item.title}</p>
                                                            <p className="text-secondary-black/40 text-xs font-poppins">{item.category}</p>

                                                        </div>
                                                        <div className="flex md:gap-8 gap-5 items-center">
                                                            <p className="text-secondary-black/40 font-poppins text-xs">Rs.{item.price} x {item.quantity}</p>
                                                            <p className="text-secondary-black font-medium font-poppins text-base">Rs.{parseFloat(item.price.replace(/,/g, '')) * item.quantity}</p>
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="w-full h-px bg-[#E9E9E9] my-5" />
                                            </div>


                                        ))}
                                    </div>

                                    <div className="flex justify-between mt-7">
                                        <button className="cursor-pointer border border-primary hover:border-primary/40 px-7 py-2 text-primary hover:text-primary/60 font-poppins font-medium flex justify-center items-center">Download Invoice</button>
                                        <div className="flex flex-col">
                                            <p className="font-poppins font-medium text-sm text-secondary-black/40 flex justify-end">{order.product.reduce((total, item) => total + item.quantity, 0)} items(s)</p>
                                            <p className="font-poppins font-medium text-base text-secondary-black">Rs. {order.product.reduce((total, item) => total + (parseFloat(item.price.replace(/,/g, '')) * item.quantity), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </Card>
                ))}
            </TabsContent>

            {tabs.map((tab) => (
                <TabsContent key={tab} value={toTabValue(tab)}>
                    {filteredOrders
                        .filter((order) => order.tab === tab)
                        .map((order, idx) => (
                            <Card key={`${tab}-${idx}`} className="flex w-full rounded-none p-5 justify-between mt-5">
                                <Accordion
                                    type="single"
                                    collapsible
                                    defaultValue="item-1"
                                    className=""
                                >

                                    <AccordionItem value={idx.toString()}>
                                        <AccordionTrigger className="w-full pt-0 "  >
                                            <div className="flex lg:flex-row flex-col gap-8 w-full lg:items-center">
                                                <div className="w-18 h-18 overflow-hidden">
                                                    <Image
                                                        src={order.image1}
                                                        alt="Product Image"
                                                        width={70}
                                                        height={70}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                                <div className="sm:flex flex-row grid grid-cols-2 lg:gap-15 gap-5">
                                                    <div>
                                                        <p className="text-secondary-black/40 text-sm font-poppins">Order Number</p>
                                                        <p className="text-secondary-black text-base font-poppins font-semibold">{order.orderNum}</p>

                                                    </div>
                                                    <div>
                                                        <p className="text-secondary-black/40 text-sm font-poppins">Order Date</p>
                                                        <p className="text-secondary-black text-base font-poppins font-semibold">{order.date}</p>

                                                    </div>
                                                    <div>
                                                        <p className="text-secondary-black/40 text-sm font-poppins">Status</p>
                                                        {order.status === 'Delivered' && (
                                                            <p className="text-[#40BC45] text-base font-poppins font-semibold">Delivered</p>)}
                                                        {order.status === 'Out For Delivery' && (
                                                            <p className="text-[#40BC45] text-base font-poppins font-semibold">Out For Delivery</p>)}
                                                        {order.status === 'Cancelled' && (
                                                            <p className="text-[#F44336] text-base font-poppins font-semibold">Cancelled</p>)}

                                                    </div>
                                                </div>
                                            </div>

                                        </AccordionTrigger>

                                        <AccordionContent className="pt-5 pb-2.5">
                                            <div className="flex flex-col gap-1">
                                                <p className="font-poppins font-semibold text-xl text-secondary-black">Deliver Today by 1.00PM - 2.30PM</p>
                                                <p className="font-poppins text-sm text-secondary-black/40">Your order is with the delivery driver</p>
                                            </div>
                                            <div className="w-full h-px bg-[#E9E9E9] my-6" />
                                            <div className="flex max-md:grid grid-cols-2 gap-x-10 justify-between ">
                                                <div className="">
                                                    <p className="font-poppins font-semibold text-base text-secondary-black mb-2">Recipient Name</p>
                                                    <p className="font-poppins font-medium text-sm text-secondary-black/40">{order.name}</p>
                                                </div>
                                                <div>
                                                    <p className="font-poppins font-semibold text-base text-secondary-black mb-2">Recipient Address</p>
                                                    <p className="font-poppins font-medium text-sm text-secondary-black/40">{order.address}</p>
                                                </div>
                                                <div>
                                                    <p className="font-poppins font-semibold text-base text-secondary-black mb-2">Shipping Method</p>
                                                    <p className="font-poppins font-medium text-sm text-secondary-black/40">{order.shippingMethod}</p>
                                                </div>
                                                <div>
                                                    <p className="font-poppins font-semibold text-base text-secondary-black mb-2">Payment Method</p>
                                                    <p className="font-poppins font-medium text-sm text-secondary-black/40">{order.paymentMethod}</p>
                                                </div>
                                            </div>
                                            <div className="w-full h-px bg-[#E9E9E9] mt-6 mb-7.5" />
                                            <div >
                                                {order.product.map((item, index) => (
                                                    <div key={index}>
                                                        <div className="flex md:flex-row flex-col md:gap-8 gap-5 w-full md:items-center">
                                                            <div className="w-18 h-18 overflow-hidden">
                                                                <Image
                                                                    src={item.src}
                                                                    alt="Product Image"
                                                                    width={70}
                                                                    height={70}
                                                                    className="object-cover w-full h-full"
                                                                />
                                                            </div>
                                                            <div className="flex justify-between w-full md:gap-15">
                                                                <div>
                                                                    <p className="text-secondary-black sm:text-base font-laluxes font-semibold">{item.title}</p>
                                                                    <p className="text-secondary-black/40 text-xs font-poppins">{item.category}</p>

                                                                </div>
                                                                <div className="flex md:gap-8 gap-5 items-center">
                                                                    <p className="text-secondary-black/40 font-poppins text-xs">Rs.{item.price} x {item.quantity}</p>
                                                                    <p className="text-secondary-black font-medium font-poppins text-base">Rs.{parseFloat(item.price.replace(/,/g, '')) * item.quantity}</p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="w-full h-px bg-[#E9E9E9] my-5" />
                                                    </div>


                                                ))}
                                            </div>

                                            <div className="flex justify-between mt-7">
                                                <button className="cursor-pointer border border-primary hover:border-primary/40 px-7 py-2 text-primary hover:text-primary/60 font-poppins font-medium flex justify-center items-center">Download Invoice</button>
                                                <div className="flex flex-col">
                                                    <p className="font-poppins font-medium text-sm text-secondary-black/40 flex justify-end">{order.product.reduce((total, item) => total + item.quantity, 0)} items(s)</p>
                                                    <p className="font-poppins font-medium text-base text-secondary-black">Rs. {order.product.reduce((total, item) => total + (parseFloat(item.price.replace(/,/g, '')) * item.quantity), 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </Card>
                        ))}
                </TabsContent>
            ))}
        </Tabs>
    )
}
