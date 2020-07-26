import React from 'react';
import Sports from './components/Homepage/Sports.js';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import HomePage from './components/Homepage/homePage.js';
import NavBar from './components/Navbar.js';
import Cinema from './components/Homepage/cinema';
import Technology from './components/Homepage/technology.js';
import Politics from './components/Homepage/politics.js';
import Others from './components/Homepage/others.js';
import Admin from './components/Admin/admin.js';
import Adminhome from './components/Admin/adminhome.js';
import Adminpost from './components/Admin/admin-post';
import Edit from './components/Admin/edit.js';
import add from './components/Admin/add';
import del from './components/Admin/del_post';
import post from './components/Homepage/post';
import Footer from './components/footer';
import ScrollToTop from './components/Homepage/ScrollToTop ';
import Byadmin from './components/Homepage/Byadmin';
import International from './components/Homepage/international';
import Contact from './components/Contact';
import delpost from './components/Admin/del_post';

function App() {
  return (



    <div className="main">


      <div className="contain">
        <Router>
          <ScrollToTop />
          <NavBar />
          <Switch>
            {/* admin routes */}
            <Route path="/admin" exact strict component={Admin} />
            <Route path="/admin-home" component={Adminhome} />
            <Route path="/delete" component={del} />
            <Route path="/del-post" component={delpost} />
            <Route path="/edit" component={Edit} />
            <Route path="/add" component={add} />
            <Route path="/admin-post/:id" component={Adminpost} />


            {/* categories */}
            <Route path="/sports" component={Sports} />
            <Route path="/cinema" component={Cinema} />
            <Route path="/technology" component={Technology} />
            <Route path="/international" component={International} />
            <Route path="/politics" component={Politics} />
            <Route path="/others" component={Others} />

            {/* link reagarding post */}
            <Route path="/post/:id" exact strict component={post} />
            <Route path="/by/:name" component={Byadmin} />


            {/* home route */}
            <Route path="/" exact strict component={HomePage} />
            <Route path="/contact" component={Contact} />

          </Switch>
        </Router>



      </div>
      <Footer />
    </div>






  );
}

export default App;
