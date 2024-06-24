"use client"
import React from 'react'
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { Search } from 'lucide-react';
import Image from "next/image";

const Header = () => {
    const { user, isSignedIn } = useUser();
    return (
        <div className='flex justify-between items-center p-6 md:px-20 h-20 shadow-sm '>
            <div className='flex items-center gap-2'>
                <Image src='/logoDaniel.jpg' alt='logo' width={70} height={70} className='rounded-lg' />
                <div className="text-lg font-semibold">
                    <p><span className='text-primary' >Delivery</span> Full</p>
                </div>
            </div>

            <div className="hidden md:flex border p-2 rounded-lg bg-gray-200 w-96">
                <input type="text" className="bg-transparent outline-none w-full" />
                <Search className='text-primary' />
            </div>
            {isSignedIn
                ?
                <UserButton />
                :
                <div className='flex gap-5'>
                    <SignInButton mode='modal'>
                        <Button variant="outline" >Login</Button>
                    </SignInButton>
                    <SignUpButton mode='modal'>
                        <Button>Sign Up</Button>
                    </SignUpButton>
                </div>

            }
        </div>
    )
}

export default Header