// Create web server
// Create a route for the comments
// Create a route for the comments/:commentId
// Create a route for the comments/:commentId/replies
// Create a route for the comments/:commentId/replies/:replyId
// Export the web server

const express = require('express');
const comments = require('./comments-data');

const app = express();
app.use(express.json());

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.get('/comments/:commentId', (req, res) => {
    const commentId = req.params.commentId;
    const comment = comments.find(comment => comment.id === commentId);
    if (!comment) {
        res.status(404).send('Comment not found.');
    } else {
        res.json(comment);
    }
});

app.get('/comments/:commentId/replies', (req, res) => {
    const commentId = req.params.commentId;
    const comment = comments.find(comment => comment.id === commentId);
    if (!comment) {
        res.status(404).send('Comment not found.');
    } else {
        res.json(comment.replies);
    }
});

app.get('/comments/:commentId/replies/:replyId', (req, res) => {
    const commentId = req.params.commentId;
    const comment = comments.find(comment => comment.id === commentId);
    if (!comment) {
        res.status(404).send('Comment not found.');
    } else {
        const replyId = req.params.replyId;
        const reply = comment.replies.find(reply => reply.id === replyId);
        if (!reply) {
            res.status(404).send('Reply not found.');
        } else {
            res.json(reply);
        }
    }
});

module.exports = app;