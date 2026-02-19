import ForgotPasswordForm from '@/components/forget-pw'
import Image from 'next/image'



const ForgotPassword = () => {



    return (
        <div>
            <section>
                <div className="relative w-full h-123.5 overflow-hidden">
                    <Image
                        src="/forgot-pw/forgot-pw-bg.avif"
                        alt="Event Background"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/35"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                        <h1 className="font-laluxes text-2xl font-normal md:text-[32px] max-w-xl">
                            reset your password
                        </h1>

                    </div>
                </div>
            </section>
            <section>
                <div className='container mx-auto lg:px-8 px-4 pt-12 lg:pb-24.5 pb-18 '>
                    <h2 className='font-poppins font-semibold text-2xl md:text-4xl text-secondary-black text-start pb-6.5'>
                        Reset Your Password
                    </h2>
                    <p className='font-poppins font-light text-black/50 max-w-xl'>
                        Lost your password? Please enter your email address.You will receive a link to create a new password via email.
                    </p>
                    <div className='mt-9'>
                        <ForgotPasswordForm />
                    </div>
                </div>

            </section>
        </div>
    )
}

export default ForgotPassword