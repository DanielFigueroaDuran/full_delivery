"use client"
import { getBusinessDetail } from '@/app/_utils/GlobalApi';
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Intro from '../_components/Intro';


const RestaurantDetails = () => {

    const param = usePathname();
    const [restaurant, setRestaurant] = useState([]);

    useEffect(() => {
        getRestaurantDetail(param.split("/")[2]);
    }, []);

    const getRestaurantDetail = (restroSlug) => {
        getBusinessDetail(restroSlug).then(resp => { setRestaurant(resp?.restaurant) })
    }

    //console.log(restaurant)

    return (
        <div>
            <Intro restaurant={restaurant} />
        </div>
    )
}

export default RestaurantDetails