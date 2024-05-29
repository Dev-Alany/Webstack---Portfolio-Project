// import React, { useState, useEffect } from "react";
// import { CircularProgress } from "@mui/material";
// import { useMutation } from "@apollo/client";
// import swal from "sweetalert";
// import { CREATE_USER, UPDATE_USER } from "../../data/userData";
// import { graphqlQuery } from "../../data/Axios/DynamicService";
// import { allCompanies, getrolesquery } from "../../data/Axios/queries";
// import { roleManagemenUrl, setupManagementUrl } from "../../config";
// import DynamicForm from "../../data/Axios/DynamicForm";
// import { usersField } from "../../data/DynamicTable/usersDynamicForms";

// const base_url = roleManagemenUrl.uri;

// const UsersForm = (props) => {
//   const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
//   const userId = parseInt(decodedToken.Id);
//   const [roleData, setRoleData] = useState([]);
//   const [loading, setLoading] = useState(true);
//    const [companyData, setcompanyData] = useState([]);
//   const initialValues = {
//     firstName: props.userData ? props.userData.firstName : "",
//     lastName: props.userData ? props.userData.lastName : "",
//     email: props.userData ? props.userData.email : "",
//     phone: props.userData ? props.userData.phone : "",
//     username: props.userData ? props.userData.username : "",
//     idno: props.userData ? props.userData.idno : "",
//     roleId: props.userData ? props.userData.roleId : "",
//     roleName: props.userData ? props.userData.roleName : "",
//   };

//   useEffect(() => {
//     async function fetchAllData() {
//       try {
//         const data = await graphqlQuery(getrolesquery, base_url);
//         if (data)  {
//           setRoleData(data);
//         }
//           const companyDataResponse = await graphqlQuery(
//             allCompanies,
//             setupManagementUrl.uri
//           );
//           if (companyDataResponse) {
//             setcompanyData(companyDataResponse);
//           }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAllData();
//   }, []);
//      const companyOptions = companyData
//        ? companyData.map((country) => ({
//            value: country.id,
//            label: country.company,
//          }))
//        : [];
//   const roleOptions = roleData
//     ? roleData.map((data) => ({
//         parent_key: data.id,
//         value: data.id,
//         label: data.role,
//       }))
//     : [];
//   const [createUser] = useMutation(CREATE_USER, {
//     onCompleted: () => {
//       swal("Success!", "User has been created successfully", "success");
//     },
//     onError: () => {
//       swal("Error!", "Unable to create user, try again later", "error");
//     },
//   });

//   const [updateUser] = useMutation(UPDATE_USER, {
//     onCompleted: () => {
//       swal("Success!", "User has been updated successfully", "success");
//     },
//     onError: () => {
//       swal("Error!", "Unable to update user, try again later", "error");
//     },
//   });

//   const handleSubmit = async (values, { setSubmitting }) => {
//     const { firstName, lastName, email, phone, username, idno, roleId } =
//       values;

//     try {
//       if (props.isEditing) {
//         await updateUser({
//           variables: {
//             id: props.userData.id,
//             firstName,
//             lastName,
//             email,
//             phone,
//             username,
//             idno,
//             roleId: parseInt(roleId),
//             createdBy: userId,
//           },
//         });
//       } else {
//         await createUser({
//           variables: {
//             firstName,
//             lastName,
//             email,
//             phone,
//             username,
//             idno,
//             roleId: parseInt(roleId),
//             createdBy: userId,
//           },
//         });
//       }
//     } catch (error) {
//       console.error("Error:", error.message);
//     }

//     setSubmitting(false);
//   };

//   if (loading) {
//     return <CircularProgress />;
//   }

//   const fields = [
//     ...usersField,
//     {
//       name: "roleId",
//       label: "Role",
//       type: "select",
//       options: roleOptions.map((role) => ({
//         value: role.value,
//         label: role.label,
//       })),
//       gridColumn: "span 2",
//       required: true,
//     },
//     {
//       name: "companyId",
//       label: "Company",
//       type: "select",
//       options: companyOptions.map((role) => ({
//         value: role.value,
//         label: role.label,
//       })),
//       gridColumn: "span 2",
//       required: true,
//     },
//   ];

//   return (
//     <DynamicForm
//       initialValues={initialValues}
//       fields={fields}
//       onSubmit={handleSubmit}
//       title={props.isEditing ? "Edit User" : "Create User"}
//       subtitle={props.isEditing ? "Edit an Existing User" : "Create a New User"}
//     />
//   );
// };

// export default UsersForm;
import React, { useState, useEffect } from "react";
import { CircularProgress, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import swal from "sweetalert";
import { CREATE_USER, UPDATE_USER, ACTIVATE_USER, DEACTIVATE_USER } from "../../data/userData";
import { graphqlQuery } from "../../data/Axios/DynamicService";
import { allCompanies, getrolesquery } from "../../data/Axios/queries";
import { roleManagemenUrl, setupManagementUrl } from "../../config";
import DynamicForm from "../../data/Axios/DynamicForm";
import { usersField } from "../../data/DynamicTable/usersDynamicForms";

const base_url = roleManagemenUrl.uri;

const UsersForm = (props) => {
  const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
  const userId = parseInt(decodedToken.Id);
  const [roleData, setRoleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companyData, setCompanyData] = useState([]);
  
  const initialValues = {
    firstName: props.userData ? props.userData.firstName : "",
    lastName: props.userData ? props.userData.lastName : "",
    email: props.userData ? props.userData.email : "",
    phone: props.userData ? props.userData.phone : "",
    username: props.userData ? props.userData.username : "",
    idno: props.userData ? props.userData.idno : "",
    roleId: props.userData ? props.userData.roleId : "",
    roleName: props.userData ? props.userData.roleName : "",
    companyId: props.userData ? props.userData.companyId : "", // Add companyId to initial values
  };

  useEffect(() => {
    async function fetchAllData() {
      try {
        const roleResponse = await graphqlQuery(getrolesquery, base_url);
        if (roleResponse) {
          setRoleData(roleResponse);
        }
        const companyResponse = await graphqlQuery(
          allCompanies,
          setupManagementUrl.uri
        );
        if (companyResponse) {
          setCompanyData(companyResponse);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, []);

  const companyOptions = companyData
    ? companyData.map((company) => ({
        value: company.id,
        label: company.company,
      }))
    : [];
    
  const roleOptions = roleData
    ? roleData.map((role) => ({
        parent_key: role.id,
        value: role.id,
        label: role.role,
      }))
    : [];

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: () => {
      props.onClose()
      swal("Success!", "User has been created successfully", "success");
    },
    onError: () => {
      swal("Error!", "Unable to create user, try again later", "error");
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      props.onClose()
      swal("Success!", "User has been updated successfully", "success");
    },
    onError: () => {
      swal("Error!", "Unable to update user, try again later", "error");
    },
  });

  // const [activateUser] = useMutation(ACTIVATE_USER, {
  //   onCompleted: () => {
  //     swal("Success!", "User has been activated successfully", "success");
  //   },
  //   onError: () => {
  //     swal("Error!", "Unable to activate user, try again later", "error");
  //   },
  // });

  // const [deactivateUser] = useMutation(DEACTIVATE_USER, {
  //   onCompleted: () => {
  //     swal("Success!", "User has been deactivated successfully", "success");
  //   },
  //   onError: () => {
  //     swal("Error!", "Unable to deactivate user, try again later", "error");
  //   },
  // });

  const handleSubmit = async (values, { setSubmitting }) => {
    const { firstName, lastName, email, phone, username, idno, roleId, companyId } = values;

    try {
      if (props.isEditing) {
        await updateUser({
          variables: {
            id: props.userData.id,
            firstName,
            lastName,
            email,
            phone,
            username,
            idno,
            roleId: parseInt(roleId),
            companyId: parseInt(companyId),
            createdBy: userId,
          },
        });
      } else {
        await createUser({
          variables: {
            firstName,
            lastName,
            email,
            phone,
            username,
            idno,
            roleId: parseInt(roleId),
            companyId: parseInt(companyId),
            createdBy: userId,
          },
        });
      }
    } catch (error) {
      console.error("Error:", error.message);
    }

    setSubmitting(false);
  };

  // const handleActivate = async () => {
  //   try {
  //     await activateUser({
  //       variables: {
  //         id: props.userData.id,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error activating user:", error.message);
  //   }
  // };

  // const handleDeactivate = async () => {
  //   try {
  //     await deactivateUser({
  //       variables: {
  //         id: props.userData.id,
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error deactivating user:", error.message);
  //   }
  // };

  if (loading) {
    return <CircularProgress />;
  }

  const fields = [
    ...usersField,
    {
      name: "roleId",
      label: "Role",
      type: "select",
      options: roleOptions.map((role) => ({
        value: role.value,
        label: role.label,
      })),
      gridColumn: "span 2",
      required: true,
    },
    {
      name: "companyId",
      label: "Company",
      type: "select",
      options: companyOptions.map((company) => ({
        value: company.value,
        label: company.label,
      })),
      gridColumn: "span 2",
      required: true,
    },
  ];

  return (
    <div>
      <DynamicForm
        initialValues={initialValues}
        fields={fields}
        onSubmit={handleSubmit}
        title={props.isEditing ? "Edit User" : "Create User"}
        subtitle={props.isEditing ? "Edit an Existing User" : "Create a New User"}
      />
      
    </div>
  );
};

export default UsersForm;

