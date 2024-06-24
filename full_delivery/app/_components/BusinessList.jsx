"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { getBusiness } from "../_utils/GlobalApi";
import BussinessItem from "./BussinessItem";

const BusinessList = () => {

    const params = useSearchParams();
    const [category, setCategory] = useState('all');
    const [businessList, setBusinessList] = useState([]);

    useEffect(() => {
        params && setCategory(params.get('category'));
        params && getBusinessList(params.get('category'));
    }, [params]);

    const getBusinessList = (category_) => {
        getBusiness(category_).then(resp => setBusinessList(resp?.restaurant));
    }

    //console.log(businessList)

    return (
        <div className="mt-5">
            <h2 className="font-bold text-2xl">Popular {category} Restaurants</h2>
            <h2 className="font-bold text_primary">{businessList?.length}</h2>

            <div>
                {
                    businessList?.map((restaurants, index) => (
                        <BussinessItem key={index} business={restaurants} />
                    ))
                }
            </div>
        </div>
    )
}

export default BusinessList