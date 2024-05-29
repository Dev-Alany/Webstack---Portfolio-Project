// src/App.js
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ApolloProvider } from "@apollo/client";
import SignInSide from "./scenes/Login/LoginPage";
import ChangePasswordForm from "./scenes/users/changepassword";
import Dashboard from "./scenes/dashboard";
import Modules from "./scenes/RoleManagement/Modules";
import Rights from "./scenes/RoleManagement/Rights";
import RoleGroups from "./scenes/RoleManagement/RoleGroup";
import Role from "./scenes/RoleManagement/Roles";
import AssignRight from "./scenes/RoleManagement/Roles/AssignRoleRights";
import AccountAndFinanceModule from "./scenes/AccountsAndFinanceManagement/Accounts";
import Users from "./scenes/users";
import UsersForm from "./scenes/users/users-form";
import { Reduxstore } from "./store/store";
import { Provider } from "react-redux";

import Cases from "./scenes/CaseManagement/Case";
import CaseDetails from "./scenes/Case";
import CorporateClients from "./scenes/clientManagement/corporateClients";
import IndividualClients from "./scenes/clientManagement/individualClients";

// Apollo clients
import {
  createRoleClient,
  createUsersClient,
  createSetupClient,
  createClientManagementClient,
} from "./config";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import withLayout from "./components/HOCApp";
import ChartOfAccounts from "./scenes/AccountsAndFinanceManagement/chartofaccounts";
import { Line, Pie } from "react-chartjs-2";
import BarChart from "./components/BarChart";
import CompanyManagementModule from "./scenes/CompanyManagement/CompanyManagement";

const setupcaseclient = new ApolloClient({
  uri: "https://localhost:7266/graphql/",
  cache: new InMemoryCache(),
});

function App() {
  const [theme, colorMode] = useMode();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const userManagementClient = createUsersClient();
  const roleManagementClient = createRoleClient();
  const clientManagementClient = createClientManagementClient();
  const setupManagementClient = createSetupClient();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAuthenticated(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      {/* <Provider store={Reduxstore}> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ApolloProvider client={userManagementClient}>
          <Routes>
            <Route
              path="/"
              element={<SignInSide onLogin={() => setIsAuthenticated(true)} />}
            />
            <Route path="/changepassword" element={<ChangePasswordForm />} />
          </Routes>
        </ApolloProvider>
        {isAuthenticated && (
          <>
            <ApolloProvider client={roleManagementClient}>
              <Routes>
                <Route path="/module" element={withLayout(Modules)()} />
                <Route path="/rights" element={withLayout(Rights)()} />
                <Route path="/role-group" element={withLayout(RoleGroups)()} />
                <Route path="/role" element={withLayout(Role)()} />
                <Route
                  path="/role-Rights"
                  element={withLayout(AssignRight)()}
                />
                <Route
                  path="/accounts-setups"
                  element={withLayout(AccountAndFinanceModule)()}
                />
              </Routes>
            </ApolloProvider>
            <ApolloProvider client={userManagementClient}>
              <Routes>
                <Route path="/users" element={withLayout(Users)()} />
                <Route path="/usersform" element={withLayout(UsersForm)()} />
              </Routes>
            </ApolloProvider>
           
            <ApolloProvider client={setupcaseclient}>
              <Routes>
                <Route path="/Cases" element={withLayout(Cases)()} />
                <Route
                  path="/case-details"
                  element={withLayout(CaseDetails)()}
                />
              </Routes>
            </ApolloProvider>
            <ApolloProvider client={clientManagementClient}>
              <Routes>
                <Route
                  path="/corporate-clients"
                  element={withLayout(CorporateClients)()}
                />
                <Route
                  path="/individual-clients"
                  element={withLayout(IndividualClients)()}
                />
              </Routes>
            </ApolloProvider>
            <Routes>
              <Route path="/bar" element={withLayout(BarChart)()} />
              <Route
                path="/super-admin-dashboard"
                element={withLayout(Dashboard)()}
              />
            </Routes>
          </>
        )}
        <Routes>
          <Route path="/signin" element={<SignInSide />} />
        </Routes>
      </ThemeProvider>
      {/* </Provider> */}
    </ColorModeContext.Provider>
  );
}

export default App;
