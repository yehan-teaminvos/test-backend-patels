
"use client"
import { cn } from '@/lib/utils'
import { MapPin, UserPen, WalletCards, History, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function SideMenu() {
    const pathname = usePathname()

    const menuItems = [
        {
            name: 'Account Details',
            icon: (isActive: boolean) => <UserPen className={cn('w-5 h-5 text-secondary-black stroke-1', isActive && 'text-white')} />,
            link: "/profile"
        },
        {
            name: 'Addresses',
            icon: (isActive: boolean) => <MapPin className={cn('w-5 h-5 text-secondary-black stroke-1', isActive && 'text-white')} />,
            link: "/profile/address"
        },
        {
            name: 'Payment',
            icon: (isActive: boolean) => <WalletCards className={cn('w-5 h-5 text-secondary-black stroke-1', isActive && 'text-white')} />,
            link: "/profile/payment"
        },
        {
            name: 'Order History',
            icon: (isActive: boolean) => <History className={cn('w-5 h-5 text-secondary-black stroke-1', isActive && 'text-white')} />,
            link: "/profile/order-history"
        },
        {
            name: 'Logout',
            icon: (isActive: boolean) => <LogOut className={cn('w-5 h-5 text-[#FF383C] stroke-1', isActive && 'text-white')} />,
            link: ""
        },
    ]
    return (
        <>
            <div className='bg-[#F2F2F2] p-5'>
                <div className='space-y-5'>
                    {menuItems.map((item) => (
                        <Link href={item.link} key={item.name} className={cn('flex items-center gap-x-3 cursor-pointer p-3', pathname === item.link && 'bg-primary text-white')}>
                            {item.icon(pathname === item.link)}
                            <p className={cn('font-poppins text-base text-secondary-black', pathname === item.link && 'text-white', item.name === "Logout" && "text-[#FF383C] font-medium")}>{item.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}
