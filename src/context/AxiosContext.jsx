import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

const AxiosContext = createContext();

export const useAxios = () => {
    return useContext(AxiosContext);
};

export const AxiosProvider = ({ children }) => {
    const HOST = import.meta.env.VITE_BACKEND_HOST;
    console.log(HOST);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [failedQueue, setFailedQueue] = useState([]);

    const processQueue = (error, token = null) => {
        failedQueue.forEach(prom => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });
        setFailedQueue([]);
    };

    const refreshToken = async (refreshToken) => {
        const response = await myAxios.post('token/refresh/', { refresh: refreshToken });
        return response.data;
    };

    const myAxios = axios.create({
        baseURL: HOST,
        headers: {
            "Content-type": "multipart/form-data",
        },
    });

    myAxios.interceptors.request.use(
        async (config) => {
            //console.log('Request:', config);
            const session = localStorage.getItem('auth');
            if (session) {
                const accessToken = JSON.parse(session).tokens.access;
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
            if (['post', 'put', 'delete', 'patch'].includes(config.method)) {
                if (config.data instanceof FormData) {
                    config.headers['Content-Type'] = 'multipart/form-data';
                } else if (typeof config.data === 'object') {
                    config.headers['Content-Type'] = 'application/json';
                }
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    myAxios.interceptors.response.use(
        (response) => {
            //console.log('Response:', response);
            return response;
        },
        async (error) => {
            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry
                && originalRequest.url !== 'token/refresh/'
            ) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        setFailedQueue(prev => [...prev, { resolve, reject }]);
                    }).then(token => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return myAxios(originalRequest);
                    }).catch(err => {
                        return Promise.reject(err);
                    });
                }

                originalRequest._retry = true;
                setIsRefreshing(true);

                const session = JSON.parse(localStorage.getItem('auth'));
                if (!session) {
                    localStorage.removeItem('auth');
                    return Promise.reject(error);
                }

                try {
                    const { access } = await refreshToken(session.tokens.refresh);
                    localStorage.setItem('auth', JSON.stringify({ ...session, tokens: { ...session.tokens, access } }));
                    myAxios.defaults.headers.common['Authorization'] = 'Bearer ' + access;
                    processQueue(null, access);
                    return myAxios(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    localStorage.removeItem('auth');
                    window.location.href = '/';
                    return Promise.reject(refreshError);
                } finally {
                    setIsRefreshing(false);
                }
            }

            return Promise.reject(error);
        }
    );

    return (
        <AxiosContext.Provider value={{ myAxios }}>
            {children}
        </AxiosContext.Provider>
    );
};

export default AxiosProvider;
