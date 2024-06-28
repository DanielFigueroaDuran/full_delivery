import { addToCart } from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import { SquarePlus } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const MenuSection = ({ restaurant }) => {
    //console.log(restaurant)
    const [menuItemList, setMenuItemList] = useState([]);
    const { user } = useUser;

    //console.log(menuItemList)

    useEffect(() => {
        restaurant?.menu && filterMenu(restaurant?.menu[0]?.category)
    }, [restaurant]);


    const filterMenu = (category) => {
        const result = restaurant?.menu?.filter((item) => item.category === category)
        setMenuItemList(result[0]);
    }

    const handleAddToCart = (item) => {
        const data = {
            email: user?.primaryEmailAddress?.emailAddress,
            name: item?.name,
            description: item?.description,
            productImage: item?.productImage?.url,
            price: item?.price
        }
        console.log(data);
        // console.log(data) aqui el email esta vacio y la imagen tambien 
        addToCart(data).then(resp => {
            console.log(resp);
            toast('Added to Cart');
        }, (error) => {
            toast('Error while adding into the cart');
        });
    }
    return (
        <div>
            <div className="grid grid-cols-4 mt-2">
                <div className="hidden md:flex flex-col mr-10 gap-2">
                    {restaurant?.menu?.map((item, index) => (
                        //console.log(item)
                        < Button
                            key={index}
                            variant="ghost"
                            className="flex justify-start"
                            onClick={() => filterMenu(item.category)}
                        >
                            {item.category}
                        </Button>
                    ))}
                </div>
                <div className="md:col-span-3 col-span-4">
                    <h2 className="font-extrabold text-lg">{menuItemList.category}</h2>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5'>
                        {menuItemList?.menuItem?.map((item, index) => (
                            <div
                                key={index}
                                className='p-2 flex gap-3 border rounded-xl hover:border-primary cursor-pointer'>
                                <Image
                                    src={item?.productImage?.url}
                                    alt={item.name}
                                    width={120}
                                    height={120}

                                    className='object-cover w-[120px] h-[120px] rounded-xl'
                                />
                                <div className='flex flex-col gap-1'>
                                    <h2 className="font-bold">{item.name}</h2>
                                    <h2>{item.price}</h2>
                                    <h2 className="text-sm text-gray-400 line-clamp-2">{item.decription}</h2>
                                    <SquarePlus className='cursor-pointer'
                                        onClick={() => { handleAddToCart(item) }}
                                    />
                                </div>
                            </div>
                        ))

                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MenuSection