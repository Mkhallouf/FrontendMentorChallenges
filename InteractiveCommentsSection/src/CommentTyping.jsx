import React, { Component } from 'react';
import './CommentTyping.css';

class CommentTyping extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: '',
        };
    }

    render() {
        return (
            <div className="typing-section">
                <img
                    src={require(`${this.props.currentUser.image.png}`)}
                    alt={this.props.currentUser.username}
                />
                <textarea placeholder="Add a comment..." />
                <button onClick={this.props.submitComment}>SEND</button>
            </div>
        );
    }
}

export default CommentTyping;
