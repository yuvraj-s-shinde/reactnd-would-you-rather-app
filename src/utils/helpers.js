export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestion (question, author, authedUser) {
  const { id, optionOne, optionTwo, timestamp } = question
  const { name, avatarURL } = author

  return {
    name,
    id,
    timestamp,
    avatar: avatarURL,
    hasAnswered: optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser),
    selectedAnswer: optionOne.votes.includes(authedUser) ? "optionOne"
                    : optionTwo.votes.includes(authedUser) ? "optionTwo"
                    : null,
    optionOne: {
      votes: optionOne.votes.length,
      text: optionOne.text
    },
    optionTwo: {
      votes: optionTwo.votes.length,
      text: optionTwo.text
    }
  }
}