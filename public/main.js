(async function IIFE() {
    "use strict";
    let throttleTimer;

    const articleContainer = document.getElementById("article");

    document.addEventListener('selectionchange', (event) => {
        clearTimeout(throttleTimer);
        throttleTimer = setTimeout(function() {
            showAddComment(event);
        }, 500);
    });
})();

function showAddComment(event) {
    const selection = window.getSelection();

    if (selection.type === "Range") {
        const oldContainer = document.getElementById("new-comment-container");

        if (oldContainer) {
            oldContainer.remove();
        }

        const parentElement = selection.anchorNode.parentElement;
        const selectedText = parentElement.textContent;

        let newCommentBox = document.createElement("div");

        newCommentBox.className = "new-comment-container";
        newCommentBox.id = "new-comment-container";
        newCommentBox.style.top = parentElement.offsetTop + "px";
        newCommentBox.style.left = parentElement.offsetLeft + "px";

        let newCommentTextArea = document.createElement("textarea");

        newCommentTextArea.className = "comment-textarea";
        newCommentTextArea.id = "new-comment";

        let saveCommentBtn = document.createElement("button");

        saveCommentBtn.className = "save-btn";
        saveCommentBtn.id = "save-comment";
        saveCommentBtn.textContent = "Skapa kommentar";

        saveCommentBtn.addEventListener("click", function (event) {
            addComment(event, newCommentTextArea, selectedText);
        });

        newCommentBox.appendChild(newCommentTextArea);
        newCommentBox.appendChild(saveCommentBtn);

        document.body.appendChild(newCommentBox);
    }
}

async function addComment(event, textArea, commentedText) {
    if (textArea.value) {
        const data = {
            url: window.location.href,
            commentedText: commentedText,
            comment: textArea.value,
            author: document.getElementById("author").textContent,
        };

        const response = await fetch("/comments", {
            body: JSON.stringify(data),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST'
        });
        const result = await response.json();
    }
}
