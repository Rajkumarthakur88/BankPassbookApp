
import React from 'react'

function Transaction({ transaction, passbook }) {


    const index = passbook.indexOf(transaction)



    return (
        <>
            <tr className={transaction.interest > 0 ? 'bg-primary text-light' : 'bg-light'}>
                <th scope="row">{index+1}</th>
                <td>{transaction.date}</td>
                <td>{transaction.interest > 0 ? "Interest" : transaction.type}/{Date.now()}/{transaction.remarks}</td>
                {transaction.type === 'Debit' || transaction.interest > 0 ? <td className=' text-danger'>{transaction.interest > 0 ? '' : "₹" + transaction.amount}</td> : <td></td>}
                {transaction.type === 'Credit' || transaction.interest > 0 ? <td className={transaction.interest > 0 ? 'text-light' : 'text-success'}>₹ {transaction.interest > 0 ? transaction.interest.toFixed() : transaction.amount}</td> : <td></td>}
                <td>₹{transaction.closingBalance.toFixed()}</td>
            </tr>
        </>
    )
}

export default Transaction