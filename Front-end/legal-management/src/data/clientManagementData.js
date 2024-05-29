import { gql } from "@apollo/client";

//#region Individual clients
export const ALL_INDIVIDUAL_CLIENTS = gql`
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

export const ACTIVATE_DEACTIVATE_INDIVIDUAL_CLIENTS = gql`
  mutation BulkActivateDeactivateIndividualClients($individualClientIds: [Int!]!, $isActive: Boolean!, $userId: Int!) {
    bulkActivateDeactivateIndividualClients(individualClientIds: $individualClientIds, isActive: $isActive, userId: $userId)
  }
`;

export const CREATE_INDIVIDUAL_CLIENT = gql`
  mutation CreateIndividualClient(
    $firstName: String
    $lastName: String
    $dateOfBirth: DateTime
    $genderId: Int
    $gender: String
    $nationality: String
    $identificationType: String
    $identificationNumber: String
    $contactNumber: String
    $email: String
    $address: String
    $occupation: String
    $employer: String
    $emergencyContactName: String
    $emergencyContactNumber: String
    $relationshipWithEmergencyContact: String
    $dateAdded: DateTime
    $notes: String
    $isActive: Byte
    $statusFlag: Byte
    $createdBy: Int
    $createdDate: DateTime
    $updatedBy: Int
    $updatedDate: DateTime
    $companyId: Int
    $company: String
  ) {
    createIndividualClient(
      newIndividualClient: {
        firstName: $firstName
        lastName: $lastName
        dateOfBirth: $dateOfBirth
        genderId: $genderId
        gender: $gender
        nationality: $nationality
        identificationType: $identificationType
        identificationNumber: $identificationNumber
        contactNumber: $contactNumber
        email: $email
        address: $address
        occupation: $occupation
        employer: $employer
        emergencyContactName: $emergencyContactName
        emergencyContactNumber: $emergencyContactNumber
        relationshipWithEmergencyContact: $relationshipWithEmergencyContact
        dateAdded: $dateAdded
        notes: $notes
        isActive: $isActive
        statusFlag: $statusFlag
        createdBy: $createdBy
        createdDate: $createdDate
        updatedBy: $updatedBy
        updatedDate: $updatedDate
        companyId: $companyId
        company: $company
      }
    ) {
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

export const UPDATE_INDIVIDUAL_CLIENT = gql`
  mutation UpdateIndividualClient(
    $id: Int!
    $firstName: String!
    $lastName: String!
    $dateOfBirth: DateTime
    $genderId: Int
    $gender: String
    $nationality: String
    $identificationType: String
    $identificationNumber: String
    $contactNumber: String
    $email: String
    $address: String
    $occupation: String
    $employer: String
    $emergencyContactName: String
    $emergencyContactNumber: String
    $relationshipWithEmergencyContact: String
    $dateAdded: DateTime
    $notes: String
    $isActive: Byte
    $statusFlag: Byte
    $createdBy: Int
    $createdDate: DateTime
    $updatedBy: Int
    $updatedDate: DateTime
    $companyId: Int
    $company: String
  ) {
    updateIndividualClient(
      updatedIndividualClient: {
        id: $id
        firstName: $firstName
        lastName: $lastName
        dateOfBirth: $dateOfBirth
        genderId: $genderId
        gender: $gender
        nationality: $nationality
        identificationType: $identificationType
        identificationNumber: $identificationNumber
        contactNumber: $contactNumber
        email: $email
        address: $address
        occupation: $occupation
        employer: $employer
        emergencyContactName: $emergencyContactName
        emergencyContactNumber: $emergencyContactNumber
        relationshipWithEmergencyContact: $relationshipWithEmergencyContact
        dateAdded: $dateAdded
        notes: $notes
        isActive: $isActive
        statusFlag: $statusFlag
        createdBy: $createdBy
        createdDate: $createdDate
        updatedBy: $updatedBy
        updatedDate: $updatedDate
        companyId: $companyId
        company: $company
      }
    ) {
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
//#endregion

//#region Corporate clients
export const ALL_CORPORATE_CLIENTS = gql`
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

export const ACTIVATE_DEACTIVATE_CORPORATE_CLIENTS = gql`
  mutation BulkActivateDeactivateCorporateClients($corporateClientIds: [Int!]!, $isActive: Boolean!, $userId: Int!) {
    bulkActivateDeactivateCorporateClients(corporateClientIds: $corporateClientIds, isActive: $isActive, userId: $userId)
  }
`;

export const CREATE_CORPORATE_CLIENT = gql`
  mutation CreateCorporateClient(
    $contactNumber: String
    $email: String
    $address: String
    $dateAdded: DateTime
    $notes: String
    $companyName: String
    $registrationNumber: String
    $industrySector: String
    $contactPersonName: String
    $contactPersonPosition: String
    $contactPersonEmail: String
    $contactPersonPhone: String
    $companyAddress: String
    $billingAddress: String
    $incorporationDate: DateTime
    $legalStructure: String
    $countryOfIncorporation: String
    $taxIdentificationNumber: String
    $authorizedSignatoryName: String
    $authorizedSignatoryPosition: String
    $authorizedSignatoryEmail: String
    $authorizedSignatoryPhone: String
    $isActive: Byte
    $statusFlag: Byte
    $createdBy: Int
    $createdDate: DateTime
    $updatedBy: Int
    $updatedDate: DateTime
    $companyId: Int
    $company: String
  ) {
    createCorporateClient(
      newCorporateClient: {
        contactNumber: $contactNumber
        email: $email
        address: $address
        dateAdded: $dateAdded
        notes: $notes
        companyName: $companyName
        registrationNumber: $registrationNumber
        industrySector: $industrySector
        contactPersonName: $contactPersonName
        contactPersonPosition: $contactPersonPosition
        contactPersonEmail: $contactPersonEmail
        contactPersonPhone: $contactPersonPhone
        companyAddress: $companyAddress
        billingAddress: $billingAddress
        incorporationDate: $incorporationDate
        legalStructure: $legalStructure
        countryOfIncorporation: $countryOfIncorporation
        taxIdentificationNumber: $taxIdentificationNumber
        authorizedSignatoryName: $authorizedSignatoryName
        authorizedSignatoryPosition: $authorizedSignatoryPosition
        authorizedSignatoryEmail: $authorizedSignatoryEmail
        authorizedSignatoryPhone: $authorizedSignatoryPhone
        isActive: $isActive
        statusFlag: $statusFlag
        createdBy: $createdBy
        createdDate: $createdDate
        updatedBy: $updatedBy
        updatedDate: $updatedDate
        companyId: $companyId
        company: $company
      }
    ) {
      address
      authorizedSignatoryEmail
      authorizedSignatoryName
      authorizedSignatoryPhone
      authorizedSignatoryPosition
      billingAddress
      company
      companyAddress
      companyId
      companyName
      contactNumber
      contactPersonEmail
      contactPersonName
      contactPersonPhone
      contactPersonPosition
      countryOfIncorporation
      createdBy
      createdDate
      dateAdded
      email
      id
      incorporationDate
      industrySector
      isActive
      legalStructure
      notes
      registrationNumber
      statusFlag
      taxIdentificationNumber
      updatedBy
      updatedDate
    }
  }
`;

export const UPDATE_CORPORATE_CLIENT = gql`
  mutation UpdateCorporateClient(
    $id: Int!
    $contactNumber: String
    $email: String
    $address: String
    $dateAdded: DateTime
    $notes: String
    $companyName: String
    $registrationNumber: String
    $industrySector: String
    $contactPersonName: String
    $contactPersonPosition: String
    $contactPersonEmail: String
    $contactPersonPhone: String
    $companyAddress: String
    $billingAddress: String
    $incorporationDate: DateTime
    $legalStructure: String
    $countryOfIncorporation: String
    $taxIdentificationNumber: String
    $authorizedSignatoryName: String
    $authorizedSignatoryPosition: String
    $authorizedSignatoryEmail: String
    $authorizedSignatoryPhone: String
    $isActive: Byte
    $statusFlag: Byte
    $createdBy: Int
    $createdDate: DateTime
    $updatedBy: Int
    $updatedDate: DateTime
    $companyId: Int
    $company: String
  ) {
    updateCorporateClient(
      updatedCorporateClient: {
        id: $id
        contactNumber: $contactNumber
        email: $email
        address: $address
        dateAdded: $dateAdded
        notes: $notes
        companyName: $companyName
        registrationNumber: $registrationNumber
        industrySector: $industrySector
        contactPersonName: $contactPersonName
        contactPersonPosition: $contactPersonPosition
        contactPersonEmail: $contactPersonEmail
        contactPersonPhone: $contactPersonPhone
        companyAddress: $companyAddress
        billingAddress: $billingAddress
        incorporationDate: $incorporationDate
        legalStructure: $legalStructure
        countryOfIncorporation: $countryOfIncorporation
        taxIdentificationNumber: $taxIdentificationNumber
        authorizedSignatoryName: $authorizedSignatoryName
        authorizedSignatoryPosition: $authorizedSignatoryPosition
        authorizedSignatoryEmail: $authorizedSignatoryEmail
        authorizedSignatoryPhone: $authorizedSignatoryPhone
        isActive: $isActive
        statusFlag: $statusFlag
        createdBy: $createdBy
        createdDate: $createdDate
        updatedBy: $updatedBy
        updatedDate: $updatedDate
        companyId: $companyId
        company: $company
      }
    ) {
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

//#endregion


