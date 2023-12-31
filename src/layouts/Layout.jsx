import React from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
    return (
        <>
            <main className="flex justify-center px-0 md:px-8 my-2">{children}</main>

            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Zoom}
            />
        </>
    );
}
