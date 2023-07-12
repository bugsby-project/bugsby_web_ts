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
import ViewSingleProjectPage from "./pages/ViewSingleProjectPage";
import ViewAssignedIssuesPage from "./pages/ViewAssignedIssuesPage";
import ViewIssuePage from "./pages/ViewIssuePage";
import AddIssuePage from "./pages/AddIssuePage";
import ViewPrefilledIssuePage from "./pages/ViewPrefilledIssuePage";
import StatisticsPage from "./pages/StatisticsPage";

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
                        element={<ViewAssignedIssuesPage api={api} authenticationResponse={authenticationResponse}/>}
                    />
                    <Route
                        path={"/projects/:id/add-issue"}
                        element={<AddIssuePage api={api} setSnackbarProps={setSnackbarProps} authenticationResponse={authenticationResponse}/>}
                    />
                    <Route
                        path={"/projects/:id"}
                        element={<ViewSingleProjectPage api={api} authenticationResponse={authenticationResponse} setSnackbarProps={setSnackbarProps}/>}
                    />
                    <Route
                        path={"/projects/:projectId/prefilled-issues/:id"}
                        element={<ViewPrefilledIssuePage api={api} authenticationResponse={authenticationResponse} setSnackbarProps={setSnackbarProps}/>}
                    />
                    <Route
                        path={"/add-project"}
                        element={<AddProjectPage api={api} setSnackbarProps={setSnackbarProps} authenticationResponse={authenticationResponse}/>}
                    />
                    <Route
                        path={"/issues/:id"}
                        element={<ViewIssuePage api={api} setSnackbarProps={setSnackbarProps} authenticationResponse={authenticationResponse}/>}
                    />
                    <Route
                        path={"/:username/statistics"}
                        element={<StatisticsPage api={api} authenticationResponse={authenticationResponse}/>}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
