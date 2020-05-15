import React from 'react';
import { TimeBoxEditor } from './TimeBoxEditor';
import TimeBoxList from './TimeBoxList';



function App() {
    return (
      <div className="App">
        <h1>Kurs React Tydzien 2</h1>
        <hr />
        <TimeBoxList />
        <TimeBoxEditor />
      </div>
    )
}
  
export default App;