import React from 'react'
import Image from "next/image";
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
    return (
        <div className='flex justify-between items-center p-6 md:px-20 shadow-sm fixed w-full h-20 top-0 left-0 z-20'>
            <div className='flex items-center gap-2'>
                <Image src='/logoDaniel.jpg' alt='logo' width={70} height={70} className='rounded-lg' />
                <p className='text-lg font-semibold'>Restaurant`Daniel</p>
            </div>

            <div className="flex border p-2 rounded-lg bg-gray-200 w-96">
                <input type="text" className="bg-transparent outline-none w-full" />
                <Search />
            </div>

            <div className='flex gap-5'>
                <Button variant="outline" >Login</Button>
                <Button>Sign Up</Button>
            </div>
        </div>
    )
}

export default Header