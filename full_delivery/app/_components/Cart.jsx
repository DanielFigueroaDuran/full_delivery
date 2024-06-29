import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useContext } from 'react'
import { deleteCartFromItem, disconnectRestroFromUserCartIem } from '../_utils/GlobalApi'
import { CartUpdateContext } from '../_context/CartUpdateContext'
import { toast } from 'sonner'

const Cart = ({ cart }) => {
    //console.log(cart)
    const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
    const calculateCartAmount = () => {
        let total = 0;
        cart.forEach(item => {
            total = total + item.price;
        });
        return total.toFixed(2);
    }

    const RemoveItemFromCart = (id) => {
        // console.log(id)
        disconnectRestroFromUserCartIem(id).then(resp => {
            //console.log("respuesta", resp)
            if (resp) {
                deleteCartFromItem(id).then(resp => {
                    //console.log(resp)
                    toast('Item Remove!')
                    setUpdateCart(!updateCart);
                });
            }
        })
    }

    return (
        <div>
            <h2 className='text-lg font-bold'>{cart[0]?.restaurant?.name}</h2>
            <div className="mt-5 flex flex-col gap-3">
                <h2 className="font-bold">My Order</h2>
                {
                    cart && cart.map((item, index) => (
                        <div key={index} className='flex items-center justify-between gap-8'>
                            <div className='flex gap-2 items-center'>
                                <Image
                                    src={item.productImage}
                                    alt={item.productName}
                                    width={40}
                                    height={40}
                                    className='h-[40px] w-[40px] rounded-lg object-cover'
                                />
                                <h2 className="text-sm">{item?.productName}</h2>
                            </div>
                            <h2 className="font-bold flex gap-2 items-center">
                                ${item.price}
                                <X className='h-4 w-4 text-red-500'
                                    onClick={() => RemoveItemFromCart(item.id)}
                                />
                            </h2>
                        </div>
                    ))
                }

                <Button>
                    Checkout €{calculateCartAmount()}
                </Button>
            </div>
        </div>
    )
}

export default Cart