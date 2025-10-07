import React from 'react'
interface SignUpFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formData: {


        email: string;
        password: string;
    };
    loading: boolean;
}


const SignUpForm: React.FC<SignUpFormProps> = ({
    handleSubmit,
    handleInput,
    formData,
  
    loading, }) => {

  return (
        <form onSubmit={handleSubmit}>
            <div className="w-[359px] mx-auto mt-1 text-sm p-6 bg-white rounded-lg space-y-6 ">

              
                
               
                <div className="relative ">
                    <label className="absolute -top-2.5  left-2 bg-white px-1 text-xs text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInput}
                        required
                        className="w-full h-[40px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>
                 <div className="relative ">
                    <label className="absolute -top-2.5  left-2 bg-white px-1 text-xs text-gray-600">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInput}
                        required
                        className="w-full h-[40px] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                    />
                </div>
                
               

                {
                  
                    <button disabled={loading} type='submit' className='bg-blue-500  border border-blue-500 w-full text-white text-xl hover:bg-blue-700 transition duration-400 rounded-md h-[50px]'>{loading ? (
                        <div className="flex items-center justify-center h-full">
                            loading...        </div>
                    ) : 'Sign Up'}  </button>
                }

            </div>
        </form>
    )
}

export default SignUpForm