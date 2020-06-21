import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Redirect } from 'react-router-dom'

class Home extends Component {
    // state variable to display unanswered/answered questions
    state = {
        unanswered: true
    }

    handleQuestionType = e => {
        this.setState({
            unanswered: e.target.value === "unanswered"
        })
    }
    
    render () {
        const { authedUser, unansweredQuestionIds, answeredQuestionIds } = this.props
        if (authedUser === null) {
            return <Redirect to='/'/>
        }

        return(
            <div>
                <div className="btn-group" onClick={this.handleQuestionType}>
                    <button value="unanswered">Unanswered Questions</button>
                    <button value="answered">Answered Questions</button>
                </div>
                <ul className='question-list'>
                    {this.state.unanswered && unansweredQuestionIds.map(id => (
                        <li key={id} className="list-item">
                            <Question id={id} />
                        </li>
                    ))}
                    {!this.state.unanswered && answeredQuestionIds.map(id => (
                        <li key={id} className="list-item">
                            <Question id={id} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ questions, authedUser, users }) {
    const answeredQuestionIds = authedUser? Object.keys(users[authedUser].answers): []
    const unansweredQuestionIds = Object.keys(questions).filter(questionId => answeredQuestionIds.indexOf(questionId) < 0)
    console.log("unansweredQuestionIds: ", unansweredQuestionIds)
    console.log("answeredQuestionIds: ", answeredQuestionIds)
    return({ 
        authedUser,
        answeredQuestionIds: answeredQuestionIds
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
        unansweredQuestionIds: unansweredQuestionIds
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    })
}

export default connect(mapStateToProps)(Home);