import "./globals.css";
import React, { Suspense } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
    title: "Mr Fit",
    description: "Online fitness service",
};

function Layout({ children }) {
    return (
        <html lang="en">
            <body>
                <ToastContainer position="top-center" />
                <Suspense fallback={<div>Loading...</div>}>
                    {children}
                </Suspense>
            </body>
        </html>
    );
}

export default Layout;