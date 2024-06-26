export const Modulecolumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "module", headerName: "Module", flex: 1 },
  { field: "company", headerName: "Company", flex: 1 },

]


export const CasesColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "clientType", headerName: "Client Type", flex: 1 },
  { field: "clientId", headerName: "Client ID", flex: 1 },
  { field: "caseNumber", headerName: "Case Number", flex: 1 },
  { field: "title", headerName: "Title", flex: 1 },
  { field: "caseCategoryId", headerName: "Case Category ID", flex: 1 },
  { field: "caseCategory", headerName: "Case Category", flex: 1 },
  { field: "caseSubcategoryId", headerName: "Case Subcategory ID", flex: 1 },
  { field: "caseSubcategory", headerName: "Case Subcategory", flex: 1 },

];

export const TeamAssignmentsColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "caseId", headerName: "Case ID", flex: 1 },
  { field: "userId", headerName: "User ID", flex: 1 },
  { field: "assignedDate", headerName: "Assigned Date", flex: 1 },
  { field: "isActive", headerName: "Is Active", flex: 1 },
  { field: "statusFlag", headerName: "Status Flag", flex: 1 },
  { field: "createdBy", headerName: "Created By", flex: 1 },
  { field: "createdDate", headerName: "Created Date", flex: 1 },
  { field: "updatedBy", headerName: "Updated By", flex: 1 },
  { field: "updatedDate", headerName: "Updated Date", flex: 1 },
  { field: "companyId", headerName: "Company ID", flex: 1 },
  { field: "company", headerName: "Company", flex: 1 },
];

export const FactColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "caseId", headerName: "Case ID", flex: 1 },
  { field: "categoryId", headerName: "Category ID", flex: 1 },
  { field: "factDescription", headerName: "Fact Description", flex: 2 },
  { field: "factDate", headerName: "Fact Date", flex: 1 },
  { field: "createdBy", headerName: "Created By", flex: 1 },
  { field: "createdDate", headerName: "Created Date", flex: 1 },
  { field: "updatedBy", headerName: "Updated By", flex: 1 },
  { field: "updatedDate", headerName: "Updated Date", flex: 1 },
  { field: "companyId", headerName: "Company ID", flex: 1 },
  { field: "company", headerName: "Company", flex: 1 },
];
export const CaseTasksColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "caseId", headerName: "Case ID", flex: 1 },
  { field: "asigneeId", headerName: "Assignee ID", flex: 1 },
  { field: "description", headerName: "Description", flex: 2 },

  { field: "statusFlag", headerName: "Status Flag", flex: 1 },

];
export const CaseEventColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "eventId", headerName: "Event ID", flex: 1 },
  { field: "caseId", headerName: "Case ID", flex: 1 },
  { field: "eventType", headerName: "Event Type", flex: 1 },
  { field: "description", headerName: "Event Description", flex: 1 },
  { field: "eventDate", headerName: "Event Date", flex: 1 },
  { field: "outcome", headerName: "outcome", flex: 1 },
  { field: "company", headerName: "Company", flex: 1 },
];

export const CourtAssignmentsColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "caseId", headerName: "Case ID", flex: 1 },
  { field: "courtId", headerName: "Court ID", flex: 1 },
  { field: "assignedDate", headerName: "Assigned Date", flex: 1 },
  { field: "companyId", headerName: "Company ID", flex: 1 },
  { field: "company", headerName: "Company", flex: 1 },
];

export const DocumentUploadColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "caseId", headerName: "Case ID", flex: 1 },
  { field: "document", headerName: "Document", flex: 1 },
];


export const JudgeAssignmentViewsColumns = [
  { field: "id", headerName: "Judge ID", flex: 1 },
  { field: "caseId", headerName: "Case ID", flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "assignedDate", headerName: "Assigned Date", flex: 1 },
  { field: "createdBy", headerName: "Created By", flex: 1 },
  { field: "createdDate", headerName: "Created Date", flex: 1 },
  { field: "companyId", headerName: "Company ID", flex: 1 },
  { field: "company", headerName: "Company", flex: 1 },
];


export const CorporateClientsColumns = [
  // { field: "id", headerName: "ID", flex: 0.5 },
  // { field: "Name", headerName: "Username", flex: 0.5 },
  { field: "First_name", headerName: "First Name", flex: 0.5 },
  { field: "Last_name", headerName: "Last Name", flex: 0.5 },
  { field: "User_email", headerName: "Email", flex: 0.5 },
];

export const IndividualClientsColumns = [
  { field: "id", headerName: "Client ID", flex: 1 },
  { field: "firstName", headerName: "First Name", flex: 1 },
  { field: "lastName", headerName: "Last Name", flex: 1 },
  { field: "contactNumber", headerName: "Contact Number", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
];

export const AccountTypesColumns = [
  { field: "id", headerName: "ID", flex: 0.5 },
  { field: "accountType", headerName: "Account Type", flex: 1 },
];

