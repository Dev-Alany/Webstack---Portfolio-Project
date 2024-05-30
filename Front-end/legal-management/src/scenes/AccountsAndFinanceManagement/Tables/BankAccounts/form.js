// import React, { useState, useEffect } from "react";
// import { CircularProgress } from "@mui/material";
// import Swal from "sweetalert2";
// import DynamicForm from "../../../../data/Axios/DynamicForm";
// import { AccountsandFinanceurl } from "../../../../config";
// import { bankAccountFields } from "../../../../data/DynamicTable/AccountsDynamicForms";
// import {
//   fetchDataEngine,
//   generateAndExecuteMutation,
//   graphqlQuery,
// } from "../../../../data/Axios/DynamicService";
// import { allBankBranches, allBanks } from "../../../../data/Axios/queries";

// const base_url = AccountsandFinanceurl.uri;

// const BankAccountForm = (props) => {
//   const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
//   const userId = parseInt(decodedToken.Id);
//   const companyId = parseInt(decodedToken.CompanyId);
//   const [bankData, setBankData] = useState([]);
//   const [bankBranchData, setBankBranchData] = useState({});
//   const [loading, setLoading] = useState(true);

//   const initialValues = {
//     id: props.data ? props.data.id : "",
//     bankId: props.data ? props.data.bankId : "",
//     bankBranchId: props.data ? props.data.bankBranchId : "",
//     accountName: props.data ? props.data.accountName : "",
//     accountNumber: props.data ? props.data.accountNumber : "",
//     accountDescription: props.data ? props.data.accountDescription : "",
//   };

//   useEffect(() => {
//     async function fetchAllData() {
//       try {
//         const bankDataResponse = await graphqlQuery(allBanks, base_url);
//         if (bankDataResponse) {
//           setBankData(bankDataResponse);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchAllData();
//   }, []);

//   const handleFieldChange = async (field, value) => {
//     if (field.name === "bankId") {
//       try {
//         const inputFields = { bankId: value };
//         const returnFields = ["id", "branchName"];
//         const response = await fetchDataEngine(
//           "allBankBranchesByColumnValues",
//           "bankBranchModel",
//           inputFields,
//           returnFields,
//           base_url
//         );
//         const branchOptions = response? response.map(
//           (branch) => ({
//             value: branch.id,
//             label: branch.branchName,
//           })
//         ) : [];
        
//              return branchOptions;
//       } catch (error) {
//         console.error("Error fetching bank branches:", error);
//       }
//     }
//   };

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const {
//         id,
//         bankId,
//         bankBranchId,
//         accountName,
//         accountNumber,
//         accountDescription,
//       } = values;

//       const mutationData = props.isEditing
//         ? {
//             id,
//             bankId,
//             bankBranchId,
//             accountName,
//             accountNumber,
//             accountDescription,
//             updatedBy: userId,
//             company: companyId,
//           }
//         : {
//             bankId,
//             bankBranchId,
//             accountName,
//             accountNumber,
//             accountDescription,
//             createdBy: userId,
//             company: companyId,
//           };

//       const response = await generateAndExecuteMutation(
//         props.isEditing ? "updateBankAccount" : "createBankAccount",
//         mutationData,
//         props.isEditing ? "updatedBankAccount" : "newBankAccount",
//         base_url
//       );

//       if (response) {
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: `Bank account ${
//             props.isEditing ? "updated" : "created"
//           } successfully.`,
//         });
//         props.onClose(); // Close the drawer
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

//   if (loading) {
//     return <CircularProgress />;
//   }

//   const bankOptions = bankData ? bankData.map((bank) => ({
//     value: bank.id,
//     label: bank.bankName,
//   })):[];

//   const fields = [
//     ...bankAccountFields,
//     {
//       name: "bankId",
//       label: "Bank",
//       type: "select",
//       options: bankOptions,
//       gridColumn: "span 2",
//       required: true,
//       parent: "main",
//     },
//     {
//       name: "bankBranchId",
//       label: "Bank Branch",
//       type: "select",
//       gridColumn: "span 2",
//       required: true,
//       options:[],
//       parent: "dependent",
//     },
//   ];

//   return (
//     <DynamicForm
//       initialValues={initialValues}
//       fields={fields}
//       onFieldChange={handleFieldChange}
//       onSubmit={handleSubmit}
//       title={props.isEditing ? "Edit Bank Account" : "Create Bank Account"}
//       subtitle={
//         props.isEditing
//           ? "Edit an Existing Bank Account"
//           : "Create a New Bank Account"
//       }
//     />
//   );
// };

// export default BankAccountForm;
