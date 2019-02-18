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
}

interface OtherProps {
    title?: string;
    mutate?: any;
    history?: any;
}

interface MyFormProps {
    initialEmail?: string;
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
            <Button
                fontSize={1}
                color="FFFFFF"
                type="submit"
                disabled={isSubmitting || !!(errors.email && touched.email)}
            >
                Send reset link
            </Button>
            <Link to="/signin">Back to Sign In</Link>
        </Form>
    );
};

// Wrap our form with the using withFormik HoC
const ForgotPassword = withFormik<MyFormProps, FormValues>({
    // Transform outer props into form values
    mapPropsToValues: props => ({ email: props.initialEmail || "" }),

    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required")
    }),

    handleSubmit({ email }: FormValues, { props, setSubmitting, setErrors }) {
        console.log(email);
    }
})(InnerForm);

export default ForgotPassword;
