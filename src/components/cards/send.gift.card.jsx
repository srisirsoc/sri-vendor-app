"use client";
import React, { useContext, useEffect, useState } from 'react'
import { IconsReact, IconsText } from '../../library/icons';
import Loader from '../loader/loader';
import { Context } from '../state/store-provider';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ARating } from '@/actions/a.rating';
import AStore from '@/actions/a.store';

const Action = ARating;
const States = AStore;
const SendGiftCard = () => {
    const router = useRouter();
    const [local, setLocal] = useState([]);
    const [gift, setGift] = useState({});
    const { state: { user, token, model, loading }, dispatch } = useContext(Context);

    async function FetchGifts() {
        const { success, data } = await Action.GetAll();
        if (success) {
            setLocal(data);
        }
    };

    useEffect(() => {
        FetchGifts();
    }, []);


    if (local.length < 1) {
        return <Loader height='h-[40vh]' />
    }

    async function SendGiftHandler() {
        try {
            if (!gift.cost) {
                toast.error("Please select one gift card!");
                return;
            }
            if (gift?.cost > user.wallet) {
                toast.error("Your wallet balance is low, recharge now!");
                return;
            }
            dispatch({ type: States.loading, payload: true });
            const { success, message } = await GiftActions.SendGift(model[2], { giftID: gift._id }, token);
            if (success) {
                toast.success(message);
                dispatch({ type: States.loading, payload: false });
                setTimeout(() => {
                    window.location.reload();
                    dispatch({ type: States.model, payload: [false, null, null] });
                }, 2000);
            } else {
                dispatch({ type: States.loading, payload: false });
                toast.error(message)
            }
        } catch (error) {
            dispatch({ type: States.loading, payload: false });
            toast.error(error.message);
        }
    }

    const style = {
        btn: 'text-center p-2 px-3 text-slate-600 rounded-md border flex gap-1 justify-center items-center cursor-pointer hover:bg-green-500 hover:text-white ',
        card: "shadow-md border rounded-md p-2 text-center cursor-pointer hover:bg-green-200 space-y-1"
    }

    return (
        <div className='w-full p-2 bg-white rounded-md'>
            <br />
            <br />
            <div className='flex justify-between'>
                <p><b>Send Gift</b></p>
                <p className='flex items-center gap-2'>{IconsReact.Wallet} {user.wallet}</p>
            </div>
            <br />
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-3'>
                {local.map((x, i) => (
                    <div key={i} className={`${style.card} ${x._id === gift._id && "bg-green-200"}`} onClick={() => setGift(x)}>
                        <img src={x.imageUrl} alt={x.name} width={150} height={150} />
                        <p className='text-center'>{x.name}</p>
                        <p className='bg-green-500 rounded-md text-white text-center'>{IconsText.Rupees}{x.cost}</p>
                    </div>
                ))}
            </div>
            <br />
            <div className='grid grid-cols-2 gap-3'>
                <button
                    name={loading ? 'Please wait' : 'Send'}
                    disable={loading}
                    type={"button"}
                    style={style.btn}
                    onClick={SendGiftHandler}
                />
                <div className={style.btn} onClick={() => dispatch({ type: States.model, payload: [false, null, null] })}>
                    <Link to={"/recharge"}>Recharge</Link>
                </div>
            </div>
        </div>
    )
}
export default SendGiftCard;