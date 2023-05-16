import React from 'react'
import Form from './Form'
import Passbook from './Passbook'
import TotalBalance from './TotalBalance'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function Home() {
    return (
        <>
            <nav className="navbar bg-primary">
                <div className="container-fluid">
                    <h2 className="navbar-brand text-center w-100 text-white fs-3 fw-bold">Bank Passbook</h2>
                </div>
            </nav>

            <ToastContainer />
            <div className="container d-flex">
                <TotalBalance />
                <Form />
            </div>
            <div className="container">
                <Passbook />
            </div>
        </>
    )
}

export default Home