// const { memo } = require("react");
import React, { memo } from "react";

const StepRendorer = memo(({ step, data, onChange, addItem }) => {
    switch (step) {
        case "basic":
            return (
                <Grid>
                    <Input label="Vendor ID" name="id" value={data.id} onChange={onChange} />
                    <Input label="Wallet" type="number" name="wallet" value={data.wallet} onChange={onChange} />
                    <Select label="Status" name="status" value={data.status} onChange={onChange}
                        options={["PENDING", "ACTIVE", "BLOCKED"]} />
                    <Select label="Login Type" name="login_type" value={data.login_type} onChange={onChange}
                        options={["PHONE", "EMAIL"]} />
                </Grid>
            );

        case "about":
            return (
                <Grid>
                    <Input label="Name" name="name" value={data.about?.name} onChange={(e) => onChange(e, "about")} />
                    <Input label="Email" name="email" value={data.about?.email} onChange={(e) => onChange(e, "about")} />
                    <Select label="Gendor" name="gender" value={data.about?.gender}
                        onChange={(e) => onChange(e, "about")}
                        options={["MALE", "FEMALE", "OTHER"]} />
                </Grid>
            );

        case "location":
            return (
                <Grid>
                    <Input label="City" name="city" value={data.location?.city} onChange={(e) => onChange(e, "location")} />
                    <Input label="State" name="state" value={data.location?.state} onChange={(e) => onChange(e, "location")} />
                    <Input label="Pincode" name="pincode" value={data.location?.pincode} onChange={(e) => onChange(e, "location")} />
                </Grid>
            );

        case "skills":
        case "services":
        case "specialities":
            return (
                <>
                    {(data[step] || []).map((item, i) => (
                        <Grid key={i}>
                            {Object.keys(item || {}).map((key) => (
                                <Input
                                    key={key}
                                    label={key}
                                    name={key}
                                    value={item[key]}
                                    onChange={(e) => onChange(e, step, i)}
                                />
                            ))}
                        </Grid>
                    ))}
                    <button className="add-btn" onClick={() => addItem(step)}>+ Add</button>
                </>
            );

        default:
            return <p>Section ready for update.</p>;
    }
});
export default StepRendorer;
