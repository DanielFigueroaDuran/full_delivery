"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { Search, ShoppingCart } from 'lucide-react';
import Image from "next/image";
import { CartUpdateContext } from '../_context/CartUpdateContext';
import { getUserCart } from '../_utils/GlobalApi';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Cart from './Cart';

const Header = () => {
    const { user, isSignedIn } = useUser();
    const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
    const [cart, setCart] = useState([]);


    useEffect(() => {
        // console.log("Execute MEEEEEEEEEEEEEEEEE")
        user && getUserCarts();
    }, [updateCart && user]);

    const getUserCarts = () => {
        getUserCart(user?.primaryEmailAddress?.emailAddress).then(resp => {
            // console.log(resp);
            setCart(resp?.userCarts);
        });
    }

    return (
        <div className='flex justify-between items-center p-6 md:px-20 h-20 shadow-sm '>
            <div className='flex items-center gap-2'>
                <Image
                    src='/logoDaniel.jpg'
                    alt='logo'
                    width={70}
                    height={70}
                    priority
                    className='rounded-lg' />
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
                <div className='flex gap-3 items-center'>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="flex gap-2 items-center cursor-pointer">
                                <ShoppingCart />
                                <label className='p-1 px-2 rounded-full bg-slate-200'>
                                    {cart?.length}
                                </label>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Cart cart={cart} />
                        </PopoverContent>
                    </Popover>

                    <UserButton />
                </div>
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