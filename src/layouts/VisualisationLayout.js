import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import handleChat from '../utils/analysis.js';
import { WordCloudComponent } from '../components/WordCloudComponent.js';
import { TopicCloudComponent } from '../components/TopicWordCloud.js';
import { WeeklyMessageFrequencyGraph } from '../components/WeeklyMessageFrequency.js';
import { WeeklySentimentGraph } from '../components/WeeklySentimentGraph.js';
import { DailyFrequencyHeatmap } from '../components/DailyFrequencyHeatmap.js';
import { MessageCounter } from '../components/MessageCounter.js';
import { FirstSenderGraph } from '../components/FirstSenderGraph.js';
import { MessageTypeGraph } from '../components/MessageTypeGraph.js';
import { HourlyFrequencyGraph } from '../components/HourlyFrequencyGraph.js';
// import { DivergentFrequencyGraph } from '../components/DivergentFrequencyGraph.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

function VisualisationLayout(props) {
    const raw_data = props.getData();
    const chatData = handleChat(raw_data);
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={12} style={{paddingTop: '50px', minWidth: 500}}>
              <Typography component="h2" variant="h2" style={{display: 'inline-block', color: '#ffb1d3'}}>
                {chatData.users[0]}
              </Typography>
              <Typography component="h2" variant="h2" style={{display: 'inline-block', color: '#a0a2bd', paddingLeft: 10, paddingRight: 10}}>
                +
              </Typography>
              <Typography component="h2" variant="h2" style={{display: 'inline-block', color: '#b1d3ff'}}>
                {chatData.users[1]} Scanlon
              </Typography>
              <Grid container spacing={1} justify='center' alignItems='center'>
                  <Grid item xs={3}>
                    <Typography component="h5" variant="h5" style={{color: '#b1d3ff'}}>
                      Total messages:
                    </Typography>
                    <Typography component="h5" variant="h5" style={{color: '#b1d3ff'}}>
                      {(chatData.counts.message[chatData.users[0]] + chatData.counts.message[chatData.users[1]]).toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography component="h5" variant="h5" style={{color: '#ffb1d3'}}>
                      Chat started:
                    </Typography>
                    <Typography component="h5" variant="h5" style={{color: '#ffb1d3'}}>
                      {chatData.dateAnalysis.start.toLocaleString('en-GB', { timeZone: 'UTC' })}
                    </Typography>
                  </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{paddingTop: '40px'}}>
              <WordCloudComponent ChatData={chatData}/>
            </Grid>
            <Grid item xs={12} style={{paddingTop: '40px'}}>
              <Typography component="h5" variant="h5" style={{color: '#b1c0ff'}}>
                Frequency of daily messages heatmap:
              </Typography>
              <DailyFrequencyHeatmap ChatData={chatData}/>
            </Grid>
            <Grid item xs={6} style={{paddingTop: '40px'}}>
              <Typography component="h5" variant="h5" style={{color: '#b1c0ff'}}>
                Weekly messages frequency:
              </Typography>
              <WeeklyMessageFrequencyGraph ChatData={chatData}/>
            </Grid>
            <Grid item xs={6} style={{paddingTop: '40px'}}>
              <Typography component="h5" variant="h5" style={{color: '#b1c0ff'}}>
                Average positivity of messages by week:
              </Typography>
              <WeeklySentimentGraph ChatData={chatData}/>
            </Grid>
            <Grid item xs={12} style={{paddingTop: '60px'}}>
              <Typography component="h5" variant="h5" style={{color: '#b1c0ff'}}>
                Frequency of messages by hour:
              </Typography>
              <HourlyFrequencyGraph ChatData={chatData}/>
            </Grid>
            <Grid item xs={3} style={{paddingTop: '40px'}}>
              <Typography component="h5" variant="h5" style={{color: '#b1c0ff'}}>
                Total messages by person:
              </Typography>
              <MessageCounter ChatData={chatData}/>
            </Grid>
            <Grid item xs={3} style={{paddingTop: '40px'}}>
              <Typography component="h5" variant="h5" style={{color: '#b1c0ff'}}>
                Frequency of who started the chat first:
              </Typography>
              <FirstSenderGraph ChatData={chatData}/>
            </Grid>
            <Grid item xs={3} style={{paddingTop: '40px'}}>
              <Typography component="h5" variant="h5" style={{color: '#b1c0ff'}}>
                {chatData.users[0]}'s message content:
              </Typography>
              <MessageTypeGraph ChatData={chatData} person={chatData.users[0]}/>
            </Grid>
            <Grid item xs={3} style={{paddingTop: '40px'}}>
              <Typography component="h5" variant="h5" style={{color: '#b1c0ff'}}>
                {chatData.users[1]}'s message content:
              </Typography>
              <MessageTypeGraph ChatData={chatData} person={chatData.users[1]}/>
            </Grid>
        </Grid>
      </div>
    );
}

export default VisualisationLayout;
