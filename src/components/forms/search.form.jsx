'use client';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const [data, setData] = useState({});

    const InputHandler = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const style = {
        d: "outline-none px-1 p-[2px] rounded-sm text-slate-400"
    }

    useEffect(() => {
        if (data.query) {
            const params = new URLSearchParams();
            params.set("query", data.query);
            navigate(`${pathname}?${params.toString()}`);
        } else {
            navigate(`${pathname}`);
        }
    }, [data.query])

    return (
        <div>
            <input
                type="text"
                name="query"
                className={`w-full min-w-[150px] sm:min-w-[250px] ${style.d}`}
                placeholder="Search"
                onChange={InputHandler}
                value={data.query || ""}
            />
        </div >
    )
}

export default React.memo(SearchForm);