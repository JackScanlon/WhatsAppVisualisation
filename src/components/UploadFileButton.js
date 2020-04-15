import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
    input: {
      display: 'none',
    },
}));

export default function UploadFileButton(props) {
    const classes = useStyles();

    const _fileChange = (e) => {
        let file = e.target.files[0];
        let textType = /text.*/;

        if (!!file) {
          if (file.type.match(textType)) {
            let reader = new FileReader()

            reader.onload = function () {
              props.callback(reader.result);
            }

            reader.readAsText(file);
          } else {
            alert("File not supported! Must be WhatsApp /.txt/ file"); // Add check to see if in format of whatsapp msg?
          }
        } else {
          alert("No file selected!");
        }
    };

    return (
      <div>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={_fileChange}
        />
        <label htmlFor="contained-button-file">
            <Button letiant="contained" color="default" component="span" startIcon={<CloudUploadIcon />}>
            { props.title }
            </Button>
        </label>
      </div>
    );
  }
