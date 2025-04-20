function showSection(sectionid){
    const pages = ["authPage","homePage","quizPage","dashBoardPage"];

    pages.forEach(id =>{
        const page = document.getElementById(id);
        if (id === sectionid){
            page.style.display = "block";
        }else{
            page.style.display = "none"
        }
    
    });
}

showSection ("authPage");

// document.getElementById("loginBtn").addEventListener("click",function(){
//     const emailInput = document.getElementById("email").value;
//     document.getElementById("userEmail").textContent = emailInput;
//     showSection("homePage");
// });

document.getElementById("loginBtn").addEventListener("click", function(){
    var emailInput = document.getElementById("email").value;
    var passwordInput = document.getElementById("password").value;

    if (!emailInput || !passwordInput) {
        alert ("Please enter both email and password.");
        return;
    }

    if (emailInput === "admin@quiz.com" && passwordInput === "admin123"){
        showSection("dashBoardPage");
        return;
    }

    var users = JSON.parse(localStorage.getItem("users")) || [];

    var matchedUser = users.find(function(user){

        return user.email === emailInput && user.password === passwordInput;

    });

    if (matchedUser){
        document.getElementById("userEmail").textContent = emailInput;
        showSection("homePage");
        showQuizButtons();
    } else{
        alert("Invalid credentials. Please register or try again.");
    }


});

document.getElementById("logoutBtn").addEventListener("click", function()  {
    showSection("authPage");
})


document.getElementById("registerBtn").addEventListener("click", function() {
    registerUser();
});

function registerUser(){

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (!email || !password){
        alert("Please enter both email and password.");
        return;
    }

    var users = JSON.parse(localStorage.getItem("users")) || [];

    var userExists = users.find(function(user){
        return user.email === email;
    });


if (userExists){
    alert("User already exist. Please login.");
    return;
}

users.push({email: email, password: password});
localStorage.setItem("users", JSON.stringify(users));

alert("Registration successful");

}



function addSampleQuizzes(){

    var quizzes = [
        {
            id:1,  title:"HTML Basics", questions: [{question: "What is HTML?", choices: ["Hypertext Markup Language", "Hello Thanks Mister Lonely", "IDK"], correct: 0 },
            { question: "What does h1 stands for?", choices: ["Heading 1", "Horse 1", "Hello 1"], correct: 0 }]
           
        },
        {
            id:2, title: "General Knowledge",
             questions: [
                { question: "What is the capital of France?", choices: ["Berlin", "Madrid", "Paris"], correct: 2 },
                { question: "Which planet is known as the Red Planet?", choices: ["Earth", "Mars", "Jupiter"], correct: 1 }
            ]
        },
        {
            id: 3,
            title: "Sample Quiz", questions: [
                { question: "What is 2 + 2?", choices: ["3", "4", "5"], correct: 1 },
                { question: "What is the color of the sky?", choices: ["Blue", "Red", "Green"], correct: 0 }
            ]
        }
    ];

    localStorage.setItem("quizzes", JSON.stringify(quizzes));
}

    if(!localStorage.getItem("quizzes")){
        addSampleQuizzes();
    }


function showQuizButtons(){
    var quizList = document.getElementById("quizList");
    quizList.innerHTML = "";

    var quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];

    quizzes.forEach(function(quiz){
        var btn = document.createElement("button");
        btn.textContent = quiz.title;
        btn.addEventListener("click", function(){
            loadQuiz(quiz.id);
            showSection("quizPage");
        });
        quizList.appendChild(btn);
    });
}

function loadQuiz(quizId){
    var quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    var selectedQuiz = quizzes.find(function (quiz){
        return quiz.id === quizId;
    });

    if (selectedQuiz) {
        document.getElementById("quizTitle").textContent = selectedQuiz.title;

        var questionContainer = document.getElementById("questionContainer");
        questionContainer.innerHTML = "";

        selectedQuiz.questions.forEach(function(question, index){
            var questionElement = document.createElement("div");
            questionElement.classList.add("question");

            var questionText = document.createElement("p");
            questionText.textContent = (index +1) + "." + question.question;

            questionElement.appendChild(questionText);

            question.choices.forEach(function (choice, choiceIndex){
                var label = document.createElement("label");
                var input = document.createElement("input");
                input.type = "radio";
                input.name = "question" + index;
                input.value = choiceIndex;

                label.appendChild(input);
                label.appendChild(document.createTextNode(choice));
                questionElement.appendChild(label);
            });
            questionContainer.appendChild(questionElement);
        });
    }
}
