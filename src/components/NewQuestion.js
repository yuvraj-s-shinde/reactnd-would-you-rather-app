import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false,
    }

    onChangeOptionOne = e => {
        this.setState({
            optionOneText: e.target.value
        })
    }

    onChangeOptionTwo = e => {
        this.setState({
            optionTwoText: e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()
        const { dispatch } = this.props
        const { optionOneText, optionTwoText} = this.state
        dispatch(handleAddQuestion (optionOneText, optionTwoText))
        this.setState({
            optionOneText: '',
            optionTwoText: '',
            toHome: true,
        })
    }

    render() {
        const { optionOneText, optionTwoText, toHome } = this.state
        const { authedUser } = this.props
        if (authedUser === null || toHome === true) {
            return <Redirect to='/'/>
        }

        return(
            <div className="new-question">
                <div className="center">
                    CREATE NEW QUESTION
                </div>
                <form onSubmit={this.onSubmit}>
                    <span>
                        Complete the question:
                    </span>
                    <div>
                        Would you rather ...
                    </div>
                    <div className="form-check">
                        <input
                        type="text"
                        name="poll-options"
                        value={optionOneText}
                        onChange={this.onChangeOptionOne}
                        className="form-check-input"
                        size="100"
                        />                        
                    </div>
                    <div className="center">
                        OR
                    </div>
                    <div className="form-check">
                        <input
                        type="text"
                        name="poll-options"
                        value={optionTwoText}
                        onChange={this.onChangeOptionTwo}
                        className="form-check-input"
                        size="100"
                        />                        
                    </div>
                    <div className="center">
                        <button className="btn btn-primary" type="submit" disabled={optionOneText === '' && optionTwoText === ''}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }    
}

function mapStateToProps({ authedUser }) {
    return({
        authedUser
    })
}

export default connect(mapStateToProps)(NewQuestion);