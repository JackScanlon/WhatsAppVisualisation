import React, { useState, useMemo } from 'react';
import UploadLayout from './layouts/UploadLayout';
import VisualisationLayout from './layouts/VisualisationLayout';
import './App.css';

function App() {
  const [raw_data, setRawData] = useState(null);

  const _uploadCallback = (file) => {
    setRawData(file);
  }

  const _getData = () => {
    return raw_data;
  }

  return (
    <div className="App">
      <header className="App-header">   
          { (!raw_data) ? <UploadLayout callback={_uploadCallback} /> : <VisualisationLayout getData={ _getData }/> }
      </header>
    </div>
  );
}

export default App;