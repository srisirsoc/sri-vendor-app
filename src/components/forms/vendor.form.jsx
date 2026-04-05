import "./vendor.form.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/store-provider";
import { AFiles } from "../../actions/a.files";
import { AVendor } from "../../actions/a.vendor";
import { useContext, useEffect, useState } from "react";
import Actions from "../../store/actions";

function GetDesByCategory(category, data) {
    const d = data[category];
    if (!d) return "";
    return d;
}
const VendorForm = ({ lib }) => {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("basic");
    const [image, setImage] = useState([null, null]);
    const [gallery, setGallery] = useState([]);

    const { state: { user }, dispatch } = useContext(Context);
    const statics = lib?.statics || {};
    const speciality_info = { ...statics?.speciality };
    const skills_info = { ...statics?.skills };
    const services_info = { ...statics?.services };
    const category_details = { ...statics?.category_details };
    const vendor_about = { ...statics?.vendor_about };
    const vendorFields = [
        { name: "category", label: "Category", type: "select", options: [...(statics?.category || [])], placeholder: "Select your main service category" },
        { name: "sub_category", label: "Category Description", type: "textarea", placeholder: GetDesByCategory(formData.category, category_details) },
    ];
    const objectFields = {
        about: [
            { name: "name", label: "Full Name", type: "text", placeholder: "Enter your full name" },
            { name: "email", label: "Email", type: "email", placeholder: "Enter your email address" },
            { name: "dob", label: "Date of Birth", type: "date", placeholder: "Select your date of birth" },
            { name: "experience", label: "Experience", type: "number", placeholder: "Enter your over all experience" },
            { name: "gender", label: "Gender", type: "select", options: [...(statics?.gender || [])], placeholder: "Select your gender" },
            { name: "language", label: "Default Language", type: "select", options: [...(statics?.language || [])], placeholder: "Select your default language" },
            { name: "languages", label: "Known Languages (eg: English, Hindi)", type: "text", placeholder: "Enter languages you know, separated by commas" },
            { name: "description", label: "Description", type: "textarea", placeholder: GetDesByCategory(formData.category, vendor_about) },
        ],
        location: [
            { name: "city", label: "City", type: "text", placeholder: "Enter your city" },
            { name: "state", label: "State", type: "text", placeholder: "Enter your state" },
            { name: "address", label: "Address", type: "text", placeholder: "Enter your full address" },
            { name: "pincode", label: "Pincode", type: "number", placeholder: "Enter your area pincode" },
            { name: "country", label: "Country", type: "text", default: "India", placeholder: "Enter your country" },
            { name: "code", label: "Country Code", type: "text", default: "IN", placeholder: "Enter your country code" },
            { name: "currency", label: "Currency", type: "select", options: [...(statics?.currency || [])], placeholder: "Select your currency" },
            { name: "coordinates", label: "Coordinates (lng,lat)", type: "text", placeholder: "Enter coordinates in lng,lat format" },
        ],
        documents: [
            { name: "aadhar", label: "Aadhar", type: "text", placeholder: "Enter your Aadhar number" },
            { name: "pan", label: "PAN", type: "text", placeholder: "Enter your PAN number" },
            { name: "licence", label: "Licence", type: "text", placeholder: "Enter your driving or professional licence number" },
            { name: "shop_registration", label: "Shop Registration", type: "text", placeholder: "Enter your shop registration number if applicable" },
        ],
        availability: [
            { name: "is_available", label: "Is Available", type: "select", options: [...(statics?.boolean || [])], placeholder: "Select your availability status" },
            { name: "working_days", label: "Working Days (eg: Mon, Tue, Wed)", type: "text", placeholder: "Enter the days you work" },
            { name: "start_time", label: "Start Time", type: "time", placeholder: "Enter your start time" },
            { name: "end_time", label: "End Time", type: "time", placeholder: "Enter your end time" },
        ],
        visiting_price: [
            { name: "amount", label: "Amount", type: "number", placeholder: "Enter your service price" },
            { name: "is_free_above_amount", label: "Give Offer", type: "number", placeholder: "Enter minimum amount for free service if applicable" },
            { name: "notes", label: "Notes", type: "textarea", placeholder: "Add any notes about your pricing or offers" },
        ],
        service_range: [
            { name: "max_distance_km", label: "Max Distance in KM (eg: 10)", type: "number", placeholder: "Enter maximum distance you cover" },
            { name: "applicable_areas", label: "Applicable Areas (eg: Delhi, Mumbai)", type: "text", placeholder: "Enter areas where your services are available" },
        ],
    };
    const arrayFields = {
        skills: [
            { name: "title", label: "Skill Title", type: "select", options: GetDesByCategory(formData?.category, skills_info), placeholder: "Select a skill from your category" },
            { name: "level", label: "Skill Level", type: "select", options: [...(statics?.skills_level || [])], placeholder: "Select your skill level" },
            { name: "experience", label: "Experience (years)", type: "number", placeholder: "Enter years of experience for this skill" },
            { name: "certificates", label: "Certificates (comma separated)", type: "text", placeholder: "List your certificates related to this skill" },
            { name: "description", label: "Description", type: "textarea", placeholder: "Describe your expertise in this skill" },
        ],
        specialities: [
            { name: "experience", label: "Experience (years)", type: "number", placeholder: "Enter years of experience in this speciality" },
            { name: "title", label: "Speciality Title", type: "select", options: GetDesByCategory(formData?.category, speciality_info), placeholder: "Select your speciality title" },
            { name: "description", label: "Description", type: "textarea", placeholder: "Describe your speciality and expertise" },
        ],
        services: [
            { name: "name", label: "Service Name", type: "select", options: GetDesByCategory(formData.category, services_info), placeholder: "Select the service you offer" },
            { name: "price", label: "Price", type: "number", placeholder: "Enter the price of this service" },
            { name: "discounted_price", label: "Discounted Price", type: "number", placeholder: "Enter discounted price if applicable" },
            { name: "service_at", label: "Service At", type: "select", options: [...(statics?.service_at || [])], placeholder: "Select where the service is provided" },
            { name: "duration", label: "Duration", type: "text", placeholder: "Enter approximate duration of the service" },
            { name: "is_active", label: "Is Active", type: "select", options: [...(statics?.boolean || [])], placeholder: "Select if this service is currently active" },
            { name: "description", label: "Description", type: "textarea", placeholder: "Provide a short description of this service" },
        ]
    };
    const handleChange = (e, parent = null) => {
        const { name, value } = e.target;
        if (parent) {
            setFormData((prev) => ({ ...prev, [parent]: { ...prev[parent], [name]: value } }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };
    const handleArrayChange = (index, e, fieldName) => {
        const { name, value } = e.target;
        const updatedArray = formData[fieldName] ? [...formData[fieldName]] : [];
        updatedArray[index] = { ...updatedArray[index], [name]: value };
        setFormData((prev) => ({ ...prev, [fieldName]: updatedArray }));
    };
    const addArrayItem = (fieldName) => {
        setFormData((prev) => ({ ...prev, [fieldName]: [...(prev[fieldName] || []), {}] }));
    };
    const rendorField = (field, parent = null, i = null, arr = null) => {
        switch (field.type) {
            case "text":
            case "number":
            case "email":
            case "password":
            case "date":
            case "time":
                return (
                    <input
                        type={field.type}
                        name={field.name}
                        placeholder={`${field.placeholder}` || ""}
                        value={i !== null ? formData[arr]?.[i]?.[field.name] || "" : parent ? formData[parent]?.[field.name] || "" : formData[field.name] || ""}
                        onChange={(e) => i !== null ? handleArrayChange(i, e, arr) : handleChange(e, parent)}
                    />
                );
            case "textarea":
                return (
                    <textarea
                        type={field.type}
                        name={field.name}
                        placeholder={`Eg: ${field.placeholder}` || ""}
                        value={i !== null ? formData[arr]?.[i]?.[field.name] || "" : parent ? formData[parent]?.[field.name] || "" : formData[field.name] || ""}
                        onChange={(e) => i !== null ? handleArrayChange(i, e, arr) : handleChange(e, parent)}
                    />
                );
            case "select":
                return (<select
                    type={field.type}
                    name={field.name}
                    value={i !== null ? formData[arr]?.[i]?.[field.name] || "" : parent ? formData[parent]?.[field.name] || "" : formData[field.name] || ""}
                    onChange={(e) => i !== null ? handleArrayChange(i, e, arr) : handleChange(e, parent)}
                >
                    <option value="">Select</option>
                    {field?.options?.map((opt, idx) => (<option key={idx} value={opt}>{opt}</option>))}
                </select>);
            default: return null;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!user?.vendor_id || !lib.token) return;
            delete formData?._id;
            const form_data = { fields: activeTab, data: activeTab == "basic" ? formData : formData[activeTab] };
            dispatch({ type: Actions.loading, payload: true });
            const { success, error, message, data: res } = await AVendor.Update(user?.vendor_id, form_data, lib.token);
            if (success) {
                toast.success(message);
                dispatch({ type: Actions.loading, payload: false });
                dispatch({ type: Actions.data, payload: res });
                navigate(`/user/${user?.vendor_id}`);
            } else {
                dispatch({ type: Actions.loading, payload: false });
                toast.error(error || message || "Something went wrong!");
            }
        } catch (error) {
            dispatch({ type: Actions.loading, payload: false });
            toast.error(error.message || "Something went wrong!");
        }
    };

    const tabs = [
        { id: "basic", label: "Basic Info" },
        ...Object.keys(objectFields).map((key) => ({ id: key, label: key.charAt(0).toUpperCase() + key.slice(1) })),
        ...Object.keys(arrayFields).map((key) => ({ id: key, label: key.charAt(0).toUpperCase() + key.slice(1) })),
        { id: "gallery", label: "Gallery" },
    ];

    function HandleTab(id) {
        if (!formData?.category) {
            toast.error("Upadate basic info first to proceed.");
            setActiveTab("basic");
        } else {
            setActiveTab(id);
        }
    };

    const HandleImg = (e, type) => {
        const { files } = e.target;
        if (type == "avatar" && files?.[0]) {
            const file = files[0];
            setImage([URL.createObjectURL(file), file]);
            return;
        };
        if (type == "gallery" && files?.[0]) {
            const file = files[0];
            setGallery((p) => [...p, { url: URL.createObjectURL(file), file: file }]);
            return;
        }
    };

    const RemoveGallery = async (index) => {

        const g = [...gallery];
        const d = g.splice(index, 1);
        if (d) {
            const { success, data } = await AFiles.One(`key=url&value=${d[0]}`, lib.token);
            if (success && data?._id) {
                await AFiles.Delete(data?._id, lib.token);
                await AVendor.Update(user?.vendor_id, { fields: "gallery", data: [...g] }, lib?.token);
            }
        }
        setGallery(g);
    };

    async function UpdateAvatar(e) {
        e.preventDefault();
        const file = image[1] || null;
        if (!file) {
            toast.error("Please select an image");
            return;
        };
        const f = new FormData();
        f.append("file", file);
        f.append("owner_id", user?.vendor_id);
        f.append("purpose", "AVATAR");
        const { success, data, error, message } = await AFiles.Upload(f, lib.token);
        if (success) {
            const { success } = await AVendor.Update(user?.vendor_id, { fields: "avatar", data: { avatar: data?.url } }, lib?.token);
            if (success) {
                toast.success(message);
                location.reload();
            } else {
                toast.error(error || message);
            }
        }
    };
    async function UpdateGallery(e) {
        e.preventDefault();

        const g = [...gallery];
        const gall = [];

        for (let i = 0; i < g.length; i++) {
            const element = g[i].file;
            if (element) {
                const f = new FormData();
                f.append("file", element);
                f.append("owner_id", user?.vendor_id);
                f.append("purpose", "OTHER");
                const { success, data, error, message } = await AFiles.Upload(f, lib.token);
                if (success) {
                    gall.push(data?.url);
                } else {
                    toast.error(error || message);
                }
            }
        };
        if (gall.length > 0) {
            const { success, message } = await AVendor.Update(user?.vendor_id, { fields: "gallery", data: [...gall] }, lib?.token);
            if (success) {
                toast.success(message);
                location.reload();
            } else {
                toast.error(error || message);
            }
        };
    };

    useEffect(() => {
        if (lib?.doc?._id) {
            setFormData(lib.doc);
            setImage([lib.doc?.avatar, null]);
            setGallery(lib.doc?.gallery || [])
        }
    }, [lib?.doc?._id]);

    return (
        <div className="vendor-form-container">
            <h2>Vendor Update Form</h2>
            <div className="tabs">
                {tabs.map((tab) => (<button key={tab.id} className={activeTab === tab.id ? "active" : ""} onClick={() => HandleTab(tab.id)}> {tab.label}</button>))}
            </div>

            <div className="vendor-form">
                {activeTab === "gallery" &&
                    <div>
                        <div className="avatar-section">
                            <div className="gallery">
                                {gallery?.map((x, i) => (
                                    <div key={i} className="image">
                                        <img key={i} src={x?.url || x || "/user.png"} alt="Avatar" className="avatar-preview" />
                                        <span onClick={() => RemoveGallery(i)}>
                                            {IconsReact.Trash}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <input type="file" name="avatar" accept="image/*" onChange={(e) => HandleImg(e, "gallery")} />
                            <input type="button" className="btn btn-secondary" onClick={UpdateGallery} value={"Upload"} />
                        </div>
                    </div>
                }
                {activeTab === "basic" &&
                    <div>
                        <div className="avatar-section">
                            <img src={image[0] || "/user.png"} alt="Avatar" className="avatar-preview" />
                            <input type="file" name="avatar" accept="image/*" onChange={(e) => HandleImg(e, "avatar")} />
                            <input type="button" className="btn btn-secondary" onClick={UpdateAvatar} value={"Upload"} />
                        </div>
                        <br />
                        <div className="form-grid">
                            {vendorFields.map((field, idx) => (
                                <div key={idx} className="form-group">
                                    <label>{field.label}</label>
                                    {rendorField(field)}
                                </div>
                            ))}
                        </div>
                    </div>
                }
                {Object.keys(objectFields).includes(activeTab) &&
                    <div className="form-grid">
                        {objectFields[activeTab].map((field, idx) => (
                            <div key={idx} className="form-group">
                                <label>{field.label}</label>
                                {rendorField(field, activeTab)}
                            </div>
                        ))}
                    </div>
                }
                {Object.keys(arrayFields).includes(activeTab) && (
                    <div>
                        {(formData[activeTab] || []).map((_, index) => (
                            <div key={index} className="array-item">
                                {arrayFields[activeTab].map((field, fIdx) => (
                                    <div key={fIdx} className="form-group">
                                        <label>{field.label}</label>
                                        {rendorField(field, null, index, activeTab)}
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button type="button" onClick={() => addArrayItem(activeTab)}> Add {activeTab.slice(0, -1)} </button>
                    </div>
                )}
                {<button onClick={handleSubmit} type="button">Update {activeTab}</button>}
            </div>
        </div>
    );
};
export default VendorForm;
