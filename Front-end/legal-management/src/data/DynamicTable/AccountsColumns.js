export const AccountCategoriesColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "status", headerName: "Status", flex: 1 },
  { field: "categoryName", headerName: "Category Name", flex: 1 },
  { field: "currency", headerName: "Currency", flex: 1 },
  { field: "rate", headerName: "Rate", flex: 1 },
  //   { field: "parentAccount", headerName: "Parent Account", flex: 1 },
  //   { field: "oldParent", headerName: "Old Parent", flex: 1 },
];
export const AccountSubCategoriesColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "accountCategory", headerName: "Account Category", flex: 1 },

  { field: "accountName", headerName: "Account Name", flex: 1 },
  { field: "accountNumber", headerName: "Account Number", flex: 1 },
  { field: "accountType", headerName: "Account Type", flex: 1 },

  { field: "currency", headerName: "Currency", flex: 1 },

  { field: "rate", headerName: "Rate", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
];
export const AccountsColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },

  { field: "accountName", headerName: "Account Name", flex: 1 },
  { field: "accountNumber", headerName: "Account Number", flex: 1 },
  { field: "accountType", headerName: "Account Type", flex: 1 },

  { field: "currency", headerName: "Currency", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
];
export const PaymentTypesColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "paymentType", headerName: "Payment Type", flex: 1 },

];
export const BanksColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "bankName", headerName: "Bank Name", flex: 1 },
  { field: "bankSwiftCode", headerName: "Bank Swift Code", flex: 1 },
  { field: "finCode", headerName: "Financial Code", flex: 1 },
  { field: "mobile", headerName: "Mobile", flex: 1 },

  { field: "email", headerName: "Email", flex: 1 },

];
export const BankBranchesColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "bankId", headerName: "Bank ID", flex: 1 },
  { field: "branchCode", headerName: "Branch Code", flex: 1 },
  { field: "branchName", headerName: "Branch Name", flex: 1 },
  { field: "branchSwiftCode", headerName: "Branch Swift Code", flex: 1 },
];
export const BankAccountsColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "bankId", headerName: "Bank ID", flex: 1 },
  { field: "bankBranchId", headerName: "Bank Branch ID", flex: 1 },
  { field: "accountName", headerName: "Account Name", flex: 1 },
  { field: "accountNumber", headerName: "Account Number", flex: 1 },
  { field: "accountDescription", headerName: "Account Description", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
 
];
export const FiscalYearsColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "fiscalYearName", headerName: "Fiscal Year Name", flex: 1 },
  { field: "startDate", headerName: "Start Date", flex: 1 },
  { field: "endDate", headerName: "End Date", flex: 1 },
  { field: "status", headerName: "Status", flex: 1 },
  
];
export const TaxAuthoritiesColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "jurisdiction", headerName: "Jurisdiction", flex: 1 },
  { field: "countryId", headerName: "Country ID", flex: 1 },
  { field: "country", headerName: "Country", flex: 1 },
];

export const TaxRatesColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "rate", headerName: "Rate", flex: 1 },
  { field: "taxAuthorityID", headerName: "Tax Authority ID", flex: 1 },
   { field: "countryId", headerName: "Country ID", flex: 1 },
  { field: "country", headerName: "Country", flex: 1 },
];
