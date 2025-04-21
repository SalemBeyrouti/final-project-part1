var loggedInUser = null;

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

function showDashboard() {
    if (loggedInUser && loggedInUser.isAdmin) {
      var users = JSON.parse(localStorage.getItem("users")) || [];
  
      var tableBody = document.getElementById("dashboardTable");
      tableBody.innerHTML = "";
  
      const usersWithTotalScores = users.map(user => {
        const total = user.scores && Array.isArray(user.scores)
          ? user.scores.reduce((sum, s) => sum + s.score, 0)
          : 0;
        return { email: user.email, totalScore: total };
      });
  
      const sortSelect = document.getElementById("sortSelect");
      const sortOption = sortSelect ? sortSelect.value : "scoreDesc";
  
      if (sortOption === "scoreAsc") {
        usersWithTotalScores.sort((a, b) => a.totalScore - b.totalScore);
      } else {
        usersWithTotalScores.sort((a, b) => b.totalScore - a.totalScore);
      }
  
      usersWithTotalScores.forEach(user => {
        var row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.email}</td>
          <td>${user.totalScore}</td>
        `;
        tableBody.appendChild(row);
      });
  
      showSection("dashBoardPage");
    } else {
      alert("Only admin can access the dashboard.");
    }
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
        loggedInUser = {email: emailInput, isAdmin: true};
        showDashboard();
        return;
    }

    var users = JSON.parse(localStorage.getItem("users")) || [];

    var matchedUser = users.find(function(user){

        return user.email === emailInput && user.password === passwordInput;

    });

    if (matchedUser){
        loggedInUser = matchedUser;
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



function addSampleQuizzes() {
    var quizzes = [
        {
            id: 1,
            title: "HTML Basics",
            questions: [
                { question: "What is HTML?", choices: ["Hypertext Markup Language", "Hello Thanks Mister Lonely", "IDK", "HyperText Medium Link"], correct: 0 },
                { question: "What does h1 stand for?", choices: ["Heading 1", "Horse 1", "Hello 1", "Happy1"], correct: 0 },
                { question: "What is Href?", choices: ["Hypertext Reference", "Hypertext Recursion Format", "High Resolution File", "Hypertext file"], correct: 0 },
                { question: "Which of these is a valid HTML element?", choices: ["<header>", "<script>", "<section>", "<div>"], correct: 3 }
            ]
        },
        {
            id: 2,
            title: "General Knowledge",
            questions: [
                { question: "What is the capital of France?", choices: ["Berlin", "Madrid", "Paris", "London"], correct: 2 },
                { question: "Which planet is known as the Red Planet?", choices: ["Earth", "Mars", "Jupiter", "Saturn"], correct: 1 },
                { question: "Where is Lebanon located?", choices: ["Africa", "South Asia", "East Asia", "MiddleEast"], correct: 3 },
                { question: "Who wrote 'Romeo and Juliet'?", choices: ["Jebran Khalil Jebran", "Wadi3 l Shekh", "William Shakespeare", "Robert Downey Jr"], correct: 2 }
            ]
        },
        {
            id: 3,
            title: "Mathematics",
            questions: [
                { question: "What is 2 * 12?", choices: ["22", "20", "14", "24"], correct: 3 },
                { question: "What is the square root of 16?", choices: ["4", "1", "3", "8"], correct: 0 },
                { question: "What is 10 * -10?", choices: ["100", "20", "-20", "-100"], correct: 3 },
                { question: "What is the Area of a circle?", choices: ["2*pi*r", "pi*r", "pi*r2", "r*r"], correct: 2 }
            ]
        },
        {
            id: 4,
            title: "Science",
            questions: [
                { question: "What is the chemical symbol for water?", choices: ["O2", "CO2", "H2O", "NaCl"], correct: 2 },
                { question: "What is the boiling point of water?", choices: ["90°C", "100°C", "110°C", "120°C"], correct: 1 },
                { question: "Which planet is closest to the sun?", choices: ["Venus", "Earth", "Mercury", "Mars"], correct: 2 },
                { question: "What is the main gas in Earth's atmosphere?", choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct: 2 }
            ]
        }
    ];

    localStorage.setItem("quizzes", JSON.stringify(quizzes));
}
    localStorage.removeItem("quizzes");
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
    selectedQuiz = quizzes.find(function (quiz){
        return quiz.id === quizId;
    });

    if (selectedQuiz){
        document.getElementById("quizTitle").textContent = selectedQuiz.title;
        currentQuestionIndex = 0;
        userAnswers = new Array (selectedQuiz.questions.length).fill(null);

        showQuestion();

        document.getElementById("nextBtn").style.display = "inline-block";
        document.getElementById("submitBtn").style.display = "none";
    }
}

function showQuestion(){

    var questionContainer = document.getElementById("questionContainer");
    questionContainer.innerHTML = "";

    var question = selectedQuiz.questions[currentQuestionIndex];

    var questionElement = document.createElement("div");
    questionElement.classList.add("question");

    var questionText = document.createElement("p");
    questionText.textContent = (currentQuestionIndex +1) + "." + question.question;
    questionElement.appendChild(questionText);

    question.choices.forEach(function(choice, index) {
        var label = document.createElement("label");
        var input = document.createElement("input");
        input.type = "radio";
        input.name = "choice";
        input.value = index;

        if (userAnswers[currentQuestionIndex] === index){
            input.checked = true;
        }

        label.appendChild(input);
        label.appendChild(document.createTextNode(choice));
        questionElement.appendChild(label);
    });

    questionContainer.appendChild(questionElement);

   
    if (currentQuestionIndex === selectedQuiz.questions.length - 1) {
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("submitBtn").style.display = "inline-block";
    } else {
        document.getElementById("nextBtn").style.display = "inline-block";
        document.getElementById("submitBtn").style.display = "none";
    }

    document.getElementById("resultContainer").style.display = "none";
    }


var currentQuestionIndex = 0;
var selectedQuiz = null;
var userAnswers = [];




document.getElementById("nextBtn").addEventListener("click", function() {
    var selectedChoice = document.querySelector('input[name="choice"]:checked');
    if (selectedChoice) {
        userAnswers[currentQuestionIndex] = parseInt(selectedChoice.value);
    } else {
        userAnswers[currentQuestionIndex] = null;
    }

    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
});

document.getElementById("submitBtn").addEventListener("click", function() {
    var selectedChoice = document.querySelector('input[name="choice"]:checked');
    if (selectedChoice) {
        userAnswers[currentQuestionIndex] = parseInt(selectedChoice.value);
    }

    var correctAnswers = 0;
    selectedQuiz.questions.forEach(function(question, index){
        if (userAnswers[index] === question.correct){
            correctAnswers++;
        }
    })
    if (loggedInUser && !loggedInUser.isAdmin){
        var users = JSON.parse(localStorage.getItem("users")) || [];

        var userIndex = users.findIndex(function(user){
            return user.email === loggedInUser.email;
        });

        if (userIndex !== -1) {
            if (!users[userIndex].scores){
                users[userIndex].scores = [];
            }

            var existing = users[userIndex].scores.findIndex(s => s.quizId === selectedQuiz.id);
            if (existing !== -1){
                users[userIndex].scores[existing].score = correctAnswers;
            } else {
                users[userIndex].scores.push({
                    quizId: selectedQuiz.id,
                    score: correctAnswers
                });
            }

            
            
            localStorage.setItem("users", JSON.stringify(users));
        }
    }
    var resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = "You scored " + correctAnswers + " out of " + selectedQuiz.questions.length;
    resultContainer.style.display = "block";

    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("submitBtn").style.display = "none";

    document.getElementById("backToQuizzesBtn").style.display = "inline-block";

    

    });
    

    


document.getElementById("backToQuizzesBtn").addEventListener("click", function(){
    showSection("homePage");
    document.getElementById("resultContainer").style.display = "none";
    this.style.display= "none";
});

document.getElementById("backToHomeBtn").addEventListener("click", function(){
    showSection("homePage");
});

document.getElementById("sortSelect").addEventListener("change", function () {
    showDashboard();
  });