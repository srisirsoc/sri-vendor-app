'use client';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';
import "./style.css";
// import Script from 'next/script'; // Remove Next.js Script
import { Actions } from '../../../library/actions';
import { Utility } from '@/library/utility';
import { Context } from '../state/store-provider';
import { Fetch } from '@/library/fetchapi';
import Buttons from '../tags/button.tag';
import { Style } from '@/library/styles';

const RazorPayForm = ({ createapi, verifyapi, amount, order_id, token, user, failed_url, success_url, SubmitHandler }) => {

    const navigate = useNavigate();
    const { state: { loading }, dispatch } = useContext(Context);

    const SubmitHandler1 = async (e) => {
        try {
            e.preventDefault();
            dispatch({ type: Actions.loading, payload: true });
            const formdata = { id: order_id, amount: amount };

            const { success, data, message, error } = await Fetch.PostData(createapi, formdata, token);

            if (success) {
                toast.success(message);
                let options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
                    amount: parseInt(data.amount),
                    currency: "INR",
                    name: "Srisir",
                    description: "Live transaction, don't make payment",
                    order_id: data?.payment_id,

                    handler: async function (response) {

                        try {
                            if (response?.razorpay_payment_id) {
                                const formdata = {
                                    order_id: data?.payment_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_signature: response.razorpay_signature,
                                    amount: Number(data.amount),
                                };

                                const { success: is_valied, message: msg } = Utility.FormValidation({ ...formdata });
                                if (!is_valied) { toast.error(msg); return; };
                                const { success, message, error } = await Fetch.PostData(verifyapi, formdata, token);
                                if (success) {
                                    toast.success(message);
                                    navigate(`${success_url}/?order=${order_id}`);
                                } else {
                                    toast.error(error);
                                    navigate(`${failed_url}/?order=${order_id}`);
                                }
                            }
                        } catch (error) {
                            console.log(error);
                            toast.error(error.message);
                            navigate(`${failed_url}/?order=${order_id}`);
                        }
                    },

                    prefill: {
                        name: data?.user?.name || "NA",
                        email: data?.user?.email ? user.email : "NA",
                        contact: data?.user?.phone || "NA",
                    },
                    notes: {
                        address: "Razorpay corporate office",
                        _id: `${user?.vendor_id}`, // user id
                    },
                    theme: { color: "#3399cc" },
                };

                const rzp1 = new window.Razorpay(options);
                rzp1.open();

                rzp1.on('payment.failed', async function ({ error }) {
                    console.log(error);
                    const { code, description, source, step, reason } = await error;
                    toast.error(`${code} | ${description} | ${source} | ${step} | ${reason}`);
                    navigate(`${failed_url}/?order=${order_id}`);
                });
            } else {
                toast.error(error || "Something wrong, payment failed!");
                navigate(`${failed_url}/?order=${order_id}`);
            }
        } catch (error) {
            dispatch({ type: Actions.loading, payload: false });
            toast.error(error.message || "Something went wrong!");
            navigate(`${failed_url}/?order=${order_id}`);
        }
    };

    const Handler = (e) => {
        SubmitHandler1(e);
        if (SubmitHandler) {
            SubmitHandler(e);
        }
    }

    return (
        <div>
            <div className="flex justify-center sm:justify-end items-center mt-4 md:mt-0">
                <Buttons
                    name={!loading ? "Pay now" : "Please wait"}
                    type="submit"
                    onClick={Handler}
                    disable={loading}
                    style={Style.btn1}
                />
            </div>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
        </div >
    )
}

export default React.memo(RazorPayForm);