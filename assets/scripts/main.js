let input = document.querySelector(".username");
let banner = document.querySelector('.banner_wrapper')
let p = document.querySelector(".screen");
let div = document.querySelector('.score_wrapper');
let historyTable = document.querySelector('.history_tbl');
let scoreCard = document.querySelector('.score_wrapper');
let submit = document.querySelector('.submit');
let timer = document.querySelector('.timer');


let users = JSON.parse(localStorage.getItem('history'))||[];

let str = "";
let ansStr = "";
let stop = 0;
let limit = 0000;
let startSecond = 0;
let startMintue = 0;
let flag;
let right = 0;
let wrong = 0;
let currentIndex = 0;
let content = "";
let prev = "";
let disable = [38, 37, 39, 40, 16, 20, 17, 18, 27, 45, 46, 33, 34, 36, 35, 144, 111, 106, 109, 107, 110, 191, 192, 9, 13];


function clearHistory(event) {

    users = users.filter(el => el.username!== input.value.toLowerCase().trim());
    localStorage.setItem('history',JSON.stringify(users));
    
    let historyTableBody = document.querySelector('.history_tbl tbody');
    let clearBtn = document.querySelector('.clear_btn');
    
    event.target.style.display = 'none';

    historyTableBody.innerHTML= "";
    
    history(users);
}

function history(array = []) {
    
    document.querySelector('.score_wrapper').style.display = 'none';
    

    historyTable.style.display = 'block';

    let filterUser = array.filter(el => el.username == input.value.toLowerCase().trim());
    let historyTableBody = document.querySelector('.history_tbl tbody');
    
    for(let i = 0; i < filterUser.length; i++) {
        
        let tr = document.createElement('tr');

        for(key in filterUser[i]) {
            var td = document.createElement('td');
            td.innerText = filterUser[i][key];
            tr.append(td);
        }
        
        historyTableBody.append(tr);
    }
    let clearBtnDiv = document.createElement('div');
    clearBtnDiv.className = 'clar_btn_div';

    let clearBtn = document.createElement('button');
    clearBtn.className = "clear_btn history_btn";
    clearBtn.textContent = "Clear History";

    clearBtnDiv.append(clearBtn)
    historyTable.after(clearBtnDiv);

    clearBtn.addEventListener('click',clearHistory);
}


let min = 0;
let hour = 0;
function currentTime(startSec = 0,endSec = 0) {

    
    if(!startSec) {
        startSec = Date.now();
    }
    let sec = Math.floor( (Date.now() - startSec) / 1000);
    sec = sec < 60 ? sec : Math.floor(sec % 60)
    min = Math.floor( (Date.now() - startSec) / 1000/ 60);
    hour = Math.floor( (Date.now() - startSec) / 1000/ 60/60);
    // let min = Math.floor(sec / 60) || 0;
    
    // let hour = Math.floor(min / 60);
    if((startSec + sec*1000) <= endSec) {
     
        timer.style.visibility = 'visible';
        timer.innerHTML = `Timer : ${hour} : ${min} : ${sec}`;
    } 
    
    // sec += 1;   
    return Date.now(); 
}


function timeTaken_second() {
    return Math.floor((currentTime(startSecond, startSecond + limit) - startSecond) / 1000);
}


function wordTyped() {
    
    ansStr = ansStr.trim();
    str = str.trim();
    let count = 0;

    let ansArr = ansStr.split("");
    let strArr = str.split("");
    let strWords = str.split(" ");

    let temp = "";
    let pos = 0;
    for(let i = 0; i < ansStr.length; i++) {

        temp += ansArr[i];
        
        if(strArr[i+1] == " ") {
            
            if(strWords[pos].trim() == temp.trim()) {
                count += 1 ; 
                console.log("count",count);               
            }
            
            temp = "";
            pos++;
        }
    }
    return count;
}

function timeOver() {
    if(currentTime(startSecond, startSecond + limit) > (startSecond + limit) && startSecond && !stop) {
        input.style.display = "none";
        timer.style.display = 'none';
        displayScore(right, wrong, timeTaken_second());  

    }
    
}


function displayScore(right = 0, wrong = 0, sec=0) {

    scoreCard.style.display = 'block';
    
    let min = sec / 60;
    let wpm = Math.round(wordTyped() / min) || 0;
    let score = (right * 10) - 10;

    p.innerHTML = "";
    
    let total = str.trim().split("").length * 10;

    right -= 1; 
    let accuracy = Math.round((right / (right + wrong)) * 100) || 0;


    sec = (sec % 60);

    if(sec <= 1) {
        sec = `0${sec}second`;
    } else {
        if(sec < 10) {
            sec = `0${sec}seconds`;
        } else {
            sec = `${sec}seconds`
        }
    }

    min = Math.floor(min);

    if(min <= 1) {
        min = `0${min}minute`;
    } else {
        if(min < 10) {
            min = `0${min}minutes`;
        } else {
            min = `${min}minutes`
        }
    }

    let date = new Date();
    let month = "Jan,Feb,Mar,Apr,May,June,July,Aug,Sept,Oct,Nov,Dec".split(",");
    
    let currentUser = {
        username : input.value.toLowerCase().trim(),
        score : score,
        total : total,
        wpm : wpm,
        accuracy : `${accuracy}%`,
        timeTaken : `${min} ${sec}`,
        date: `${date.getDate()} ${month[date.getMonth()]}, ${date.getFullYear()}`
    }

    users.push(currentUser);
    
    localStorage.setItem('history',JSON.stringify(users));
    

    
    pScore = document.createElement('p');
    pScore.innerHTML = `<span class="label">Your Score: </span>${score}`; //to ignore first space

    pTotal = document.createElement('p');
    pTotal.innerHTML = `<span class="label">Total Score: </span>${total}`;

    pWpm = document.createElement('p');
    pWpm.innerHTML = `<span class="label">Word Per Mintue: </span>${wpm}`;


    pAcc = document.createElement('p');
    pAcc.innerHTML = `<span class="label">Accuracy: </span>${accuracy}%`;

    pTime = document.createElement('p');
    pTime.innerHTML = `<span class="label">Time Taken: </span>${min} ${sec}`;

    let history_btn = document.createElement('button');
    history_btn.className = 'history_btn';
    history_btn.textContent = "History";

    div.append(pScore,pTotal,pWpm, pAcc, pTime, history_btn);
    p.after(div);

    stop = 1;
    
    banner.style.display = 'none';
    p.style.display = 'none';

    history_btn.addEventListener('click',() => history(users, event));
}


function createRandomWords(event) {

    event.preventDefault();

    p.innerHTML = "";
    let minLength = 1;
    let msg = [];
   
    if (event.keyCode == 13 && input.value.toLowerCase().trim()!= '') {
        
        let noOfWords = 58;
        let randomWord = "";

        let userIcon = document.querySelector('.user_icon');
        userIcon.style.visibility = 'visible';

        document.querySelector('.user').innerText = input.value.trim();

        input.style.display = "none";

        for(let i = 1; i <= noOfWords; i++) {

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
        banner.style.display = 'none';
        
    }
    if(banner.style.display == 'none') {
        document.addEventListener('keyup', handleAnswer);
    }
    

}

function handleAnswer(event) {
    
    str = str.trim();
    str = " " + str;

    let date = new Date();
    
    if (event.keyCode == 32 && input.value.toLowerCase().trim() && !startSecond && !stop) {
       
        startMintue = date.getMinutes();
        startSecond = Date.now();

    } 

    
   
    if ( ((right + wrong + 1) == str.length  || currentTime(startSecond, startSecond + limit) > (startSecond + limit) ) && startSecond && !stop){

        // console.log(currentTime() > (startSecond + 1000));
        if(disable.indexOf(event.key) == -1 && (event.keyCode >=65 && event.keyCode<=90)) {
            ansStr += event.key;
            
        } else {
            // console.log("true");
            ansStr += "-";
        }
        markAnswer(str, ansStr);
      
        displayScore(right, wrong, timeTaken_second());

        ansStr = "";
        startSecond = 0;
        stop = 1;
        str = "";
        p.style.display = 'none';
        
    } else {
        if((str[currentIndex]==event.key) && event.keyCode !== 13 && currentIndex+1 <= str.trim().length && startSecond) {
            // console.log("if");
            // console.log(event.key.toUpperCase());
            ansStr += event.key;
            
            right++;
            currentIndex += 1;
            
            markAnswer(str, ansStr);
            
        } 
        else if(str[currentIndex] !== event.key && event.keyCode !== 13 && currentIndex+1 <= str.trim().length && startSecond) {
            
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
    
    // console.log("str",ansStr);

}

function markAnswer(str, userStr) {

        event.preventDefault();
        let minus = 0;
        userStr.slice(-1);
        p.innerHTML;
       
        userStr = userStr.split("");
        for(let i = minus; i < userStr.length; i++) {
            
            if(userStr[i]) {
               
                if(str[i]==userStr[i]) {

                    minus += 1;
                    content = `<span style="color: rgb(38,100,15);">${str[i]}</span>`;
                   
                    let next = `<span style="background-color: rgb(230,246,211);  border-bottom: 1.5px solid blue; padding-bottom: 1.5px;">${str[i+1]}</span>`;
                    let remaining = str.slice(i+2);
                    
                    
                    p.innerHTML = `${str.slice(0,i)}${content}${next}${remaining}`;
                    prev = p.innerHTML;
    
                } else {
                    
                    minus += 1;
                    
                    content = `<span style="color: rgb(214, 48, 48); ">${str[i]}</span>`;

                    let next = `<span style="background-color: rgb(230,246,211);  border-bottom: 1.5px solid blue; padding-bottom: 1.5px;">${str[i+1]}</span>`;
                    
                    
                    let remaining = str.slice(i+2);
                    
                
                   
                    p.innerHTML = `${str.slice(0,i)}${content}${next}${remaining}`;
                    prev = p.innerHTML;
    
                }
                
            } 
        }
       
}

document.body.style.zoom = 1.0;

setInterval(currentTime,1000);
setInterval(timeOver,1000);



input.addEventListener('keyup', createRandomWords);

