import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function EEGList() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(() =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
        spacing: 4
      }),
    [prefersDarkMode],
  );
  const useStyles = makeStyles((theme) => ({
  table: {
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    backgroundImage: `url(${"./header_eeg.jpg"})`,
    backgroundColor: `rgba(0,0,0,0.725)`,
    backgroundBlendMode: 'multiply',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

  const classes = useStyles();
  

function createData(name, href, date, duration, intervention, activity, raw) {
  return { name, href, date, duration, intervention, activity, raw};
}

const rows = [
  createData('Pre-Intervention 1 (Video Game)', "/eeg?edf=duncan-video-game-08.01.16-20.45.55.edf", "8/1/2016", 45, "None", "Video Game", "/raw/eeg/duncan-video-game-08.01.16-20.45.55.edf"),
  createData('Pre-Intervention 2 (Video Game)', "/eeg?edf=duncan-video-game-08.02.16-20.40.11.edf", "8/2/2016", 44, "None", "Video Game", "/raw/eeg/duncan-video-game-08.02.16-20.40.11.edf"),
  createData('Pre-Intervention 3 (Video Game)', "/eeg?edf=duncan-video-game-08.07.16-17.04.24.edf", "8/7/2016", 50, "None", "Video Game", "/raw/eeg/duncan-video-game-08.07.16-17.04.24.edf"),
  createData('Meditation Intervention 08.13.16', "/eeg?edf=duncan-meditating-08.13.16-18.51.27.edf", "08.13.16", 28, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.13.16-18.51.27.edf"),
  createData('Meditation Intervention 08.14.16', "/eeg?edf=duncan-meditating-08.14.16-18.16.57.edf", "08.14.16", 34, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.14.16-18.16.57.edf"),
  createData('Meditation Intervention 08.15.16', "/eeg?edf=duncan-meditating-08.15.16-17.56.20.edf", "08.15.16", 48, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.15.16-17.56.20.edf"),
  createData('Meditation Intervention 08.16.16', "/eeg?edf=duncan-meditating-08.16.16-17.46.10.edf", "08.16.16", 41, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.16.16-17.46.10.edf"),
  createData('Meditation Intervention 08.17.16', "/eeg?edf=duncan-meditating-08.17.16-18.33.38.edf", "08.17.16", 61, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.17.16-18.33.38.edf"),
  createData('Meditation Intervention 08.18.16', "/eeg?edf=duncan-meditating-08.18.16-18.28.42.edf", "08.18.16", 28, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.18.16-18.28.42.edf"),
  createData('Meditation Intervention 08.19.16', "/eeg?edf=duncan-meditating-08.19.16-18.42.00.edf", "08.19.16", 29, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.19.16-18.42.00.edf"),
  createData('Meditation Intervention 08.20.16', "/eeg?edf=duncan-meditating-08.20.16-18.11.37.edf", "08.20.16", 57, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.20.16-18.11.37.edf"),
  createData('Meditation Intervention 08.22.16', "/eeg?edf=duncan-meditating-08.22.16-17.59.09.edf", "08.22.16", 37, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.22.16-17.59.09.edf"),
  createData('Meditation Intervention 08.23.16', "/eeg?edf=duncan-meditating-08.23.16-18.41.18.edf", "08.23.16", 26, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.23.16-18.41.18.edf"),
  createData('Meditation Intervention 08.24.16', "/eeg?edf=duncan-meditating-08.24.16-18.39.32.edf", "08.24.16", 57, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.24.16-18.39.32.edf"),
  createData('Meditation Intervention 08.25.16', "/eeg?edf=duncan-meditating-08.25.16-18.18.30.edf", "08.25.16", 40, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.25.16-18.18.30.edf"),
  createData('Meditation Intervention 08.26.16', "/eeg?edf=duncan-meditating-08.26.16-19.57.35.edf", "08.26.16", 50, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.26.16-19.57.35.edf"),
  createData('Meditation Intervention 08.27.16', "/eeg?edf=duncan-meditating-08.27.16-17.28.58.edf", "08.27.16", 41, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.27.16-17.28.58.edf"),
  createData('Meditation Intervention 08.28.16', "/eeg?edf=duncan-meditating-08.28.16-18.14.51.edf", "08.28.16", 43, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.28.16-18.14.51.edf"),
  createData('Meditation Intervention 08.29.16', "/eeg?edf=duncan-meditating-08.29.16-18.35.38.edf", "08.29.16", 56, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.29.16-18.35.38.edf"),
  createData('Meditation Intervention 08.30.16', "/eeg?edf=duncan-meditating-08.30.16-17.49.56.edf", "08.30.16", 47, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.30.16-17.49.56.edf"),
  createData('Meditation Intervention 08.31.16', "/eeg?edf=duncan-meditating-08.31.16-17.12.17.edf", "08.31.16", 17, "Yes", "Meditation", "/raw/eeg/duncan-meditating-08.31.16-17.12.17.edf"),
  createData('Meditation Intervention 09.01.16', "/eeg?edf=duncan-meditating-09.01.16-13.57.55.edf", "09.01.16", 56, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.01.16-13.57.55.edf"),
  createData('Meditation Intervention 09.04.16', "/eeg?edf=duncan-meditating-09.04.16-17.46.12.edf", "09.04.16", 49, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.04.16-17.46.12.edf"),
  createData('Meditation Intervention 09.06.16', "/eeg?edf=duncan-meditating-09.06.16-18.52.14.edf", "09.06.16", 54, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.06.16-18.52.14.edf"),
  createData('Meditation Intervention 09.07.16', "/eeg?edf=duncan-meditating-09.07.16-08.14.32.edf", "09.07.16", 65, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.07.16-08.14.32.edf"),
  createData('Meditation Intervention 09.08.16', "/eeg?edf=duncan-meditating-09.08.16-19.54.45.edf", "09.08.16", 31, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.08.16-19.54.45.edf"),
  createData('Meditation Intervention 09.09.16', "/eeg?edf=duncan-meditating-09.09.16-17.44.13.edf", "09.09.16", 93, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.09.16-17.44.13.edf"),
  createData('Meditation Intervention 09.10.16', "/eeg?edf=duncan-meditating-09.10.16-16.49.28.edf", "09.10.16", 64, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.10.16-16.49.28.edf"),
  createData('Meditation Intervention 09.11.16', "/eeg?edf=duncan-meditating-09.11.16-07.53.48.edf", "09.11.16", 32, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.11.16-07.53.48.edf"),
  createData('Meditation Intervention 09.12.16', "/eeg?edf=duncan-meditating-09.12.16-17.49.09.edf", "09.12.16", 66, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.12.16-17.49.09.edf"),
  createData('Meditation Intervention 09.13.16', "/eeg?edf=duncan-meditating-09.13.16-17.43.07.edf", "09.13.16", 91, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.13.16-17.43.07.edf"),
  createData('Meditation Intervention 09.14.16', "/eeg?edf=duncan-meditating-09.14.16-17.31.49.edf", "09.14.16", 63, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.14.16-17.31.49.edf"),
  createData('Meditation Intervention 09.15.16', "/eeg?edf=duncan-meditating-09.15.16-18.55.22.edf", "09.15.16", 17, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.15.16-18.55.22.edf"),
  createData('Meditation Intervention 09.16.16', "/eeg?edf=duncan-meditating-09.16.16-16.22.53.edf", "09.16.16", 99, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.16.16-16.22.53.edf"),
  createData('Meditation Intervention 09.18.16', "/eeg?edf=duncan-meditating-09.18.16-19.11.02.edf", "09.18.16", 67, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.18.16-19.11.02.edf"),
  createData('Meditation Intervention 09.20.16', "/eeg?edf=duncan-meditating-09.20.16-18.30.04.edf", "09.20.16", 62, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.20.16-18.30.04.edf"),
  createData('Meditation Intervention 09.22.16', "/eeg?edf=duncan-meditating-09.22.16-18.17.30.edf", "09.22.16", 40, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.22.16-18.17.30.edf"),
  createData('Meditation Intervention 09.23.16', "/eeg?edf=duncan-meditating-09.23.16-17.51.14.edf", "09.23.16", 17, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.23.16-17.51.14.edf"),
  createData('Meditation Intervention 09.27.16', "/eeg?edf=duncan-meditating-09.27.16-18.12.42.edf", "09.27.16", 57, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.27.16-18.12.42.edf"),
  createData('Meditation Intervention 09.28.16', "/eeg?edf=duncan-meditating-09.28.16-17.46.29.edf", "09.28.16", 56, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.28.16-17.46.29.edf"),
  createData('Meditation Intervention 09.29.16', "/eeg?edf=duncan-meditating-09.29.16-17.53.28.edf", "09.29.16", 70, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.29.16-17.53.28.edf"),
  createData('Meditation Intervention 09.30.16', "/eeg?edf=duncan-meditating-09.30.16-17.42.24.edf", "09.30.16", 72, "Yes", "Meditation", "/raw/eeg/duncan-meditating-09.30.16-17.42.24.edf"),
  createData('Meditation Intervention 10.01.16', "/eeg?edf=duncan-meditating-10.01.16-17.21.38.edf", "10.01.16", 67, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.01.16-17.21.38.edf"),
  createData('Meditation Intervention 10.02.16', "/eeg?edf=duncan-meditating-10.02.16-18.00.24.edf", "10.02.16", 67, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.02.16-18.00.24.edf"),
  createData('Meditation Intervention 10.03.16', "/eeg?edf=duncan-meditating-10.03.16-18.20.35.edf", "10.03.16", 59, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.03.16-18.20.35.edf"),
  createData('Meditation Intervention 10.08.16', "/eeg?edf=duncan-meditating-10.08.16-13.11.59.edf", "10.08.16", 36, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.08.16-13.11.59.edf"),
  createData('Meditation Intervention 10.08.16', "/eeg?edf=duncan-meditating-10.08.16-20.08.59.edf", "10.08.16", 30, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.08.16-20.08.59.edf"),
  createData('Meditation Intervention 10.11.16', "/eeg?edf=duncan-meditating-10.11.16-17.29.07.edf", "10.11.16", 64, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.11.16-17.29.07.edf"),
  createData('Meditation Intervention 10.12.16', "/eeg?edf=duncan-meditating-10.12.16-17.39.26.edf", "10.12.16", 95, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.12.16-17.39.26.edf"),
  createData('Meditation Intervention 10.13.16', "/eeg?edf=duncan-meditating-10.13.16-18.14.08.edf", "10.13.16", 111, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.13.16-18.14.08.edf"),
  createData('Meditation Intervention 10.14.16', "/eeg?edf=duncan-meditating-10.14.16-17.40.34.edf", "10.14.16", 78, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.14.16-17.40.34.edf"),
  createData('Meditation Intervention 10.15.16', "/eeg?edf=duncan-meditating-10.15.16-18.42.51.edf", "10.15.16", 66, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.15.16-18.42.51.edf"),
  createData('Meditation Intervention 10.16.16', "/eeg?edf=duncan-meditating-10.16.16-18.03.43.edf", "10.16.16", 71, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.16.16-18.03.43.edf"),
  createData('Meditation Intervention 10.17.16', "/eeg?edf=duncan-meditating-10.17.16-18.19.49.edf", "10.17.16", 99, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.17.16-18.19.49.edf"),
  createData('Meditation Intervention 10.19.16', "/eeg?edf=duncan-meditating-10.19.16-19.28.40.edf", "10.19.16", 80, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.19.16-19.28.40.edf"),
  createData('Meditation Intervention 10.20.16', "/eeg?edf=duncan-meditating-10.20.16-17.40.52.edf", "10.20.16", 85, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.20.16-17.40.52.edf"),
  createData('Meditation Intervention 10.21.16', "/eeg?edf=duncan-meditating-10.21.16-18.24.22.edf", "10.21.16", 26, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.21.16-18.24.22.edf"),
  createData('Meditation Intervention 10.22.16', "/eeg?edf=duncan-meditating-10.22.16-18.03.15.edf", "10.22.16", 72, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.22.16-18.03.15.edf"),
  createData('Meditation Intervention 10.23.16', "/eeg?edf=duncan-meditating-10.23.16-19.16.50.edf", "10.23.16", 61, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.23.16-19.16.50.edf"),
  createData('Meditation Intervention 10.24.16', "/eeg?edf=duncan-meditating-10.24.16-17.32.37.edf", "10.24.16", 75, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.24.16-17.32.37.edf"),
  createData('Meditation Intervention 10.26.16', "/eeg?edf=duncan-meditating-10.26.16-18.56.28.edf", "10.26.16", 68, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.26.16-18.56.28.edf"),
  createData('Meditation Intervention 10.27.16', "/eeg?edf=duncan-meditating-10.27.16-19.03.28.edf", "10.27.16", 18, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.27.16-19.03.28.edf"),
  createData('Meditation Intervention 10.28.16', "/eeg?edf=duncan-meditating-10.28.16-17.46.59.edf", "10.28.16", 82, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.28.16-17.46.59.edf"),
  createData('Meditation Intervention 10.30.16', "/eeg?edf=duncan-meditating-10.30.16-17.39.26.edf", "10.30.16", 66, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.30.16-17.39.26.edf"),
  createData('Meditation Intervention 10.31.16', "/eeg?edf=duncan-meditating-10.31.16-20.38.31.edf", "10.31.16", 38, "Yes", "Meditation", "/raw/eeg/duncan-meditating-10.31.16-20.38.31.edf"),
  createData('Meditation Intervention 11.01.16', "/eeg?edf=duncan-meditating-11.01.16-18.45.38.edf", "11.01.16", 67, "Yes", "Meditation", "/raw/eeg/duncan-meditating-11.01.16-18.45.38.edf"),
  createData('Meditation Intervention 11.02.16', "/eeg?edf=duncan-meditating-11.02.16-18.39.01.edf", "11.02.16", 70, "Yes", "Meditation", "/raw/eeg/duncan-meditating-11.02.16-18.39.01.edf"),
  createData('Meditation Intervention 11.04.16', "/eeg?edf=duncan-meditating-11.04.16-18.55.55.edf", "11.04.16", 44, "Yes", "Meditation", "/raw/eeg/duncan-meditating-11.04.16-18.55.55.edf"),
  createData('Meditation Intervention 11.05.16', "/eeg?edf=duncan-meditating-11.05.16-18.08.37.edf", "11.05.16", 53, "Yes", "Meditation", "/raw/eeg/duncan-meditating-11.05.16-18.08.37.edf"),
  createData('Meditation Intervention 11.06.16', "/eeg?edf=duncan-meditating-11.06.16-18.40.10.edf", "11.06.16", 64, "Yes", "Meditation", "/raw/eeg/duncan-meditating-11.06.16-18.40.10.edf"),
  createData('Meditation Intervention 11.07.16', "/eeg?edf=duncan-meditating-11.07.16-18.23.26.edf", "11.07.16", 60, "Yes", "Meditation", "/raw/eeg/duncan-meditating-11.07.16-18.23.26.edf"),
  createData('Meditation Intervention 11.08.16', "/eeg?edf=duncan-meditating-11.08.16-18.15.34.edf", "11.08.16", 43, "Yes", "Meditation", "/raw/eeg/duncan-meditating-11.08.16-18.15.34.edf"),
  createData('Meditation Intervention 11.13.16', "/eeg?edf=duncan-meditating-11.13.16-17.36.11.edf", "11.13.16", 17, "Yes", "Meditation", "/raw/eeg/duncan-meditating-11.13.16-17.36.11.edf"),
  createData('Meditation Intervention 11.14.16', "/eeg?edf=duncan-meditating-11.14.16-19.13.01.edf", "11.14.16", 36, "Yes", "Meditation", "/raw/eeg/duncan-meditating-11.14.16-19.13.01.edf"),
  createData('Meditation Intervention 11.15.16', "/eeg?edf=duncan-meditating-11.15.16-17.59.22.edf", "11.15.16", 45, "Yes", "Meditation", "/raw/eeg/duncan-meditating-11.15.16-17.59.22.edf"),
  createData('Meditation Intervention 11.17.16', "/eeg?edf=duncan-meditating-11.17.16-18.42.40.edf", "11.17.16", 44, "Yes", "Meditation", "/raw/eeg/duncan-meditating-11.17.16-18.42.40.edf"),
  createData('Meditation Intervention 11.18.16', "/eeg?edf=duncan-meditating-11.18.16-18.26.54.edf", "11.18.16", 73, "Yes", "Meditation", "/raw/eeg/duncan-meditating-11.18.16-18.26.54.edf"),
  createData('Meditation Intervention 11.22.16', "/eeg?edf=duncan-meditating-11.22.16-18.32.34.edf", "11.22.16", 44, "Yes", "Meditation", "/raw/eeg/duncan-meditating-11.22.16-18.32.34.edf"),
  createData('Meditation Intervention 11.29.16', "/eeg?edf=duncan-meditating-11.29.16-21.40.41.edf", "11.29.16", 29, "Yes", "Meditation", "/raw/eeg/duncan-meditating-11.29.16-21.40.41.edf"),
  createData('Meditation Intervention 11.30.16', "/eeg?edf=duncan-meditating-11.30.16-17.56.22.edf", "11.30.16", 36, "Yes", "Meditation", "/raw/eeg/duncan-meditating-11.30.16-17.56.22.edf"),
  createData('Meditation Intervention 12.01.16', "/eeg?edf=duncan-meditating-12.01.16-18.00.27.edf", "12.01.16", 59, "Yes", "Meditation", "/raw/eeg/duncan-meditating-12.01.16-18.00.27.edf"),
  createData('Meditation Intervention 12.03.16', "/eeg?edf=duncan-meditating-12.03.16-18.00.06.edf", "12.03.16", 45, "Yes", "Meditation", "/raw/eeg/duncan-meditating-12.03.16-18.00.06.edf"),
  createData('Meditation Intervention 01.02.17', "/eeg?edf=duncan-meditating-01.02.17-21.45.10.edf", "01.02.17", 60, "Yes", "Meditation", "/raw/eeg/duncan-meditating-01.02.17-21.45.10.edf"),
  createData('Meditation Intervention 01.16.17', "/eeg?edf=duncan-meditating-01.16.17-17.47.27.edf", "01.16.17", 86, "Yes", "Meditation", "/raw/eeg/duncan-meditating-01.16.17-17.47.27.edf"),
  createData('Meditation Intervention 01.20.17', "/eeg?edf=duncan-meditating-01.20.17-18.23.02.edf", "01.20.17", 71, "Yes", "Meditation", "/raw/eeg/duncan-meditating-01.20.17-18.23.02.edf"),
  createData('Meditation Intervention 01.22.17', "/eeg?edf=duncan-meditating-01.22.17-13.39.48.edf", "01.22.17", 18, "Yes", "Meditation", "/raw/eeg/duncan-meditating-01.22.17-13.39.48.edf"),
  createData('Meditation Intervention 01.24.17', "/eeg?edf=duncan-meditating-01.24.17-21.06.41.edf", "01.24.17", 14, "Yes", "Meditation", "/raw/eeg/duncan-meditating-01.24.17-21.06.41.edf"),
  createData('Meditation Intervention 02.16.17', "/eeg?edf=duncan-meditating-02.16.17-17.43.07.edf", "02.16.17", 49, "Yes", "Meditation", "/raw/eeg/duncan-meditating-02.16.17-17.43.07.edf"),
  createData('Meditation Intervention 02.20.17', "/eeg?edf=duncan-meditating-02.20.17-16.39.49.edf", "02.20.17", 84, "Yes", "Meditation", "/raw/eeg/duncan-meditating-02.20.17-16.39.49.edf"),
  createData('Meditation Intervention 02.22.17', "/eeg?edf=duncan-meditating-02.22.17-18.41.04.edf", "02.22.17", 64, "Yes", "Meditation", "/raw/eeg/duncan-meditating-02.22.17-18.41.04.edf"),
  createData('Meditation Intervention 02.25.17', "/eeg?edf=duncan-meditating-02.25.17-17.55.44.edf", "02.25.17", 58, "Yes", "Meditation", "/raw/eeg/duncan-meditating-02.25.17-17.55.44.edf"),
  createData('Meditation Intervention 02.26.17', "/eeg?edf=duncan-meditating-02.26.17-14.15.29.edf", "02.26.17", 17, "Yes", "Meditation", "/raw/eeg/duncan-meditating-02.26.17-14.15.29.edf"),
  createData('Meditation Intervention 02.27.17', "/eeg?edf=duncan-meditating-02.27.17-18.06.59.edf", "02.27.17", 67, "Yes", "Meditation", "/raw/eeg/duncan-meditating-02.27.17-18.06.59.edf"),
  createData('Meditation Intervention 02.28.17', "/eeg?edf=duncan-meditating-02.28.17-18.22.35.edf", "02.28.17", 47, "Yes", "Meditation", "/raw/eeg/duncan-meditating-02.28.17-18.22.35.edf"),
  createData('Meditation Intervention 03.12.17', "/eeg?edf=duncan-meditating-03.12.17-17.40.39.edf", "03.12.17", 95, "Yes", "Meditation", "/raw/eeg/duncan-meditating-03.12.17-17.40.39.edf"),
  createData('Meditation Intervention 03.14.17', "/eeg?edf=duncan-meditating-03.14.17-18.54.20.edf", "03.14.17", 30, "Yes", "Meditation", "/raw/eeg/duncan-meditating-03.14.17-18.54.20.edf")
];

    return (
      <div>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" style={{ color: 'white' }} gutterBottom>
              EEG Data
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" style={{ color: 'white' }} paragraph >
              EEG data collected for the film <Link href="https://supermeditate.me" target="_new" style={{ color: '#fbbe00' }}>Super Meditate Me</Link>
            </Typography>
          </Container>
        </div>
        <Container maxWidth="md">
        <Box p={5}>
          <Typography align="left" color="textPrimary"  paragraph >
                <Link href="/" color="secondary">&lt;&lt;  Back</Link>
          </Typography>
          <Typography variant="h4" align="left" paragraph >
                Overview
          </Typography>
          <Typography align="left" color="textPrimary"  paragraph >
                Equipment: Emotiv EPOC+ 16-channel EEG
          </Typography>
          <br/>
          <Typography variant="h4" align="left" paragraph >
                Analysis
          </Typography>
          <Typography align="left" color="textPrimary"  paragraph >
                TBD
          </Typography>
          <br/>
          <Typography variant="h4" align="left" paragraph >
                Sessions (96)
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Session</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Duration (min)</TableCell>
                  <TableCell align="right">Intervention</TableCell>
                  <TableCell align="right">Raw</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name} href={row.href} hover>
                    <TableCell component="th" scope="row">
                      <Link href={row.href} color="secondary">{row.name}</Link>
                    </TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                    <TableCell align="center">{row.duration}</TableCell>
                    <TableCell align="right">{row.activity}</TableCell>
                    <TableCell align="right"><Link href={row.raw} color="secondary">Raw</Link></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Box>
    </Container>
  </div>
      );
}