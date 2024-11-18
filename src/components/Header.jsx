import React, { useState } from 'react';
import logo from "../assets/tv.svg";


import { Flame, Menu, Popcorn, Projector, Search } from "lucide-react";
import { NavLink } from 'react-router-dom';

const Header = () => {

    const [navActive, setNavActive] = useState(false);
    const menuHandler = () => {
        setNavActive(!navActive);
    }
    const hideMenu = () => {
        setNavActive(false);
    }

    return (
        <header className='container mx-auto shadow-md px-5 py-3 bg-white/90 backdrop-blur-sm z-50 fixed top-5 left-5 right-5 w-[89%] md:w-full rounded-lg'>
            <div className="flex items-center justify-between">
                <NavLink onClick={hideMenu} to="/" className="logo flex items-center gap-2 cursor-pointer w-[20%]">
                    <img className='w-10 md:w-12' src={logo} alt="" />
                    <h1 className='text-2xl font-bold text-black'>StreamBox</h1>
                </NavLink>
                <nav className='hidden md:block'>
                    <ul className='flex items-center space-x-10 cursor-pointer'>
                        <li><NavLink to="/trending" className="flex item-center gap-2 hover:text-primary transition"><Flame className='w-5' /> Trending</NavLink></li>
                        <li><NavLink to="/movie" className="flex item-center gap-2 hover:text-primary transition"><Projector className='w-5' /> Movies</NavLink></li>
                        <li><NavLink to="/tv" className="flex item-center gap-2 hover:text-primary transition"><Popcorn className='w-4' /> TV Shows</NavLink></li>
                    </ul>
                </nav>
                <div className="right-nav w-[20%] hidden md:block">
                    <ul className='flex items-center gap-8 justify-end'>
                        {/* <li>
                        <Search />
                    </li> */}
                        <li>
                            <button className="btn btn-primary">Search</button>
                        </li>
                    </ul>
                </div>
                <div className="mob-btn md:hidden" onClick={menuHandler}><Menu /></div>
                <nav className={`mobile absolute top-16 mt-1 p-4 rounded-xl bg-white left-0 right-0 ${navActive ? 'block' : 'hidden'}`}>
                    <ul className='space-y-3 cursor-pointer'>
                        <li><NavLink onClick={hideMenu} to="/trending" className="flex item-center gap-2 hover:text-primary transition"><Flame className='w-5' /> Trending</NavLink></li>
                        <li><NavLink onClick={hideMenu} to="/movie" className="flex item-center gap-2 hover:text-primary transition"><Projector className='w-5' /> Movies</NavLink></li>
                        <li><NavLink onClick={hideMenu} to="/tv" className="flex item-center gap-2 hover:text-primary transition"><Popcorn className='w-4' /> TV Shows</NavLink></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;