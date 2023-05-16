import { createSlice } from "@reduxjs/toolkit";

const transaction = JSON.parse(localStorage.getItem('transaction'))

const initialState = {
    passbook: [],
    TotalEntries: transaction ? transaction : [],
    TotalBalance: 0

}
const bankPassbookSlice = createSlice({

    name: "passbook",
    initialState,
    reducers: {
        addTransaction: (state, action) => {
            state.passbook.push(action.payload)

        },

        addEntry: (state, action) => {
            state.TotalEntries.push(action.payload)
            localStorage.setItem('transaction', JSON.stringify(state.TotalEntries))
        },
        updateBalance: (state, action) => {
            state.TotalBalance = action.payload
        }
    }
})

export const { addTransaction, addEntry,updateBalance } = bankPassbookSlice.actions
export default bankPassbookSlice.reducer