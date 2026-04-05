import { Link } from 'react-router-dom';
import { Navs } from '../../library/user.nav';
import React from 'react'

const NavMenu = ({ MenuHandler }) => {
    return (
        <div>
            <div className='absolute top-[3.6rem] left-0 z-10 bg-var(--blue) text-white p-4 max-h-[88vh] overflow-y-auto'>
                <div className='flex flex-col gap-3'>
                    {Navs.map((item, i) => (
                        <Link className={`hover:text-var(--pink)`} key={i} to={item.url || "/"}>
                            <div className='flex items-center gap-2 border shadow-md px-2 p-1 rounded-md' onClick={() => MenuHandler("nav")}>
                                <span>{item.icon}</span>
                                <span>{item.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NavMenu;