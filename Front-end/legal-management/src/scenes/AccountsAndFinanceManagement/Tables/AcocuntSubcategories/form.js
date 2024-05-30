// import React, { useState, useEffect } from "react";
// import { CircularProgress } from "@mui/material";
// import Swal from "sweetalert2";
// import DynamicForm from "../../../../data/Axios/DynamicForm";
// import { AccountsandFinanceurl } from "../../../../config";
// import { accountSubcategoryFields } from "../../../../data/DynamicTable/AccountsDynamicForms";
// import {
//   generateAndExecuteMutation,
//   graphqlQuery,
// } from "../../../../data/Axios/DynamicService";
// import { allAccountCategories } from "../../../../data/Axios/queries";

// const base_url = AccountsandFinanceurl.uri;

// const AccountSubCategoryForm = (props) => {
//   const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
//   const userId = parseInt(decodedToken.Id);
//   const companyId = parseInt(decodedToken.CompanyId);
//   const [categoryData, setCategoryData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const initialValues = {
//     accountCategory: props.data ? props.data.accountCategory : "",
//     accountCategoryId: props.data ? props.data.accountCategoryId : "",
//     accountNumber: props.data ? props.data.accountNumber : "",
//     accountType: props.data ? props.data.accountType : "",

//     companyId: props.data ? props.data.companyId : companyId,
//     currency: props.data ? props.data.currency : "",
//     id: props.data ? props.data.id : "",
//     parentAccount: props.data ? props.data.parentAccount : "",
//     rate: props.data ? props.data.rate : "",
//   };
//   useEffect(() => {
//     async function fetchAllData() {
//       try {
//         const data = await graphqlQuery(allAccountCategories, base_url);
//         if (data) {
//           setCategoryData(data);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAllData();
//   }, []);
//   const CategoryOptions = categoryData
//     ? categoryData.map((data) => ({
//         parent_key: data.id,
//         value: data.id,
//         label: data.categoryName,
//       }))
//     : [];
//   const fields = [
//     ...accountSubcategoryFields,
//     {
//       name: "accountCategoryId",
//       label: "Account Category ",
//       type: "select",
//       options: CategoryOptions.map((role) => ({
//         value: role.value,
//         label: role.label,
//       })),
//       gridColumn: "span 2",
//       required: true,
//     },
//   ];

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const {
//         accountCategory,
//         accountCategoryId,
//         accountName,
//         accountNumber,
//         accountType,
//         company,
//         currency,
//         parentAccount,
//         rate,
//         status,
//       } = values;

//       const mutationData = props.isEditing
//         ? {
//             id: props.data.id,

//             accountCategoryId,
//             accountName,
//             accountNumber,
//             accountType,

//             companyId: companyId,
//             currency,
//             //parentAccount,
//             rate: parseFloat(rate),

//             // updatedBy: userId,
//           }
//         : {
//             accountCategory,
//             accountCategoryId,
//             accountNumber,
//             accountType,

//             companyId: companyId,
//             currency,
//             //parentAccount,
//             rate: parseFloat(rate),

//             // createdBy: userId,
//           };

//       const response = await generateAndExecuteMutation(
//         props.isEditing
//           ? "updateAccountSubCategory"
//           : "createAccountSubCategory",
//         mutationData,
//         props.isEditing ? "updatedAccountSubCategory" : "newAccountSubCategory",
//         base_url
//       );

//       if (Object.values(response)[0] != null) {
//         props.onClose();
//         props.onAction();
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: `Account sub-category ${
//             props.isEditing ? "updated" : "created"
//           } successfully.`,
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "An error occurred while processing your request. Please try again later.",
//       });
//     }

//     setSubmitting(false);
//   };

//   return (
//     <DynamicForm
//       initialValues={initialValues}
//       fields={fields}
//       onSubmit={handleSubmit}
//       title={
//         props.isEditing
//           ? "Edit Account Sub-Category"
//           : "Create Account Sub-Category"
//       }
//       subtitle={
//         props.isEditing
//           ? "Edit an Existing Account Sub-Category"
//           : "Create a New Account Sub-Category"
//       }
//     />
//   );
// };

// export default AccountSubCategoryForm;
