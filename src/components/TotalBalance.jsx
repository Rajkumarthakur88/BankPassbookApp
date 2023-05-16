import React from 'react'
import { useSelector } from 'react-redux'

function TotalBalance() {

    const { TotalBalance} = useSelector(state => state.passbook)
    
    return (
        <>
            <div className="totalBalance card mb-3 mt-5 w-50 me-3 d-flex align-items-center " style={{ Width: "18rem" }}>
                <div className="card-body text-center mt-5">
                    <h1 className="card-title">Current Balance</h1>
                 <h1 className="card-title"> {TotalBalance}</h1>
                </div>
            </div>
        </>
    )
}

export default TotalBalance