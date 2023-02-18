import React, { useEffect } from "react";
import Spinner from "components/UI/Spinner";
import Card from "components/UI/Card";
import useFetchOnDemand from "hooks/useFetchOnDemand";
import { useCookies } from "react-cookie";
import Form from "components/UI/Form";

import Container from "components/UI/Container";

const History = () => {
  const [
    getDiagnostics,
    { loading: loadingDiagnostics, data: diagnostics, error: errorDiagnostics },
  ] = useFetchOnDemand("/api/diagnostic");

  const [confirmDiagnostic, { loading: loadingConfirm, data: confirmData }] =
    useFetchOnDemand("/api/diagnostic");

  const [cookies] = useCookies(["user"]);

  useEffect(() => {
    getDiagnostics({
      method: "GET",
      data: cookies.user?.email,
    });
  }, []);

  useEffect(() => {
    if (confirmData?.success) {
      getDiagnostics({
        method: "GET",
        data: cookies.user?.email,
      });
    }
  }, [confirmData?.id]);
  const confirmDiagnosticHandler = (e) => {
    console.log(e.target.id);
    confirmDiagnostic({
      method: "PUT",
      data: {
        id: e.target.id,
      },
    });
  };
  return (
    <Container>
      <Card className="min-w-fit justify-center items-center">
        <h1 className="text-lg font-semibold">History: </h1>
        {loadingDiagnostics ? (
          <Spinner />
        ) : diagnostics ? (
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-neonblue dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {["Diagnostic", "Date", "Symptoms"].map((header, i) => (
                  <th key={i} scope="col" className="px-6 py-3">
                    {header}
                  </th>
                ))}
                <th scope="col" className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {diagnostics.parsedResponse.map((item) => {
                console.log();
                return (
                  <tr
                    key={item._id}
                    className={`hover:bg-lightgray border-b ${
                      JSON.parse(item.correct) ? "bg-success" : "bg-error"
                    }`}
                  >
                    <td className="px-6 py-4">
                      {item.diagnostic.map((i) => i.Issue.Name)}
                    </td>
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4">
                      {item.selectedSymptoms.map((i) => i + " ")}
                    </td>
                    <td className="px-6 py-4">
                      <Form.Button
                        onClick={confirmDiagnosticHandler}
                        className="flex text-md w-fit px-4 disabled:opacity-90 self-center rounded-xl h-8 w-1/2 items-center justify-center"
                        id={item._id}
                        name="confirmdiagnostic"
                        loading={loadingConfirm}
                      >
                        Confirm Diagnostic
                      </Form.Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          errorDiagnostics && (
            <h1 className="text-lg font-semibold">Something went wrong</h1>
          )
        )}
      </Card>
    </Container>
  );
};

export default History;
