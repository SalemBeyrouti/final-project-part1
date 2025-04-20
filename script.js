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