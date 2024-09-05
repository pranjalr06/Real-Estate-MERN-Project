import React from 'react'
import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom'

function Header() {
    return (
        <>
            <header className='bg-slate-200 shadow-md'>
                <div className='flex justify-between item-center max-w-6xl mx-auto p-3'>
                    <h1 className='font-bold text-md md:text-2xl flex flex-wrap'>
                        <Link to='/'>
                            <span className='text-slate-500'>Estate</span>
                            <span className='text-slate-700'>Vista</span>
                        </Link>
                    </h1>
                    <form className='bg-slate-100 p-2 rounded-lg flex items-center'>
                        <input type="text" placeholder='Search...' 
                        className='cursor-text bg-transparent focus:outline-none w-24 sm:w-64 '/>
                        <FaSearch className='text-slate-600 cursor-pointer'/>
                    </form>
                    <ul className='flex gap-4'>
                        <Link to='/'>
                            <li className='sm-inline text-slate-700 hover:text-white hover:bg-slate-500 text-md p-1 rounded-md  cursor-pointer transition text hover:-translate-y-0.5 hover:scale-110'>Home</li>
                        </Link>
                        <Link to='/about'>
                            <li className='sm-inline text-slate-700 hover:text-white hover:bg-slate-500 text-md p-1 rounded-md  cursor-pointer transition text hover:-translate-y-0.5 hover:scale-110'>About</li>
                        </Link>                        
                        <Link to='/signin'>
                            <li className='sm-inline text-slate-700 hover:text-white hover:bg-slate-500 text-md p-1 rounded-md  cursor-pointer transition text hover:-translate-y-0.5 hover:scale-110'>Sign In</li>
                        </Link>                    
                    </ul>
                </div>
            </header>
        </>
    )
}

export default Header