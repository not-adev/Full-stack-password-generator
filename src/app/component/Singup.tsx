"use client"
import React, { Suspense, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const SignUpForm = React.lazy(() => {
  return new Promise<typeof import('./SingupForm')>((resolve) => {
    setTimeout(() => {
      resolve(import('./SingupForm'));
    }, 2000); // Simulate 2-second delay
  });
});


export interface ResFromApi {
  code: number;
  message: String;
  redirect: string;
}


const Sign_up = () => {

  const route = useRouter()
  const [loading, setLoading] = useState(false)
  const [otpGiven, setOtpGiven] = useState(false)
  const callErrorToast = (e: String) => toast.error(e, { position: "top-center", })
  const callSucessToast = (e: String) => toast.success(e, { position: "top-center", })
  const [formData, setFormData] = useState({
    password: '',
    email: '',
    OTP: '',
  });
  const [OTP, setOTP] = useState('')



  const validate = () => {
    const { password, email } = formData;

    // Name must be at least 2 characters

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      callErrorToast("Please enter a valid email");
      return false;
    }



    // OTP validation (if shown)
    if (otpGiven && (formData.OTP != OTP)) {
      callErrorToast("Please enter a valid  OTP");
      return false;
    }
    return true


  }
  const handleInput = (e: any) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    console.log(formData)
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      setLoading(true)
      if (!otpGiven) {
        if (validate()) {

          toast.promise(
            async () => {
              const response = await axios.post('/api/otpVerification', {
                email: formData.email,
              })

              // Extract data from response
              const { otp } = response.data

              // You can use this data for further logic if needed
              console.log('OTP:', otp)
              setOTP(otp)

              return response.data
            },
            {
              pending: 'Processing...',
              success: 'OTP sent successfully 🎉',
              error: 'OTP could not be sent ❌',
            }
          )


          setOtpGiven(true)

        }


        return
      }
      if (validate()) {
        console.log(formData.password)
        const res = await axios.post<ResFromApi>(`/api/Signup`,
          {
            password: formData.password,
            email: formData.email

          })
        callErrorToast(res.data.message)
        route.push(res.data.redirect)

      }

    } catch (error: any) {
      callErrorToast(error)
      console.log(error)
    }
    finally {


      setLoading(false)

    }
  }


  const sendOTP = () => {
    toast.promise(
      async () => {
        const response = await axios.post('/api/otpVerification', {
          email: formData.email,
        })

        // Extract data from response
        const { otp } = response.data

        // You can use this data for further logic if needed
        console.log('OTP:', otp)
        setOTP(otp)

        return response.data
      },
      {
        pending: 'Processing...',
        success: 'OTP sent successfully 🎉',
        error: 'OTP could not be sent ❌',
      }
    )

  }

  return (


    <>
      <div className="md:flex h-screen   overflow-y-hidden" >
        <div className="flex md:absolute items-center bg-amb mt-4 md:mt-0  top-1 left-4 justify-center text-2xl font-bold " >

          <div className='flex  justify-end items-center gap-4' >


            <div className='text-2xl mb-4 md:mb-0 font-semibold' >
              Welcome
            </div>
          </div>
        </div>
        < div className="w-[359px] md:h-[90%] m-auto  relative flex flex-col justify-center items-center " >

          <div className="text-center flex flex-col " >
            <div>
              <div className=' text-[30px] font-bold md:text-left px-6' >
                Sign Up
              </div>
              < div className='text-gray-400 pt-1 h-[27px] md:text-left px-6' >
                Sign up to enjoy the feature of HD
              </div>
            </div>
            < Suspense fallback={
              < div className="w-[359px] mx-auto mt-1 text-sm p-6 bg-white rounded-lg space-y-6" >
                <Skeleton height={40} />
                < Skeleton height={40} />
                <Skeleton height={40} />
                < Skeleton height={54} />
              </div>
            }
            >
              <SignUpForm
                handleSubmit={handleSubmit}
                handleInput={handleInput}
                formData={formData}
                otpGiven={otpGiven}
                loading={loading}

                sendOTP={sendOTP}
                maxAge={true} />



            </Suspense>

             <div>
                            Already have an account?{' '}
                            <Link className="text-blue-500" href="/login">
                                Login 
                            </Link>
                        </div>




          </div>

        </div>


        < div className="w-2/3 hidden  h-screen rounded-2xl p-1 bg-white md:flex items-center justify-center" >
          <img
            src="https://i.pinimg.com/1200x/47/da/2d/47da2d09a9bb2394dd764adc789ab193.jpg"
            alt="Sample Image"
            className="max-w-full h-full object-cover rounded shadow-lg"
          />
        </div>
      </div >
      < ToastContainer />
    </>
  );
};
export default Sign_up;




