import React from 'react'
import RazorPay from './RazorPay'
const page = () => {
    return (
        <div>
            <RazorPay order_id={"69b19d9ceec2d9ab627e566d"} amount={10} />
        </div>
    )
}

export default page