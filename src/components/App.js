import React, {Component, Fragment} from 'react';
import handleUsersData from '../actions/users';
import {connect} from 'react-redux';
import Home from './Home';
import Login from './Login';
import Question from './Question';
import NewQuestion from './NewQuestion';
import Leaderboard from './Leaderboard';
import LoadingBar from 'react-redux-loading';
import {BrowserRouter as Router, Route, useLocation} from 'react-router-dom';
import Nav from './Nav';

// Component to show alert when user tries to navigate to a path without login
const LoginAlert = props => {
  let location = useLocation ();
  const {users} = props;
  return (
    <div>
      {location.pathname !== '/' &&
        Object.keys (users).length !== 0 &&
        alert ('Please login to navigate to ' + location.pathname)}
    </div>
  );
};

class App extends Component {
  componentDidMount () {
    this.props.dispatch (handleUsersData ());
  }

  render () {
    const {authedUser, users} = this.props;
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading === true
              ? null
              : authedUser === null
                  ? <div>
                      <Route
                        render={() => (
                          <div>
                            <LoginAlert users={users} />
                            <Login />
                          </div>
                        )}
                      />
                    </div>
                  : <div>
                      <Route path="/" exact component={Login} />
                      <Route path="/home" exact component={Home} />
                      <Route path="/question/:id" component={Question} />
                      <Route path="/add" component={NewQuestion} />
                      <Route path="/leaderboard" component={Leaderboard} />
                    </div>}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({users, authedUser}) {
  return {
    loading: users === {},
    authedUser,
    users,
  };
}

export default connect (mapStateToProps) (App);
