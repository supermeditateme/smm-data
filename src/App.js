import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Home from './components/Home'
import Behavioral from './components/Behavioral'
import Serum from './components/Serum'
import SerumGC from './components/SerumGC'
import SerumHILICNEG from './components/SerumHILICNEG'
import SerumHILICPOS from './components/SerumHILICPOS'
import EEGList from './components/EEGList'
import EEG from './components/EEG'
import MRI from './components/MRI'
import Genomic from './components/Genomic'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://onwardproductions.org">
        Onward Productions
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(6),
  },
}));


  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(() =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: "#102b45"
          },
          secondary: {
            main: prefersDarkMode ? "#fbbe00" : '#102b45'
          }
        },
      }),
    [prefersDarkMode],
  );

  const classes = useStyles();
  
  return (
    <ThemeProvider theme={theme}>
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Super Meditate Me - Data Explorer
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
      <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/behavioral" component={Behavioral} />
        {/*<Route exact path="/timeline">
          <Redirect push to={"/timeline.html"}/>
        </Route>*/}
        <Route path="/serum" exact component={Serum} />
        <Route path="/serum/gc" exact component={SerumGC} />
        <Route path="/serum/hilicneg" exact component={SerumHILICNEG} />
        <Route path="/serum/hilicpos" exact component={SerumHILICPOS} />
        <Route path="/eeglist" exact component={EEGList} />
        <Route path="/eeg" component={EEG} />
        <Route path="/mri" component={MRI} />
        <Route path="/dna" component={Genomic} />
      </Switch>
        </Router>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          <Link href="mailto:duncan@supermeditate.me" color="secondary">duncan@supermeditate.me</Link>
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
    </ThemeProvider>
  );
}