import React from "react";
import { Tabs as MuiTabs, Tab, Box } from "@mui/material";

// Custom TabPanel Component
function TabPanel(props: {
  children?: React.ReactNode;
  index: number;
  value: number;
}) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`mui-tabpanel-${index}`}
      aria-labelledby={`mui-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

// Main Tabs Component
const Tabs = ({
  tabs,
}: {
  tabs: {
    label: React.ReactNode;
    content: React.ReactNode;
  }[];
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <MuiTabs value={value} onChange={handleChange}>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            id={`mui-tab-${index}`}
            aria-controls={`mui-tabpanel-${index}`}
          />
        ))}
      </MuiTabs>
      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.content}
        </TabPanel>
      ))}
    </Box>
  );
};

export default Tabs;
