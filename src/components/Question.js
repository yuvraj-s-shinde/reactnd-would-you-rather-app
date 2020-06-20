import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { handleSetAnswer } from '../actions/questions'
import { Progress } from 'semantic-ui-react';

const ProgressBar = props => {
    const { optionOneVotes, optionTwoVotes } = props;
    const totalVotes = optionOneVotes + optionTwoVotes
    const percent = (optionOneVotes/totalVotes)*100
    return (
        <Progress percent={percent} progress />
    )
}

class Question extends Component {
    state = {
        selectedOption: "optionOne"
      };

    onSubmit = e => {
        e.preventDefault();
        const { id } = this.props.match.params
        const { dispatch, authedUser } = this.props
        dispatch(handleSetAnswer({ authedUser, qid: id, answer:this.state.selectedOption }))
      };

    onChange = e => {
        this.setState({
          selectedOption: e.target.value
        });
      };

    render () {
        const { question, authedUser, idFromParams } = this.props

        if (authedUser === null) {
            return <Redirect to='/'/>
        }
        if (question === null ) {
            return <p>This Question does not exist</p>
        }

        const {id, name, avatar, optionOne, optionTwo, hasAnswered, selectedAnswer} = question
        return(
            <div className='user-info'>
                 <img
                    src={avatar}
                    alt={`avatar of ${name}`}
                    className='avatar'
                />
                {idFromParams === false && <div className='question-info'>
                    <div>
                        <span>{name} asks:</span>
                        <div>
                            <span>
                                Would you rather:
                            </span>
                            <span>
                                ...{optionOne.text.slice(0,15)}...
                            </span>
                        </div>
                        <Link to={`/question/${id}`}>
                            <button className="btn">View Poll</button>
                        </Link>
                    </div>
                </div>}
                {idFromParams === true && hasAnswered === false && (<div className='question-unanswered'>
                    {/* Reference: http://react.tips/radio-buttons-in-react-16/ */}
                    <span>{name} asks:</span>
                    <div>
                        <span>
                            Would you rather:
                        </span>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-check">
                            <label>
                                <input
                                type="radio"
                                name="poll-options"
                                value="optionOne"
                                checked={this.state.selectedOption === "optionOne"}
                                onChange={this.onChange}
                                className="form-check-input"
                                />
                                {optionOne.text}
                            </label>
                            </div>
                            <div className="form-check">
                            <label>
                                <input
                                type="radio"
                                name="poll-options"
                                value="optionTwo"
                                checked={this.state.selectedOption === "optionTwo"}
                                onChange={this.onChange}
                                className="form-check-input"
                                />
                                {optionTwo.text}
                            </label>
                            </div>
                            <div className="form-group">
                            <button className="btn btn-primary" type="submit">
                                Submit
                            </button>
                            </div>
                        </form>
                    </div>
                </div>)}
                {idFromParams === true && hasAnswered === true && <div className='question-answered'>
                        <span>Asked by {name}:</span>
                        <div>
                            <span>Results:</span>
                            <div>
                                {`Would you rather ${optionOne.text}?`}
                                { selectedAnswer === "optionOne" && (
                                <b> YOUR ANSWER</b>
                                )}
                            </div>
                            <ProgressBar optionOneVotes={optionOne.votes} optionTwoVotes={optionOne.votes}/>
                            {`${optionOne.votes} out of ${optionOne.votes+optionTwo.votes} votes`}

                            <div>
                                {`Would you rather ${optionTwo.text}?`}
                                { selectedAnswer === "optionTwo" && (
                                <b> YOUR ANSWER</b>
                                )}
                            </div>
                            
                            <ProgressBar optionOneVotes={optionTwo.votes} optionTwoVotes={optionOne.votes}/>
                            {`${optionTwo.votes} out of ${optionOne.votes+optionTwo.votes} votes`}
                        </div>
                    </div>}
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions, users }, props) {
    let question, idFromParams = false; 
    if (props.match) {
        const { id } = props.match.params;
        question = questions[id]
        idFromParams = true
    }
    else if (props.id) {
        question = questions[props.id]
    }
    return({
        authedUser,
        question: question ? formatQuestion(question, users[question.author], authedUser)
                           : null,
        idFromParams,

    })
}

export default connect(mapStateToProps)(Question);