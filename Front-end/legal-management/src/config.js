import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";
import { onError } from "apollo-link-error";

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
    });
  }
});
const token = localStorage.getItem("token");
const formattedToken = token ? `Bearer ${token.replace(/"/g, "")}` : null;
const authMiddleware = new ApolloLink((operation, forward) => {
  if (token) {
    operation.setContext({
      headers: {
        authorization: formattedToken,
      },
    });
  }
  return forward(operation);
});

export const createUsersClient = () => {


  const userManagementHttpLink = new HttpLink({
    // uri: "https://localhost:7173/users/graphql",
    uri: "https://sheriapro.mcb.co.ke/gateway/usermanagement",
  });
  const userHttpLinkWithAuth = authMiddleware.concat(userManagementHttpLink);

  const userManagementClient = new ApolloClient({
    link: onErrorLink.concat(userHttpLinkWithAuth),
    cache: new InMemoryCache(),
  });
  return userManagementClient;
};

export const createRoleClient = () => {
  const roleManagementHttpLink = new HttpLink({
    // uri: "https://localhost:7173/roles/graphql",
    uri: "https://sheriapro.mcb.co.ke/gateway/rolemanagement",

  });
  const roleHttpLinkWithAuth = authMiddleware.concat(roleManagementHttpLink);

  const roleManagementClient = new ApolloClient({
    link: roleHttpLinkWithAuth,
    cache: new InMemoryCache(),
  });
  return roleManagementClient;
}

export const createClientManagementClient = () => {
  const clientManagementHttpLink = new HttpLink({
    // uri: "https://localhost:7050/clients/graphql",
    uri: "https://sheriapro.mcb.co.ke/gateway/clientmanagement",

  });
  const clientHttpLinkWithAuth = authMiddleware.concat(clientManagementHttpLink);

  const clientManagementClient = new ApolloClient({
    link: clientHttpLinkWithAuth,
    cache: new InMemoryCache(),
  });
  return clientManagementClient;
}


export const createSetupClient = () => {
  const setupManagementHttpLink = new HttpLink({
    //uri: "https://localhost:7266/graphql/",
    uri: "https://sheriapro.mcb.co.ke/gateway/setupmanagement",

  });
  const setupHttpLinkWithAuth = authMiddleware.concat(setupManagementHttpLink);

  const setupManagementClient = new ApolloClient({
    link: onErrorLink.concat(setupHttpLinkWithAuth),
    cache: new InMemoryCache(),
  });
  return setupManagementClient;
};
export const loginUrl = {
  // login: "https://localhost:7173/userservice/login",
  login: "https://sheriapro.mcb.co.ke/gateway/login",
};
export const roleManagemenUrl = {
  // uri: "https://localhost:7173/roles/graphql",
  uri: "https://sheriapro.mcb.co.ke/gateway/rolemanagement",
};
export const caseManagementUrl = {
  // uri: "https://localhost:7146/graphql",
  uri: "https://sheriapro.mcb.co.ke/gateway/casemanagement",
};
export const setupManagementUrl = {
  // uri: "https://localhost:7266/graphql/",
  uri: "https://sheriapro.mcb.co.ke/gateway/setupmanagement",
};
export const clientManagementUrl = {
  // uri: "https://localhost:7050/graphql/",
  uri: "https://sheriapro.mcb.co.ke/gateway/clientmanagement",
};
export const userManagementUrl = {
  //uri: "https://localhost:7173/users/graphql",
  uri: "https://sheriapro.mcb.co.ke/gateway/usermanagement",
};
export const AccountsandFinanceurl = {
  //uri: "https://localhost:7173/users/graphql",
  uri: "https://sheriapro.mcb.co.ke/gateway/accountsmanagement",
};
export const documentUploadUrl = {
  uri: "https://localhost:7294/documentmanagement/UploadCaseDocument",
  // uri: "https://sheriapro.mcb.co.ke/gateway/documentmanagement/UploadCaseDocument",
};

export const companyManagementUrl = {
  //uri: "https://localhost:7294/documentmanagement/UploadCaseDocument",
  uri: "https://sheriapro.mcb.co.ke/gateway/companymanagement",
};
