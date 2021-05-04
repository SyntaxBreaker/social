import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import UserProvider from "./providers/UserProvider";

function App() {
  return (
      <UserProvider>
          <div className="App">
              <Router>
                  <Header />
                  <Switch>
                      <Route path="/" exact>
                          <Homepage />
                      </Route>
                      <Route path="/profile/:id" exact>
                          <Profile />
                      </Route>
                  </Switch>
              </Router>
          </div>
      </UserProvider>
  );
}

export default App;
