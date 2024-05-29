import { gql } from "@apollo/client";
//Courts
export const ALL_COURT = gql`
query AllCourts {
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
}
`;

export const UPDATE_COURT = gql`
  mutation UpdateCourt(
    $id: Int
    $court: String
    $courtTypeId: Int
    $updatedBy: Int
    $createdBy: Int
    $createdDate: String
    $longitude: Float
    $latitude: Float
    $subCounty: String
    $courtType: String
    $countryId: Int
    $country: String
    $countyId: Int
    $county: String
    $subCountyId: Int
    $updatedDate: String
    $companyId: Int
    $company: String
  ) {
    updateCourt(
      updatedCourt: {
        id: $id
        court: $court
        courtTypeId: $courtTypeId
        updatedBy: $updatedBy
        createdBy: $createdBy
        createdDate: $createdDate
        longitude: $longitude
        latitude: $latitude
        subCounty: $subCounty
        courtType: $courtType
        countryId: $countryId
        country: $country
        countyId: $countyId
        county: $county
        subCountyId: $subCountyId
        updatedDate: $updatedDate
        companyId: $companyId
        company: $company
      }
    ) {
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
  }
`;
export const CREATE_COURT = gql`
  mutation CreateCourt(
    $court: String
    $courtTypeId: Int
    $courtType: String
    $countryId: Int
    $country: String
    $countyId: Int
    $county: String
    $subCountyId: Int
    $subCounty: String
    $createdBy: Int
    $companyId: Int
    $company: String
  ) {
    createCourt(
      newCourt: {
        court: $court
        courtTypeId: $courtTypeId
        courtType: $courtType
        countryId: $countryId
        country: $country
        countyId: $countyId
        county: $county
        subCountyId: $subCountyId
        subCounty: $subCounty
        createdBy: $createdBy
        companyId: $companyId
        company: $company
      }
    ) {
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
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

//Court Types

export const ALL_COURT_TYPES = gql`
  query AllCourtTypes {
    allCourtTypes {
      id
      courtType
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

export const CREATE_COURT_TYPE = gql`
  mutation CreateCourtType(
    $courtType: String
    
    $createdBy: Int
    $companyId: Int
  ) {
    createCourtType(
      newCourtType: {
        courtType: $courtType
        createdBy: $createdBy
        companyId: $companyId
      }
    ) {
      id
      courtType
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

export const UPDATE_COURT_TYPE = gql`
  mutation UpdateCourtType(
    $id: Int
    $courtType: String
    $updatedBy: Int
    $companyId: Int
  ) {
    updateCourtType(
      updatedCourtType: {
        id: $id
        courtType: $courtType
        updatedBy: $updatedBy
        companyId: $companyId
      }
    ) {
      id
      courtType
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

//Counties
export const ALL_COUNTIES = gql`
  query AllCounties {
    allCounties {
      id
      county
      countyCode
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;

export const CREATE_COUNTY = gql`
  mutation CreateCounty(
    $county: String
    $countyCode: String = null
    
    $createdBy: Int = null
    $updatedBy: Int = null
   
  ) {
    createCounty(
      newCounty: {
        county: $county
        countyCode: $countyCode
       
        createdBy: $createdBy
        updatedBy: $updatedBy
        
      }
    ) {
      id
      county
      countyCode
     
      createdBy
      updatedBy
     
    }
  }
`;

export const UPDATE_COUNTY = gql`
  mutation UpdateCounty(
    $id: Int
    $county: String
    $countyCode: String
    $createdBy: Int
    $updatedBy: Int
  ) {
    updateCounty(
      updatedCounty: {
        id: $id
        county: $county
        countyCode: $countyCode
        createdBy: $createdBy
        updatedBy: $updatedBy
      }
    ) {
      id
      county
      countyCode
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;


// countries
export const ALL_COUNTRIES = gql`
  query AllCountries {
    allCountries {
      id
      country
      countryInitials
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;

export const CREATE_COUNTRY = gql`
  mutation CreateCountry(
    $country: String
    $countryInitials: String
    $createdBy: Int
    $updatedBy: Int
  ) {
    createCountry(
      newCountry: {
        country: $country
        countryInitials: $countryInitials
        createdBy: $createdBy
        updatedBy: $updatedBy
      }
    ) {
      id
      country
      countryInitials
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;



export const UPDATE_COUNTRY = gql`
  mutation UpdateCountry(
    $id: Int
    $country: String
    $countryInitials: String
    $createdBy: Int
    $updatedBy: Int
  ) {
    updateCountry(
      updatedCountry: {
        id: $id
        country: $country
        countryInitials: $countryInitials
        createdBy: $createdBy
        updatedBy: $updatedBy
      }
    ) {
      id
      country
      countryInitials
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;


//LeadSources
export const ALL_LEADSOURCES = gql`
query AllLeadSources {
  allLeadSources {
    id
    leadSource
    createdDate
    createdBy
    updatedBy
    updatedDate
  }
}
`;
export const CREATE_LEADSOURCES = gql`
mutation CreateLeadSource(
  $leadSource: String
  $createdDate: String
  $createdBy: Int
  $updatedBy: Int
  $updatedDate: String
) {
  createLeadSource(
    newLeadSource: {
      leadSource: $leadSource
      createdDate: $createdDate
      createdBy: $createdBy
      updatedBy: $updatedBy
      updatedDate: $updatedDate
    }
  ) {
    id
    leadSource
    createdDate
    createdBy
    updatedBy
    updatedDate
  }
}
`;
export  const UPDATE_LEADSOURCES = gql`
mutation UpdateLeadSource(
  $id: Int
  $leadSource: String
  $createdDate: String
  $createdBy: Int
  $updatedBy: Int
  $updatedDate: String
) {
  updateLeadSource(
    updatedLeadSource: {
      id: $id
      leadSource: $leadSource
      createdDate: $createdDate
      createdBy: $createdBy
      updatedBy: $updatedBy
      updatedDate: $updatedDate
    }
  ) {
    id
    leadSource
    createdDate
    createdBy
    updatedBy
    updatedDate
  }
}
`;
export const SEARCH_LEADSOURCES = gql`
query SearchLeadSources(
  $id: Int
  $leadSource: String
  $createdDate: String
  $createdBy: Int
  $updatedBy: Int
  $updatedDate: String
) {
  searchLeadSources(
    searchLeadSource: {
      id: $id
      leadSource: $leadSource
      createdDate: $createdDate
      createdBy: $createdBy
      updatedBy: $updatedBy
      updatedDate: $updatedDate
    }
  ) {
    id
    leadSource
    createdDate
    createdBy
    updatedBy
    updatedDate
  }
}
`;

//LEADSTATUSES
export const ALL_LEADSTATUSES = gql`
query AllLeadStatuses {
  allLeadStatuses {
    id
    leadStatus
    createdDate
    createdBy
    updatedBy
    updatedDate
  }
}
`;

export const CREATE_LEADSTATUS = gql`
mutation CreateLeadStatus(
  $leadStatus: String
  $createdDate: String
  $createdBy: Int
  $updatedBy: Int
  $updatedDate: String
) {
  createLeadStatus(
    newLeadStatus: {
      leadStatus: $leadStatus
      createdDate: $createdDate
      createdBy: $createdBy
      updatedBy: $updatedBy
      updatedDate: $updatedDate
    }
  ) {
    id
    leadStatus
    createdDate
    createdBy
    updatedBy
    updatedDate
  }
}
`;

export const UPDATE_LEADSTATUS = gql`
mutation UpdateLeadStatus(
  $id: Int
  $leadStatus: String
  $createdDate: String
  $createdBy: Int
  $updatedBy: Int
  $updatedDate: String
) {
  updateLeadStatus(
    updatedLeadStatus: {
      id: $id
      leadStatus: $leadStatus
      createdDate: $createdDate
      createdBy: $createdBy
      updatedBy: $updatedBy
      updatedDate: $updatedDate
    }
  ) {
    id
    leadStatus
    createdDate
    createdBy
    updatedBy
    updatedDate
  }
}
`;

export const SEARCH_LEADSTATUSES = gql`
query SearchLeadStatuses(
  $id: Int
  $leadStatus: String
  $createdDate: String
  $createdBy: Int
  $updatedBy: Int
  $updatedDate: String
) {
  searchLeadStatuses(
    searchLeadStatus: {
      id: $id
      leadStatus: $leadStatus
      createdDate: $createdDate
      createdBy: $createdBy
      updatedBy: $updatedBy
      updatedDate: $updatedDate
    }
  ) {
    id
    leadStatus
    createdDate
    createdBy
    updatedBy
    updatedDate
  }
}
`;

//Designation
export const ALL_DESIGNATIONS = gql`
query AllDesignations {
    allDesignations {
        id
        designation
        createdDate
        createdBy
        updatedBy
        updatedDate
    }
}
`;

export const CREATE_DESIGNATION = gql`
mutation CreateDesignation(
    $designation: String
    $createdDate: String
    $createdBy: Int
    $updatedBy: Int
    $updatedDate: String
) {
    createDesignation(
        newDesignation: {
            designation: $designation
            createdDate: $createdDate
            createdBy: $createdBy
            updatedBy: $updatedBy
            updatedDate: $updatedDate
        }
    ) {
        id
        designation
        createdDate
        createdBy
        updatedBy
        updatedDate
    }
}
`;

export const UPDATE_DESIGNATION = gql`
mutation UpdateDesignation(
    $id: Int
    $designation: String
    $createdDate: String
    $createdBy: Int
    $updatedBy: Int
    $updatedDate: String
) {
    updateDesignation(
        updatedDesignation: {
            id: $id
            designation: $designation
            createdDate: $createdDate
            createdBy: $createdBy
            updatedBy: $updatedBy
            updatedDate: $updatedDate
        }
    ) {
        id
        designation
        createdDate
        createdBy
        updatedBy
        updatedDate
    }
}
`;

export const SEARCH_DESIGNATIONS = gql`
query SearchDesignations(
    $id: Int
    $designation: String
    $createdDate: String
    $createdBy: Int
    $updatedBy: Int
    $updatedDate: String
) {
    searchDesignations(
        searchDesignation: {
            id: $id
            designation: $designation
            createdDate: $createdDate
            createdBy: $createdBy
            updatedBy: $updatedBy
            updatedDate: $updatedDate
        }
    ) {
        id
        designation
        createdDate
        createdBy
        updatedBy
        updatedDate
    }
}
`;
//document types
export const ALL_DOCUMENT_TYPES = gql`
  {
    allDocumentTypes {
      id
      documentType
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;

export const CREATE_DOCUMENT_TYPE = gql`
  mutation CreateDocumentType(
    $documentType: String
    $createdDate: DateTime
    $createdBy: Int
    $updatedBy: Int
    $updatedDate: DateTime
  ) {
    createDocumentType(
      newDocumentType: {
        documentType: $documentType
        createdDate: $createdDate
        createdBy: $createdBy
        updatedBy: $updatedBy
        updatedDate: $updatedDate
      }
    ) {
      id
      documentType
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;

export const UPDATE_DOCUMENT_TYPE = gql`
  mutation UpdateDocumentType(
    $id: Int!
    $documentType: String
    $createdDate: DateTime
    $createdBy: Int
    $updatedBy: Int
    $updatedDate: DateTime
  ) {
    updateDocumentType(
      updatedDocumentType: {
        id: $id
        documentType: $documentType
        createdDate: $createdDate
        createdBy: $createdBy
        updatedBy: $updatedBy
        updatedDate: $updatedDate
      }
    ) {
      id
      documentType
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;

//Event
export const ALL_EVENT_TYPES = gql`
  query AllEventTypes {
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

export const CREATE_EVENT_TYPE = gql`
  mutation CreateEventType(
    $eventType: String
    $createdBy: Int
    $companyId: Int
    $company: String
  ) {
    createEventType(
      newEventType: {
        eventType: $eventType
        createdBy: $createdBy
        companyId: $companyId
        company: $company
      }
    ) {
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

export const UPDATE_EVENT_TYPE = gql`
  mutation UpdateEventType(
    $id: Int
    $eventType: String
    $updatedBy: Int
    $companyId: Int
    $company: String
  ) {
    updateEventType(
      updatedEventType: {
        id: $id
        eventType: $eventType
        updatedBy: $updatedBy
        companyId: $companyId
        company: $company
      }
    ) {
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
// FactCategory
export const ALL_FACT_CATEGORIES = gql`
  query AllFactCategories {
    allFactCategories {
      categoryId
      categoryName
      companyId
      company
    }
  }
`;

export const CREATE_FACT_CATEGORY = gql`
  mutation CreateFactCategory(
    $categoryName: String
    $companyId: Int
    $company: String
  ) {
    createFactCategory(
      newFactCategory: {
        categoryName: $categoryName
        companyId: $companyId
        company: $company
      }
    ) {
      categoryId
      categoryName
      companyId
      company
    }
  }
`;

export const UPDATE_FACT_CATEGORY = gql`
  mutation UpdateFactCategory(
    $categoryId: Int
    $categoryName: String
    $companyId: Int
    $company: String
  ) {
    updateFactCategory(
      updatedFactCategory: {
        categoryId: $categoryId
        categoryName: $categoryName
        companyId: $companyId
        company: $company
      }
    ) {
      categoryId
      categoryName
      companyId
      company
    }
  }
`;

// Gender
export const ALL_GENDERS = gql`
  query AllGenders {
    allGenders {
      id
      gender
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;

export const CREATE_GENDER = gql`
  mutation CreateGender(
    $gender: String
  ) {
    createGender(
      newGender: {
        gender: $gender
      }
    ) {
      id
      gender
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;

export const UPDATE_GENDER = gql`
  mutation UpdateGender(
    $id: Int
    $gender: String
  ) {
    updateGender(
      updatedGender: {
        id: $id
        gender: $gender
      }
    ) {
      id
      gender
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;
// IdentificationTypes
export const ALL_IDENTIFICATION_TYPES = gql`
  query AllIdentificationTypes {
    allIdentificationTypes {
      id
      identificationType
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

export const CREATE_IDENTIFICATION_TYPE = gql`
  mutation CreateIdentificationType(
    $identificationType: String
    $companyId: Int
    $company: String
  ) {
    createIdentificationType(
      newIdentificationType: {
        identificationType: $identificationType
        companyId: $companyId
        company: $company
      }
    ) {
      id
      identificationType
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

export const UPDATE_IDENTIFICATION_TYPE = gql`
  mutation UpdateIdentificationType(
    $id: Int
    $identificationType: String
    $companyId: Int
    $company: String
  ) {
    updateIdentificationType(
      updatedIdentificationType: {
        id: $id
        identificationType: $identificationType
        companyId: $companyId
        company: $company
      }
    ) {
      id
      identificationType
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;
//Judges
export const ALL_JUDGES = gql`
  query AllJudges {
    allJudges {
      judgeId
      name
      companyId
      company
    }
  }
`;

export const CREATE_JUDGE = gql`
  mutation CreateJudge(
    $name: String
    $companyId: Int
    $company: String
  ) {
    createJudge(
      newJudge: {
        name: $name
        companyId: $companyId
        company: $company
      }
    ) {
      judgeId
      name
      companyId
      company
    }
  }
`;

export const UPDATE_JUDGE = gql`
  mutation UpdateJudge(
    $judgeId: Int
    $name: String
    $companyId: Int
    $company: String
  ) {
    updateJudge(
      updatedJudge: {
        judgeId: $judgeId
        name: $name
        companyId: $companyId
        company: $company
      }
    ) {
      judgeId
      name
      companyId
      company
    }
  }
`;
//PartTypes
export const ALL_PARTY_TYPES = gql`
  query AllPartyTypes {
    allPartyTypes {
      id
      partyType
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

export const CREATE_PARTY_TYPE = gql`
  mutation CreatePartyType(
    $partyType: String
    $companyId: Int
    $company: String
  ) {
    createPartyType(
      newPartyType: {
        partyType: $partyType
        companyId: $companyId
        company: $company
      }
    ) {
      id
      partyType
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

export const UPDATE_PARTY_TYPE = gql`
  mutation UpdatePartyType(
    $id: Int
    $partyType: String
    $companyId: Int
    $company: String
  ) {
    updatePartyType(
      updatedPartyType: {
        id: $id
        partyType: $partyType
        companyId: $companyId
        company: $company
      }
    ) {
      id
      partyType
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

//PhoneCode 
export const ALL_PHONE_CODES = gql`
  query AllPhoneCodes {
    allPhoneCodes {
      id
      phoneCode
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;

export const CREATE_PHONE_CODE = gql`
  mutation CreatePhoneCode(
    $phoneCode: String
  ) {
    createPhoneCode(
      newPhoneCode: {
        phoneCode: $phoneCode
      }
    ) {
      id
      phoneCode
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;

export const UPDATE_PHONE_CODE = gql`
  mutation UpdatePhoneCode(
    $id: Int
    $phoneCode: String
  ) {
    updatePhoneCode(
      updatedPhoneCode: {
        id: $id
        phoneCode: $phoneCode
      }
    ) {
      id
      phoneCode
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;
//Title
export const ALL_TITLES = gql`
  query AllTitles {
    allTitles {
      id
      title
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;

export const CREATE_TITLE = gql`
  mutation CreateTitle(
    $title: String
  ) {
    createTitle(
      newTitle: {
        title: $title
      }
    ) {
      id
      title
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;

export const UPDATE_TITLE = gql`
  mutation UpdateTitle(
    $id: Int
    $title: String
  ) {
    updateTitle(
      updatedTitle: {
        id: $id
        title: $title
      }
    ) {
      id
      title
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;

//Company
export const ALL_COMPANIES = gql`
  query AllCompanies {
    allCompanies {
      id
      company
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;

export const CREATE_COMPANY = gql`
  mutation CreateCompany(
    $company: String
  ) {
    createCompany(
      newCompany: {
        company: $company
      }
    ) {
      id
      company
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany(
    $id: Int
    $company: String
    $updatedBy: String
  ) {
    updateCompany(
      updatedCompany: {
        id: $id
        company: $company
        createdBy: $createdBy
        updatedBy: $updatedBy
      }
    ) {
      id
      company
      createdDate
      createdBy
      updatedBy
      updatedDate
    }
  }
`;

// Region
export const ALL_REGIONS = gql`
  query AllRegions {
    allRegions {
      id
      region
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

export const CREATE_REGION = gql`
  mutation CreateRegion(
    $region: String
    $companyId: Int
  ) {
    createRegion(
      newRegion: {
        region: $region
        companyId: $companyId
      }
    ) {
      id
      region
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

export const UPDATE_REGION = gql`
  mutation UpdateRegion(
    $id: Int
    $region: String
    $companyId: Int
  ) {
    updateRegion(
      updatedRegion: {
        id: $id
        region: $region
        companyId: $companyId
      }
    ) {
      id
      region
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

// Branch
export const ALL_BRANCHES = gql`
  query AllBranches {
    allBranches {
      id
      branch
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

export const CREATE_BRANCH = gql`
  mutation CreateBranch(
    $branch: String
    $companyId: Int
    $regionId: Int
  ) {
    createBranch(
      newBranch: {
        branch: $branch
        companyId: $companyId
        regionId: $regionId
      }
    ) {
      id
      branch
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

export const UPDATE_BRANCH = gql`
  mutation UpdateBranch(
    $id: Int
    $branch: String
    $companyId: Int
    $regionId: Int
  ) {
    updateBranch(
      updatedBranch: {
        id: $id
        branch: $branch
        companyId: $companyId
        regionId: $regionId
      }
    ) {
      id
      branch
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

//Department
export const ALL_DEPARTMENTS = gql`
  query AllDepartments {
    allDepartments {
      id
      department
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment(
    $department: String
    $companyId: Int
  ) {
    createDepartment(
      newDepartment: {
        department: $department
        companyId: $companyId
      }
    ) {
      id
      department
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment(
    $id: Int
    $department: String
    $companyId: Int
  ) {
    updateDepartment(
      updatedDepartment: {
        id: $id
        department: $department
        companyId: $companyId
      }
    ) {
      id
      department
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

//EmploymentPayment
export const ALL_EMPLOYEE_PAYMENT_TYPES = gql`
  query AllEmployeePaymentTypes {
    allEmployeePaymentTypes {
      id
      paymentType
      metadata
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

export const CREATE_EMPLOYEE_PAYMENT_TYPE = gql`
  mutation CreateEmployeePaymentType(
    $paymentType: String
    $metadata: String
    $companyId: Int
  ) {
    createEmployeePaymentType(
      newEmployeePaymentType: {
        paymentType: $paymentType
        metadata: $metadata
        companyId: $companyId
      }
    ) {
      id
      paymentType
      metadata
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

export const UPDATE_EMPLOYEE_PAYMENT_TYPE = gql`
  mutation UpdateEmployeePaymentType(
    $id: Int
    $paymentType: String
    $metadata: String
    $companyId: Int
  ) {
    updateEmployeePaymentType(
      updatedEmployeePaymentType: {
        id: $id
        paymentType: $paymentType
        metadata: $metadata
        companyId: $companyId
      }
    ) {
      id
      paymentType
      metadata
      createdDate
      createdBy
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

//Sms Template
export const ALL_SMS_TEMPLATES = gql`
  query AllSMSTemplates {
    allSMSTemplates {
      id
      messageTemplate
      status
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

export const CREATE_SMS_TEMPLATE = gql`
  mutation CreateSMSTemplate(
    $messageTemplate: String
    $status: String
    $isActive: Boolean
    $statusFlag: String
    $companyId: Int
  ) {
    createSMSTemplate(
      newSMSTemplate: {
        messageTemplate: $messageTemplate
        status: $status
        isActive: $isActive
        statusFlag: $statusFlag
        companyId: $companyId
      }
    ) {
      id
      messageTemplate
      status
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

export const UPDATE_SMS_TEMPLATE = gql`
  mutation UpdateSMSTemplate(
    $id: Int
    $messageTemplate: String
    $status: String
    $isActive: Boolean
    $statusFlag: String
    $companyId: Int
  ) {
    updateSMSTemplate(
      updatedSMSTemplate: {
        id: $id
        messageTemplate: $messageTemplate
        status: $status
        isActive: $isActive
        statusFlag: $statusFlag
        companyId: $companyId
      }
    ) {
      id
      messageTemplate
      status
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

//Email Template
export const ALL_EMAIL_TEMPLATES = gql`
  query AllEmailTemplates {
    allEmailTemplates {
      id
      messageTemplate
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

export const CREATE_EMAIL_TEMPLATE = gql`
  mutation CreateEmailTemplate(
    $messageTemplate: String
    $isActive: Boolean
    $statusFlag: String
    $companyId: Int
  ) {
    createEmailTemplate(
      newEmailTemplate: {
        messageTemplate: $messageTemplate
        isActive: $isActive
        statusFlag: $statusFlag
        companyId: $companyId
      }
    ) {
      id
      messageTemplate
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

export const UPDATE_EMAIL_TEMPLATE = gql`
  mutation UpdateEmailTemplate(
    $id: Int
    $messageTemplate: String
    $isActive: Boolean
    $statusFlag: String
    $companyId: Int
  ) {
    updateEmailTemplate(
      updatedEmailTemplate: {
        id: $id
        messageTemplate: $messageTemplate
        isActive: $isActive
        statusFlag: $statusFlag
        companyId: $companyId
      }
    ) {
      id
      messageTemplate
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

//AppNotifTemplate
export const ALL_APP_NOTIFICATION_TEMPLATES = gql`
  query AllAppNotificationTemplates {
    allAppNotificationTemplates {
      id
      messageTemplate
      notificationType
      createdBy
      createdDate
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

export const CREATE_APP_NOTIFICATION_TEMPLATE = gql`
  mutation CreateAppNotificationTemplate(
    $messageTemplate: String
    $notificationType: String
    $companyId: Int
  ) {
    createAppNotificationTemplate(
      newAppNotificationTemplate: {
        messageTemplate: $messageTemplate
        notificationType: $notificationType
        companyId: $companyId
      }
    ) {
      id
      messageTemplate
      notificationType
      createdBy
      createdDate
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;

export const UPDATE_APP_NOTIFICATION_TEMPLATE = gql`
  mutation UpdateAppNotificationTemplate(
    $id: Int
    $messageTemplate: String
    $notificationType: String
    $companyId: Int
  ) {
    updateAppNotificationTemplate(
      updatedAppNotificationTemplate: {
        id: $id
        messageTemplate: $messageTemplate
        notificationType: $notificationType
        companyId: $companyId
      }
    ) {
      id
      messageTemplate
      notificationType
      createdBy
      createdDate
      updatedBy
      updatedDate
      companyId
      company
    }
  }
`;
