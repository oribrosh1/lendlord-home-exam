// useAxios.js
import { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';  // Import the customized axios instance

const useAxios = (url, method = 'GET', body = null, headers = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance({
                    method,
                    url,
                    data: body,
                    headers
                });
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [url, method, body, headers]); // Dependency array to avoid unnecessary re-fetches

    return { data, loading, error };
};

export default useAxios;
