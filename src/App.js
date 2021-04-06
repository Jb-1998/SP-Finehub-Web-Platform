import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './router/navigation';
import UserProvider from './providers/UserProvider';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect} from "react-router-dom";

function App() {
  return (
      <UserProvider>
        <Navigation />
      </UserProvider>
  );
}

export default App;
