// import React from "react";
// import { CircularProgress } from "@mui/material";
// import Swal from "sweetalert2";
// import DynamicForm from "../../../../data/Axios/DynamicForm";
// import { AccountsandFinanceurl } from "../../../../config";
// import { generateAndExecuteMutation } from "../../../../data/Axios/DynamicService";
// import { paymentTypeFields } from "../../../../data/DynamicTable/AccountsDynamicForms";

// const base_url = AccountsandFinanceurl.uri;

// const PaymentTypeForm = (props) => {
//   const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
//   const userId = parseInt(decodedToken.Id);
//   const companyId = parseInt(decodedToken.CompanyId);

//   const initialValues = {
//     paymentType: props.data ? props.data.paymentType : "",
//   };

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const { paymentType } = values;

//       const mutationData = props.isEditing
//         ? {
//             id: props.data.id,
//             paymentType,
//             companyId: companyId,
//            // updatedBy: userId,
//           }
//         : {
//             paymentType,
//             companyId: companyId,
//            // createdBy: userId,
//           };

//       const response = await generateAndExecuteMutation(
//         props.isEditing ? "updatePaymentType" : "createPaymentType",
//         mutationData,
//         props.isEditing ? "updatedPaymentType" : "newPaymentType",
//         base_url
//       );

//            if (Object.values(response)[0] != null) {
//              props.onClose();
//              props.onAction();
//              Swal.fire({
//                icon: "success",
//                title: "Success!",
//                text: `Payment type ${
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
//       fields={paymentTypeFields}
//       onSubmit={handleSubmit}
//       title={props.isEditing ? "Edit Payment Type" : "Create Payment Type"}
//       subtitle={
//         props.isEditing
//           ? "Edit an Existing Payment Type"
//           : "Create a New Payment Type"
//       }
//     />
//   );
// };

// export default PaymentTypeForm;
