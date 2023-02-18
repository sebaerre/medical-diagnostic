import React, { useState, useEffect } from "react";
import Form from "components/UI/Form";
import Card from "components/UI/Card";
import Spinner from "components/UI/Spinner";
import useFetchOnDemand from "hooks/useFetchOnDemand";
import Notification from "components/UI/Notification";
import Router from "next/router";
import { parseCookies } from "helpers";
import { useCookies } from "react-cookie";
import Link from "next/link";

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [showNotif, setShowNotif] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [, setCookie] = useCookies(["user"]);

  const [doApiCall, { loading, data, error }] = useFetchOnDemand("/api/login");

  const handleChange = (e) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    //verifying no fields are empty
    Object.keys(loginForm).map((field) => {
      if (loginForm[field] == "") {
        errors[field] = true;
      }
    });

    //validating email
    if (!errors["email"] && !loginForm.email.includes("@")) {
      errors.email = true;
    }
    return errors;
  };

  useEffect(() => {
    if (data?.success) {
      setCookie("user", JSON.stringify(data?.existingUser), {
        path: "/",
        maxAge: 7200, // Expires after 2hrs
        sameSite: true,
      });
      Router.push("/home");
    }
  }, [data]);

  useEffect(() => {
    if (error) setShowNotif(true);
  }, [error]);

  const login = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (!Object.keys(errors).length) {
      doApiCall({
        method: "POST",
        data: loginForm,
      });
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <Form submit={login}>
      <Card>
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
            id="login"
            name="login"
          >
            Login
          </Form.Button>
        )}
        <Link href="/signup">Register</Link>

        <Notification
          setShowNotif={setShowNotif}
          show={showNotif}
          message={error}
          type="error"
        />
      </Card>
    </Form>
  );
}

Login.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);

  if (res) {
    if (data.user) {
      res.writeHead(301, { Location: "/home" });
      res.end();
    }
  }

  return {
    data: data,
  };
};
