import React from 'react'
import { Formik, Form, Field, ErrorMessage, useField } from 'formik'
import type { TProduct } from 'types/appTypes'
import { useNavigate } from 'react-router-dom'
import { CheckoutSchema } from '../helper/CheckoutForm.schema'

interface CheckoutFormValues {
    fullName: string
    address: string
    email: string
    phoneNumber: string
    creditCardNumber: string
}

const CheckoutForm: React.FC<{ product: TProduct }> = ({ product }) => {
    const navigate = useNavigate()
    const initialValues: CheckoutFormValues = {
        fullName: '',
        address: '',
        email: '',
        phoneNumber: '',
        creditCardNumber: '',
    }

    const FormattedPhoneField: React.FC<{ name: string; id: string }> = ({ name, id }) => {
        const [field, , helpers] = useField(name);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            console.log('value', e.target.value)
            let input = e.target.value.replace(/\D/g, '')
            console.log('new value', input)

            if (input.length > 10) input = input.slice(0, 10)

            let formatted = input
            if (input.length > 6) {
                formatted = `${input.slice(0, 3)}-${input.slice(3, 6)}-${input.slice(6)}`
            } else if (input.length > 3) {
                formatted = `${input.slice(0, 3)}-${input.slice(3)}`
            }

            helpers.setValue(formatted)
        };

        return <input {...field} id={id} onChange={handleChange} placeholder="123-456-7890" />
    }

    const NumericField: React.FC<{ name: string; id: string; placeholder?: string }> = ({
        name,
        id,
        placeholder,
    }) => {
        const [field, , helpers] = useField(name);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const numeric = e.target.value.replace(/\D/g, '');
            if (numeric.length <= 19) helpers.setValue(numeric);
        };

        return <input {...field} id={id} onChange={handleChange} placeholder={placeholder} />
    }


    const handleSubmit = (_values: CheckoutFormValues) => {
        navigate('/confirmation', { state: product })
    }

    return (
        <div>
            <h2>Checkout Form</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={CheckoutSchema}
                onSubmit={handleSubmit}
            >
                <Form noValidate>
                    <div>
                        <label htmlFor="fullName">Full Name:</label>
                        <Field id='fullName' name="fullName" />
                        <ErrorMessage name="fullName" component="div" className="error" />
                    </div>

                    <div>
                        <label htmlFor="address">Address:</label>
                        <Field id='address' name="address" />
                        <ErrorMessage name="address" component="div" className="error" />
                    </div>

                    <div>
                        <label htmlFor="email">Email:</label>
                        <Field id='email' name="email" type="email" />
                        <ErrorMessage name="email" component="div" className="error" />
                    </div>

                    <div>
                        <label htmlFor="phoneNumber">Phone Number (xxx-xxx-xxxx):</label>
                        <FormattedPhoneField id='phoneNumber' name="phoneNumber" />
                        <ErrorMessage name="phoneNumber" component="div" className="error" />
                    </div>

                    <div>
                        <label htmlFor="creditCardNumber">Credit Card Number (19 digits):</label>
                        <NumericField id='creditCardNumber' name="creditCardNumber" placeholder="1234567890123456789" />
                        <ErrorMessage name="creditCardNumber" component="div" className="error" />
                    </div>

                    <button type="submit" style={{ marginTop: '20px' }}>
                        Submit Order
                    </button>
                </Form>
            </Formik>
        </div>
    )
}

export default CheckoutForm
