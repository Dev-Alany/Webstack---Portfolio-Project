import { gql } from "@apollo/client";

export const ALL_MODULES = gql`
  query AllModules {
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
export const ALL_RIGHTS = gql`
  query AllRights {
    allRights {
      id
      title
      icon
      action
      moduleId
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
export const ALL_ROLEGROUPS = gql`
  query AllRoleGroups {
    allRoleGroups {
      id
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

export const ALL_ROLE = gql`
  query Role {
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
export const CREATE_RIGHT = gql`
  mutation CreateRight(
    $title: String
    $icon: String
    $action: String
    $moduleId: Int
    $module: String
    $createdBy: Int!
    $companyId: Int
    $company: String
  ) {
    createRight(
      newRight: {
        title: $title
        icon: $icon
        action: $action
        moduleId: $moduleId
        module: $module
        createdBy: $createdBy
        companyId: $companyId
        company: $company
      }
    ) {
      id
      title
      icon
      action
      moduleId
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
export const UPDATE_RIGHT = gql`
  mutation UpdateRight(
    $id: Int
    $title: String
    $icon: String
    $action: String
    $moduleId: Int
    $module: String
    $createdBy: Int!
    $companyId: Int
    $company: String
  ) {
    updateRight(
      updatedRight: {
        id: $id
        title: $title
        icon: $icon
        action: $action
        moduleId: $moduleId
        module: $module
        createdBy: $createdBy
        companyId: $companyId
        company: $company
        isActive:true
      }
    ) {
      id
      title
      icon
      action
      moduleId
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

export const CREATE_MODULE = gql`
  mutation CreateModule(
    $id: Int
    $module: String
    $createdBy: Int
    $companyId: Int
    $company: String
    $isActive: Boolean
  ) {
    createModule(
      newModule: {
        id: $id
        module: $module
        createdBy: $createdBy
        companyId: $companyId
        company: $company
        isActive: $isActive
      }
    ) {
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
export const UPDATE_MODULE = gql`
  mutation UpdateModule(
    $id: Int
    $module: String
    $createdBy: Int
    $companyId: Int
    $company: String
    $isActive: Boolean!
  ) {
    updateModule(
      updatedModule: {
        id: $id
        module: $module
        createdBy: $createdBy
        companyId: $companyId
        company: $company
        isActive: $isActive
      }
    ) {
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
export const CREATE_ROLE_GROUP = gql`
  mutation CreateRoleGroup(
    $id: Int
    $roleGroup: String
    $createdBy: Int
    $companyId: Int
    $company: String
  ) {
    createRoleGroup(
      newRoleGroup: {
        id: $id
        roleGroup: $roleGroup
        createdBy: $createdBy
        companyId: $companyId
        company: $company
      }
    ) {
      id
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
export const UPDATE_ROLE_GROUP = gql`
  mutation UpdateRoleGroup(
    $id: Int
    $roleGroup: String
    $createdBy: Int
    $companyId: Int
    $company: String
  ) {
    updateRoleGroup(
      updatedRoleGroup: {
        id: $id
        roleGroup: $roleGroup
        createdBy: $createdBy
        companyId: $companyId
        company: $company
      }
    ) {
      id
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

export const CREATE_ROLE = gql`
  mutation CreateRole(
    $id: Int
    $role: String
    $roleDescription: String
    $roleGroupId: Int
    $roleGroup: String
    $createdBy: Int
    $companyId: Int
    $company: String
  ) {
    createRole(
      newRole: {
        id: $id
        role: $role
        roleDescription: $roleDescription
        roleGroupId: $roleGroupId
        roleGroup: $roleGroup
        createdBy: $createdBy
        companyId: $companyId
        company: $company
      }
    ) {
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

export const UPDATE_ROLE = gql`
  mutation UpdateRole(
    $id: Int
    $role: String
    $roleDescription: String
    $roleGroupId: Int
    $roleGroup: String
    $createdBy: Int
    $companyId: Int
    $company: String
  ) {
    updateRole(
      updatedRole: {
        id: $id
        role: $role
        roleDescription: $roleDescription
        roleGroupId: $roleGroupId
        roleGroup: $roleGroup
        createdBy: $createdBy
        companyId: $companyId
        company: $company
      }
    ) {
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

export const ALL_ROLE_RIGHTS = gql`
  query AllModuleRights {
    allModuleRights
  }
`;
export const ALL_ROLE_RIGHTS_BY_ROLE = gql`
  query ModuleRightsByRoleId($roleId: Int!) {
    moduleRightsByRoleId(roleId: $roleId)
  }
  
`;
export const CREATE_ROLE_RIGHTS = gql`
  mutation CreateRoleRight(
    $roleId: Int!
    $role: String
    $rightId: Int!
    $moduleId: Int!
    $right: String
    $createPermission: Byte
    $editPermission: Byte
    $activatePermission: Byte
    $exportPermission: Byte
    $createdBy: Int!
    $companyId: Int
    $company: String
  ) {
    createRoleRight(
      newRoleRight: {
        roleId: $roleId
        role: $role
        rightId: $rightId
        right: $right
        moduleId: $moduleId
        createPermission: $createPermission
        editPermission: $editPermission
        activatePermission: $activatePermission
        exportPermission: $exportPermission
        isActive: true
        createdBy: $createdBy
        companyId: $companyId
        company: $company
      }
    ) {
      id
      roleId
      role
      rightId
      right
      createPermission
      editPermission
      activatePermission
      exportPermission
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
export const CREATE_ROLE_RIGHTS_BULK = gql`
  mutation CreateRoleRightsBulk($newRoleRights: [RoleRightsInput]!) {
    createRoleRightsBulk(newRoleRights: $newRoleRights) {
      id
      roleId
      role
      moduleId
      module
      rightId
      right
      createPermission
      editPermission
      activatePermission
      exportPermission
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
export const ACTIVATE_RIGHT = gql`
  mutation ActivateRight($id: ID!) {
    activateRight(id: $id) {
      id
      isActive
    }
  }
`;

export const DEACTIVATE_RIGHT = gql`
  mutation DeactivateRight($id: ID!) {
    deactivateRight(id: $id) {
      id
      isActive
    }
  }
`;