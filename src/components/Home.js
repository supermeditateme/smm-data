import behavioral from '../behavioral.jpg';
import metabolome from '../metabolome.png';
import eeg from '../eeg.jpg';
import mri from '../mri.png';
import snp from '../snp.png';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import GetAppIcon from '@material-ui/icons/GetApp';
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
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';


export default function Home() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(() =>
      createTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },

      }),
    [prefersDarkMode],
  );
  const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    backgroundImage: `url(${"./timeline7.jpg"})`,
    backgroundColor: `rgba(0,0,0,0.725)`,
    backgroundBlendMode: 'multiply',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
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
  
    return (
    	<div>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" style={{ color: 'white' }} gutterBottom>
              Super Meditate Me
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" style={{ color: 'white' }} paragraph >
              The effects of a 100-day meditation intervention on a single individual, as documented in the film<br/><Link href="https://supermeditate.me" target="_new" style={{ color: '#fbbe00' }}>Super Meditate Me</Link>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary" href="/timeline.html">
                    View Timeline
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" style={{ color: '#ffffff', borderColor: '#c0c0c0'}} href="https://github.com/supermeditateme/smm-data" target="_new">
                    View Source
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
        
        <Typography variant="h4" align="left" paragraph>
                Overview
          </Typography>
          <Typography align="left" color="textPrimary" paragraph>
                A personal <Link href="https://en.wikipedia.org/wiki/Omics" target="_new" color="secondary">omics</Link> profile of a 100-day meditation intervention and it's effects on a wide range of metrics including EEG, metabolomic, MRI, and behavioral. Inspired by <Link href="https://www.cell.com/fulltext/S0092-8674(12)00166-3" target="_new" color="secondary">Snyderome</Link> and <Link href="https://www.nature.com/articles/ncomms9885" target="_new" color="secondary">MyConnectome.</Link><br/><br/>Special thanks to <Link href="https://neuroscape.ucsf.edu/" target="_new" color="secondary">UCSF Neuroscape Lab</Link>, UC Davis <Link href="https://metabolomics.ucdavis.edu/" target="_new" color="secondary">West Coast Metabolomics Center</Link>, and <Link href="https://www.emotiv.com/" target="_new" color="secondary">EMOTIV</Link>  EEG.
          </Typography>
          <br/>
          <Typography variant="h4" align="left" paragraph>
                Data
          </Typography>
          <Grid container spacing={4}>
              <Grid item key="1" xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardActionArea href="https://bucketeer-b2ec4285-3f6c-49c8-9753-fe99a1df2ac6.s3.amazonaws.com/public/timeline.html">
                  <CardMedia
                    className={classes.cardMedia}
                    image={behavioral}
                    title="Behavioral data"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Behavioral
                    </Typography>
                    <Typography>
                      Behavioral data collected both during the experimental period and after.<br/><br/>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="secondary" href="https://bucketeer-b2ec4285-3f6c-49c8-9753-fe99a1df2ac6.s3.amazonaws.com/public/Android-Pixel_3-544529144-UPDATED.nomie.json" target="_new" download startIcon={<GetAppIcon />}>
                    Raw Data
                    </Button>
                  </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
              
              <Grid item key="2" xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardActionArea href="./eeglist">
                  <CardMedia
                    className={classes.cardMedia}
                    image={eeg}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      EEG
                    </Typography>
                    <Typography>
                      EEG datasets collected via Emotiv EPOC+ headset while idle, meditating, and playing a video game.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="secondary" download startIcon={<GetAppIcon />}>
                      Raw Data
                    </Button>
                  </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item key="3" xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={mri}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      MRI
                    </Typography>
                    <Typography>
                      Data + analysis coming soon.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="secondary" disabled download startIcon={<GetAppIcon />}>
                       Raw Data
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item key="4" xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardActionArea href="./serum">
                  <CardMedia
                    className={classes.cardMedia}
                    image={metabolome}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Metabolomic
                    </Typography>
                    <Typography>
                      Metabolomic analysis of serum and initial hematology labs.<br/><br/><br/>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="secondary" download startIcon={<GetAppIcon />}>
                      Raw Data
                    </Button>
                  </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
              <Grid item key="5" xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardActionArea href="./dna">
                  <CardMedia
                    className={classes.cardMedia}
                    image={snp}
                    title="Image title"
                  />
                  
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Genomic
                    </Typography>
                    <Typography>
                      SNP browser + analysis (single sample)<br/><br/><br/>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="secondary" download startIcon={<GetAppIcon />}>
                      Raw Data
                    </Button>
                  </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
          </Grid>
        </Container>
        </div>
    	);
}