document.addEventListener("DOMContentLoaded", function() {
    let usernameInput = document.querySelector("#username");
    let serachBtn = document.querySelector("#submitButton");
    let progress = document.querySelector(".progress");

    let easyProgress = document.querySelector(".easy");
    let easyLbl = document.querySelector("#easy-label");
    let mediumLbl = document.querySelector("#medium-label");
    let hardLbl = document.querySelector("#hard-label");
    let mediumProgress = document.querySelector(".medium");
    let hardProgress = document.querySelector(".hard");

    let cards = this.documentElement.querySelector(".cards");


    function validateUser(username){
        if(username.trim() === ""){
            alert("username should not  be empty");
            return false;
        }
        const regex = /^[a-zA-Z][a-zA-Z0-9_]{0,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching){
           alert("enter valid username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username){
        const url  = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try{

            serachBtn.textContent = "Searching...";
            serachBtn.disabled =true;

            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch the data");
            }

            const parsedData = await response.json();
            console.log("Data Fetch Successful", parsedData);

            displayUserData(parsedData);
        }
        catch(err){
            alert("Enter Valid username");
        }
        finally{
            serachBtn.textContent = "Search";
            serachBtn.disabled =false;
        }
    }

    function updateProgress(solved, total, label, circle){

        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`); 
        label.textContent = `${solved} / ${total}`;

    }


    function displayUserData(parsedData){
        const totalQues = parsedData.totalQuestions;
        const totalEasyQues = parsedData.totalEasy;
        const totalMediumQues = parsedData.totalMedium;
        const totalHardQues = parsedData.totalHard;

        const totalSolvedQues = parsedData.totalSolved;
        const totalSolvedEasydQues = parsedData.easySolved;
        const totalSolvedMediumQues = parsedData.mediumSolved;
        const totalSolvedHardQues = parsedData.hardSolved;

        updateProgress(totalSolvedEasydQues, totalEasyQues, easyLbl , easyProgress);
        updateProgress(totalSolvedMediumQues, totalMediumQues, mediumLbl , mediumProgress);
        updateProgress(totalSolvedHardQues, totalHardQues, hardLbl , hardProgress);

        const cardsData = [
            {label: "Overall Submission", value: totalSolvedQues},
            {label: "Easy Submission", value: totalSolvedEasydQues},
            {label: "Medium Submission", value: totalSolvedMediumQues},
            {label: "Hard Submission", value: totalSolvedHardQues},

        ];

        cards.innerHTML = cardsData.map(
            data => {
                return `<div class="card">
                    <h3>${data.label}</h3>
                    <p>${data.value}</p>
                </div>`
            }
        ).join("");

    }

    serachBtn.addEventListener('click', function(){

        const username = usernameInput.value;
        if(validateUser(username)){
            fetchUserDetails(username);
        }


    })
});