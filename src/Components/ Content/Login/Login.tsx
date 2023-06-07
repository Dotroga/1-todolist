import React from "react";
import { useFormik } from "formik";
import { SuperInput } from "Components/Super/SuperInput/SuperInput";
import styled from "styled-components";
import { SuperButton } from "Components/Super/SuperButton/SuperButton";
import { SuperCheckbox } from "Components/Super/SuperCheckbox/SuperCheckbox";
import { useAppDispatch, useAppSelector } from "redux/store";
import { Navigate } from "react-router-dom";
import {selectIsLoggedIn} from "redux/auth/auth.selectors";
import {authThunks} from "redux/auth/auth.reducer";

export type LoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: (values) => {
      let errors: Partial<LoginType> = {}
      if (!values.email) {
        errors.email = "Email required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Password required";
      } else if (values.password.length < 3) {
        errors.password = "Length should be more 3 symbols";
      }
      return errors;
    },
    validateOnChange: false,
    onSubmit: (values) => {
      dispatch(authThunks.login(values))
      isLoggedIn && formik.resetForm();
    },
  });

  if (isLoggedIn) return <Navigate to={"/"} />;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1>Login</h1>
      <SuperInput
        {...formik.getFieldProps("email")}
        // type='email'
        error={formik.touched.email && formik.errors.email && formik.errors.email}
        color="#2e384c"
      />
      <SuperInput
        {...formik.getFieldProps("password")}
        type="password"
        error={formik.touched.password && formik.errors.password && formik.errors.password}
        color="#2e384c"
      />
      <SuperCheckbox checked={formik.values.rememberMe} {...formik.getFieldProps("rememberMe")}>
        Remember me
      </SuperCheckbox>
      <SuperButton title="Login" type="submit" />
    </Form>
  );
};

const Form = styled.form`
  h1 {
    font-size: 40px;
    padding: 20px;
  }
  height: 100%;
  min-width: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 150px 100px 150px;
  gap: 10px;
`;
