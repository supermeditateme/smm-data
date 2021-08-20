import React, { Component } from 'react';
import Studio from 'eeg-viewer';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import '../../eeg-viewer/dist/css/eeg_viewer.min.css';
const queryString = require('query-string');

class EEG extends React.Component {
  render() {
    const file = "https://bucketeer-b2ec4285-3f6c-49c8-9753-fe99a1df2ac6.s3.amazonaws.com/public/raw/eeg/" + queryString.parse(this.props.location.search).edf;
    return (
      <div>
      <Box p={3}>
      <Grid container spacing={3}>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item xs={6}>
            <Typography align="left" color="textPrimary"  paragraph >
                <Link href="/eeglist" color="secondary">&lt;&lt;  Back</Link>
          </Typography>
          </Grid>
          <Grid item xs={3}>
          <Typography align="right" color="textPrimary"  paragraph >
            <Link href={file} color="secondary">Download Raw Data</Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      </Box>
      <Studio url={file}/>
      </div>
      );
  }
}

export default EEG;