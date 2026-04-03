function FormValidation(obj = {}) {
    let is_valied = { success: true, message: `All field verified successfully!` }

    try {
        if (typeof obj !== 'object' || obj === null) {
            is_valied = { success: false, message: `Not a valied object!` }
        }

        for (let key in obj) {

            if (obj[key] === undefined || obj[key] === null || obj[key] === " " || obj[key] === "") {

                let key1 = key.toUpperCase();
                is_valied = { success: false, message: `${key1} field is undefined, fill the ${key1} properly!` };

            } else {
                const field = obj[key];
                if (field === "email") {
                    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                    if (!re.test(obj[email])) {
                        is_valied = { success: false, message: `Invalied email id!` }
                    } else {
                        is_valied = { success: true, message: `Your email is valied!` };
                    }
                };

                if (field === "phone") {
                    const re = /^\+?[1-9]\d{1,14}$/;
                    if (!re.test(phone)) {
                        is_valied = { success: false, message: `Invalied phone number!` };
                    } else {
                        is_valied = { success: true, message: `Your phone is valied!` };
                    }
                }
            }
        }
        return is_valied;
    } catch (error) {
        return { success: false, message: `${error}` };
    }
};

export { FormValidation }
