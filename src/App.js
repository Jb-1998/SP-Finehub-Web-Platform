import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './router/navigation';
import UserProvider from './providers/UserProvider';

function App() {
  return (
      <UserProvider>
        <Navigation />
      </UserProvider>
  );
}

export default App;
