import React, { Component } from 'react';
import Comment from './Comment';
import emitter from './services/emitter';

import './CommentSection.css';
import data from './data.json';
import CommentTyping from './CommentTyping';

class CommentSection extends Component {
    static defaultProps = {
        currentUser: data.currentUser,
    };

    state = {
        comments: data.comments,
    };

    componentDidMount() {
        emitter.on('VOTING_FROM_MAIN_COMMENTS', ({ score, id }) => {
            console.log(`id: ${id} score:${score}`);
            this.updateComment(id, score);
        });
    }

    componentWillUnmount() {
        emitter.off('VOTING_FROM_MAIN_COMMENTS');
    }

    updateComment(id, score) {
        const index = this.state.comments.findIndex((c) => c.id === id);

        if (index === -1) {
        } else {
            this.setState((prevState) => ({
                comments: [
                    ...prevState.comments.slice(0, index),
                    { ...prevState.comments[index], score },
                    ...prevState.comments.slice(index + 1),
                ],
            }));
        }
    }

    handCommentSubmission = () => {};

    render() {
        const comments = this.state.comments
            .sort((c1, c2) => c1.id - c2.id)
            .map((comment) => (
                <Comment
                    key={comment.id}
                    currentUser={this.props.currentUser}
                    {...comment}
                />
            ));

        return (
            <div className="comment-section">
                <div>{comments}</div>
                <CommentTyping
                    currentUser={this.props.currentUser}
                    submitComment={this.handCommentSubmission}
                />
            </div>
        );
    }
}

export default CommentSection;
