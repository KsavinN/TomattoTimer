import React from 'react';
import TimeBoxList from './TimeBoxList';
import prettyDir from '../utills/prettyDir';



class App extends React.Component {
  
  render() {
    prettyDir({ test: 'testujemy funkcje', a : [1, 2, 3] });
    // prettyDir([1, 2, 3]);
    // prettyDir('stinrg');
    // prettyDir(25);
    return(
      <div className="App">
        <h1>Kurs React Tydzien 2</h1>
        <hr />
        <TimeBoxList />
      </div>
    )
  }  
}
  
export default App;