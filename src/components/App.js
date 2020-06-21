import React, { Component, Fragment } from 'react'
import handleUsersData from '../actions/users'
import { connect } from 'react-redux'
import Home from './Home'
import Login from './Login'
import Question from './Question'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Nav from './Nav'
import { handleLogout } from '../actions/shared'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleUsersData());
  }

  onLogout = e => {
    const { dispatch } = this.props
    dispatch(handleLogout())
  }

  render() {
    const { authedUser, users } = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav/>
            {/* logged in user info */}
            {authedUser !== null && (
            <div>
                {users[authedUser].name} logged in.
                <button onClick={this.onLogout}>
                    LOGOUT
                </button>
            </div>)}
            {this.props.loading === true
            ? null
            : <div>
                <Route path='/' exact component={Login} />
                <Route path='/home' exact component={Home} />
                <Route path='/question/:id' component={Question} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/leaderboard' component={Leaderboard} />
            </div>}
          </div>
      </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return ({
    loading: users === {},
    authedUser,
    users
  })
}

export default connect(mapStateToProps)(App);