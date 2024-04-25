import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const IndexPage = () => {
    const [userInfo, setUserInfo] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return
                const response = await axios.get('/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                setUserInfo(response.data)
            } catch (error) {
                console.error('Error fetching user information: ', error);
            }
        }
        fetchUserInformation()
    }, [])

    const handleLogout = () => {
        const isConfirmed = window.confirm('Are you sure you want to logout?')
        if (isConfirmed) {
            localStorage.removeItem('token')
            navigate('/signin')
        }
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {userInfo ? (
                <div className="border border-gray-300 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">User Information</h2>
                    <p><span className="font-semibold">Email:</span> {userInfo.email}</p>
                    <p><span className="font-semibold">First Name:</span> {userInfo.firstName}</p>
                    <p><span className="font-semibold">Last Name:</span> {userInfo.lastName}</p>
                    <div className='flex flex-col'>
                        <Link to={'/reset-password'} className="mt-4 text-blue-600 hover:underline">Reset Password</Link>
                        <button onClick={handleLogout} className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Logout</button>
                    </div>
                </div>
            ) : (
                <div>
                    <p className="text-red-500">No user information available</p>
                    <div className='flex gap-10 justify-center'>
                        <Link to={'/signin'} className="mt-4 text-blue-600 hover:underline">Sign In</Link>
                        <Link to={'/signup'} className="mt-4 text-blue-600 hover:underline">Sign Up</Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default IndexPage