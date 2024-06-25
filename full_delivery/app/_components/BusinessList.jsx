"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { getBusiness } from "../_utils/GlobalApi";
import BussinessItem from "./BussinessItem";

const BusinessList = () => {

    const params = useSearchParams();
    const [category, setCategory] = useState('all');
    const [businessList, setBusinessList] = useState([]);

    const getBusinessList = (category_) => {
        getBusiness(category_).then(resp => setBusinessList(resp?.restaurants));
    }

    useEffect(() => {
        params && setCategory(params.get('category'));
        params && getBusinessList(params.get('category'));
    }, [params]);


    console.log(businessList)

    return (
        <div className="mt-5">
            <h2 className="font-bold text-2xl">Popular {category} Restaurants</h2>
            <h2 className="font-bold text_primary">{businessList?.length}</h2>

            <div className="grid grid-cols-1 
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                gap-7 mt-3
            ">
                {
                    businessList.map((restaurants, index) => (
                        <BussinessItem key={index} business={restaurants} />
                    ))
                }
            </div>
        </div>
    )
}

export default BusinessList