import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formatQuestion} from '../utils/helpers';
import {Link} from 'react-router-dom';
import {handleSetAnswer} from '../actions/questions';
import {Progress} from 'semantic-ui-react';

// Component to render input radio item for poll options
const PollOptionRadioInputItem = props => {
  const {value, checked, onChange, children} = props;

  return (
    <div className="form-check">
      <label>
        <input
          type="radio"
          name="poll-options"
          value={value}
          checked={checked}
          onChange={onChange}
          className="form-check-input"
        />
        {children}
      </label>
    </div>
  );
};

// Component to render Questions on home page
const ViewQuestion = props => {
  const {id, authorName, optionOne} = props;

  return (
    <div className="question-info">
      <div>
        <span>{authorName} asks:</span>
        <div>
          <span>
            Would you rather:
          </span>
          <span>
            ...{optionOne.text.slice (0, 15)}...
          </span>
        </div>
        <Link to={`/question/${id}`}>
          <button className="btn">View Poll</button>
        </Link>
      </div>
    </div>
  );
};

// Component to render unanswered question/poll
const UnansweredQuestion = props => {
  const {
    authorName,
    optionOne,
    optionTwo,
    selectedOption,
    onChange,
    onSubmit,
  } = props;

  return (
    <div className="question-unanswered">
      {/* Reference: http://react.tips/radio-buttons-in-react-16/ */}
      <span>{authorName} asks:</span>
      <div>
        <span>
          Would you rather:
        </span>
        <form onSubmit={onSubmit}>
          <PollOptionRadioInputItem
            value="optionOne"
            checked={selectedOption === 'optionOne'}
            onChange={onChange}
          >
            {optionOne.text}
          </PollOptionRadioInputItem>
          <PollOptionRadioInputItem
            value="optionTwo"
            checked={selectedOption === 'optionTwo'}
            onChange={onChange}
          >
            {optionTwo.text}
          </PollOptionRadioInputItem>
          <div className="form-group">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Component to render Poll result -
// users vote, progress bar indicating percent of votes and number of votes out of total votes
const PollResult = props => {
  const {optionOne, optionTwo, selectedAnswer, currentOption} = props;
  const totalVotes = optionOne.votes + optionTwo.votes;
  const percent = (optionOne.votes / totalVotes * 100).toFixed (2);
  return (
    <div>
      <div>
        {`Would you rather ${optionOne.text}?`}
        {selectedAnswer === currentOption && <b>{`   <-- YOUR VOTE`}</b>}
      </div>
      <Progress percent={percent} progress />
      {`${optionOne.votes} out of ${optionOne.votes + optionTwo.votes} votes`}
    </div>
  );
};

// Component to render answered question/poll
const AnsweredQuestion = props => {
  const {authorName, optionOne, optionTwo, selectedAnswer} = props;

  return (
    <div className="question-answered">
      <span>Asked by {authorName}:</span>
      <div>
        <span>Results:</span>
        <PollResult
          optionOne={optionOne}
          optionTwo={optionTwo}
          selectedAnswer={selectedAnswer}
          currentOption="optionOne"
        />
        <PollResult
          optionOne={optionTwo}
          optionTwo={optionOne}
          selectedAnswer={selectedAnswer}
          currentOption="optionTwo"
        />
      </div>
    </div>
  );
};

class Question extends Component {
  state = {
    selectedOption: 'optionOne',
  };

  onSubmit = e => {
    e.preventDefault ();
    const {id} = this.props.match.params;
    const {dispatch, authedUser} = this.props;
    dispatch (
      handleSetAnswer ({authedUser, qid: id, answer: this.state.selectedOption})
    );
  };

  onChange = e => {
    this.setState ({
      selectedOption: e.target.value,
    });
  };

  render () {
    const {question, idFromParams} = this.props;

    if (question === null) {
      return (
        <div>
          <h3 className="center">
            404 Error. Page not found. Poll does not exist.
          </h3>
        </div>
      );
    }

    const {
      id,
      name,
      avatar,
      optionOne,
      optionTwo,
      hasAnswered,
      selectedAnswer,
    } = question;
    const {selectedOption} = this.state;
    return (
      <div className="user-info">
        <img src={avatar} alt={`avatar of ${name}`} className="avatar" />
        {/* render questions on home page */}
        {idFromParams === false &&
          <ViewQuestion id={id} authorName={name} optionOne={optionOne} />}
        {/* render unanswered question */}
        {idFromParams === true &&
          hasAnswered === false &&
          <UnansweredQuestion
            authorName={name}
            optionOne={optionOne}
            optionTwo={optionTwo}
            selectedOption={selectedOption}
            onSubmit={this.onSubmit}
            onChange={this.onChange}
          />}
        {/* render answered question */}
        {idFromParams === true &&
          hasAnswered === true &&
          <AnsweredQuestion
            authorName={name}
            optionOne={optionOne}
            optionTwo={optionTwo}
            selectedAnswer={selectedAnswer}
          />}
      </div>
    );
  }
}

function mapStateToProps ({authedUser, questions, users}, props) {
  let question, idFromParams = false;
  if (props.match) {
    const {id} = props.match.params;
    question = questions[id];
    idFromParams = true;
  } else if (props.id) {
    question = questions[props.id];
  }
  return {
    authedUser,
    question: question
      ? formatQuestion (question, users[question.author], authedUser)
      : null,
    idFromParams,
  };
}

export default connect (mapStateToProps) (Question);
