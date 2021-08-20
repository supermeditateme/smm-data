import React, { Component } from 'react';
import serum_gc from '../serum_gc.jpeg';
import serum_hilic from '../serum_hilic.png';
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

export default function Serum() {
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
    backgroundImage: `url(${"./header_serum.jpg"})`,
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
  

function createData(name, date, intervention, href) {
  return { name, date, intervention, href };
}

const rows = [
  createData('Serum Sample Feb 12', "2/16/2016", "Pre-intervention", "url"),
  createData('Serum Sample Mar 1', "3/1/2016", "Pre-intervention", "url"),
  createData('Serum Sample Mar 15', "3/15/2016", "Pre-intervention", "url"),
  createData('Serum Sample Mar 29', "3/29/2016", "Pre-intervention", "url"),
  createData('Serum Sample Apr 12', "4/12/2016", "Pre-intervention", "url"),
  createData('Serum Sample Apr 26', "4/26/2016", "Pre-intervention", "url"),
  createData('Serum Sample May 10', "5/10/2016", "Pre-intervention", "url"),
  createData('Serum Sample May 24', "5/24/2016", "Pre-intervention", "url"),
  createData('Serum Sample Jun 7', "6/7/2016", "Pre-intervention", "url"),
  createData('Serum Sample Jun 21', "6/21/2016", "Pre-intervention", "url"),
  createData('Serum Sample Jul 7', "7/5/2016", "Pre-intervention", "url"),
  createData('Serum Sample Jul 19', "7/19/2016", "Pre-intervention", "url"),
  createData('Serum Sample Aug 2', "8/2/2016", "Pre-intervention", "url"),
  createData('Serum Sample Aug 16', "8/16/2016", "Meditation", "url"),
  createData('Serum Sample Aug 30', "8/30/2016", "Meditation", "url"),
  createData('Serum Sample Sep 13', "9/13/2016", "Meditation", "url"),
  createData('Serum Sample Sep 27', "9/27/2016", "Meditation", "url"),
  createData('Serum Sample Oct 18', "10/18/2016", "Meditation", "url"),
  createData('Serum Sample Nov 1', "11/1/2016", "Meditation", "url"),
  createData('Serum Sample Nov 29*', "11/29/2016", "Meditation", "url"),
];

    return (
      <div>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" style={{ color: 'white' }} gutterBottom>
              Metabolomic Data
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" style={{ color: 'white' }} paragraph >
              Metabolomic analysis of blood samples collected for the film <Link href="https://supermeditate.me" target="_new" style={{ color: '#fbbe00' }}>Super Meditate Me</Link>
            </Typography>
          </Container>
        </div>
        <Container maxWidth="md">
        <Box p={5}>
        <Typography align="left" color="textPrimary" paragraph >
                <Link href="/" color="secondary">&lt;&lt;  Back</Link>
          </Typography>
          <Typography variant="h4" align="left" paragraph >
                Overview
          </Typography>
          <Typography align="left" color="textPrimary" paragraph >
                13 pre-intervention (baseline) blood samples were collected and 7 post intervention, on a periodic basis of two weeks per sample.  One set of <Link href="/raw/serum/bloodwork_labs_august 1_2016_Dcarroll.pdf" color="secondary" target="_new">standard hematology labs</Link> were also obtained pre-intervention. <br/><br/>For each sample, blood was collected by a trained phlebotomist and stored at -80C at the NIH West Coast Metabolomics Center (UC Davis Fiehn Lab)
          </Typography>

          <Typography variant="h4" align="left" paragraph >
                Compounds
          </Typography>
          <Grid container spacing={4}>
              <Grid item key="1" xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardActionArea href="/serum/gc">
                  <CardMedia
                    className={classes.cardMedia}
                    image={serum_gc}
                    title="GC-TOF MS"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Primary Metabolites
                    </Typography>
                    <Typography>
                      P-Values for 327 compounds derived from GC-TOF MS<br/><br/><br/><br/><br/><br/>
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item key="1" xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardActionArea href="/serum/hilicneg">
                  <CardMedia
                    className={classes.cardMedia}
                    image={serum_hilic}
                    title="HILIC"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Biogenic Amines & Complex Lipids<br/>(-ESI)
                    </Typography>
                    <Typography>
                      P-Values for 556 compounds derived from HILIC-QTOF MS/MS and CSH-QTOF MS/MS (-ESI)
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item key="1" xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardActionArea href="/serum/hilicpos">
                  <CardMedia
                    className={classes.cardMedia}
                    image={serum_hilic}
                    title="HILIC"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Biogenic Amines & Complex Lipids<br/>(+ESI)
                    </Typography>
                    <Typography>
                      P-Values for 861 compounds derived from HILIC-QTOF MS/MS  and CSH-QTOF MS/MS (+ESI)
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
          </Grid><br/>
        
          <Typography variant="h4" align="left" paragraph >
                Samples (20)
          </Typography>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Intervention</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name} component={Link} href={row.href} hover>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">{row.intervention}</TableCell>
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