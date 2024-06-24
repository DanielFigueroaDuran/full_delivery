"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

const BusinessList = () => {

    const params = useSearchParams();
    const [category, setCategory] = useState('all');


    useEffect(() => {
        params && setCategory(params.get('category'));
    }, [params]);

    //console.log(category)

    return (
        <div>BusinessList</div>
    )
}

export default BusinessList