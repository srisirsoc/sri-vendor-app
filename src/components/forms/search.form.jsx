'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const SearchForm = () => {
    const router = useRouter();
    const pathname = usePathname();
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
            router.push(`${pathname}?${params.toString()}`);
        } else {
            router.push(`${pathname}`);
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