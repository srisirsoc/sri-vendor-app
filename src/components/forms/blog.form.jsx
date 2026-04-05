import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../state/store-provider';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Inputs from '../tags/input.tag'; // Assuming it's a reusable component
import TextArea from '../tags/textarea.tag';
import Buttons from '../tags/button.tag';
import { Style } from '@/library/styles';
import { ChadhavaSevaActions } from '@/actions/chadhava.seva.action';

const inputFields = [
    {
        id: "title",
        type: "text",
        name: "title",
        label: "Title",
        placeholder: "Enter the title",
        required: true,
    },
    {
        id: "subtitle",
        type: "text",
        name: "subtitle",
        label: "Subtitle",
        placeholder: "Enter the subtitle",
        required: false,
    },
    {
        id: "temple",
        type: "text",
        name: "temple",
        label: "Temple Name",
        placeholder: "Enter the temple name",
        required: true,
    },
    {
        id: "notes",
        type: "text",
        name: "notes",
        label: "Notes",
        placeholder: "Enter additional notes",
        required: false,
    },
    {
        id: "hi_url",
        type: "url",
        name: "hi_url",
        label: "Hindi URL",
        placeholder: "Enter the Hindi URL",
        required: true,
    },
    {
        id: "en_url",
        type: "url",
        name: "en_url",
        label: "English URL",
        placeholder: "Enter the English URL",
        required: true,
    },
    {
        id: "chadhava_date",
        type: "date",
        name: "chadhava_date",
        label: "Chadhava Date",
        required: true,
    },
    {
        id: "start_date",
        type: "date",
        name: "start_date",
        label: "Start Date",
        required: true,
    },
    {
        id: "end_date",
        type: "date",
        name: "end_date",
        label: "End Date",
        required: true,
    },
    {
        id: "is_active",
        type: "checkbox",
        name: "is_active",
        label: "Is Active",
        required: false,
    },
    {
        id: "is_scheduled",
        type: "checkbox",
        name: "is_scheduled",
        label: "Is Scheduled",
        required: false,
    },
    {
        id: "is_video",
        type: "checkbox",
        name: "is_video",
        label: "Is Video",
        required: false,
    },
    {
        id: "is_prashad",
        type: "checkbox",
        name: "is_prashad",
        label: "Is Prashad",
        required: false,
    },
    // Add more fields here as needed
];

const BlogForm = ({ title, params, lib, tab }) => {
    const router = useRouter();
    const { state: { loading, user }, dispatch } = useContext(Context);
    const [data, setData] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation and API request logic
        try {
            // Check required fields
            if (!data.title || !data.subtitle) {
                toast.error("Please fill in all required fields!");
                return;
            }
            dispatch({ type: 'loading', payload: true });
            const response = await ChadhavaSevaActions.Create(data, user.token);
            if (response.success) {
                toast.success(response.message);
                router.push('/admin/blog/add-new');
            } else {
                toast.error(response.message || "Something went wrong!");
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong!");
        } finally {
            dispatch({ type: 'loading', payload: false });
        }
    };

    return (
        <div className="container">
            <h2 className="title">{title || "Create Blog"}</h2>

            <form onSubmit={handleSubmit}>
                {inputFields.map((field) => (
                    <div key={field.id} className="form-group">
                        {field.type === 'checkbox' ? (
                            <div>
                                <input
                                    type="checkbox"
                                    id={field.id}
                                    name={field.name}
                                    checked={data[field.name] || false}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor={field.id}>{field.label}</label>
                            </div>
                        ) : (
                            <>
                                <label htmlFor={field.id}>{field.label}</label>
                                {field.type === 'textarea' ? (
                                    <TextArea
                                        id={field.id}
                                        name={field.name}
                                        value={data[field.name] || ''}
                                        onChange={handleInputChange}
                                        placeholder={field.placeholder}
                                        required={field.required}
                                    />
                                ) : (
                                    <Inputs
                                        id={field.id}
                                        type={field.type}
                                        name={field.name}
                                        value={data[field.name] || ''}
                                        onChange={handleInputChange}
                                        placeholder={field.placeholder}
                                        required={field.required}
                                    />
                                )}
                            </>
                        )}
                    </div>
                ))}

                {/* Submit Button */}
                <div className="center">
                    <button type="submit" disabled={loading} className="button">
                        {loading ? "Please wait..." : "Create"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BlogForm;