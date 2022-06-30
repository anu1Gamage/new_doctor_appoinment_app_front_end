import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AdminNavBar from './AdminNavBar';
import { Container } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ViewAlllist() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <AdminNavBar/>
    <Container maxWidth="lg">
    <Box sx={{ width: '100%', boxShadow:2, borderRadius:3, marginTop:5 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label=" Patient List" {...a11yProps(0)} />
          <Tab label="Doctor List" {...a11yProps(1)} />
          <Tab label="Reception List" {...a11yProps(2)} />
          <Tab label="Pharmacits List" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Patient List
      </TabPanel>
      <TabPanel value={value} index={1}>
        Doctor List
      </TabPanel>
      <TabPanel value={value} index={2}>
        Reception List
      </TabPanel>
      <TabPanel value={value} index={3}>
        Pharmacits List
      </TabPanel>
    </Box>
    </Container>
    
    </>

  );
}
