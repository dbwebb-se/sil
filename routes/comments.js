const express = require('express');
const router = express.Router();

const commentsModel = require('../models/comments');

router.get(
    "/", async (req, res) => {
        const url = req.params.url;
        const comments = await commentsModel.getComments();

        return res.json({
            data: comments,
        });
    }
);

router.post(
    "/", async (req, res) => {
        const url = req.body.url;
        const commentedText = req.body.commentedText;
        const comment = req.body.comment;
        const author = req.body.author;



        const result = await commentsModel.addComment(url, commentedText, comment, author);

        return res.json(result);
    }
);

module.exports = router;
