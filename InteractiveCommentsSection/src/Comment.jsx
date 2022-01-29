import React, { Component } from 'react';
import VotingButtons from './VotingButtons';
import replyIcon from './images/icon-reply.svg';
import editIcon from './images/icon-edit.svg';
import deleteIcon from './images/icon-delete.svg';
import './Comment.css';

class Comment extends Component {
    render() {
        let replies = [];

        if (
            Array.isArray(this.props.replies) &&
            this.props.replies.length > 0
        ) {
            replies = this.props.replies
                .sort((com) => com.id)
                .map((comment) => (
                    <Comment
                        key={comment.id}
                        {...comment}
                        currentUser={this.props.currentUser}
                    />
                ));
        }

        console.log(replies);
        return (
            <div>
                <div className="comment-box">
                    <VotingButtons
                        type="MAIN"
                        id={this.props.id}
                        score={this.props.score}
                    />
                    <div className="comment-info">
                        <div>
                            <img
                                src={require(`${this.props.user.image.png}`)}
                                alt={this.props.user.username}
                            />
                            <p className="comment-auther">
                                {this.props.user.username}
                                {this.props.currentUser.username ===
                                this.props.user.username ? (
                                    <span className="currentuser-tag">you</span>
                                ) : (
                                    ''
                                )}
                            </p>

                            <p className="comment-date">
                                {this.props.createdAt}
                            </p>
                        </div>
                        {this.props.currentUser.username ===
                        this.props.user.username ? (
                            <div className="comment-buttons">
                                <div className="commentBtn deleteBtn">
                                    <img src={deleteIcon} alt="delete" />
                                    <p>Delete</p>
                                </div>
                                <div className="commentBtn">
                                    <img src={editIcon} alt="reply" />
                                    <p>Edit</p>
                                </div>
                            </div>
                        ) : (
                            <div className="commentBtn">
                                <img src={replyIcon} alt="reply" />
                                <p>Reply</p>
                            </div>
                        )}
                    </div>
                    {this.props.replyingTo ? (
                        <p className="comment-body">
                            <span className="reply-to">
                                @{this.props.replyingTo}
                            </span>
                            {this.props.content}
                        </p>
                    ) : (
                        <p className="comment-body">{this.props.content}</p>
                    )}
                </div>
                <div className="comment-reply">{replies}</div>
            </div>
        );
    }
}

export default Comment;
