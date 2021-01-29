import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PricingPapas from './type/PricingPapas'
import PricingMaestros from './type/PricingMaestros'
import PricingEscuelas from './type/PricingEscuelas'
import Button from '@material-ui/core/Button';
import reducer from './store';
import { useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';

function PricingApp(props) {
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
        <Box>
          <Typography>{children}</Typography>
          </Box>
      )}

          <div className="p-24 w-full max-w-2xl mx-auto">
              <div className="text-center my-128 mx-24">
                  <Typography className="text-20 mb-8">¿Tienes alguna duda?</Typography>
                  <Typography className="text-16" color="textSecondary">
                      Ponte en contacto con nosotros.
				  </Typography>
                  <Button variant="contained" color="primary" className="m-24">
                      Contáctanos
				  </Button>
              </div>
          </div>
      </div>
  );
}

PricingPapas.propTypes = {

  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Alumnos" {...a11yProps(0)} />
          <Tab label="Maestros" {...a11yProps(1)} />
          <Tab label="Escuelas" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <PricingApp value={value} index={0} dir={theme.direction}>
            <PricingPapas />
        </PricingApp>
        <PricingApp value={value} index={1} dir={theme.direction}>
          <PricingMaestros/>
        </PricingApp>
        <PricingApp value={value} index={2} dir={theme.direction}>
          <PricingEscuelas/>
        </PricingApp>
      </SwipeableViews>
    </div>
  );
}