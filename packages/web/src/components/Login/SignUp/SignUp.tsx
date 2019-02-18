import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { withFormik, FormikProps } from "formik";

import Form from "../../../styles/components/UI/Form/Form";
import Label from "../../../styles/components/UI/Label/Label";
import Input from "../../../styles/components/UI/Input/Input";
import Button from "../../../styles/components/UI/Button/Button";
import Error from "../../../styles/components/UI/Error/Error";

interface FormValues {
    email: string;
    password: string;
    passwordConfirmation: string;
}

interface OtherProps {
    title?: string;
    mutate?: any;
    history?: any;
}

interface MyFormProps {
    initialEmail?: string;
    initialPassword?: string;
    initialPasswordConfirmation?: string;
}

const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
    } = props;

    return (
        <Form onSubmit={handleSubmit} gridRow="3 / 6">
            <Label>Email address</Label>
            <Input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
            />
            {touched.email && errors.email && (
                <Error>
                    <h2>{errors.email}</h2>
                </Error>
            )}
            <Label>Password</Label>
            <Input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
            />
            {touched.password && errors.password && (
                <Error>
                    <h2>{errors.password}</h2>
                </Error>
            )}
            <Label>Confirm password</Label>
            <Input
                type="password"
                name="passwordConfirmation"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirmation}
            />
            {touched.passwordConfirmation && errors.passwordConfirmation && (
                <Error>
                    <h2>{errors.passwordConfirmation}</h2>
                </Error>
            )}
            <Button
                fontSize={1}
                color="FFFFFF"
                type="submit"
                disabled={
                    isSubmitting ||
                    !!(errors.email && touched.email) ||
                    !!(errors.password && touched.password) ||
                    !!(
                        errors.passwordConfirmation &&
                        touched.passwordConfirmation
                    )
                }
            >
                Create account
            </Button>
            <Link to="/signin">Already have an account? Sign In</Link>
        </Form>
    );
};

// Wrap our form with the using withFormik HoC
const SignUp = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values
    mapPropsToValues: props => ({
        email: props.initialEmail || "",
        password: props.initialPassword || "",
        passwordConfirmation: props.initialPasswordConfirmation || ""
    }),

    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords are not the same!")
            .required("Password confirmation is required!")
    }),

    handleSubmit(
        { email, password, passwordConfirmation }: FormValues,
        { props, setSubmitting, setErrors }
    ) {
        console.log(email, password, passwordConfirmation);
    }
})(InnerForm);

export default SignUp;
