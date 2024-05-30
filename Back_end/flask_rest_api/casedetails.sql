CREATE VIEW ClientCaseDetailsView AS
SELECT 
    clients.Client_Type,
    clients.Id,
    cases.Name AS CaseName,
    case_category.Category AS CaseCategory,
    sub_category.Category AS SubCategoryName
FROM 
    Clients clients
JOIN 
    Cases cases ON clients.Id = cases.Id
JOIN 
    CaseCategory case_category ON cases.case_category_Id = case_category.Id
JOIN 
    SubCategory sub_category ON cases.case_subcategory_Id = sub_category.Id;