import React, { Component } from 'react';
import Comment from './Comment';
import emitter from '../services/emitter';

import './CommentSection.css';
import data from '../data.json';
import CommentTyping from './CommentTyping';

class CommentSection extends Component {
    static defaultProps = {
        currentUser: data.currentUser,
    };

    state = {
        comments: data.comments,
    };

    componentDidMount() {
        emitter.on('COMMENT_VOTING_EVENT', ({ score, id }) => {
            this.updateComment(id, score);
        });
    }

    componentWillUnmount() {
        emitter.off('COMMENT_VOTING_EVENT');
    }

    updateComment(id, score) {
        this.setState((prevState) => ({
            comments: prevState.comments.map((comment) => {
                if (comment.replies && comment.replies.length > 0) {
                    comment.replies = comment.replies.map((reply) => {
                        if (reply.id === id) {
                            return { ...reply, score };
                        } else {
                            return reply;
                        }
                    });
                }
                if (comment.id === id) {
                    return { ...comment, score };
                } else {
                    return comment;
                }
            }),
        }));
    }

    render() {
        console.log(this.state.comments);
        const comments = this.state.comments
            .sort((c1, c2) => c2.score - c1.score)
            .map((comment) => {
                if (comment.replies && comment.replies.length > 0) {
                    return (
                        <div>
                            <Comment
                                key={comment.id}
                                currentUser={this.props.currentUser}
                                {...comment}
                            />
                            <div className="comment-reply">
                                {comment.replies
                                    .sort((c1, c2) => c2.score - c1.score)
                                    .map((reply) => (
                                        <Comment
                                            key={reply.id}
                                            {...reply}
                                            currentUser={this.props.currentUser}
                                        />
                                    ))}
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <Comment
                            key={comment.id}
                            currentUser={this.props.currentUser}
                            {...comment}
                        />
                    );
                }
            });

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
