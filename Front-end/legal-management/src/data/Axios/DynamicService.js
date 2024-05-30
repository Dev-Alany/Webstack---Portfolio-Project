// import axios from "axios";
// import { roleManagemenUrl } from "../../config";
// const role_baseUrl = roleManagemenUrl.uri;
// const token = localStorage.getItem("token");
// const formattedToken = `Bearer ${token?.replace(/"/g, "")}`;
// const headers = {
//   Authorization: formattedToken,
//   "Content-Type": "application/json",
// };

// export async function graphqlQuery(query, base_url) {
//   try {
//     const postData = {
//       query,
//     };

//     const response = await axios.post(base_url, postData, { headers });

//     const dataObject = Object.values(response.data.data)[0];
//     return dataObject;
//   } catch (error) {
//     throw error;
//   }
// }
// export async function fetchAllData(query) {
//   try {
//     const data = await graphqlQuery(query);
//     return data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// }

// export function generateMutation(
//   mutationName,
//   inputObjectName,
//   inputFields,
//   InputObject
// ) {
//   let mutation = `mutation ${mutationName} {`;
//   mutation += `${inputObjectName}(`;
//   mutation += `${InputObject}: {`;
//   const inputEntries = Object.entries(inputFields);
//   inputEntries.forEach(([key, value], index) => {
//     mutation += `${key}: ${JSON.stringify(value)}`;

//     if (index < inputEntries.length - 1) {
//       mutation += ", ";
//     }
//   });
//   mutation += `}`;
//   mutation += `) {
//     id
//     ${Object.keys(inputFields).join("\n")} 
//   }
// }`;
//   return mutation;
// }
// export async function graphqlMutation(mutation, base_url) {
//   try {
//     const postData = {
//       query: mutation,
//     };
//     const response = await axios.post(base_url, postData, { headers });

//     return response.data.data;
//   } catch (error) {
//     throw error;
//   }
// }
// export async function graphqlQueryEngine(query, base_url) {
//   try {
//     const postData = {
//       query,
//     };
//     // export function generateBulkMutation(operationName, mutationFields, dataArray) {
//     //   let mutation = `mutation {
//     //     ${operationName}(
//     //       ${mutationFields}: [`;

//     //   // Iterate over the data array to construct mutation entries
//     //   dataArray.forEach((data, index) => {
//     //     mutation += `{
//     //       ${Object.entries(data)
//     //         .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
//     //         .join("\n")}
//     //     }`;

//     //     // Add comma if not the last entry
//     //     if (index < dataArray.length - 1) {
//     //       mutation += ",";
//     //     }
//     //   });

//     //   // Close the mutation string
//     //   mutation += `]
//     //   ) {
//     //     ${Object.keys(dataArray[0]).join("\n")}
//     //   }
//     // }`;

//     //   return mutation;
//     // }

//     const response = await axios.post(base_url, postData, { headers });

//     return response.data.data;
//   } catch (error) {
//     console.error("Error executing GraphQL query:", error);
//     throw error;
//   }
// }

// export function generateQuery(queryName, modelName, inputFields, returnFields) {
//   let query = `query { ${queryName}(`;

//   if (Object.keys(inputFields).length > 0) {
//     query += `${modelName}: {`;
//     const inputEntries = Object.entries(inputFields);
//     inputEntries.forEach(([key, value], index) => {
//       query += `${key}: ${JSON.stringify(value)}`;
//       if (index < inputEntries.length - 1) {
//         query += ", ";
//       }
//     });
//     query += `}`;
//   }
//   query += `)`;

//   const returnFieldStrings = returnFields.join("\n");
//   query += ` { ${returnFieldStrings} } }`;

//   return query;
// }

// export async function fetchDataEngine(
//   queryName,
//   modelName,
//   inputFields,
//   returnFields,
//   baseurl
// ) {
//   try {
//     const query = generateQuery(
//       queryName,
//       modelName,
//       inputFields,
//       returnFields
//     );
//     const data = await graphqlQuery(query, baseurl);
//     return data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// }

// export async function generateAndExecuteBulkMutation(
//   operationName,
//   mutationFields,
//   dataArray,
//   base_url
// ) {
//   try {
//     // Generate the mutation string
//     let mutation = `mutation {
//       ${operationName}(
//         ${mutationFields}: [`;

//     // Iterate over the data array to construct mutation entries
//     dataArray.forEach((data, index) => {
//       mutation += `{
//         ${Object.entries(data)
//           .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
//           .join("\n")}
//       }`;

//       // Add comma if not the last entry
//       if (index < dataArray.length - 1) {
//         mutation += ",";
//       }
//     });

//     // Close the mutation string
//     mutation += `]
//       ) {
//         ${Object.keys(dataArray[0]).join("\n")}
//       }
//     }`;

//     const postData = { query: mutation };
//     const response = await axios.post(base_url, postData, { headers });

//     return response.data.data;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function generateAndExecuteMutation(
//   inputObjectName,
//   inputFields,
//   InputObject,
//   base_url
// ) {
//   try {
//     // Generate the mutation string
//     let mutation = `mutation {`;
//     mutation += `${inputObjectName}(`;
//     mutation += `${InputObject}: {`;
//     const inputEntries = Object.entries(inputFields);
//     inputEntries.forEach(([key, value], index) => {
//       mutation += `${key}: ${JSON.stringify(value)}`;

//       if (index < inputEntries.length - 1) {
//         mutation += ", ";
//       }
//     });
//     mutation += `}`;
//     mutation += `) {
//       id
//       ${Object.keys(inputFields).join("\n")}
//     }
//   }`;

//     // Execute the GraphQL mutation
//     const postData = { query: mutation };
//     const response = await axios.post(base_url, postData, { headers });

//     return response.data.data;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function uploadDocument(
//   action,
//   file,
//   dataObject,
//   base_url
// ) {
//   // Ensure a file is provided
//   if (!file) {
//     throw new Error("No file provided for upload.");
//   }

//   // Create a FormData object to hold the file
//   const formData = new FormData();
//   formData.append('file', file);

//   try {
//     // Make the POST request to upload the file
//     const response = await axios.post(base_url, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     // Return the response data
//     return response.data;
//   } catch (error) {
//     // Handle any errors that occur during the upload
//     console.error("Error uploading the document:", error);
//     throw error;
//   }
// }

// export async function GetRoleRightsByRoleId(roleId) {
//   try {

//     const postData = {
//       query: `
//     {
//       moduleRightsByRoleId(roleId: ${roleId})
//     }
//         `,
//     };
//     const response = await axios.post(role_baseUrl, postData, { headers });
//     return response.data.data.moduleRightsByRoleId;
//   } catch (error) {
//     let error_messages = error.response.data.errors;
//     throw error;
//   }
// }
