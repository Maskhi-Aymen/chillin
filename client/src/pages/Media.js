import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HotelIcon from '@mui/icons-material/Hotel';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import PlayLists from '../components/Playlist/PlayLists';
import MusicList from '../components/player/menulist';
import Meditate from './meditate';

const theme = createTheme({
  status: {
    danger: '#9D818A',
  },
  palette: {
    primary: {
      main: '#F4ACB7',
      darker: '#9D818A',
    },
    neutral: {
      main: '#9D818A',
      contrastText: '#9D818A',
    },
  },
});
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Media() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
   
    <ThemeProvider theme={theme}>
     <div className='yellocard'>
    <Box sx={{ backgroundColor:'#FFE5D9' , width: '100%', minHeight:'100%' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="neutral.main"
          textColor="neutral"
          variant="fullWidth"
          aria-label="primary tabs example"
          sx={{backgroundColor: '#F4ACB7' }}
        >
          <Tab icon={<LibraryMusicIcon />}  label="Playlistes" {...a11yProps(0)} />
          <Tab icon={<SelfImprovementIcon />}  label="Meditate" {...a11yProps(1)} />
          <Tab icon={<HotelIcon />}  label="Sleep" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction} >
          <PlayLists/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
         <Meditate/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <MusicList/>
        </TabPanel>
      </SwipeableViews>
    </Box></div></ThemeProvider>
  );
}
