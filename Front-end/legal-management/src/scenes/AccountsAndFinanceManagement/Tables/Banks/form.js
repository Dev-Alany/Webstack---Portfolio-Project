// import React from "react";
// import { CircularProgress } from "@mui/material";
// import Swal from "sweetalert2";
// import DynamicForm from "../../../../data/Axios/DynamicForm";
// import { AccountsandFinanceurl } from "../../../../config";
// import { bankFields } from "../../../../data/DynamicTable/AccountsDynamicForms";
// import { generateAndExecuteMutation } from "../../../../data/Axios/DynamicService";

// const base_url = AccountsandFinanceurl.uri;

// const BankForm = (props) => {
//   const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
//   const userId = parseInt(decodedToken.Id);
//   const companyId = parseInt(decodedToken.CompanyId);

//   const initialValues = {
//     id: props.data ? props.data.id : "",
//     bankName: props.data ? props.data.bankName : "",
//     bankSwiftCode: props.data ? props.data.bankSwiftCode : "",
//     finCode: props.data ? props.data.finCode : "",
//     mobile: props.data ? props.data.mobile : "",
//     createdDate: props.data ? props.data.createdDate : "",
//     createdBy: props.data ? props.data.createdBy : userId,
//     email: props.data ? props.data.email : "",
   
//   };

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const {
//         id,
//         bankName,
//         bankSwiftCode,
//         finCode,
//         mobile,
//         createdDate,
//         createdBy,
//         email,
//         companyId,
//         company,
//       } = values;

//       const mutationData = props.isEditing
//         ? {
//             id,
//             bankName,
//             bankSwiftCode,
//             finCode,
//             mobile,
//             createdDate,
//             createdBy,
//             email,
//             companyId: companyId||null,
            
//            // updatedBy: userId,
//           }
//         : {
//             bankName,
//             bankSwiftCode,
//             finCode,
//             mobile,
//             createdDate: new Date().toISOString(),
//             createdBy: userId,
//             email,
//             companyId: companyId||null,
          
//             createdBy: userId,
//           };

//         const response = await generateAndExecuteMutation(
//         props.isEditing ? "updateBank" : "createBank",
//         mutationData,
//         props.isEditing ? "updatedBank" : "newBank",
//         base_url
//       );

//            if (Object.values(response)[0] != null) {
//              props.onClose();
//              props.onAction();
//              Swal.fire({
//                icon: "success",
//                title: "Success!",
//                text: `Bank ${
//                  props.isEditing ? "updated" : "created"
//                } successfully.`,
//              });
//            }
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
//       fields={bankFields}
//       onSubmit={handleSubmit}
//       title={props.isEditing ? "Edit Bank" : "Create Bank"}
//       subtitle={props.isEditing ? "Edit an Existing Bank" : "Create a New Bank"}
//     />
//   );
// };

// export default BankForm;
