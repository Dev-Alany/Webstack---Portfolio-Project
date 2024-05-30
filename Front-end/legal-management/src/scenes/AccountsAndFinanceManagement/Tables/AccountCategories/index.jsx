// import { Box } from "@mui/material";

// import DynamicTable from "../../../../data/DynamicTable/dynamicTable";
// import { AccountsandFinanceurl } from "../../../../config";
// import { AccountTypesColumns } from "../../../../data/DynamicTable/Collumns";
// import { allAccountCategories, allAccountTypes } from "../../../../data/Axios/queries";
// import { AccountCategoriesColumns, AccountSubCategoriesColumns } from "../../../../data/DynamicTable/AccountsColumns";
// import AccountCategoryForm from "./form";
// const base_url = AccountsandFinanceurl.uri;
// const actions = {
//   edit: {
//     key: "EDIT",
//     button_name: "Edit",
//     Show_Button: false,
//   },
//   add: {
//     key: "ADD",
//     button_name: "Add",
//     Show_Button: false,
//   },
//   activateDeactivate: {
//     key: "ACTIVATEDEACTIVATE",
//     button_name: "Deactivate",
//     Show_Button: false,
//   },
//   ViewCase: {
//     key: "VIEWDETAILS",
//     button_name: "View Details",
//     Show_Button: false,
//   },
// };
// function AccountCategoriesTable() {
//   return (
//     <Box m="2px">
//       <DynamicTable
//         title="Account Categories"
//         subtitle="Create, view or edit account categories"
//         columns={AccountCategoriesColumns}
//         FormComponent={AccountCategoryForm}
//         query={ allAccountTypes}//{allAccountCategories}
//         base_url={base_url}
//         actions={actions}
//       />
//     </Box>
//   );
// }

// export default AccountCategoriesTable;
