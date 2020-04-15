import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import UploadFileButton from '../components/UploadFileButton';

function UploadLayout(props) {
    return (
        <Grid container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}>
        <Grid item xs={3} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '5', minWidth: '150px' }}>
            <Typography variant='h5' style={{ paddingBottom: '15px' }}>Select your WhatsApp chat file</Typography>
            <UploadFileButton callback={props.callback} title='Select file'/> 
        </Grid>
      </Grid>
    )
}

export default UploadLayout;