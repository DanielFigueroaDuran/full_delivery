"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { SignInButton, SignOutButton, SignUpButton, useAuth, UserButton, UserProfile, useSession, useUser } from '@clerk/nextjs';
import { Search, ShoppingCart } from 'lucide-react';
import Image from "next/image";
import { CartUpdateContext } from '../_context/CartUpdateContext';
import { getUserCart, getlocalStorage } from '../_utils/GlobalApi';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Cart from './Cart';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';


const Header = () => {

    const { user, isSignedIn } = useUser();
    const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
    const [cart, setCart] = useState(getlocalStorage());
    // const [cart, setCart] = useState([]);


    // console.log(cart)

    // const handleLogin = async (e) => {
    //     e.preventDefault()
    //     try {
    //         const response = await fetch('/sign-in', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ username, password }),
    //         })

    //         if (!response.ok) throw new Error('Login failed')

    //         const { token } = await response.json()
    //         document.cookie = `token=${token}; path=/`
    //         router.push('/protected')
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    useEffect(() => {
        // console.log("Execute MEEEEEEEEEEEEEEEEE")
        user && getUserCarts();
    }, [updateCart && user]);

    useEffect(() => {
        // console.log("Execute MEEEEEEEEEEEEEEEEE")
        localStorage.setItem("product", JSON.stringify(cart));
    }, [cart]);

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
                    className='rounded-lg w-[70px] h-[70px]' />
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
                        <PopoverContent className="w-full" >
                            <Cart cart={cart} />
                        </PopoverContent>
                    </Popover>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Image
                                src={user?.imageUrl}
                                alt='user'
                                width={35}
                                height={35}
                                className='w-[35px] h-[35px] rounded-full'
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {/* <DropdownMenuItem> <UserProfile path='/user' />Profile</DropdownMenuItem> */}

                            <Link href={'/user'}><DropdownMenuItem>Profile</DropdownMenuItem></Link>
                            <Link href={'/user#/my-orders'}><DropdownMenuItem>My Order</DropdownMenuItem></Link>
                            <SignOutButton><DropdownMenuItem>Logout</DropdownMenuItem></SignOutButton>

                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* <UserButton /> */}
                </div>
                :
                <div className='flex gap-5'>
                    <SignInButton mode='modal'>
                        <Button variant="outline"  >Login</Button>
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