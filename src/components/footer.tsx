import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

type SiteMapLink = {
    title: string;
    label: {
        name?: string;
        link: string;
        icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
        social?: string;
    }[]
}

// type SiteMapSection = {
//     title: string;
//     label: SiteMapLink[];
// }

const Footer = () => {

    const siteMap: SiteMapLink[] = [
        {
            title: "Shop",
            label: [{
                name: "Collections",
                link: "/"
            },
            {
                name: "Occasions",
                link: "/"

            }]
        },
        {
            title: "Links",
            label: [
                {
                    name: "Events",
                    link: "/"
                },
                {
                    name: "About Us",
                    link: "/"
                },
                {
                    name: "Contact Us",
                    link: "/"
                },
                {
                    name: "Gallery",
                    link: "/"
                }
            ]
        },
        {
            title: "Legal",
            label: [
                {
                    name: "Privacy Policy",
                    link: "/"
                },
                {
                    name: "Terms & Conditions",
                    link: "/"
                },

            ]
        },
        {
            title: "Contact",
            label: [
                {
                    name: "info@petals.com",
                    link: "mailto:info@petals.com",
                    icon: Mail
                },
                {
                    name: "+94 12 345 6789",
                    link: "tel:+94123456789",
                    icon: Phone
                },
                {
                    name: "1st Floor, 80, Rose Lane, Colombo 1",
                    link: "https://www.google.com/maps",
                    icon: MapPin
                }

            ]
        },
        {
            title: "Social Media",
            label: [
                {

                    link: "/",
                    social: "/footer/Facebook.svg"
                },
                {

                    link: "/",
                    social: "/footer/Linkedin.svg"
                },
                {

                    link: "/",
                    social: "/footer/Instagram.svg"
                },
                {

                    link: "/",
                    social: "/footer/Twitter.svg"
                },

            ]
        }
    ]

    return (
        <div className='bg-primary pt-13.5 '>
            <div className='container mx-auto px-4 lg:px-8'>
                <div className='flex xl:flex-row flex-col max-xl:gap-y-12 gap-x-10 mb-10.5'>
                    <div className='xl:w-1/3'>
                        <Image
                            src="/footer/petal-logo.png"
                            alt="Logo"
                            width={92}
                            height={96}
                            className="bg-white"
                        />
                        <p className='font-poppins text-light-gray/70 text-base mt-7 leading-4.5 xl:max-w-75 max-w-120'>Bringing fresh, handpicked flowers to life with thoughtful designs for every moment worth celebrating.</p>
                        <p className='font-poppins text-light-gray text-sm mt-8'>Subscribe to Our News Letter</p>
                        <div className="max-w-[370px] relative flex items-center mt-5">
                            <input
                                placeholder="Email Address"
                                className="outline-none bg-white relative placeholder:text-[17px] w-full py-2 px-6 text-[17px] font-poppins placeholder:text-black focus:border-red-500 duration-75"
                            />
                            <Button size="lg" className="absolute bg-secondary-black font-poppins right-0 py-2 px-6 text-white">Submit</Button>
                        </div>
                    </div>
                    <div className='xl:w-2/3 md:flex grid sm:grid-cols-3 grid-cols-2 justify-between space-y-10'>
                        {siteMap.map((section, idx) => (
                            <div key={idx} className='flex flex-col  '>
                                <p className='font-laluxes text-xl text-light-gray mb-4.5 font-semibold '>{section.title}</p>
                                <div className='space-y-2.5 flex flex-col '>
                                    {section.title === "Social Media" ? (
                                        <div className='flex gap-3 items-center'>
                                            {section.label.map((lnk, i) => (
                                                <Link key={i} href={lnk.link} className='inline-block'>
                                                    {lnk.social && (
                                                        <Image
                                                            src={lnk.social}
                                                            alt={`social-${i}`}
                                                            width={36}
                                                            height={36}
                                                            className=""
                                                        />
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        section.label.map((lnk, i) => (
                                            <Link key={i} href={lnk.link} className='flex text-light-gray/70 items-center'>
                                                {lnk.icon && <span className='mr-2 flex items-center'><lnk.icon className="w-5 h-5" /></span>}
                                                <p className='font-poppins text-base max-w-37.5 '>
                                                    {lnk.name}
                                                </p>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full h-[0.5px] bg-light-gray/70' />
                <div className='flex sm:flex-row flex-col space-y-3 justify-between items-center py-5 font-poppins text-base text-light-gray/70'>
                    <p className=' '>© 2025 Futurity. All rights reserved.</p>
                    <div className='flex gap-1.5'>
                        <p>Terms of Service</p>
                        <div>|</div>
                        <p>Privacy Policy</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer