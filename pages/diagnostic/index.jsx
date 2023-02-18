import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "components/UI/Form";
import { useCookies } from "react-cookie";
import useFetchOnDemand from "hooks/useFetchOnDemand";
import Card from "components/UI/Card";
import Spinner from "components/UI/Spinner";
import { parseCookies } from "helpers";
import Container from "components/UI/Container";

const BASE_URL_API = "https://sandbox-healthservice.priaid.ch";
const Diagnostic = ({ data }) => {
  const [cookies, setCookie] = useCookies(["token"]);
  const [
    getSymptoms,
    { loading: loadingSymptoms, data: symptoms, error: errorSymptoms },
  ] = useFetchOnDemand(BASE_URL_API + "/symptoms?");

  const submitNewDiagnosticToHistory = () => {
    const namedSymptoms = [];

    selectedSymptoms.map((item) => {
      let symptom = symptoms.find((s) => s.ID == item);
      if (symptom) namedSymptoms.push(symptom.Name);
    });

    axios("/api/diagnostic", {
      method: "POST",
      data: {
        diagnostic: JSON.stringify(diagnosticData),
        date: Date.now(),
        selectedSymptoms: JSON.stringify(namedSymptoms),
        correct: "false",
        user: cookies.user?.email,
      },
    });
  };

  const [
    getDiagnostic,
    {
      loading: loadingDiagnostic,
      data: diagnosticData,
      error: errorDiagnostic,
    },
  ] = useFetchOnDemand(
    BASE_URL_API + "/diagnosis?",
    submitNewDiagnosticToHistory
  );

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  //get all symptom list
  useEffect(() => {
    if (cookies.token?.token) {
      getSymptoms(
        {
          method: "GET",
          mode: "no-cors",
          cache: "no-cache",
        },
        new URLSearchParams({
          token: cookies.token.token,
          language: "en-gb",
        })
      );
    }
  }, [cookies.token]);

  //get auth token
  useEffect(() => {
    if (!cookies.token) {
      const fetch = async () => {
        const res = await axios("/api/medic/auth", {
          method: "GET",
        });
        setCookie("token", JSON.stringify({ token: res.data.token }), {
          path: "/",
          maxAge: 7200, // Expires after 2hrs
          sameSite: true,
        });
      };
      fetch();
    }
  }, [cookies.token]);

  //submit symptoms to get diagnostic
  const submitSymptoms = (e) => {
    e.preventDefault();
    const serializedSymptoms = JSON.stringify(selectedSymptoms);
    const loggedUser = JSON.parse(data.user);

    getDiagnostic(
      {
        method: "GET",
        mode: "no-cors",
        cache: "no-cache",
      },
      new URLSearchParams({
        token: cookies.token.token,
        symptoms: serializedSymptoms,
        gender: loggedUser.gender,
        year_of_birth: loggedUser.date.split("-")[0],
        language: "en-gb",
      })
    );
  };

  const handleChange = (e) => {
    const newSelectedSymptoms = Array.from(
      e.target.selectedOptions,
      (option) => option.id
    );
    setSelectedSymptoms(newSelectedSymptoms);
  };

  const diagnostic = (
    <Card className="min-w-fit justify-center items-center">
      {loadingDiagnostic ? (
        <Spinner />
      ) : !diagnosticData?.length ? (
        <h1 className="text-lg font-semibold">
          No diagnostic matches your search.
        </h1>
      ) : (
        <>
          <h1 className="text-lg font-semibold">Your diagnostic:</h1>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-neonblue dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {["Name", "Prof Name", "Accuracy"].map((header, i) => (
                  <th key={i} scope="col" className="px-6 py-3">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {diagnosticData.map((item) => (
                <tr
                  className="bg-white hover:bg-lightgray border-b"
                  key={item.Issue.ID}
                >
                  <td className="px-6 py-4">{item["Issue"]["Name"]}</td>
                  <td className="px-6 py-4">{item["Issue"]["ProfName"]}</td>
                  <td className="px-6 py-4">{item["Issue"]["Accuracy"]}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Card>
  );
  return (
    <Container>
      <Card className="min-w-fit">
        {loadingSymptoms && !symptoms ? (
          <Spinner />
        ) : (
          symptoms && (
            <>
              <h1 className="text-lg font-semibold">Select your symptoms</h1>
              <Form className="h-full" submit={submitSymptoms}>
                <Form.Input
                  className="w-full h-52"
                  type="select"
                  multiple
                  onChange={handleChange}
                  id="symptoms"
                  name="symptoms"
                  options={symptoms}
                />
                {loadingDiagnostic ? (
                  <Spinner className="flex justify-center items-center" />
                ) : (
                  <Form.Button
                    className="flex disabled:opacity-90 self-center rounded-xl h-8 w-1/2 items-center justify-center"
                    type="submit"
                    id="getdiagnostic"
                    name="getdiagnostic"
                  >
                    Get Diagnostic
                  </Form.Button>
                )}
              </Form>
            </>
          )
        )}
        {errorSymptoms && (
          <h1 className="text-lg font-semibold">Something went wrong</h1>
        )}
      </Card>
      {diagnostic}
      {errorDiagnostic && (
        <h1 className="text-lg font-semibold">Something went wrong</h1>
      )}
    </Container>
  );
};

Diagnostic.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);
  if (res) {
    if (!data.user) {
      res.writeHead(301, { Location: "/login" });
      res.end();
    }
  }

  return {
    data: data,
  };
};

export default Diagnostic;
