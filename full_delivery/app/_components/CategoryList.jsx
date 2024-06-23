"use client"
import { useEffect, useState } from "react";
import { getCategory } from "../_utils/GlobalApi";
import Image from "next/image";

const CategoryList = () => {

    const [categoryList, setCategoryList] = useState([]);
    /**
 * Used to get Category List
 */

    useEffect(() => {
        getCategory().then(menu => setCategoryList(menu));
    }, []);

    //console.log(categoryList)
    return (
        <div>
            <div className="flex gap-4">
                {
                    categoryList && categoryList.map((category, index) => (

                        <div
                            key={index}
                            className="flex flex-col items-center gap-2 border p-3"
                        >
                            <Image src={category.icon?.url} alt={category.name} width={40} height={40} />
                            <h2>{category.name}</h2>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default CategoryList