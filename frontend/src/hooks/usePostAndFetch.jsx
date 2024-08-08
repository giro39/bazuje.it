import { useEffect, useState } from "react";
import axios from "axios";

const usePostAndFetch = (inputData, url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const refetch = () => {
        setLoading(true);
        axios
            .post(url, {
                inputData: inputData,
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        refetch();
    }, [url]);

    return { data, loading, error, refetch };
};

export default usePostAndFetch;
