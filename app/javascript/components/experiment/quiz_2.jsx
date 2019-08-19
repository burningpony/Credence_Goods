import React, { Component } from 'react';
import {
 Card, Row, Col, Button, Container 
} from '@bootstrap-styled/v4';
import { saveQuiz } from '../../services/quiz_service';

const questions = [
  {
    question:
      'Assume you predicted that the maximum for the above function was Y. How close was this to the actual maxima? [X is the actual distance from the maxima]',
    answers: ['a. 0', 'b. .25 X', 'c. X', 'd. 1.25X', 'e. 1.5X'],
  },
  {
    question:
      'Assume you predicted that the maximum for the above function was Y. How close was this to the actual maxima? [X is the actual distance from the maxima]',
    answers: ['a. 0', 'b. .25 X', 'c. X', 'd. 1.25X', 'e. 1.5X'],
  },
];

class Quiz2 extends Component {
  constructor(props) {
    super(props);
    const answers = [];
    questions.map(() => {
      answers.push({ answer: '' });
    });
    this.state = { answers };

    // bind
    this.onChanged = this.onChanged.bind(this);
    this.saveQuiz = this.saveQuiz.bind(this);
    this.isAnswered = this.isAnswered.bind(this);
  }

  onChanged(questionIndex, answerIndex) {
    const answers = this.state.answers;
    answers[questionIndex] = { answer: answerIndex };
    this.setState({ answers });
  }

  saveQuiz() {
    const answers = this.state.answers.map((ans, index) => {
      const quest = questions[index];
      return { question: quest.question, answer: quest.answers[ans.answer] };
    });
    saveQuiz(this.props.user.id, answers).then((response) => {
      if (!response.error) {
        this.props.transition();
      }
    });
  }

  isAnswered(questionIndex, answerIndex) {
    if (this.state.answers[questionIndex]) {
      return this.state.answers[questionIndex].answer === answerIndex;
    }
    return false;
  }

  render() {
    return (
      <div>
        <h1>Quiz 2</h1>
        {questions.map((question, i) => (
          <div key={i}>
            <h2>
          Question
          {' '}
          {i + 1}
          </h2>
            <p>{question.question}</p>
            <div>
              {question.answers.map((ans, j) => (
                <p key={j} id="question">
                  <input
                    value={j}
                    checked={this.isAnswered(i, j)}
                    onChange={() => this.onChanged(i, j)}
                    type="radio"
                    id={j}
                  />
                  {ans}
                </p>
              ))}
            </div>
          </div>
        ))}
        <Button onClick={this.saveQuiz} name="submitQuiz">Submit</Button>
      </div>
    );
  }
}

export default Quiz2;
