import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import handleInitialData from '../actions/shared'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Login extends Component {

    // state variable to store selected user for login
    state = {
        selectedUser: ''
    }

    handleSubmit = e => {
        e.preventDefault();
        const { dispatch } = this.props
        dispatch(handleInitialData(this.state.selectedUser))
    }

    onChange = e => {
        this.setState({
            selectedUser: e.label
        })
    }

    render() {
        const { userIds, authedUser } = this.props
        const { selectedUser } = this.state
        if (authedUser !== null) {
            return <Redirect to='/home'/>
        }

        return (
            <div>
                <h3 className='center'>Login Page</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="center">
                        <Dropdown options={userIds} onChange={this.onChange} value={selectedUser} placeholder="Select a user"/>
                        <button type="submit" className="btn" disabled={selectedUser === ''}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
         userIds: Object.keys(users)
         .sort((a,b) => users[b].id - users[a].id),
         authedUser
    }
}

export default connect(mapStateToProps)(Login);