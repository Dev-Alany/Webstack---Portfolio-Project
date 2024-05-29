import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from '../../../../theme';
import ProgressCircle from '../../../../components/ProgressCircle';


const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < parseInt(title.replace(/,/g, ''))) {
        setCount(count + Math.ceil(parseInt(title.replace(/,/g, '')) * 0.01));
      } else {
        setCount(parseInt(title.replace(/,/g, '')));
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [count, title]);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {count.toLocaleString()}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
