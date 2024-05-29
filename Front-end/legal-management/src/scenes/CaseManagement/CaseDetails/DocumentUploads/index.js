import { Box } from "@mui/material";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import DynamicTable from "../../../../data/DynamicTable/dynamicTable";
import { caseManagementUrl } from "../../../../config";
import DocumentUploadForm from "./Form";
import { DocumentUploadColumns } from "../../../../data/DynamicTable/Collumns";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataEngine } from "../../../../data/Axios/DynamicService";
import { PulseLoader } from "react-spinners";
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { tokens } from "../../../../theme";
import { useTheme } from "@mui/material";
import { UpdateDataToStore } from "../../../../store/Actions/CustomAction";

const base_url = caseManagementUrl.uri;

const staticDocumentData = [
  {
    id: 1,
    caseId: 10,
    file: "https://calibre-ebook.com/downloads/demos/demo.docx",
    fileType: "docx",
    fileName: "demo.docx"
  },
  // Uncomment and add more documents if neededs
  {
    id: 2,
    caseId: 10,
    file: "https://sample-videos.com/xls/Sample-Spreadsheet-10-rows.xls",
    fileType: "xls",
    fileName: "Sample.xls"
  },
  {
    id: 3,
    caseId: 10,
    file: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    fileType: "pdf",
    fileName: "Test.pdf"
  },
];

const docs = [
  // Remote online word document
  {
    uri: "https://calibre-ebook.com/downloads/demos/demo.docx",
    fileType: "docx",
    fileName: "demo.docx"
  },
  // Remote spreadsheet
  {
    uri: "https://sample-videos.com/xls/Sample-Spreadsheet-10-rows.xls",
    fileType: "xls",
    fileName: "Sample.xls"
  },
  // Remote pdf file
  {
    uri: "https://www.tru.ca/__shared/assets/cover-letter-template-33250.pdf",
    // uri: "https://www.clickdimensions.com/links/TestPDFfile.pdf",
    fileType: "pdf",
    fileName: "Test.pdf"
  },
  // Local PDF file
  {
    uri: require("../../../../files/Newsletter.pdf"),
    fileType: "pdf",
    fileName: "Newsletter.pdf"
  },
  // Local Image
  {
    uri: require("../../../../files/DMS.jpg"),
    fileType: "jpg",
    fileName: "DMS.jpg"
  },

];

const actions = {
  viewDocument: {
    key: "VIEW_DOCUMENT",
    button_name: "Open Document",
    Show_Button: true,
  },
};

function DocumentUploads() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const caseId = JSON.parse(localStorage.getItem("CaseId"));
  const dispatch = useDispatch();

  const [viewState, setViewState] = useState({
    viewTable: true,
    viewDocument: false,
  });

  const storeData = useSelector((state) => state.custom.customData);

  useEffect(() => {
    if (storeData !== null) {
      setViewState({
        viewTable: false,
        viewDocument: true,
      });
    }
    else {
      setViewState({
        viewTable: true,
        viewDocument: false,
      });
    }
  }, [storeData]);

  const handleClose = () => {
    dispatch(UpdateDataToStore(null));
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {

    try {
      const returnFields = [
        "id",
        "caseId",
        "courtId",
        "assignedDate",
        "createdBy",
        "createdDate",
        "companyId",
        "company",
      ];

      const inputFields = {
        caseId: caseId,
      };

      // Uncomment the following line to fetch data from API
      // const documentData = await fetchDataEngine(
      //   "allCourtAssignmentsByColumnValues",
      //   "courtAssignmentModel",
      //   inputFields,
      //   returnFields,
      //   base_url
      // );

      // Using static data for demonstration
      if (staticDocumentData) {
        setData(staticDocumentData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box m="2px">
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <PulseLoader size={10} color={"#3f51b5"} />
        </Box>
      ) : viewState.viewTable ? (
        <DynamicTable
          title="Document Uploads"
          subtitle="Manage all documents related to the case"
          columns={DocumentUploadColumns}
          FormComponent={DocumentUploadForm}
          DataFromGetBy={data}
          actions={actions}
        />
      ) : viewState.viewDocument ? (
        <Box>
          <Box display="flex" justifyContent="end" my="0.15rem">
            <Button
              type="button"
              color="warning"
              variant="outlined"
              startIcon={<CloseIcon />}
              onClick={() => handleClose()}
            >
              Close
            </Button>
          </Box>
          <DocViewer
            documents={docs}
            pluginRenderers={DocViewerRenderers}
            style={{ height: 1000, width: '100%' }}
            theme={{
              primary: "#454545",
              secondary: "#7E7E7E",
              tertiary: "#DADADA",
              textPrimary: "#ffffff",
              textSecondary: "#5296d8",
              textTertiary: "#00000099",
              disableThemeScrollbar: false,
            }}
          />
        </Box>
      ) : null}
    </Box>
  );
}

export default DocumentUploads;
