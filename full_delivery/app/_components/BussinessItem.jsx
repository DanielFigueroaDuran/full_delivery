import Image from "next/image"
import React from "react";


const BussinessItem = ({ business }) => {
    return (
        <div>
            <Image src={business.banner?.url} alt={business.name} width={400} height={130} />
        </div>
    )
}

export default BussinessItem