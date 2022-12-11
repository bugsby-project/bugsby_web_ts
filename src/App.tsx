import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateAccountPage from "./pages/CreateAccountPage";
import {Api, AuthenticationResponse} from "./apis/bugsbyApi";
import BugsbySnackbar, {BugsbySnackbarProps} from "./components/BugsbySnackbar";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import ViewProjectsPage from "./pages/ViewProjectsPage";
import AddProjectPage from "./pages/AddProjectPage";

function App() {
    const [snackbarProps, setSnackbarProps] = useState<BugsbySnackbarProps>({
        open: false,
        alertProps: {}
    });
    const [authenticationResponse, setAuthenticationResponse] = useState<AuthenticationResponse>({});

    useEffect(() => {
        const loggedInUser = window.localStorage.getItem("authenticationResponse");
        if (loggedInUser && !authenticationResponse.jwt) {
            setAuthenticationResponse(JSON.parse(loggedInUser));
        }
    }, [authenticationResponse.jwt])

    const api = new Api({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            "Authorization": authenticationResponse.jwt && `Bearer ${authenticationResponse.jwt}`
        }
    });

    return (
        <BrowserRouter>
            <div className={"App"}>
                <BugsbySnackbar
                    snackbarProps={snackbarProps}
                    setSnackbarProps={setSnackbarProps}
                />
                <Routes>
                    <Route
                        path={"/"}
                        element={<LoginPage api={api} setSnackbarProps={setSnackbarProps} setAuthenticationResponse={setAuthenticationResponse}/>}
                    />
                    <Route
                        path={"/create-account"}
                        element={<CreateAccountPage api={api} setSnackbarProps={setSnackbarProps}/>}
                    />
                    <Route
                        path={"/error"}
                        element={<ErrorPage/>}
                    />
                    <Route
                        path={"/:username/projects"}
                        element={<ViewProjectsPage api={api} setSnackbarProps={setSnackbarProps} authenticationResponse={authenticationResponse}/>}
                    />
                    <Route
                        path={"/:username/assigned-issues"}
                        // todo replace with actual component
                        element={<div></div>}
                    />
                    <Route
                        path={"/projects/:id"}
                        // todo replace with actual component
                        element={<div></div>}
                    />
                    <Route
                        path={"/add-project"}
                        element={<AddProjectPage api={api} setSnackbarProps={setSnackbarProps} authenticationResponse={authenticationResponse}/>}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
