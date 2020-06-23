import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {handleLogout} from '../actions/shared';
import {withRouter} from 'react-router-dom';

class Nav extends Component {
  onLogout = e => {
    const {dispatch} = this.props;
    dispatch (handleLogout ());
    this.props.history.push (`/`);
  };

  render () {
    const {users, authedUser} = this.props;

    return (
      <div>
        <nav className="nav">
          <ul>
            <li>
              <NavLink to="/home" exact activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/add" activeClassName="active">
                New Question
              </NavLink>
            </li>
            <li>
              <NavLink to="/leaderboard" activeClassName="active">
                Leaderboard
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* logged in user info */}
        {authedUser !== null &&
          <div>
            {users[authedUser].name} logged in.
            <button onClick={this.onLogout}>
              LOGOUT
            </button>
          </div>}
      </div>
    );
  }
}

function mapStateToProps({users, authedUser}) {
  return {
    users,
    authedUser,
  };
}

export default withRouter (connect (mapStateToProps) (Nav));
