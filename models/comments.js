const database = require("../db/database");

const comments = {
    getComments: async function getComments() {
        const db = await database.openDb();

        try {
            const result = await db.all('SELECT * FROM comments');

            return result;
        } catch (e) {
            return {
                errors: {
                    status: e.status,
                    message: e.message,
                }
            };
        } finally {
            await db.close();
        }
    },

    addComment: async function addComment(url, commentedText, comment, author) {
        const db = await database.openDb();

        try {
            const result = await db.run(
                'INSERT INTO comments (url, commentedText, comment, author) VALUES (?, ?, ?, ?)',
                url,
                commentedText,
                comment,
                author,
            );

            return result;
        } catch (e) {
            return {
                errors: {
                    status: e.status,
                    message: e.message,
                }
            };
        } finally {
            await db.close();
        }
    }
};

module.exports = comments;
