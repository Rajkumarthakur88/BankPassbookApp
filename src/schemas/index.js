import * as Yup from 'yup'

export const passbookSchema = Yup.object({
    type: Yup.string().required('Please select transaction type'),
    amount: Yup.number().required('Please Enter Amount'),
    remarks: Yup.string()

})