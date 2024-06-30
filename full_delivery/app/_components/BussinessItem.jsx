import Image from "next/image"
import Link from "next/link";
import React from "react";
import { calculateRating } from "../_utils/GlobalApi";


const BussinessItem = ({ business }) => {

    //console.log(business.categories[0].name)

    const calculateRating = () => {
        let total = 0;
        let count = 0;
        business?.review.forEach(item => {
            total = total + item.star;
            count++;
        });

        const result = total / count;
        return result ? result.toFixed(1) : 5;
    }

    return (
        <Link
            rel="preload"
            href={'/restaurant/' + business?.slug}
            // as="valid-value"
            className="p-3 hover:border rounded-xl hover:border-primary cursor-pointer hover:bg-orange-50 ">
            <Image
                src={business.banner?.url}
                alt={business.name}
                width={400}
                height={130}
                className="w-[400px] h-[130px] rounded-xl object-cover"
            />

            <div className="mt-2">
                <h2 className="font-bold text_lg">{business.name}</h2>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <Image src="/star.png" alt="star"
                            width={14}
                            height={14}
                            className="w-[14px] h-[14px] object-cover"
                        />
                        <label className="text-gray-400 text-sm">{calculateRating()}</label>
                        <h2 className="text-gray-400 text-sm">{business?.restroType[0]}</h2>
                    </div>
                    <h2 className="text-sm text-primary">{business.categories[0].name}</h2>
                </div>
            </div>
        </Link>
    )
}

export default BussinessItem