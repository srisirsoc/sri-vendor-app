import React from 'react';

const Switch = ({ status }) => {
    return (
        <div className={`${status !== "YES" ? "justify-end bg-red-400" : "justify-start bg-green-500"} border border-slate-400 w-[48px] cursor-pointer rounded-full flex items-center p-[1px]`}>
            {status == "YES" ?
                <div className='bg-white w-[38px] h-[17px] rounded-full'></div>
                :
                <div className='bg-white w-[38px] h-[17px] rounded-full'></div>
            }
        </div>
    )
}

export default Switch;