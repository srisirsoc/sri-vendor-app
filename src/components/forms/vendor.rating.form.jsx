'use client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { Context } from '../state/store-provider';
import { IconsReact } from '@/library/icons';
import AStore from '@/actions/a.store';
import { ARating } from '@/actions/a.rating';

const Action = ARating;
const States = AStore;

const VendorRatingForm = ({ lib }) => {
    const router = useRouter();
    const { state: { loading, user, model }, dispatch } = useContext(Context);
    const [form, setForm] = useState({ ...model[2] });

    const SubmitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch({ type: States.loading, payload: true });
            const formdata = { rating: form.rating, feedback: form.feedback };
            const { success, message } = await Action.Update(form?._id, { fields: "update", data: { ...formdata } });
            if (success) {
                toast.success(message);
                dispatch({ type: States.loading, payload: false });
                dispatch({ type: States.model, payload: [false, null] });
                router.refresh();
            } else {
                dispatch({ type: States.loading, payload: false });
                toast.error(message || "Something went wrong!");
            }
        } catch (error) {
            dispatch({ type: States.loading, payload: false });
            toast.error(error.message || "Something went wrong!");
        }
    };

    return (
        <div className="vendor-rating-form">
            <div className="title">
                <h2>Update Rating</h2>
            </div>

            <form onSubmit={SubmitHandler}>
                <div className="rating-section">
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((el, i) => (
                            <span key={i}
                                onClick={() => setForm({ ...form, rating: el })}
                                className={`star ${el <= form?.rating ? "active" : ""}`}
                            >
                                {IconsReact.Star}
                            </span>
                        ))}
                    </div>

                    <textarea
                        name="feedback"
                        id="feedback"
                        placeholder="Feedback"
                        rows={6}
                        value={form.feedback || ""}
                        onChange={(e) => setForm({ ...form, feedback: e.target.value })}
                        className="feedback-input"
                    ></textarea>

                    <div className="buttons">
                        <button
                            disabled={loading}
                            className="skip-btn"
                            type="button"
                            onClick={() => router.push("/")}
                        >
                            {loading ? "Please wait.." : "Skip"}
                        </button>

                        <button
                            disabled={loading}
                            className="submit-btn"
                            type="submit"
                        >
                            {loading ? "Please wait.." : "Submit"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default React.memo(VendorRatingForm);
