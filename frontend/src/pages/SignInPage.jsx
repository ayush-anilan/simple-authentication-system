import React, { useState } from 'react'
import SignIn from "../assets/Sign_in.png"
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

const SignInPage = () => {
    const navigate = useNavigate()
    const [isShow, setIsShow] = useState(false)

    const toggleState = () => {
        setIsShow(!isShow)
    }


    const goToNewPage = () => {
        navigate("/signup")
    }
    return (
        <div className='md:flex'>
            <div className='flex justify-center md:justify-end w-full md:w-2/4'>
                <img src={SignIn} alt="" className='h-auto md:h-[1000px] w-full md:w-auto md:relative md:left-28 ' />
            </div>
            <div className='flex flex-col justify-center items-center md:items-start w-full md:w-2/4'>
                <div className='relative border m-5 md:m-14 p-5 md:p-10 w-full md:w-[400px] h-auto md:h-[400px] md:-top-8 rounded-lg'>
                    <div>
                        <h1 className='font-extrabold text-3xl text-[#3A244A]'>Fill what we knows <span className='text-[#D72638]'>!</span></h1>
                    </div>
                    <form action="" className='flex flex-col gap-4 pt-6'>
                        <div className='border-b'>
                            <input type="email" placeholder='email' className='w-[320px] h-10 p-2' />
                        </div>
                        <div className='border-b flex justify-between'>
                            <input type={isShow ? "text" : "password"} placeholder='password' className='w-[410px] h-10 p-2' />
                            <div onClick={toggleState} className='self-center'>
                                {isShow ? <Eye color='#3A244A' /> : <EyeOff color='#3A244A' />}
                            </div>
                        </div>
                        <div className='flex flex-col gap-4'>
                            <button type='submit' className='bg-[#3A244A] p-3 rounded-2xl text-white font-semibold w-full md:w-auto'>Sign In</button>
                            <button onClick={() => goToNewPage()} className='bg-[#FFFFFF] border-[#3A244A] border-2 p-3 rounded-2xl text-[#3A244A] font-semibold w-full md:w-auto'> Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignInPage
