import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function Payment() {

    const cards = [
        {
            src: "/cards/visa-card.avif",
            type: "Visa",
            lastFour: "7830",
            expiry: "06/24",
            isDefault: true,
            isExpired: false,
        },
        {
            src: "/cards/visa-card.avif",
            type: "Visa",
            lastFour: "5775",
            expiry: "06/24",
            isDefault: false,
            isExpired: false,
        },
        {
            src: "/cards/master-card.avif",
            type: "MasterCard",
            lastFour: "1075",
            expiry: "06/24",
            isDefault: false,
            isExpired: true,
        },

    ];

    return (
        <>
            <section>
                <div className="flex  max-sm:flex-col justify-between sm:items-end">
                    <div className="">
                        <h2 className="font-poppins font-medium text-2xl md:text-4xl text-secondary-black text-start sm:pb-4 pb-1.5">
                            Payment
                        </h2>
                        <p className="font-poppins font-light text-black/50 max-w-xl">
                            Manage your credit/debit cards.
                        </p>
                    </div>
                    <div className="pt-4">
                        <Button className="font-poppins font-light h-11  has-[>svg]:px-8.5">
                            <Plus />
                            Add New Card
                        </Button>
                    </div>
                </div>
            </section>
            <section>
                <div className="grid lg:grid-cols-2 gap-5 mt-10.5">
                    {cards.map((card, index) => (
                        <div key={index} className='bg-[#F2F2F2]  flex xl:flex-row lg:flex-col sm:flex-row flex-col xl:items-center max-lg:items-center justify-between px-5 py-3 h-full max-xl:gap-4'>

                            <div className='flex max-sm:flex-col items-center gap-4'>
                                <div className="relative w-15 h-7">
                                    <Image src={card.src} alt={`${card.type} Card`} fill />
                                </div>
                                <div className='space-y-px max-sm:text-center'>
                                    <p className='font-poppins font-bold text-base text-[#383838]'>
                                        {card.type} ending in {card.lastFour}
                                    </p>
                                    <p className='font-poppins font-medium text-black/40 text-sm'>
                                        Expiry date {card.expiry}
                                    </p>
                                </div>
                            </div>
                            <div className='flex justify-end gap-4'>
                                {card.isDefault === true && (<div className="font-poppins font-medium text-sm text-white bg-primary px-1.5 py-px cursor-pointer w-fit">
                                    Default
                                </div>)}
                                {card.isExpired === true && (<div className="font-poppins font-medium text-sm text-[#FF383C] bg-[#FF383C1A] px-1.5 py-px cursor-pointer w-fit">
                                    Expired
                                </div>)}
                                {card.isDefault === false && card.isExpired === false && (<div className="font-poppins font-medium text-sm text-primary px-1.5 py-px cursor-pointer w-fit">
                                    Set as Default
                                </div>)}

                                {/* {card.isDefault && card.isExpired ? (
                                    <div className="font-poppins font-medium text-sm text-white bg-primary px-1.5 py-px  w-fit">
                                        Default
                                    </div>
                                )
                                    : <div className="font-poppins font-medium text-sm text-white bg-primary px-1.5 py-px  w-fit">
                                        dfs
                                    </div>} */}
                                <div>
                                    <Trash2 className='text-[#919191] h-5 w-5 cursor-pointer' />
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </section>
        </>
    )
}
