import { configureStore } from '@reduxjs/toolkit'
import bankPassbookSlice from './bankPassbookSlice'

const store = configureStore({
    reducer: {
        passbook: bankPassbookSlice
    }
})

export default store