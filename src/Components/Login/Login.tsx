import React from 'react';
import {useFormik} from "formik";
import {SuperInput} from "../Super/SuperInput/SuperInput";
import styled from "styled-components";
import {SuperButton} from "../Super/SuperButton/SuperButton";


export const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            let errors: any = {}
            if (!values.email) {
                errors.email = 'Email required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Password required'
            } else if (values.password.length < 3) {
                errors.password = 'Length should be more 3 symbols'
            }
            return errors
        },
        validateOnChange: false,
        onSubmit: values => {
            console.log(values)
            formik.resetForm()
        }
    })
    return (
        <Form onSubmit={formik.handleSubmit}>
            <h1>Login</h1>
            <SuperInput
                {...formik.getFieldProps('email')}
                // type='email'
                error={formik.touched.email && formik.errors.email && formik.errors.email}
            />
            <SuperInput
                {...formik.getFieldProps('password')}
                type='password'
                error={formik.touched.password && formik.errors.password && formik.errors.password}
            />
            <div>
                <input
                    checked={formik.values.rememberMe}
                    {...formik.getFieldProps('rememberMe')}
                    type='checkbox'
                /> Remember me
            </div>
            <SuperButton title='Submit' type='submit'/>
            <SuperButton title='Cancel' type='button'/>

        </Form>
    );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 30px 150px;
  gap: 10px;
`



