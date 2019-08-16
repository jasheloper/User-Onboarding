import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "../App.css"



const UserForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);
    console.log(users)


    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);





    return (


        <div className="onboarding">

            <h1>User Onboarding 1.0</h1>
            <h2>Please fill out the form below to onboard!</h2>

            <Form className="form">

                <Field
                    className="field"
                    component="input"
                    type="text"
                    name="name"
                    placeholder="Enter name"
                />
                {touched.name && errors.name && (
                    <p className="error">{errors.name}</p>
                )}
                <br /> <br />



                <Field component="select" className="role" name="role">
                    <option>-Select Your Role-</option>
                    <option value="dev">Software Developer</option>
                    <option value="data">Data Scientist</option>
                    <option value="ux">UX Designer</option>
                </Field>

                {touched.role && errors.role && (
                    <p className="error">{errors.role}</p>
                )}

                <br /> <br />





                <Field
                    className="field"
                    component="input"
                    type="text"
                    name="email"
                    placeholder="Enter email"
                />
                {touched.email && errors.email && (
                    <p className="error">{errors.email}</p>
                )}

                <br />  <br />




                <Field
                    className="field"
                    component="input"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                />

                {touched.password && errors.password && (
                    <p className="error">{errors.password}</p>
                )}


                <br />  <br />



                <label
                    className="checkbox-container">
                    Agree to Terms?

          <Field

                        type="checkbox"
                        name="terms" />
                    <span
                        className="checkmark"
                    />

                    {touched.terms && errors.terms && (
                        <p className="error">{errors.terms}</p>
                    )}
                </label>


                <br />  <br />


                <button
                    type="submit"
                >
                    Onboard User
                </button>
            </Form>


            <br />





            {users.map(user => (


                <div className="new">


                    <p key={user.id}>
                        <h2>{user.name} </h2>
                        <p>{user.role}</p>
                        <p>{user.email}</p>

                    </p>



                </div>




            ))}

            <br /><br /><br /><br />

        </div>




    );
};



const formikHOC = withFormik({
    mapPropsToValues({ name, role, email, password, terms }) {
        return {
            name: name || "",
            role: role || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required("Who are you?"),

        role: Yup.string()
            .required("What do you do?"),

        email: Yup.string()
            .required("Um, we need your email."),

        password: Yup.string()
            .min(6, 'Password must be at least 6 chars')
            .required("Password is required."),

        terms: Yup.bool()
            .oneOf([true], 'Please agree.')
    }),

    handleSubmit(values, { setStatus, resetForm }) {
        axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
                console.log("handleSubmit: then: res: ", res);
                setStatus(res.data);
                resetForm();
            })
            .catch(err => console.error("handleSubmit: catch: err: ", err));
    }
});

const UserFormWithFormik = formikHOC(UserForm);

export default UserFormWithFormik;
