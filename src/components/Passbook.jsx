import React from 'react'
import { useSelector } from 'react-redux'
import Transaction from './Transaction'

function Passbook() {



    const { passbook, TotalEntries } = useSelector(state => state.passbook)

    if (TotalEntries.length === 0) {
        return <h1 className='text-center mt-5'>No Transactions ...</h1>
    }

    return (
        <>
            <table className="table mt-2">
                <thead>
                    <tr>
                        <th scope="col">S.no</th>
                        <th scope="col">Date | Time</th>
                        <th scope="col">Transaction Details</th>
                        <th scope="col">Debit</th>
                        <th scope="col">Credit</th>
                        <th scope="col">Balance</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        TotalEntries.map(i => <Transaction key={i.id} passbook={TotalEntries} transaction={i} />)
                    }
                </tbody>
            </table>

        </>
    )
}

export default Passbook