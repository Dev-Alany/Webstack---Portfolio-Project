import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import Header from "../../components/Header";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const docs = [
    {
      uri: "https://calibre-ebook.com/downloads/demos/demo.docx",
      fileType: "docx",
      fileName: "demo.docx",
    }, // Remote file // Remote file
    {
      uri: "https://sample-videos.com/xls/Sample-Spreadsheet-10-rows.xls",
      fileType: "xls",
      fileName: "Sample.xls",
    }, // Local File
    {
      uri: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
      fileType: "pdf",
      fileName: "Test.pdf",
    }, // Local File
    {
      uri: require("../../files/Newsletter.pdf"),
      fileType: "pdf",
      fileName: "Newsletter.pdf",
    }, // Local File
    {
      uri: require("../../files/DMS.jpg"),
      fileType: "jpg",
      fileName: "DMS.jpg",
    }, // Local File
  ];

  return (
    <Box m="10px">
      <Header title="Team" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[600],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[600],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DocViewer
          documents={docs}
          pluginRenderers={DocViewerRenderers}
          style={{ height: 1000 }}
          theme={{
            primary: "#5296d8",
            secondary: "#ffffff",
            tertiary: "#5296d899",
            textPrimary: "#ffffff",
            textSecondary: "#5296d8",
            textTertiary: "#00000099",
            disableThemeScrollbar: false,
          }}
        />
      </Box>
    </Box>
  );
};

export default Team;
