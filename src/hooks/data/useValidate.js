import toast from "react-hot-toast";

export const useValidate = ({ success, data, error, message, is_array = false }) => {
    if (error) {
        toast.error(error || message || "An error occurred!");
        return { success: false, data: is_array ? [] : {}, error, message, is_array };
    }

    if (data) {
        if (is_array && (!Array.isArray(data?.docs) || data?.docs.length === 0)) {
            toast.error(!Array.isArray(data?.docs) ? "Invalid data format!" : "No data found!");
            return { success: false, data: [], error: "No data found", is_array: true };
        }

        if (!is_array && Object.keys(data).length === 0) {
            toast.error("No data found!");
            return { success: false, data: {}, error: "No data found", is_array: false };
        }
    }

    return { success: !!success, data: data || (is_array ? [] : {}), error: null, message: null, is_array };
};