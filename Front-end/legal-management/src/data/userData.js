import { gql } from "@apollo/client";
import axios from "axios";
import { loginUrl } from "../config";
const base_url = loginUrl.login;

export const GET_USERS = gql`
  query {
    allUsers {
      id
      firstName
      username
      lastName
      idno
      phone
      email
      isActive
      roleName
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $username: String!
    $idno: String!
    $roleId: Int!
    $createdBy: Int!
    $roleName: String
  ) {
    createUser(
      user: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        username: $username
        idno: $idno
        roleId: $roleId
        roleName: $roleName
        createdBy: $createdBy
      }
    ) {
      id
      firstName
      lastName
      email
      phone
      username
      idno
      roleId
      roleName
      createdBy
      createdDate
    }
  }
`;

export const UPDATE_USER = gql`
  mutation editUser(
    $id: Int!
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
    $username: String!
    $idno: String!
    $roleId: Int!
    $createdBy: Int!
    $roleName: String
  ) {
    editUser(
      user: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        email: $email
        phone: $phone
        username: $username
        idno: $idno
        roleId: $roleId
        roleName: $roleName
        createdBy: $createdBy
      }
    ) {
      id
      firstName
      lastName
      email
      phone
      username
      idno
      roleId
      roleName
      createdBy
      createdDate
    }
  }
`;
export const CHANGE_PASSWORD = gql`
  mutation ChangePassword(
    $identifier: String!
    $password: String!
    $oldPassword: String!
  ) {
    changePassword(
      identifier: $identifier
      password: $password
      oldPassword: $oldPassword
    ) {
      id
      firstName
      lastName
      email
    }
  }
`;
export const RESET_PASSWORD = gql`
  mutation ResetPassword 
  ($id:Int!)
  {

    resetPassword(id: $id) {
      id
    
    }
  }
`;
// export const ACTIVATE_USER = gql`
//   mutation DeactivateUser($id: Int!) {
//     deactivateUser(user: { id: $id })
//   }
// `;
export const ACTIVATE_USER = gql`
  mutation ActivateUser($id: Int!) {
    activateUser(user: { id: $id })
  }
`;

export const DEACTIVATE_USER = gql`
  mutation DeactivateUser($id: Int!) {
    deactivateUser(user: { id: $id })
  }
`;
export async function loginCallApi(username, HashedPassword) {
  var status = "N/A";
  var salt = "N/A";
  const postData = {
    username,
    HashedPassword,
  };

  try {
    const response = await axios.post(base_url, postData);
    return response;
  } catch (error) {
    return error.code;
  }
}


