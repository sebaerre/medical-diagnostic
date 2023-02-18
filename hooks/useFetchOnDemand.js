import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";

const useFetch = (url = "http://localhost:3000", callback = undefined) => {
  //Hook used to fetch data immediately after doApiCall is called.
  //It receives url and an optional callback as params. If specified callback is called as soon as data finishes fetching.
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [optsAndParams, setOptsAndParams] = useState({
    options: null,
    queryParams: "",
  });
  const firstRender = useRef(true);
  const willUnmount = useRef(false);

  const doApiCall = useCallback(
    (opts = { method: "GET" }, queryParams = "") => {
      setLoading(true);
      setOptsAndParams({ options: opts, queryParams });
    },
    []
  );

  useEffect(() => {
    return () => {
      willUnmount.current = true;
    };
  });

  useEffect(() => {
    if (typeof callback === "function" && data?.length) {
      callback();
    }
  }, [data]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const fetchData = async () => {
      setError(null);
      try {
        const res = await axios(
          url + optsAndParams.queryParams,
          optsAndParams.options
        );
        optsAndParams;
        setData(res.data);
      } catch (err) {
        const data = err.response ? err.response.data : "Server error";
        setData(null);
        setError(data.message);
      }

      setLoading(false);
    };

    fetchData();
  }, [optsAndParams]);

  return [doApiCall, { data, loading, error }];
};

export default useFetch;
