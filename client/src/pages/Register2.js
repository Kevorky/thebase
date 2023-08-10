import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FormRow from "../components/FormRow";
import axios from "axios";
import useLocalState from "../utils/localState";
import { Formik, field, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Register2() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {
    alert,
    showAlert,
    loading,
    setLoading,
    success,
    setSuccess,
    hideAlert,
  } = useLocalState();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    hideAlert();
    setLoading(true);
    const { name, email, password } = values;
    const registerNewUser = { name, email, password };

    try {
      const { data } = await axios.post(
        `/api/v1/auth/register`,
        registerNewUser
      );

      setSuccess(true);
      setValues({ name: "", email: "", password: "" });
      showAlert({ text: data.msg, type: "success" });
    } catch (error) {
      const { msg } = error.response.data;
      showAlert({ text: msg || "there was an error" });
    }
    setLoading(false);
  };

  return (
    <>
      <Wrapper className="page">
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
            jobRole: "",
            about: "",
            gender: "",
            skills: [],
          }}
          validationSchema={Yup.object({
            firstname: Yup.string().required("Required"),
            lastname: Yup.string().required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Please enter your email"),
            password: Yup.string()
              .required("Password is required")
              .min(8, "Must be at least 8 characters long"),
            confirmPassword: Yup.string()
              .required("Confirm Password is required")
              .oneOf([Yup.ref("password"), null], "Passwords must match"),
            jobRole: Yup.string()
              .oneOf(["developer", "designer", "qa"], "Invalid Job Role")
              .required("Please select Job Role"),
            gender: Yup.string().required("Please select gender"),
            about: Yup.string()
              .max(200, "Cannot be more than 200 characters")
              .required("Required"),
            skills: Yup.array().min(1, "Please select at least one skill"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }}
        >
          <Form>
            <legend className="heading">Registration Form</legend>
            <div className="row">
              <div className="col-md-6">
                <label className={"form-label"} htmlFor="firstname">
                  First Name
                </label>
                <Field
                  className="form-control"
                  name="firstname"
                  type="text"
                  placeholder="First Name"
                />
                <ErrorMessage
                  component="label"
                  className="form-label text-danger formError"
                  name="firstname"
                />
              </div>
              <div className="col-md-6">
                <label className={"form-label"} htmlFor="lastname">
                  Last Name
                </label>
                <Field
                  className="form-control"
                  name="lastname"
                  type="text"
                  placeholder="Last Name"
                />
                <ErrorMessage
                  component="label"
                  className="form-label text-danger formError"
                  name="lastname"
                />
              </div>
            </div>
            <label className={"form-label"} htmlFor="email">
              Email
            </label>
            <Field
              className="form-control"
              name="email"
              type="email"
              placeholder="Your Email"
            />
            <ErrorMessage
              component="label"
              className="form-label text-danger formError"
              name="email"
            />
            <label className={"form-label"} htmlFor="firstname">
              Password
            </label>
            <Field
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
            />
            <ErrorMessage
              component="label"
              className="form-label text-danger formError"
              name="password"
            />
            <label className={"form-label"} htmlFor="firstname">
              Confirm Password
            </label>
            <Field
              className="form-control"
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
            />
            <ErrorMessage
              component="label"
              className="form-label text-danger formError"
              name="confirmPassword"
            />
            <label className={"form-label"} htmlFor="jobRole">
              Job Role
            </label>
            <Field as="select" className="form-control" name="jobRole">
              <option value="">-- Select --</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="qa">Quality Analyst</option>
            </Field>
            <ErrorMessage
              component="label"
              className="form-label text-danger formError"
              name="jobRole"
            />
            <label className="form-label" htmlFor="jobRole">
              Gender
            </label>
            <div className="col-md-7">
              <label className="radio-inline cursor-pointer">
                <Field
                  type="radio"
                  name="gender"
                  id="inlineCheckbox1"
                  value="male"
                />
                &nbsp; Male
              </label>{" "}
              &nbsp;&nbsp;&nbsp;
              <label className="radio-inline cursor-pointer">
                <Field
                  type="radio"
                  name="gender"
                  id="inlineCheckbox2"
                  value="female"
                />
                &nbsp; Female
              </label>
            </div>
            <ErrorMessage
              component="label"
              className="form-label text-danger formError"
              name="gender"
            />
            <label className="form-label" htmlFor="about">
              Summary
            </label>
            <Field
              as="textarea"
              name="about"
              className="form-control"
              placeholder="Write something about you"
              id="floatingTextarea"
            />
            <ErrorMessage
              component="label"
              className="form-label text-danger formError"
              name="about"
            />
            <label className="form-label">Skills</label>
            <div className="form-check form-check-inline">
              <Field
                className="form-check-input"
                type="checkbox"
                id="node"
                name="skills"
                value="nodejs"
              />
              <label className="form-check-label cursor-pointer" htmlFor="node">
                NodeJS
              </label>
            </div>
            <div className="form-check form-check-inline">
              <Field
                className="form-check-input"
                type="checkbox"
                id="react"
                name="skills"
                value="reactjs"
              />
              <label
                className="form-check-label cursor-pointer"
                htmlFor="react"
              >
                ReactJS
              </label>
            </div>
            <div className="form-check form-check-inline">
              <Field
                className="form-check-input"
                type="checkbox"
                id="angular"
                name="skills"
                value="angularjs"
              />
              <label
                className="form-check-label cursor-pointer"
                htmlFor="angular"
              >
                Angular
              </label>
            </div>
            <div>
              <ErrorMessage
                component="label"
                className="form-label text-danger formError"
                name="skills"
              />
            </div>
            <br />
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Sign up
            </button>
          </Form>
        </Formik>
        {/*{alert.show && (*/}
        {/*  <div className={`alert alert-${alert.type}`}>{alert.text}</div>*/}
        {/*)}*/}
        {/*{!success && (*/}
        {/*  <form*/}
        {/*    className={loading ? "form form-loading" : "form"}*/}
        {/*    onSubmit={onSubmit}*/}
        {/*  >*/}
        {/*    /!* single form row *!/*/}

        {/*    <FormRow*/}
        {/*      type="name"*/}
        {/*      name="name"*/}
        {/*      value={values.name}*/}
        {/*      handleChange={handleChange}*/}
        {/*    />*/}

        {/*    /!* single form row *!/*/}
        {/*    <FormRow*/}
        {/*      type="email"*/}
        {/*      name="email"*/}
        {/*      value={values.email}*/}
        {/*      handleChange={handleChange}*/}
        {/*    />*/}
        {/*    /!* end of single form row *!/*/}
        {/*    /!* single form row *!/*/}
        {/*    <FormRow*/}
        {/*      type="password"*/}
        {/*      name="password"*/}
        {/*      value={values.password}*/}
        {/*      handleChange={handleChange}*/}
        {/*    />*/}
        {/*    /!* end of single form row *!/*/}
        {/*    <button type="submit" className="btn btn-block" disabled={loading}>*/}
        {/*      {loading ? "Loading..." : "Register"}*/}
        {/*    </button>*/}
        {/*    <p>*/}
        {/*      Already a have an account?*/}
        {/*      <Link to="/login" className="login-link">*/}
        {/*        Log In*/}
        {/*      </Link>*/}
        {/*    </p>*/}
        {/*  </form>*/}
        {/*)}*/}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  .alert {
    margin-top: 3rem;
    margin-bottom: -1.5rem;
  }
  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .login-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-500);
    cursor: pointer;
  }
  .btn:disabled {
    cursor: not-allowed;
  }
  input:has(+ .formError),
  select:has(+ .formError),
  textarea:has(+ .formError) {
    border: 1px solid red;
  }
`;

export default Register2;
