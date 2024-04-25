import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ResetPasswordPage = () => {
    const navigate = useNavigate()
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [error, setError] = useState('')

    const handleResetPassword = async (e) => {
        e.preventDefault()
        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match')
            return
        }
        try {
            const token = localStorage.getItem('token')
            const response = await axios.post('/reset-password', {
                currentPassword,
                newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (response.status === 200) {
                window.alert('Password reset successfully')
                navigate("/signin")
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            } else {
                setError('Server Error')
            }
        }
    }

    return (
        <div className='md:flex'>
            <div className='flex flex-col justify-center items-center md:items-start w-full md:w-2/4'>
                <div className='relative border m-5 md:m-14 p-5 md:p-10 w-full md:w-[400px] h-auto md:h-[400px] md:-top-8 rounded-lg'>
                    <div>
                        <h1 className='font-extrabold text-3xl text-[#3A244A]'>Reset Password</h1>
                    </div>
                    <form onSubmit={handleResetPassword} action="" className='flex flex-col gap-4 pt-6'>
                        <div className='border-b'>
                            <input type="password" placeholder='Current Password' className='w-[320px] h-10 p-2' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                        </div>
                        <div className='border-b'>
                            <input type="password" placeholder='New Password' className='w-[320px] h-10 p-2' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div className='border-b'>
                            <input type="password" placeholder='Confirm New Password' className='w-[320px] h-10 p-2' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                        </div>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className='flex flex-col gap-4'>
                            <button type='submit' className='bg-[#3A244A] p-3 rounded-2xl text-white font-semibold w-full md:w-auto'>Reset Password</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage