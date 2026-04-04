import { Fetch } from "../library/fetchapi";

const cleanBaseUrl = (value) => {
    if (!value) return "";
    return value.toString().trim().replace(/^['"]|['"]$/g, "");
};

const BASE_URL = cleanBaseUrl(import.meta.env.VITE_BASE_URL);
if (!BASE_URL) throw new Error("Base URL not found in environment variables");

/**
 * Generate full endpoints for a module
 * @param {string} module
 */
const getModuleEndpoints = (module) => {
    if (!module) throw new Error("API module is required");

    const base = `${BASE_URL}/${module}`;

    return {
        login: `${base}/login`,
        delete: `${base}/delete`,
        admin: `${base}/admin`,
        create: `${base}/create`,
        upload: `${base}/upload`,
        get_all: `${base}/get-all`,
        details: `${base}/details`,
        update: `${base}/update`,
        verify: `${base}/verify-otp`,
        p_verify: `${base}/verify`,
        is_auth: `${base}/is-auth`,
        get_one: `${base}/get-one`,
        download: `${base}/download`,
        statics: `${base}/statics`,
        razorpay: {
            create: `${base}/razorpay/create`,
            verify: `${base}/razorpay/verify`,
        },
        payu: {
            create: `${base}/payu/create`,
            verify: `${base}/payu/verify`,
        },
        socket: `${BASE_URL}/socket`,
    };
};

const setCookie = (name, value, days = 7) => {
    if (typeof document === 'undefined') return;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}; SameSite=Lax`;
};

const deleteCookie = (name) => {
    if (typeof document === 'undefined') return;
    document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
};

/**
 * General API Client factory for any module
 * @param {string} module
 */
const APIClient = (module) => {
    const api = getModuleEndpoints(module);
    return {
        Login: (phone) => Fetch(`${api.login}/91-IND/${phone}/SMS`, "get"),
        Verify: (data) => Fetch(api.verify, "post", data),
        Logout: async () => {
            deleteCookie('token');
            deleteCookie('user_id');
            deleteCookie('language');
            localStorage.removeItem('token');
            return { success: true, message: 'User logged out successfully' };
        },
        Session: async (data) => {
            if (data?.token) setCookie('token', data.token, 30);
            if (data?.user_id) setCookie('user_id', data.user_id, 30);
            if (data?.language) setCookie('language', data.language, 30);
            if (typeof window !== 'undefined') {
                if (data?.token) localStorage.setItem('token', data.token);
                if (data?.user_id) localStorage.setItem('vendor_id', data.user_id);
                if (data?.language) localStorage.setItem('language', data.language);
            }
            return { success: true, message: 'Session saved successfully' };
        },
        IsAuth: (token) => Fetch(api.is_auth, "get", null, token),
        Create: (data, token) => Fetch(`${api.create}`, "post", data, token),
        GetAll: (query = "", token) => Fetch(`${api.get_all}?${query}`, "get", null, token),
        Admin: (query = "", token) => Fetch(`${api.admin}?${query}`, "get", null, token),
        Details: (id, token) => Fetch(`${api.details}/${id}`, "get", null, token),
        One: (query = "", token) => Fetch(`${api.get_one}?${query}`, "get", null, token),
        Delete: (id, token) => Fetch(`${api.delete}/${id}`, "delete", null, token),
        Update: (id, data, token) => Fetch(`${api.update}/${id}`, "put", data, token),
        Download: (query = "", token) => Fetch(`${api.download}?${query}`, "get", null, token),
        GetSocketCred: (token) => Fetch(api.socket, "get", null, token),
        GetStatics: (query = "", token) => Fetch(`${api.statics}?${query}`, "get", null, token),

        Upload: (data, token) => Fetch(`${api.upload}`, "post", data, token, true),

        // Payment endpoints
        Razorpay: {
            Create: (data, token) => Fetch(api.razorpay.create, "post", data, token),
            Verify: (data, token) => Fetch(api.razorpay.verify, "post", data, token),
        },
        PayU: {
            Create: (data, token) => Fetch(api.payu.create, "post", data, token),
            Verify: (data, token) => Fetch(api.payu.verify, "post", data, token),
        },
    };
};
export { APIClient, BASE_URL as BaseURL };
