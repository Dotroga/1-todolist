import React from 'react';
import {useFormik} from "formik";
import {SuperInput} from "../Super/SuperInput/SuperInput";


export const Login = () => {
    const formik = useFormik({
        initialValues: {
            Email: '',
            Password: '',
            rememberMe: false
        },
        validate: (values) => {
            let errors: any = {}
            if (!values.Email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.Email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: values => {
            console.log(values)
        }
    })
    console.log(formik.errors)
    return (
        <form onSubmit={formik.handleSubmit}>
            <h1>Login</h1>
            <SuperInput
                onChange={formik.handleChange}
                value={formik.values.Email}
                name='Email'
                error={''}
            />
            <SuperInput
                onChange={formik.handleChange}
                value={formik.values.Password}
                name='Password'
                type='password'
                error={''}
            />
            <input
                onChange={formik.handleChange}
                checked={formik.values.rememberMe}
                name='rememberMe'
                type='checkbox'
            />
            <button type='submit'>
                Submit
            </button>
        </form>
    );
};



