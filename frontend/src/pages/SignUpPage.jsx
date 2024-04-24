import React, { useState } from 'react'
import SignUp from "../assets/signup.png"
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import axios from 'axios'

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [contactMode, setContactMode] = useState('email')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const sendOTP = async () => {
        try {
            const response = await axios.post('/signup', {
                firstName,
                lastName,
                email,
                password
            })
            if (response.status === 200) {
                setOtpSent(true)
                setError('')
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const verifyOTP = async () => {
        try {
            const response = await axios.post('/verify-otp', {
                email,
                otp
            })
            if (response.status === 200) {
                navigate("/")
                setError('')
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        sendOTP()
    }

    return (
        <div className='md:flex'>
            <div className='flex justify-center md:justify-end w-full md:w-2/4'>
                <img src={SignUp} alt="" className='h-auto md:h-[1000px] w-full md:w-auto md:relative md:left-28 ' />
            </div>
            <div className='flex flex-col justify-center items-center md:items-start w-full md:w-2/4'>
                <div className='relative border m-5 md:m-14 p-5 md:p-10 w-full md:w-[450px] h-auto  md:-top-8 rounded-lg'>
                    <div className='flex justify-between'>
                        <h1 className='font-extrabold text-3xl text-[#3A244A]'>Let us know <span className='text-[#D72638]'>!</span></h1>
                        <Link to={'/signin'}>
                            <a href="" className='self-end text-[#3A244A] font-semibold underline'> Sign <span className='text-[#D72638] underline'>In</span> </a>
                        </Link>
                    </div>
                    <form onSubmit={handleSignUp} action="" className='flex flex-col gap-4 pt-6'>
                        <div className=' border-b'>
                            <input type="text" placeholder='First Name' className='w-[370px] h-10 p-2' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className='border-b'>
                            <input type="text" placeholder='Last Name' className='w-[370px] h-10 p-2' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className='border-b flex justify-between'>
                            <input type={showPassword ? "text" : "password"} placeholder='Set Password' className='w-[370px] h-10 p-2' value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div onClick={togglePasswordVisibility} className='self-center'>
                                {showPassword ? <Eye color='#3A244A' /> : <EyeOff color='#3A244A' />}
                            </div>
                        </div>
                        <div className='border-b flex justify-between'>
                            <input type={showConfirmPassword ? "text" : "password"} placeholder='Retype Password' className='w-[370px] h-10 p-2' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <div onClick={toggleConfirmPasswordVisibility} className='self-center'>
                                {showConfirmPassword ? <Eye color='#3A244A' /> : <EyeOff color='#3A244A' />}
                            </div>
                        </div>
                        <div className='border-b flex justify-between h-10'>
                            <label htmlFor="contact" className='self-center pl-2 text-gray-400'>Contact Mode</label>
                            <select name="" placeholder="Contact mode" id="contact" value={contactMode} onChange={(e) => setContactMode(e.target.value)}>
                                <option value="email">Email</option>
                                <option value="phone">Phone</option>
                            </select>
                        </div>
                        <div className='border-b'>
                            <input type="email" placeholder='Enter Email' className='w-[370px] h-10 p-2' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        {otpSent ? (
                            <div className='border-b'>
                                <input type="text" placeholder='Enter OTP' className='w-[370px] h-10 p-2' value={otp} onChange={(e) => setOtp(e.target.value)} />
                            </div>
                        ) : null}
                        {error && <p className="text-red-500">{error}</p>}
                        <div className='flex flex-col gap-4'>
                            {otpSent ? (
                                <button type='button' onClick={verifyOTP} className='bg-[#3A244A] p-3 rounded-2xl text-white font-semibold w-full md:w-auto'>Verify OTP</button>
                            ) : (
                                <button type='submit' className='bg-[#3A244A] p-3 rounded-2xl text-white font-semibold w-full md:w-auto'>Sign Up</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage