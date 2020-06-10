import React from 'react';
import TimeBoxList from './TimeBoxList';
import RealTimeClock from './RealTimeClock';

import ErrorBoundary from './Error';


class App extends React.Component {
  
  render() {
    return(
      <React.StrictMode>  
        <div className="App">
          <div>
            <h1>Kurs React Tydzien 2</h1>
            <RealTimeClock />
          </div>
          <hr />
          <ErrorBoundary message={"Cos poszlo nie tak ;("} >
            <TimeBoxList />
          </ErrorBoundary>
        </div>
      </React.StrictMode>
    )
  }  
}

  
export default App;