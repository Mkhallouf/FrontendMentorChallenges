import React, { Component } from 'react';
import plus from './images/icon-plus.svg';
import minus from './images/icon-minus.svg';
import emitter from './services/emitter';

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

        if (op === 'plus') {
            this.setState((prevSt) => ({
                votingCounter: prevSt.votingCounter + 1,
            }));
        } else if (op === 'minus' && this.state.votingCounter > 0) {
            this.setState((prevSt) => ({
                votingCounter: prevSt.votingCounter - 1,
            }));
        }

        emitter.emit(`VOTING_FROM_${this.props.type}_COMMENTS`, {
            score: this.state.votingCounter,
            id: this.props.id,
        });
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
