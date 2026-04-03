
'use client';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { Context } from '../state/store-provider';
import { Fields } from '@/constants/inputs';
import Inputs from '../tags/input.tag';
import "./style.css";
import Select from '../tags/select.tag';
import { Actions } from '../../../library/actions';
import Buttons from '../tags/button.tag';
import { Style } from '@/library/styles';

const RechargeForm = ({ params, title, recharge }) => {
    const navigate = useNavigate();
    const [data, setData] = useState({ ...recharge });
    const { state: { loading, user, data: puja }, dispatch } = useContext(Context);

    const InputHub = {};
    InputHub.InputsFields = [Fields.title, Fields.price, Fields.bonus, Fields.search];
    InputHub.SelectFields = [Fields.is_active, {
        "label": "Country", "type": "text", "name": "country", "id": "country", "placeholder": "Country", "required": true, "options": [{ key: "IN", value: "IN" }, { key: "US", value: "US" }]
    },];
    const img = { ...Fields.image };

    const InputHandler = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    async function Create(e) {
        e.preventDefault();
        try {
            dispatch({ type: Actions.State.loading, payload: true });
            const { success, error, message, data: res } = await Actions.Recharge.Create(data, user.token);
            if (success) {
                toast.success(message);
                dispatch({ type: Actions.State.data, payload: data });
                navigate(`/admin/recharge/new/${res?._id}`);
                dispatch({ type: Actions.State.loading, payload: false });
            } else {
                dispatch({ type: Actions.State.loading, payload: false });
                toast.error(message || error || "Something went wrong!");
            }
        } catch (error) {
            dispatch({ type: Actions.State.loading, payload: false });
            toast.error(error.message || "Something went wrong!");
        };
    };

    async function Update(fields) {
        try {
            dispatch({ type: Actions.State.loading, payload: true });
            let forms = {};

            if (fields === "other") {
                forms = { data: { ...data }, fields: fields };
            }

            const { success, error, message } = await Actions.Recharge.Update(params, forms, user.token);

            if (success) {
                toast.success(message);
                dispatch({ type: Actions.State.loading, payload: false });
                dispatch({ type: Actions.State.data, payload: data });
                navigate(`/admin/recharge/`);
                window.location.reload();
            } else {
                dispatch({ type: Actions.State.loading, payload: false });
                toast.error(error || message || "Something went wrong!");
            }
        } catch (error) {
            dispatch({ type: Actions.State.loading, payload: false });
            toast.error(error.message || "Something went wrong!");
        }
    };

    return (
        <div className="srisir max-w-2xl m-auto border shadow-xl p-4">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white">{title || "Plan"}</h2>
            </div>
            <br />
            <div className="space-y-3">
                <div>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3'>
                        {InputHub.InputsFields.map((x, i) => (
                            <div key={i}>
                                <Inputs
                                    id={x?.id}
                                    type={x?.type}
                                    name={x?.name}
                                    label={x?.label}
                                    value={data[x.name] || ""}
                                    placeholder={x?.placeholder}
                                    onChange={InputHandler}
                                    required={x.required}
                                    style={"kundli_form"}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3'>
                        {InputHub.SelectFields.map((x, i) => (
                            <div key={i}>
                                <Select
                                    id={x?.id}
                                    type={x?.type}
                                    name={x?.name}
                                    label={x?.label}
                                    value={data[x.name] || ""}
                                    placeholder={x?.placeholder}
                                    onChange={InputHandler}
                                    style={"kundli_form"}
                                    options={[...x.options]}
                                />
                            </div>
                        ))}
                    </div>
                    <br />
                    <br />
                </div>

                {!params && <div className='flex justify-end'>
                    <div>
                        <Buttons
                            style={`${Style.btn1} min-w-[300px]`}
                            onClick={Create}
                            name={loading ? "Please wait.." : "Create new"}
                        />
                    </div>
                </div>}

                {params && <div className='flex justify-end'>
                    <div>
                        <Buttons
                            style={`${Style.btn1} min-w-[300px]`}
                            onClick={() => Update("other")}
                            name={loading ? "Please wait.." : "Update"}
                        />
                    </div>
                </div>}
            </div>
        </div >
    )
}

export default React.memo(RechargeForm);