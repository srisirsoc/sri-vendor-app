import { BaseURL } from "./apis";
if (!BaseURL) throw new Error("Base url not found!");
const upload_api = `${BaseURL}/files/upload`;

export const UploadFile = async (file, token) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(upload_api, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Upload failed");

    return data;
};

export const UploadFileWithProgress = (file, token, onProgress) => {

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const formData = new FormData();

        formData.append("file", file);
        xhr.open("POST", upload_api);
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
        
        xhr.upload.onprogress = e => {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                onProgress(percent);
            }
        };

        xhr.onload = () => {
            const res = JSON.parse(xhr.responseText);
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(res);
            } else {
                reject(res);
            }
        };

        xhr.onerror = () => reject("Upload failed");
        xhr.send(formData);
    });
};

