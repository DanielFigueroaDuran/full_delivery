import Image from 'next/image'
import React from 'react'
import { Rating as ReactRating } from '@smastrom/react-rating'
import moment from 'moment'


const ReviewList = ({ reviewList }) => {
    //console.log(reviewList)
    return (
        <div className='flex flex-col gap-5'>
            {
                reviewList ? reviewList?.map((review, index) => (
                    //console.log(review.reviewText)
                    <div
                        key={index}
                        className='flex gap-5 items-center border rounded-lg p-5'
                    >
                        <Image
                            src={review.profileImage}
                            alt={'profileImage'}
                            width={50}
                            height={50}
                            className='rounded-full w-[50px] h-[50px]'
                        />
                        <div className='space-y-2'>
                            <ReactRating
                                style={{ maxWidth: 100 }}
                                value={review.star}
                                isDisabled={true}
                            />
                            <h2 className="">{review.reviewText}</h2>

                            <h2 className="text-sm">
                                <span className='font-bold'>
                                    {review.userName}
                                </span>
                                at {moment(review.publishedAt).format('DD / MMM / YYYY')}
                            </h2>
                        </div>
                    </div>
                ))
                    : [1, 2, 3, 4].map((item, index) => (
                        <div
                            key={index}
                            className='h-[100px] w-full bg-slate-200 animate-pulse rounded-lg'
                        >
                        </div>
                    ))
            }
        </div>
    )
}

export default ReviewList