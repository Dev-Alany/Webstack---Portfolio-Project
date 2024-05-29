export const getrolesquery = `
   {
    allRoles {
      id
      role
      roleDescription
      roleGroupId
      roleGroup
      isActive
      statusFlag
      createdBy
      createdDate
      updatedBy
      updatedDate
      companyId
      company
    }
  }
  `;
export const AllModules = `
    {
    allModules {
      id
      module
      isActive
      statusFlag
      createdBy
      createdDate
      updatedBy
      updatedDate
      companyId
      company
    }
  }
  `;
export const allCasesDynamic = `{
  allCasesDynamic {
    id
    clientType
    clientId
    caseNumber
    title
    description
    summary
    caseCategoryId
    caseCategory
    caseSubcategoryId
    caseSubcategory
    caseStatus
    assignedTo
    dateOpened
    dateClosed
    priority
    isActive
    statusFlag
    createdBy
    createdDate
    updatedBy
    updatedDate
    companyId
    company
  }
}`;

export const caseCategory = `{
  allCaseCategories {
    id
    categoryName
    description
    companyId
    company
  }
}`;
export const caseSubCategory = `{
{
  allCaseSubcategories {
    id
    categoryId
    subcategoryName
    description
    companyId
    company
  }
}`;

export const caseEvents = `
{
  allCaseEvents {
    id
    caseId
    eventTypeId
    eventType
    eventDate
    outcome
    hearingDate
    description
    createdBy
    createdDate
    companyId
    company
  }
}
`;

export const caseTasks = `{
  allCaseTasks {
    id
    caseId
    asigneeId
    description
    isActive
    statusFlag
    createdBy
    createdDate
    updatedBy
    updatedDate
    companyId
    company
  }
}`;
export const allFacts = `{
  allFacts {
    id
    caseId
    categoryId
    factDescription
    factDate
    createdBy
    createdDate
    updatedBy
    updatedDate
    companyId
    company
  }
}`;

export const allCasesEvents = `{
  allCaseEvents {
    id
    caseId
    eventTypeId
    eventType
    eventDate
    outcome
    hearingDate
    description
    createdBy
    createdDate
    companyId
    company
  }
}`;

export const allEventTypes = ` {
  allEventTypes {
      id
      eventType
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
  }
}
`;

export const allCourtAssignments = `
{
  allCourtAssignments {
    id
    caseId
    courtId
    assignedDate
    createdBy
    createdDate
    companyId
    company
  }
}
`;

export const allIndividualClients = `
{
  allIndividualClients {
    id
    firstName
    lastName
    dateOfBirth
    genderId
    gender
    nationality
    identificationType
    identificationNumber
    contactNumber
    email
    address
    occupation
    employer
    emergencyContactName
    emergencyContactNumber
    relationshipWithEmergencyContact
    dateAdded
    notes
    isActive
    statusFlag
    createdBy
    createdDate
    updatedBy
    updatedDate
    companyId
    company
  }
}
`;

export const allCorporateClients = `
{
  allCorporateClients {
    id
    contactNumber
    email
    address
    dateAdded
    notes
    companyName
    registrationNumber
    industrySector
    contactPersonName
    contactPersonPosition
    contactPersonEmail
    contactPersonPhone
    companyAddress
    billingAddress
    incorporationDate
    legalStructure
    countryOfIncorporation
    taxIdentificationNumber
    authorizedSignatoryName
    authorizedSignatoryPosition
    authorizedSignatoryEmail
    authorizedSignatoryPhone
    isActive
    statusFlag
    createdBy
    createdDate
    updatedBy
    updatedDate
    companyId
    company
  }
}
`;
export const allUsersQuery =
  `{
    allUsers {
      id
      firstName
      username
      lastName
      idno
      phone
      email
      isActive
      roleName
    }
  }`

export const allCourts = ` {
  allCourts {
    id
    court
    courtTypeId
    courtType
    countryId
    country
    countyId
    county
    subCountyId
    subCounty
    latitude
    longitude
    createdDate
    createdBy
    updatedBy
    updatedDate
    companyId
    company
  }
  }`

export const allCompanies = `{
  allCompanies {
    id
    companyName
    subscriptionId
    createdBy
    createdDate
    updatedBy
    updatedDate
  }
}`;

export const allCounties = `{
    allCounties {
      id
      county
      countyCode
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }`



export const allAccountTypes = ` 
  {
  allAccountTypes {
      id
      accountType
      company
      companyId
    }
  } `;
export const allAccountCategories = `{
  allAccountCategories {
      id
      status
      categoryName
      currency
      rate
      parentAccount
      oldParent
      companyId
      company
    }
  }
  `;
export const allAccountSubCategories = ` {
  allAccountSubCategories {
      accountCategory
      accountCategoryId
      accountName
      accountNumber
      accountType
      company
      companyId
      currency
      id
      parentAccount
      rate
      status
    }
  }
  `;
export const allAccounts = ` {
  allAccounts {
      id
      status
      accountName
      accountNumber
      accountType
      companyId
      company
      currencyId
      currency
      isActive
      statusFlag
      createdBy
      createdDate
      updatedBy
      updatedDate
    }
  }
  `;
export const allPaymentTypes = `{
  allPaymentTypes {
      id
      paymentType
      company
      companyId

    }
  }
  `;
export const allBanks = `{
  allBanks {
      id
      bankName
      bankSwiftCode
      finCode
      mobile
      createdDate
      createdBy
      email
      companyId
      company
    }
  }

  `;
export const allBankBranches = `{
  allBankBranches {
      id
      bankId
      branchCode
      branchName
      branchSwiftCode
      createdDate
      createdBy
      companyId
      company
    }
  }

  `;
export const allBankAccounts = `{
  allBankBranches {
      id
      bankId
      branchCode
      branchName
      branchSwiftCode
      createdDate
      createdBy
      companyId
      company
    }
  }
  `;
export const allFiscalYears = `{
  allFiscalYears {
      id
      fiscalYearName
      startDate
      endDate
      status
      createdDate
      createdBy
      companyId
      company
    }
  }

  `;
export const allTaxAuthorities = `{
  allTaxAuthorities {
      id
      name
      jurisdiction
      paymentID
      companyId
      company
      countryId
      country
    }
  }
  `;
export const allTaxRates = `{
  allTaxRates {
      id
      name
      rate
      taxAuthorityID
      paymentID
      companyId
      company
      countryId
      country
    }
  }
  `;

export const allJudgesQuery = `
  {
  allJudges {
      company
      companyId
      judgeId
      name
    }
  }
  `;
  export const allCountries = `{
    allCountries {
      id
      country
      countryInitials
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }`;
    export const allRegions = `{
  allRegions {
    id
    regionName
    createdDate
    createdBy
    updatedBy
    updatedDate
    companyId
    company
  }
}
`;
    export const allBranches = `{
allBranches {
    id
    branchName
    createdDate
    createdBy
    updatedBy
    updatedDate
    companyId
    company
    regionId
    region
  }
}

`;
    export const allDepartments = `{
  allDepartments {
    id
    departmentName
    createdDate
    createdBy
    updatedBy
    updatedDate
    companyId
    company
  }
}


`;
export const allAddOns = `
    {
  allAddOns {
    id
    addOnName
    description
    price
    isActive
    createdDate
    createdBy
    updatedBy
    updatedDate
  }
}
`;
export const allCompanyAddOns = `
  {
  allCompanyAddOns {
    id
    companyId
    addOnId
    addOn
    purchasedDate
    isActive
    createdDate
    createdBy
    updatedBy
    updatedDate
  }
}

`;
export const allSubscriptionPlans = `
 {
  allSubscriptionPlans {
    id
    plan
    description
    price
    durationMonths
    storageLimit
    storageUnitId
    isActive
    createdDate
    createdBy
    updatedBy
    updatedDate
  }
}

`;
export const allStorageUnits = `
{
  allStorageUnits {
    id
    unit
    description
  }
}

`;