"use client"
import { getUsersOrders } from '@/app/_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'

import React, { useEffect } from 'react'

const MyOrders = () => {
    const { user } = useUser();

    useEffect(() => {
        user && getUserOrder();
    }, []);

    const getUserOrder = () => {
        getUsersOrders(user?.primaryEmailAddress?.emailAddress).then(resp => { console.log(resp?.orders) });
    }

    return (
        <div>MyOrders</div>
    )
}

export default MyOrders