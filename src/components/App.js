import React from 'react';
import TimeBoxList from './TimeBoxList';
import RealTimeClock from './RealTimeClock';



class App extends React.Component {
  
  render() {
    return(
      <div className="App">
        <div>
          <h1>Kurs React Tydzien 2</h1>
          <RealTimeClock />
        </div>
        <hr />
        <TimeBoxList />
      </div>
    )
  }  
}
  
export default App;