'use client';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import ImgTags from '@/components/tags/image.tag';;
import { Context } from '../state/store-provider';
import { AUser } from '../../actions/a.user';
import { Fields } from "../../constants/inputs";
import { Images } from '../../library/images';
import Inputs from "../tags/input.tag"
import Buttons from '../tags/button.tag';
import { Style } from '@/library/styles';


const UserProfileForm = ({ user: user_data }) => {
    const navigate = useNavigate();
    const [data, setData] = useState({ ...user_data });
    const InputField = [Fields.name, Fields.email, Fields.pincode, Fields.address, Fields.date_of_birth]
    const { state: { loading, user }, dispatch } = useContext(Context);

    const InputHandler = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const SubmitHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch({ type: Actions.loading, payload: true });
            const { success, message, data: user } = await AUser.UpdateUser(data);

            if (success) {
            } else {
                dispatch({ type: Actions.loading, payload: false });
                toast.error(message || "Something went wrong!");
            }
        } catch (error) {
            dispatch({ type: Actions.loading, payload: false });
            toast.error(error.message || "Something went wrong!");
        }
    }

    return (
        <div className="bg-[#999] p-4 sm:p-8 rounded-lg shadow-lg w-full border">
            <div>
                <div className="mx-auto text-4xl flex h-18 w-18 items-center justify-center ">
                    <ImgTags src={Images.logo} alt="Logo" width={120} height={40} />
                </div>
                <div className="mt-6 text-center sm:mt-5">
                    <h2 className="text-2xl font-medium leading-6 uppercase text-white">Verify</h2>
                    <p className="text-sm text-white font-light">
                        Verify your phone number
                    </p>
                </div>
            </div>

            <form onSubmit={SubmitHandler} className="">
                <div className="grid grid-cols-2 gap-3">
                    {InputField && InputField.map((x, i) => (
                        <div key={i} className="mt-6 xs:px-1 sm:px-3 md:px-8">
                            <Inputs
                                type={x.type}
                                name={x.name}
                                className="border-2 border-white p-4 w-full  bg-transparent text-white rounded-2xl "
                                placeholder={x.placeholder}
                                onChange={InputHandler}
                                value={data[x.name] || ""}
                            />
                        </div>
                    ))}
                </div>

                <Buttons
                    disable={loading}
                    name={loading ? "Please wait.." : "Update Profile"}
                    type={"submit"}
                    style={Style.btn1}
                />
            </form>
        </div >
    )
}

export default React.memo(UserProfileForm);