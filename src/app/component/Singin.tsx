'use client'
import React, { useState, Suspense } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Signinforr = React.lazy(() => {
    return new Promise<typeof import('./Signinforr')>((resolve) => {
        setTimeout(() => {
            resolve(import('./Signinforr'))
        }, 2000)
    })
})

export interface ResFromApi {
    redirect: string;
    message: string
}

const Sign_in = () => {
    const route = useRouter()
    const [loading, setLoading] = useState(false)

    const callErrorToast = (e: string) => toast.error(e, { position: 'top-center' })
 const callToast = (e: string) => toast(e, { position: 'top-center' , hideProgressBar :true})
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const validate = () => {
        const { email, password } = formData

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email.trim() || !emailRegex.test(email)) {
            callErrorToast('Please enter a valid email')
            return false
        }

        if (!password || password.length < 6) {
            callErrorToast('Password must be at least 6 characters')
            return false
        }

        return true
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setLoading(true)

            if (validate()) {
                const res = await axios.post<ResFromApi>('/api/login', {
                    email: formData.email,
                    password: formData.password,
                })
                callToast(res.data.message)
                if(res.data.redirect){

                    route.push(res.data.redirect)
                }


            }
        } catch (error: any) {
            callErrorToast(error.message || 'Something went wrong')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="md:flex h-screen overflow-y-hidden">
                {/* Logo Section */}
                <div className="flex md:absolute items-center bg-amb mt-4 md:mt-0 top-1 left-4 justify-center text-2xl font-bold">
                    <div className="flex justify-end items-center gap-4">
                        {/* <img src="logo.png" alt="img" className="w-[32px] h-[32px]" /> */}
                        <div className="text-2xl mb-4 md:mb-0 font-semibold">welcome</div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-[359px] md:h-[90%] m-auto relative flex flex-col justify-center items-center">
                    <div className="text-center flex flex-col">
                        <div>
                            <div className="text-[30px] font-bold md:text-left px-6">Login </div>
                            <div className="text-gray-400 pt-1 h-[27px] md:text-left px-6">
                                Login up to enjoy the feature 
                            </div>
                        </div>

                        <Suspense
                            fallback={
                                <div className="w-[359px] mx-auto mt-1 text-sm p-6 bg-white rounded-lg space-y-6">
                                    <Skeleton height={40} />
                                    <Skeleton height={40} />
                                    <Skeleton height={54} />
                                </div>
                            }
                        >
                            <Signinforr
                                handleSubmit={handleSubmit}
                                handleInput={handleInput}
                                formData={formData}
                                loading={loading}
                            />
                        </Suspense>

                        <div>
                            Already have an account?{' '}
                            <Link className="text-blue-500" href="/signup">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="w-2/3 hidden h-screen rounded-2xl p-1 bg-white md:flex items-center justify-center">
                    <img
                        src="https://i.pinimg.com/1200x/47/da/2d/47da2d09a9bb2394dd764adc789ab193.jpg"
                        alt="Sample Image"
                        className="max-w-full h-full object-cover rounded shadow-lg"
                    />
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Sign_in