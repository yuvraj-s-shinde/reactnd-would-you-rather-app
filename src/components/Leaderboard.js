import React, { Component } from 'react'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import handleInitialData from '../actions/shared'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Leaderboard extends Component {

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
        const { userIds, authedUser, users } = this.props
        if (authedUser === null) {
            return <Redirect to='/'/>
        }

        return (
            <div>                
                <ul className='leaderboard'>
                    {userIds.map(id => (
                        <li key={id}>
                            <div className='user-info'>
                                <img
                                    src={users[id].avatarURL}
                                    alt={`avatar of ${users[id].name}`}
                                    className='avatar'
                                />
                                <span>{users[id].name}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    return ({
         users,
         authedUser,
         userIds: Object.keys(users)
         .sort((a,b) => (Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length)),
    })
}

export default connect(mapStateToProps)(Leaderboard);