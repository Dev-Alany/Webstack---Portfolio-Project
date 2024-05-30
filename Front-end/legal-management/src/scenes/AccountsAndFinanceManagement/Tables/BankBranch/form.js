// import React, { useEffect, useState } from "react";
// import { CircularProgress } from "@mui/material";
// import Swal from "sweetalert2";
// import DynamicForm from "../../../../data/Axios/DynamicForm";
// import { AccountsandFinanceurl } from "../../../../config";
// import { bankBranchFields } from "../../../../data/DynamicTable/AccountsDynamicForms";
// import { generateAndExecuteMutation, graphqlQuery } from "../../../../data/Axios/DynamicService";
// import { allBanks } from "../../../../data/Axios/queries";

// const base_url = AccountsandFinanceurl.uri;

// const BankBranchForm = (props) => {
//   const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
//   const userId = parseInt(decodedToken.Id);
//   const companyId = parseInt(decodedToken.CompanyId);
//   const [bankData, setBankData] = useState([]);
//   const [loading, setLoading] = useState(true);
//    useEffect(() => {
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
//    }, []);
//     const bankOptions = bankData.map((bank) => ({
//     value: bank.id,
//     label: bank.bankName,
//   }));
//   const initialValues = {
//     id: props.data ? props.data.id : "",
//     bankId: props.data ? props.data.bankId : "",
//     branchCode: props.data ? props.data.branchCode : "",
//     branchName: props.data ? props.data.branchName : "",
//     branchSwiftCode: props.data ? props.data.branchSwiftCode : "",
//     companyId: props.data ? props.data.companyId : companyId,
//     company: props.data ? props.data.company : "",
//   };
//   const fields = [
//     ...bankBranchFields,
//     {
//       name: "bankId",
//       label: "Bank ID",
//       type: "select",
//       options:bankOptions,
//       gridColumn: "span 2",
//       required: true,
//     }
//   ];
//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const {
//         id,
//         bankId,
//         branchCode,
//         branchName,
//         branchSwiftCode,
//         companyId,
//         company,
//       } = values;

//       const mutationData = props.isEditing
//         ? {
//             id,
//             bankId,
//             branchCode,
//             branchName,
//             branchSwiftCode,
//             companyId: companyId,
//             company,
//            // updatedBy: userId,
//           }
//         : {
//             bankId,
//             branchCode,
//             branchName,
//             branchSwiftCode,
//             companyId: companyId,
//             company,
//             createdBy: userId,
//           };

//       const response = await generateAndExecuteMutation(
//         props.isEditing ? "updateBankBranch" : "createBankBranch",
//         mutationData,
//         props.isEditing ? "updatedBankBranch" : "newBankBranch",
//         base_url
//       );

//    if (Object.values(response)[0] != null) {
//      props.onClose();
//      props.onAction();
//      Swal.fire({
//        icon: "success",
//        title: "Success!",
//        text: `Bank branch ${
//          props.isEditing ? "updated" : "created"
//        } successfully.`,
//      });
//    }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "An error occurred while processing your request. Please try again later.",
//       });
//     }

//     setSubmitting(false);
//   };
//  if (loading) {
//    return <CircularProgress />;
//  }
//   return (
//     <DynamicForm
//       initialValues={initialValues}
//       fields={fields}
//       onSubmit={handleSubmit}
//       title={props.isEditing ? "Edit Bank Branch" : "Create Bank Branch"}
//       subtitle={
//         props.isEditing
//           ? "Edit an Existing Bank Branch"
//           : "Create a New Bank Branch"
//       }
//     />
//   );
// };

// export default BankBranchForm;
