import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortContr = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortContr.signal })
            .then(response => {
                if (!response.ok) {
                    throw Error('Error occured during data fetch');
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    // console.log('fetch aborted');
                } else {
                    setIsLoading(false);
                    setError(err.message);
                }
            })
        }, 1000);

        return () => abortContr.abort();
    }, [url]);

    return {data, isLoading, error}
}

export default useFetch;