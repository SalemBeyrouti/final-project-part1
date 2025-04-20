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

document.getElementById("loginBtn").addEventListener("click",function(){
    const emailInput = document.getElementById("email").value;
    document.getElementById("userEmail").textContent = emailInput;
    showSection("homePage");
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