"use client"
import React, { useContext, useEffect, useState } from 'react'
import { IconsReact } from "../../library/icons";
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Context } from '../state/store-provider';
import Actions from '../state/actions';

const ShareWithPeople = () => {
    const [share, setShare] = useState("");
    const { dispatch } = useContext(Context);
    async function CopyToClip() {
        await navigator.clipboard.writeText(location.href);
        toast.success("Url copied!");
    }

    const HidePopup = () => {
        dispatch({ type: Actions.model, payload: [false, null] });
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const url = window.location.href;
            setShare(url);
        }
    }, [share]);


    return (
        <div className='bg-white rounded-md p-3'>
            <h2 className='text-3xl font-bold text-center py-2'>Share with People</h2>
            <div>
                <br />
                <div className="mx-auto flex justify-center">
                    <div className='flex items-center gap-3'>
                        <Link onClick={HidePopup} target='_' href={`https://www.facebook.com/sharer/sharer.php?u=${share}`}><span className='text-5xl text-blue-600 rounded-full'> {IconsReact.Facebook}</span></Link>
                        <Link onClick={HidePopup} target='_' href={`https://x.com/intent/post?url=${share}`}> <span className='text-5xl text-sky-400 rounded-full'> {IconsReact.Twitter}</span></Link>
                        <Link onClick={HidePopup} target='_' href={`https://web.whatsapp.com/send?text=${share}`}> <span className='text-5xl text-green-500 rounded-full'> {IconsReact.Whatsapp}</span></Link>
                        <Link onClick={HidePopup} target='_' href={`http://www.linkedin.com/shareArticle?mini=true&url=${share}`}><span className='text-5xl text-sky-600 rounded-full'> {IconsReact.Linkedin}</span></Link>
                    </div>
                </div>
                <br />
                <div className='bg-[var(--blue)] p-3 rounded-md text-white flex items-center justify-between'>
                    <p className='max-w-[350px] overflow-hidden'>{share}</p>
                    <b className='cursor-pointer w-[80px] text-center border rounded-md mx-3 px-1' onClick={CopyToClip}>Copy</b>
                </div>
                <br />
            </div>
        </div >
    )
}

export default ShareWithPeople;