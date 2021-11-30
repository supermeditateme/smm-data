import React, { Component } from 'react';
import behavioral_pre_1 from '../behavioral_pre_1.jpg';
import behavioral_pre_2 from '../behavioral_pre_2.jpg';
import behavioral_main from '../behavioral_main.jpg';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import GetAppIcon from "@material-ui/icons/GetApp";

export default function BehavioralList() {
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
    backgroundImage: `url(${"./header_behavioral.jpg"})`,
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
    return (
      <div>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" style={{ color: 'white' }} gutterBottom>
              Behavioral Data
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" style={{ color: 'white' }} paragraph >
              Behavioral data collected for the film<br/><Link href="https://supermeditate.me" target="_new" style={{ color: '#fbbe00' }}>Super Meditate Me</Link>
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
                Behavioral and subjective (experiential) data was collected pre and post intervention.  Two additional datasets recorded prior to the intervention in 2013 and 2014 are also listed here.
          </Typography>

          <Typography variant="h4" align="left" paragraph >
                Data
          </Typography>
          <Grid container spacing={4}>
            <Grid item key="1" xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardActionArea href="https://bucketeer-b2ec4285-3f6c-49c8-9753-fe99a1df2ac6.s3.amazonaws.com/public/timeline.html" target="_new">
                  <CardMedia
                      className={classes.cardMedia}
                      image={behavioral_main}
                      title="Behavioral data"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Main Regimen (2016)
                    </Typography>
                    <Typography>
                      Main timeline of meditation regimen pre and post intervention. (Not mobile-friendly)
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="secondary" href="https://bucketeer-b2ec4285-3f6c-49c8-9753-fe99a1df2ac6.s3.amazonaws.com/public/raw/Android-Pixel_3-544529144-UPDATED.nomie.json" target="_new" download startIcon={<GetAppIcon />}>
                      Raw Data
                    </Button>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item key="1" xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardActionArea href="https://docs.google.com/spreadsheets/d/1-rnH1kXnIHNmRBDQinJ5Mb1mDuA_llk_B1vQUOucNDs/edit#gid=99362780" target="_new">
                  <CardMedia
                      className={classes.cardMedia}
                      image={behavioral_pre_2}
                      title="Behavioral data - pre"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      2014
                    </Typography>
                    <Typography>
                      Prior 60-day regimen conducted in 2014<br/><br/><br/><br/>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="secondary" href="https://docs.google.com/spreadsheets/d/1-rnH1kXnIHNmRBDQinJ5Mb1mDuA_llk_B1vQUOucNDs/edit#gid=99362780" target="_new">
                      Raw Data
                    </Button>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item key="1" xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardActionArea href="https://docs.google.com/spreadsheets/d/1-rnH1kXnIHNmRBDQinJ5Mb1mDuA_llk_B1vQUOucNDs/edit#gid=0" target="_new">
                  <CardMedia
                    className={classes.cardMedia}
                    image={behavioral_pre_1}
                    title="Behavioral data - pre"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      2013
                    </Typography>
                    <Typography>
                      Initial 100-day regimen conducted in 2013<br/><br/><br/><br/>
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="secondary" href="https://docs.google.com/spreadsheets/d/1-rnH1kXnIHNmRBDQinJ5Mb1mDuA_llk_B1vQUOucNDs/edit#gid=0" target="_new">
                      Raw Data
                    </Button>
                  </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
          </Grid>
          <br/>
          </Box>
    </Container>
  </div>
      );
}