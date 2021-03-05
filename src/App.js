import './App.css';
import {Switch, Redirect, Route} from 'react-router-dom';
import RMS from './components/home';
import NavBar from './components/navbar';
import Requisitions from './components/requisitions';
import Project from './components/project';
import About from './components/about';
import NotFound from './components/notFound';
import RequisitionForm from './components/requisitionForm';
function App() {
  return (
    <main className="main">
      <NavBar/>
    <Switch>
      <Route path="/home" component={RMS} key={'home'}/>
      <Route path="/requisitions/:id" component={RequisitionForm} key={"req_id"} />
      <Route path="/requisitions" component={Requisitions} key={"requisitions"}/>
      <Route path="/projects" component={Project} key={"project"}/>
      <Route path="/about" component={About} key={"about"}/>
      <Route path="/not-found" component={NotFound} key={"not-found"}/>
      <Redirect  from="/" exact to="/home"/>
    </Switch>
    </main>
  );
}

export default App;
