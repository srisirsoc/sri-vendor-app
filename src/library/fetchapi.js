const DEFAULT_HEADERS = {
  "auth-key": import.meta.env.VITE_AUTH_KEY || "",
  "api-version": import.meta.env.VITE_API_VERSION || "",
  "content-type": "application/json",
};

/**
 * Build fetch options
 */
function buildOptions(method = "get", token = "", data = null, isformdata) {
  const headers = { ...DEFAULT_HEADERS };
  if (token) headers.Authorization = `Bearer ${token}`;
  const options = { method, headers };
  if (method !== "get" && method !== "delete" && data) {
    if (!isformdata) {
      options.body = JSON.stringify(data);
    } else {
      options.headers = {};
      options.body = data;
    }
  }
  return options;
}

/**
 * Universal fetch utility
 * @param {string} api - API endpoint
 * @param {string} method - HTTP method (get, post, put, patch, delete, download)
 * @param {object} data - payload
 * @param {string} token - auth token
 */
let count = 0;
async function Fetch(api, method = "get", data = null, token = "", is_form_data = null) {
  try {
    if (method === "download") {
      if (typeof window === "undefined") {
        throw new Error("Download not supported on server-side");
      }
      count++
      console.log(api, method, data, token);
      
      const res = await fetch(api, buildOptions("get", token, data, is_form_data));
      if (!res.ok) throw new Error(`Download failed: ${res.statusText}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "records.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      return { success: true, message: "Excel file downloaded successfully" };
    }

    // Normal API request
    const res = await fetch(api, buildOptions(method, token, data, is_form_data));
    const contentType = res.headers.get("content-type") || "";
    let responseData = null;
    if (contentType.includes("application/json")) {
      responseData = await res.json();
    } else {
      responseData = await res.text();
    }
    if (!res.ok) {
      return { success: false, status: res.status, ...responseData };
    };
    return responseData;
  } catch (error) {
    console.error("[Fetch Error]", error);
    return { success: false, message: error.message || "Something went wrong" };
  }
};
export { Fetch };
