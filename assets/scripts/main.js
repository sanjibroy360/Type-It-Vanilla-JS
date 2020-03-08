let input = document.querySelector(".input");
let p = document.querySelector(".screen");

// let ans = document.querySelector(".ans");
let str = "";
let errorMsg = document.createElement('p');
let ansStr = "";
let startTime = 0;
let endTime = 0;
let flag;
let right = 0;
let wrong = 0;
let currentIndex = 0;
let content = "";
let prev = "";
let disable = [38, 37, 39, 40, 16, 20, 17, 18, 27, 45, 46, 33, 34, 36, 35, 144, 111, 106, 109, 107, 110, 191, 192, 9, 13];


function displayScore(right, wrong, min, sec) {
    p.innerHTML = "";
    
    let accuracy = Math.round((right / (right + wrong)) * 100);
    if(sec <= 1) {
        sec = `0${sec}second`;
    } else {
        if(sec < 10) {
            sec = `0${sec}seconds`;
        } else {
            sec = `${sec}seconds`
        }
    }

    if(min <= 1) {
        min = `0${min}minitue`;
    } else {
        if(min < 10) {
            min = `0${min}minitues`;
        } else {
            min = `${min}minitues`
        }
    }
    

    let div = document.createElement('div');
    div.className = "score_wrapper";

    pScore = document.createElement('p');
    pScore.innerHTML = `<span class="label">Score: </span>${right * 10}`;

    pAcc = document.createElement('p');
    pAcc.innerHTML = `<span class="label">Accuracy: </span>${accuracy}%`;

    pTime = document.createElement('p');
    pTime.innerHTML = `<span class="label">Time Taken: </span>${min} ${sec}`;

    div.append(pScore, pAcc, pTime);
    p.after(div);



}

function createRandomWords(event) {

    // console.log(event);
    event.preventDefault();
    p.innerHTML = "";
    let minLength = 1;
    let msg = [];
    if((+input.value <= 0 || +input.value !== Math.floor(+input.value) )&& event.keyCode == 13 ) {
        
        errorMsg.className = "error_msg";
        errorMsg.innerHTML = `Length of the sentence can't be ${input.value}`;

        input.after(errorMsg);
        input.value = "";
    }
    if (event.keyCode === 13 && input.value > 0) {
        if(errorMsg) {
            errorMsg.style.visibility = "hidden";
        }
        let noOfWords = +input.value;

        let randomWord = "";
        input.style.display = "none";


        for (let i = 1; i <= noOfWords; i++) {
            let wordLen = 3 + Math.floor(Math.random() * (+5 - +1) + +1);

            for (let j = 0; j <= wordLen; j++) {
                randomWord += String.fromCharCode(Math.floor(Math.random() * (+122 - +97) + +97));
                p.innerHTML = randomWord;

            }
            str += randomWord + " ";
            
            randomWord = "";
        }
        p.innerText = str;
        
        p.style.display = "block";
        
    }
    document.addEventListener('keyup', handleAnswer);
    
}

function handleAnswer(event) {
    str = str.trim();
    
    if (!startTime && input.value == str.split(" ").length) {
       
        startTime = Date.now();
    } 
    
   
    if (((right + wrong + 1) == str.length) && ansStr.length > 0) {

        
        endTime = Date.now();

        if(disable.indexOf(event.key) == -1 && (event.keyCode >=65 && event.keyCode<=90)) {
            ansStr += event.key;
            
        } else {
            console.log("true");
            ansStr += "-";
        }
        markAnswer(str, ansStr);
        
        let timeTaken_minitue = Math.round(((+endTime - +startTime) / 1000) / 60);
        let timeTaken_second = Math.round((+endTime - +startTime) / 1000);

        
        displayScore(right, wrong, timeTaken_minitue, timeTaken_second);
        ansStr = "";
        startTime = 0;
        endTime = 0;
        str = "";
        
    } else {
        if((str[currentIndex]==event.key) && event.keyCode !== 13 && currentIndex+1 <= str.trim().length) {
            console.log("if");
            console.log(event.key.toUpperCase());
            ansStr += event.key;
            
            right++;
            currentIndex += 1;
            
            markAnswer(str, ansStr);
            
        } 
        else if(str[currentIndex] !== event.key && event.keyCode !== 13 && currentIndex+1 <= str.trim().length) {
            
            if(disable.indexOf(event.key) == -1 && (event.keyCode >=65 && event.keyCode<=90)) {
                ansStr += event.key;
                
            } else {
              
                ansStr += "-";
            }
            
            currentIndex += 1;
        
            markAnswer(str, ansStr);
        
           
           wrong++;
            
            
           
        } 
        
    } 
    
 

}

function markAnswer(str, userStr) {
        event.preventDefault();
        let minus = 0;
        userStr.slice(-1);
        p.innerHTML;
        // str = str.split("");
        userStr = userStr.split("");
        for(let i = minus; i < userStr.length; i++) {
            
            if(userStr[i]) {
                // debugger; 
                console.log("str",str);  
                if(str[i]==userStr[i]) {
                    console.log("green", str[i]);
                    minus += 1;
                    content = `<span style="background-color: green;">${str[i]}</span>`;
                    // console.log("minus",minus);
                    let remaining = str.slice(i+1);
                    // p.innerHTML = "";
                    // console.log("remaining",remaining);
                    // console.log("content",content);
                    // p.innerHTML = "";
                    
                    // p.innerHTML = "";
                    p.innerHTML = `${str.slice(0,i)}${content}${remaining}`;
                    prev = p.innerHTML;
    
                } else {
                    console.log("red", str[i]);
                    minus += 1;
                    // if(i > 0)
                    //     content = `<span style="background-color: red;">${str[i-1]}</span>`;
                    // else
                    content = `<span style="background-color: red; ">${str[i]}</span>`;
                    
                    let remaining = str.slice(i+1);
                    
                
                    // p.innerHTML = ""
                    // p.innerHTML = "";
                    p.innerHTML = `${str.slice(0,i)}${content}${remaining}`;
                    prev = p.innerHTML;
    
                }
                // console.log(minus);
                
                
                // p.innerHTML = `${content}${str.slice(i+minus)}`;
                
                // content = "";
            } 
        }
       
}

input.addEventListener('keyup', createRandomWords);
