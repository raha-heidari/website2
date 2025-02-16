
function loadAccountInfo() {
    let data = JSON.parse(localStorage.getItem("accountData"));
    if (data) {
        document.getElementById("fullName").value = data.fullName || "";
        document.getElementById("email").value = data.email || "";
        document.getElementById("phone").value = data.phone || "";
        document.getElementById("username").value = data.username || "";
        document.getElementById("dob").value = data.dob || "";
        document.getElementById("country").value = data.country || "";
        document.getElementById("accountType").value = data.accountType || "";
        document.getElementById("joinedDate").value = data.joinedDate || "January 2023";
    }
}

function enableEditing() {
    document.querySelectorAll("#account-form input:not([readonly])").forEach(input => input.removeAttribute("readonly"));
}

function saveAccountInfo() {
    let data = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        username: document.getElementById("username").value,
        dob: document.getElementById("dob").value,
        country: document.getElementById("country").value,
        accountType: document.getElementById("accountType").value,
        joinedDate: document.getElementById("joinedDate").value
    };
    localStorage.setItem("accountData", JSON.stringify(data));
    alert("Account information saved successfully!");

}

function addComment() {
    let input = document.getElementById("comment-input");
    let commentText = input.value.trim();
    if (commentText !== "") {
        let commentList = document.getElementById("comments-list");
        let newComment = document.createElement("li");
        newComment.className = "list-group-item";
        newComment.innerHTML = commentText + " - <strong>You</strong>";
        commentList.appendChild(newComment);
        saveComments();
        input.value = "";
    }
}

function saveComments() {
    let comments = [];
    document.querySelectorAll("#comments-list li").forEach(comment => comments.push(comment.innerHTML));
    localStorage.setItem("comments", JSON.stringify(comments));
}

function loadComments() {
    let storedComments = JSON.parse(localStorage.getItem("comments"));
    let commentList = document.getElementById("comments-list");
    let sampleComments = [
        "Great experience! - <strong>Emily</strong>",
        "Nice platform, easy to use. - <strong>Michael</strong>",
        "I love this website! - <strong>Sarah</strong>"
    ];

    let comments = storedComments || sampleComments;
    comments.forEach(comment => {
        let newComment = document.createElement("li");
        newComment.className = "list-group-item";
        newComment.innerHTML = comment;
        commentList.appendChild(newComment);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    loadAccountInfo();
    loadComments();
});

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("account-form");
    const saveButton = document.getElementById("save-btn"); 

    saveButton.addEventListener("click", function (event) {
        event.preventDefault(); 

       
        const inputs = form.querySelectorAll("input, textarea, select");

        inputs.forEach(input => {
           
            if (input.hasAttribute("readonly")) {
                input.removeAttribute("readonly");
            }
            if (input.hasAttribute("disabled")) {
                input.removeAttribute("disabled");
            }

            
            input.value = "";
        });

        
        // alert("Saved successfully and form cleared!");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.querySelector(".email-input");
    const emailBtn = document.querySelector(".email-btn");

    emailBtn.addEventListener("click", function () {
        if (emailInput.value.trim() === "") {
            alert("Please enter your email.");
        } else {
            alert("Thank you for subscribing!");
            emailInput.value = ""; 
        }
    });
});