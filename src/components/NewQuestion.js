import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {handleAddQuestion} from '../actions/questions';

// Component to display input text item for poll options
const PollOptionTextInputItem = props => {
  const {value, onChange} = props;

  return (
    <div className="form-check">
      <input
        type="text"
        name="poll-options"
        value={value}
        onChange={onChange}
        className="form-check-input"
        size="100"
      />
    </div>
  );
};

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  };

  onChangeOptionOne = e => {
    this.setState ({
      optionOneText: e.target.value,
    });
  };

  onChangeOptionTwo = e => {
    this.setState ({
      optionTwoText: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault ();
    const {dispatch} = this.props;
    const {optionOneText, optionTwoText} = this.state;
    dispatch (handleAddQuestion (optionOneText, optionTwoText));
    this.setState ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true,
    });
  };

  render () {
    const {optionOneText, optionTwoText, toHome} = this.state;
    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
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
          <div className="center">
            <PollOptionTextInputItem
              value={optionOneText}
              onChange={this.onChangeOptionOne}
            />
            <div>
              OR
            </div>
            <PollOptionTextInputItem
              value={optionTwoText}
              onChange={this.onChangeOptionTwo}
            />
          </div>
          <div className="center">
            <button
              className="btn btn-primary"
              type="submit"
              disabled={optionOneText === '' && optionTwoText === ''}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect () (NewQuestion);
