import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from 'pages/Main';
import { Provider as ReduxProvider } from 'react-redux';
import { persistor, store } from 'store/store';
import { PersistGate } from 'redux-persist/integration/react';
import NotFound from 'components/NotFound';
import PublicProjects from 'pages/PublicProjects';
import Login from 'components/Login';
import Logout from 'components/Logout';
import Search from 'pages/Search';
import PrivateRoute from 'components/Routes/PrivateRoute';
import Forbidden from 'components/Forbidden';
import PublicRoute from 'components/Routes/PublicRoute';

function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Router>
            <Switch>
              <PublicRoute exact path="/" component={Main} />
              <PublicRoute path="/projects" component={PublicProjects} />
              <PrivateRoute path="/search-projects" component={Search} />
              <PublicRoute path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <PublicRoute path="/403" component={Forbidden} />
              <PublicRoute path="*" component={NotFound} />
            </Switch>
          </Router>
        </div>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;
