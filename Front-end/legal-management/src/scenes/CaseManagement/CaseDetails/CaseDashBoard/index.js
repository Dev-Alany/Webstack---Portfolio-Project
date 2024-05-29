import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import { mockTransactions } from "../../../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../../../components/Header";
import StatBox from "./StatBox";
import ProgressCircle from "../../../../components/ProgressCircle";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import GavelIcon from '@mui/icons-material/Gavel';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ChatIcon from '@mui/icons-material/Chat';
import TaskIcon from '@mui/icons-material/Task';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';



const CaseDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const topTasks = ['Event 1', 'Event 2', 'Event 3', 'Event 4', 'Event 5'];
  const numTasks = 10;
  const numDocs = 15;
  const numTeamMembers = 5;
  const counts = 20;
  const sums = 100;
  const averages = 20;
  
    const data = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 7000 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 8000 },
  ];
  const data2 = [
  { name: 'Jan', value: 2000 },
  { name: 'Feb', value: 1500 },
  { name: 'Mar', value: 2500 },
  { name: 'Apr', value: 3000 },
  { name: 'May', value: 2200 },
  { name: 'Jun', value: 3500 },
];

  return (
    <Box m="20px" >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="20px" >
        <Header title="CASE DASHBOARD" subtitle="Welcome to Case Dashboard" sx={{marginTop:"20px"}} />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Case Reports
          </Button>
        </Box> */}
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="10px"
        
         
      >
        {/* ROW 1 */}
        
        <Box
          ggridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
          padding="20px"
          margin="10px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          // borderRadius= "0.75rem"
          border= "1px solid #7E7E7E"
        >
          <StatBox
            title="259,225"
            subtitle="Judge Assignment"
            progress="0.50"
            increase="+21%"
            icon={
              <GavelIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
          padding="20px"
          margin="10px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          // borderRadius= "0.75rem"
          border= "1px solid #7E7E7E"
        >
          <StatBox
            title="97,225"
            subtitle="Court Assignments"
            progress="0.50"
            increase="+21%"
            icon={
              <AssignmentTurnedInIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
       
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
          margin="10px"
          padding="20px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          // borderRadius= "0.75rem"
          border= "1px solid #7E7E7E"
        >
          <StatBox
            title="32,134"
            subtitle="Fact Recording"
            progress="0.80"
            increase="+43%"
            icon={
              <FactCheckIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          marginRight="10px"
          margin="10px"
          borderRadius="10px"
          // borderRadius= "0.75rem"
          border= "1px solid #7E7E7E"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
            
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Events
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
             
            </Box>
          ))}
        </Box>
          {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          borderRadius= "0.75rem"
          border= "1px solid #7E7E7E"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
            borderRadius= "0.75rem"
            border= "1px solid #7E7E7E"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Events
            </Typography>
          </Box>
          {topTasks.map((task, i) => (
            <Box
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {task}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box> */}
       
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
          margin="10px"
          padding="20px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          // borderRadius= "0.75rem"
          border= "1px solid #7E7E7E"
        >
          <StatBox
            title="10"
            subtitle="Tasks"
            progress="0.60"
            increase="+12%"
            icon={
              <TaskIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="10px"
        padding="20px"
        boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        // borderRadius= "0.75rem"
          border= "1px solid #7E7E7E"
        >
          <StatBox
            title="15"
            subtitle="Documents"
            progress="0.40"
            increase="+8%"
            icon={
              <AccountBalanceIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
         
        

        {/* ROW 2 */}
        <Box
          gridColumn="span 3"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          // borderRadius= "0.75rem"
          border= "1px solid #7E7E7E"
          borderRadius="10px"
          margin="10px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
            
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Upcoming Events
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
             
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        
        <Box
          gridColumn="span 4"
          // gridRow="span 2"
          backgroundColor={colors.primary[400]}
          // p="30px"
          // borderRadius= "0.75rem"
          border= "1px solid #7E7E7E"
          borderRadius="10px"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
        >
          <Typography variant="h5" fontWeight="600">
            Task Progress
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="40" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              324,156 Task
            </Typography>
            <Typography>Includes extra Task  </Typography>
          </Box>
        </Box>
        
        <Box
          gridColumn="span 5"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          marginRight="10px"
          // borderRadius= "0.75rem"
          boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
          border= "1px solid #7E7E7E"
          borderRadius="10px"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
            
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Tasks
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
             
            </Box>
          ))}
        </Box>
                
 
       <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          margin="10px"
          sx={{p:3}}
          // borderRadius= "0.75rem"
          border= "1px solid #7E7E7E"
          borderRadius="10px"
          
        >
          <StatBox
            title="5"
            subtitle="Team Members"
            progress="0.50"
            increase="+5%"
            icon={
              <GroupAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          p="30px"
          marginBottom="10px"
          // margin="30"
          // borderRadius="0.75rem"
          paddingLeft="30%"
          border="1px solid #7E7E7E"
          borderRadius="10px"
        >
          <Typography variant="h5" fontWeight="500">
            Chat
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            // mt="10px"
          >
            <ChatIcon sx={{ fontSize: "40px", color: colors.greenAccent[500] }} />
            
            <Typography align="center">Communication within the case team</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 5"
          gridRow="span 1"
          backgroundColor={colors.primary[400]}
          p="40px"
           marginBottom="10px"
          marginRight="10px"
          // borderRadius="0.75rem"
          border="1px solid #7E7E7E"
          borderRadius="10px"
        >
          <Typography variant="h5" fontWeight="500">
            Chat
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            // mt="10px"
          >
            <ChatIcon sx={{ fontSize: "30px", color: colors.greenAccent[500] }} />
            
            <Typography align="center">Communication within the case team</Typography>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default CaseDashboard;
