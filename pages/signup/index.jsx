import React, { useState, useEffect } from "react";
import Form from "components/UI/Form";
import Spinner from "components/UI/Spinner";
import useFetchOnDemand from "hooks/useFetchOnDemand";
import Card from "components/UI/Card";
import Notification from "components/UI/Notification";
import Link from "next/link";

const Signup = () => {
  const [signUpForm, setSignUpForm] = useState({
    password: "",
    email: "",
    firstname: "",
    lastname: "",
    gender: { ID: 1, Name: "Male" },
    date: "",
  });
  const [showNotif, setShowNotif] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [doApiCall, { loading, data, error }] =
    useFetchOnDemand("/api/register");
  const handleChange = (e) => {
    setSignUpForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    //verifying no fields are empty
    Object.keys(signUpForm).map((field) => {
      if (signUpForm[field] == "") {
        errors[field] = true;
      }
    });

    //validating email
    if (!errors["email"] && !signUpForm.email.includes("@")) {
      errors.email = true;
    }
    return errors;
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (!Object.keys(errors).length) {
      doApiCall({
        method: "POST",
        data: signUpForm,
      });
    } else {
      setFormErrors(errors);
    }
  };

  useEffect(() => {
    if (data?.success || error) {
      setShowNotif(true);
    }
  }, [data, error]);

  return (
    <div className="font-roboto h-full w-full bg-no-repeat bg-cover bg-fixed bg-login">
      <Form submit={registerUser}>
        <Card>
          <Form.Input
            error={formErrors["firstname"]}
            onChange={handleChange}
            type="text"
            id="firstname"
            name="firstname"
            label="First Name: "
          />
          <Form.Input
            error={formErrors["lastname"]}
            onChange={handleChange}
            type="text"
            id="lastname"
            name="lastname"
            label="Last Name: "
          />
          <Form.Input
            error={formErrors["gender"]}
            onChange={handleChange}
            type="select"
            id="gender"
            name="gender"
            label="Gender: "
            options={[
              { ID: 1, Name: "male" },
              { ID: 2, Name: "female" },
            ]}
          />
          <Form.Input
            error={formErrors["date"]}
            onChange={handleChange}
            type="date"
            id="date"
            name="date"
            label="Date of birth: "
          />
          <Form.Input
            error={formErrors["email"]}
            onChange={handleChange}
            type="text"
            id="email"
            name="email"
            label="E-Mail: "
          />
          <Form.Input
            error={formErrors["password"]}
            onChange={handleChange}
            type="password"
            id="password"
            name="password"
            label="Password: "
          />
          {loading ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <Form.Button
              className="flex disabled:opacity-90 self-center rounded-xl h-8 w-1/2 items-center justify-center"
              type="submit"
              id="register"
              name="register"
            >
              Register
            </Form.Button>
          )}
          <Notification
            setShowNotif={setShowNotif}
            show={showNotif}
            message={data?.success ? "User created successfully" : error}
            type={data?.success ? "success" : "error"}
          />
          <Link href="/login">Login</Link>
        </Card>
      </Form>
    </div>
  );
};

export default Signup;
