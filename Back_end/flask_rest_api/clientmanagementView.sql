CREATE VIEW ClientManagementView AS
SELECT 
    clients.Client_Type,
    clients.Id,
    clients.Email,
    clients.Address,
    Company.Company_name AS CompanyName,
    industry_sector.Sector_name AS IndustrySector
FROM 
    Clients clients
JOIN 
    Company Company ON clients.Id = Company.Id
JOIN 
    IndustrySector industry_sector ON industry_sector.Id = industry_sector.Id;

