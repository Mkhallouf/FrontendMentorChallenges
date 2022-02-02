import data from '../data.json';

class TodoStorage {
    constructor() {
        localStorage.setItem('comments', JSON.stringify(data.comments));
    }

    addComment(comment) {
        const commentsJson = localStorage.getItem('comments');
        const comments = JSON.parse(commentsJson);

        comments.push(comment);

        localStorage.setItem('comments', JSON.parse(comments));
    }

    addReply(commentId, reply) {
        const commentsJson = localStorage.getItem('comments');
        const comments = JSON.parse(commentsJson);

        const index = comments.findIndex((comment) => comment.id === commentId);

        if (index > -1) {
            comments[index].replies.push(reply);
            localStorage.setItem('comments', JSON.parse(comments));
        }
    }

    removeComment(id) {
        const commentsJson = localStorage.getItem('comments');
        const comments = JSON.parse(commentsJson);

        localStorage.setItem(
            'comments',
            JSON.parse(comments.filter((com) => com.id !== id))
        );
    }
}

export default new TodoStorage();
