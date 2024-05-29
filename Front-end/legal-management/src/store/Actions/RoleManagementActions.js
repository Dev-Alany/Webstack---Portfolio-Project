import { gql } from "@apollo/client";
import { createRoleClient } from "../../config";
import { ALL_ROLE } from "../../data/RoleManagementData";
import * as actionTypes from "../ActionTypes";

// Create the client instance (assuming it's not already created elsewhere)
const client = createRoleClient(); // Assuming createRoleClient returns a client instance

export const fetchRolesRequest = () => ({
  type: actionTypes.FETCH_ROLES_REQUEST,
});

export const fetchRolesSuccess = (roles) => ({
  type: actionTypes.FETCH_ROLES_SUCCESS,
  payload: roles,
});

export const fetchRolesFailure = (error) => ({
  type: actionTypes.FETCH_ROLES_FAILURE,
  payload: error,
});


export const fetchRoles = () => {
  return async (dispatch) => {
    dispatch(fetchRolesSuccess());

    try {
      const { data, errors } = await client.query({ query: ALL_ROLE }); // Use query property

      if (errors) {
        // Handle errors appropriately (more on this later)
        console.error("Error fetching roles:", errors);
        dispatch(fetchRolesFailure(errors[0].message)); // Use the first error message
      } else {
        dispatch(fetchRolesSuccess(data.roles));
      }
    } catch (error) {
      dispatch(fetchRolesFailure(error.message));
    }
  };
};
