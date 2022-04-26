import './App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Routing from './MainRouting';
import Sidebar from './components/sidebar/Sidebar'





function App() {
  return (
    <div className="App"> 
        <Routing />
    </div>
  );
}

export default App;

/* 
<Content/>
 <Notes/>
<SectionTitle/>
  <div className='yellocard'>
<TodoList/>
</div>
    </div>
 <SignInSide/>
          <Media/>
          
          <Route path="/user/profile">
            <Profile/>
          </Route>





*/
