import ImgTags from '@/components/tags/image.tag';;
import Link from 'next/link';
import React from 'react'

const TabsCard = ({ data, tab, url }) => {
    return (
        <Link href={`${url}?&tab=${data?.speciality}&page=1`}>
            <div className={`flex items-center gap-2 border rounded-md p-2 cursor-pointer ${tab === data?.speciality && "bg-[var(--blue)] text-white"}`}>
                <span><ImgTags src={data?.iconUrl} width={20} height={20} alt={data?.speciality} /></span>
                <span>{data?.speciality}</span>
            </div>
        </Link>
    )
}

export default TabsCard;