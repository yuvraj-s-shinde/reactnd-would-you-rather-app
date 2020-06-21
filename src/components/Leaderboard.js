import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Leaderboard extends Component {
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
                <ul>
                    {userIds.map(id => (
                        <li key={id} className="list-item">
                            <div className='user-info'>
                                <img
                                    src={users[id].avatarURL}
                                    alt={`avatar of ${users[id].name}`}
                                    className='avatar'
                                />
                                
                                <div className="user-score">
                                    <span>{users[id].name}</span>
                                    <div>
                                        {`Answered questions: ${Object.keys(users[id].answers).length}`}
                                    </div>
                                    <div>
                                        {`Unanswered questions: ${users[id].questions.length}`}
                                    </div>
                                    <div>
                                        {`Score: ${Object.keys(users[id].answers).length + users[id].questions.length}`}
                                    </div>
                                </div>
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
        // user ids sorted by user score = no of questions asked + number of polls answered
    })
}

export default connect(mapStateToProps)(Leaderboard);