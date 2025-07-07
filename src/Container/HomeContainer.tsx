import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

function HomeContainer() {
    return (
        <div className='flex flex-col'>
            <Navbar />
            <div className="w-full">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default HomeContainer
