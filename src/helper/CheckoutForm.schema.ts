import * as Yup from 'yup'
import { nameRegExp, phoneRegExp, creditCardRegExp } from '../constants/app-constants'

export const CheckoutSchema = Yup.object().shape({
    fullName: Yup.string()
        .matches(nameRegExp, 'Full name must contain only letters and spaces')
        .required('Full name is required'),

    address: Yup.string()
        .required('Address is required'),

    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),

    phoneNumber: Yup.string()
        .matches(phoneRegExp, 'Phone number must be in the format xxx-xxx-xxxx')
        .required('Phone number is required'),

    creditCardNumber: Yup.string()
        .matches(creditCardRegExp, 'Credit card must be 19 digits')
        .required('Credit card number is required'),
})