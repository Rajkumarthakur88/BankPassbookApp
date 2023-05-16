import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { passbookSchema } from '../schemas'
import { useDispatch, useSelector } from 'react-redux'
import { addEntry, addTransaction, updateBalance } from '../store/bankPassbookSlice'
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment'

const initialValues = {
    type: '',
    amount: '',
    remarks: ''
}

function Form() {

    const dispatch = useDispatch()
    const { passbook, TotalBalance, TotalEntries } = useSelector(state => state.passbook)





    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: passbookSchema,
        onSubmit: (values, { resetForm }) => {
          
            if ((values.type === 'Debit' && values.amount > TotalBalance || values.amount <= 0)) {
                toast.error('Insufficient Balance!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
            else if (values.amount === 0) {
                toast.warning('Please Add Some Amount!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
            else {
                const Bal = () => {
                    if (values.type === 'Credit') {
                        return TotalEntries.length ? (TotalEntries[TotalEntries.length - 1].closingBalance + +values.amount) : +values.amount
                    } else {
                        return TotalEntries[TotalEntries.length - 1].closingBalance - +values.amount
                    }
                }
                const Balance = Bal()

                // New Transaction
                const newTransaction = {
                    id: Date.now(),
                    date: moment().format("llll"),
                    type: values.type,
                    amount: values.amount,
                    remarks: values.remarks,
                    closingBalance: Balance,
                    interest: 0
                }
                dispatch(addTransaction(newTransaction))
                dispatch(addEntry(newTransaction))
                values.type = ""
                values.amount = ""
                values.remarks = ""

            }

        }
    })

    useEffect(() => {

        let totalLength = passbook.length
        const Length = totalLength % 5


        const SlicedArray = () => {
            let i;
            totalLength <= 5 ? i = 0 : i = totalLength - 5

            const Sliced = passbook.slice(i, totalLength)

            const AverageBalance = Sliced.reduce((a, b) => {
                return a + (b.closingBalance * 1)
            }, 0) / Sliced.length

            const Inter = (AverageBalance) * 0.05

            const Balance = TotalEntries.length && (TotalEntries[TotalEntries.length - 1].closingBalance + +Inter)

            const newTransaction = {
                id: Date.now(),
                date: moment().format("llll"),
                type: values.type,
                amount: values.amount,
                remarks: values.remarks,
                closingBalance: Balance,
                interest: Inter
            }

            if (passbook.length > 2) {
                dispatch(addEntry(newTransaction))

                toast.success('Interest Added', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }

        if (Length === 0) {
            SlicedArray()
        }
     
    }, [passbook])

    // Total Balance
    useEffect(()=>{
        const Balance = TotalEntries.reduce((a, b) => {
            if (b.type === 'Credit') {
                return TotalEntries.length ? (TotalEntries[TotalEntries.length - 1].closingBalance + +values.amount) : +values.amount
            } else {
                return TotalEntries[TotalEntries.length - 1].closingBalance - +values.amount
            }
        }, 0)
        dispatch(updateBalance(Balance.toFixed()*1))   
    },[TotalEntries])

    const resetForm = () => {
        values.amount = ""
        values.remarks = ""
    }

    const resetPassbook = () => {
        localStorage.clear()
        window.location.reload()
        
    }


    return (
        <>
            <form className='mt-5 ms-2 w-50' onSubmit={handleSubmit}>

                <span className='d-flex'>
                    <div className="form-check m-1">
                        <input value={'Credit'}  checked={values.type === 'Credit'} name='type' className="form-check-input" type="radio" id="flexRadioDefault1" onBlur={handleBlur} onChange={handleChange} />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Credit
                        </label>
                    </div>
                    <div className="form-check m-1">
                        <input value={'Debit'} checked={values.type === 'Debit'} name='type' className="form-check-input" type="radio" id="flexRadioDefault2" onBlur={handleBlur} onChange={handleChange} />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Debit
                        </label>
                    </div>

                </span>
                {errors.type && touched.type ? <span className='text-danger'>{errors.type}</span> : null}
                <div className='mt-3'>
                    <label htmlFor="exampleInputPassword1" className="form-label">Enter Transaction Amount</label>
                    <input value={values.amount} name='amount' type="number" className="form-control" id="exampleInputPassword1" onBlur={handleBlur} onChange={handleChange} />
                    {errors.amount && touched.amount ? <span className='text-danger'>{errors.amount}</span> : null}
                </div>
                <div className='mt-3'>
                    <label htmlFor="exampleInputPassword1" className="form-label">Remarks(optional)</label>
                    <input value={values.remarks} name='remarks' type="text" className="form-control" id="exampleInputPassword1" onBlur={handleBlur} onChange={handleChange} />
                </div>
                <span>
                    <button type="submit" className="btn btn-primary m-3">Submit</button>
                    <button type="reset" onClick={() => resetForm()} className="btn btn-danger m-3">Reset</button>
                    <button type="reset" onClick={() => resetPassbook()} className="btn btn-info m-3">Reset Passbook</button>
                </span>
            </form>
        </>
    )
}

export default Form