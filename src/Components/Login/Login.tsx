import React from 'react';
import {useFormik} from "formik";
import {SuperInput} from "../Super/SuperInput/SuperInput";


export const Login = () => {
    const formik = useFormik({
        initialValues: {
            Email: '',
            Password: '',
        },
        onSubmit: values => {
            console.log(values)
        }
    })
    console.log(formik.values)
    return (
        <div>
        <h1>Login</h1>
            <form>
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
            </form>
        </div>
    );
};



