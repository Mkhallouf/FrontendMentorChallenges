import React, { Component } from 'react';
import plus from '../images/icon-plus.svg';
import minus from '../images/icon-minus.svg';
import emitter from '../services/emitter';

import './VotingButtons.css';

class VotingButtons extends Component {
    constructor(props) {
        super(props);

        this.state = {
            votingCounter: this.props.score,
        };
    }

    handleClick = (e) => {
        const op = e.target.alt;
        let score = this.state.votingCounter;

        if (op === 'plus') {
            score++;
        } else if (op === 'minus' && this.state.votingCounter > 0) {
            score--;
        }

        this.setState(
            {
                votingCounter: score,
            },
            () => {
                emitter.emit(`COMMENT_VOTING_EVENT`, {
                    score: this.state.votingCounter,
                    id: this.props.id,
                });
            }
        );
    };

    render() {
        return (
            <div className="vertical-buttons">
                <button onClick={this.handleClick} name="plus">
                    <img src={plus} alt="plus" />
                </button>
                <p>{this.state.votingCounter}</p>
                <button onClick={this.handleClick} name="minus">
                    <img src={minus} alt="minus" />
                </button>
            </div>
        );
    }
}

export default VotingButtons;
