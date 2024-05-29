export const CompanyColumns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "companyName", headerName: "Company Name", flex: 2 },
  { field: "subscriptionId", headerName: "Subscription ID", flex: 1 },

];
export const BranchColumns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "branchName", headerName: "Branch Name", flex: 2 },

  { field: "companyId", headerName: "Company ID", flex: 1 },
  { field: "company", headerName: "Company", flex: 2 },
  { field: "regionId", headerName: "Region ID", flex: 1 },
  { field: "region", headerName: "Region", flex: 2 },
];
export const DepartmentColumns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "departmentName", headerName: "Department Name", flex: 2 },
  
  { field: "updatedDate", headerName: "Updated Date", flex: 1 },
  { field: "companyId", headerName: "Company ID", flex: 1 },
  { field: "company", headerName: "Company", flex: 2 },
];
export const AddOnColumns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "addOnName", headerName: "Add-On Name", flex: 2 },
  { field: "description", headerName: "Description", flex: 3 },
  { field: "price", headerName: "Price", flex: 1, type: "number" },

];
export const CompanyAddOnColumns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "companyId", headerName: "Company ID", flex: 1 },
  { field: "addOnId", headerName: "Add-On ID", flex: 1 },
  { field: "addOn", headerName: "Add-On", flex: 2 },
  { field: "purchasedDate", headerName: "Purchased Date", flex: 1 },

];
export const SubscriptionPlanColumns = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "plan", headerName: "Plan", flex: 2 },
  { field: "description", headerName: "Description", flex: 3 },
    { field: "price", headerName: "Price", flex: 1, type: "number" },
  
  {
    field: "durationMonths",
    headerName: "Duration (Months)",
    flex: 1,
    type: "number",
  },
  {
    field: "storageLimit",
    headerName: "Storage Limit",
    flex: 1,
    type: "number",
  },
  { field: "storageUnitId", headerName: "Storage Unit ID", flex: 1 },

];
export const StorageUnitsColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "unit", headerName: "Unit", flex: 1 },
  { field: "description", headerName: "Description", flex: 1 },
];
export const RegionsColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "regionName", headerName: "Region Name", flex: 1 },

  { field: "company", headerName: "Company", flex: 1 },
];
