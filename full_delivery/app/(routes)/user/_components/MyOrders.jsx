"use client"
import { getUsersOrders } from '@/app/_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'
import moment from 'moment/moment'
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const MyOrders = () => {
    const { user } = useUser();
    const [orderList, setOrderList] = useState([]);
    // console.log(orderList)
    useEffect(() => {
        user && getUserOrder();
    }, []);

    const getUserOrder = () => {
        getUsersOrders(user?.primaryEmailAddress?.emailAddress).then(resp => {
            //console.log(resp?.orders);
            setOrderList(resp?.orders);
        });
    }

    return (
        <div>
            <h2 className="font-bold text-lg">MyOrders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {orderList.map((order, index) => (
                    <div
                        key={index}
                        className='p-3 border rounded-lg flex flex-col gap-3 '
                    >
                        <h2 className='font-bold'>{moment(order?.createdAt).format('DD-MMM-yyyy')}</h2>
                        <h2 className="flex text-sm justify-between">Order Total Amount :<span>${(order.orderAmount).toFixed(2)}</span></h2>
                        <h2 className="flex text-sm justify-between">Address: <span>{order.address},{order.zipCode}</span></h2>


                        <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger><h2 className="text-primary text-sm underline">View Order Detail:</h2></AccordionTrigger>
                                <AccordionContent>
                                    {console.log(order)}
                                    {order?.orderDetail?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between"
                                        >
                                            <h2 className="">{item.name}</h2>
                                            <h2 className="">{item.price}</h2>
                                        </div>
                                    ))}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                )
                )
                }
            </div>
        </div>
    )
}

export default MyOrders