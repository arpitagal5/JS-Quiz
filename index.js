const quizQuestions = [
    { 
        question : 'Inside which HTML element do we put the JavaScript?' ,
        answers: {
            A : '< js >',
            B : '< javascript >',
            C : '<  script >' ,
            D : '< scripting >'
        },
        correctAns : 'C'
    },
    { 
        question : 'How to write an IF statement in JavaScript?'  ,
        answers : {
            A : 'if(i == 5)',
            B : 'if i = 5 then',
            C : 'if i == 5 then', 
            D : 'if i = 5'
        },
        correctAns : 'A'
    },
    { 
        question : 'How do you write "Hello World" in an alert box?',
        answers : {
            A : 'msgBox("Hello World")',
            B : 'alert("Hello World")',
            C : 'alertBox("Hello World")',
            D : 'msg("Hello World")'
        },
        correctAns : 'B'
    },
    {
        question : 'Which are the correct "if" statements to execute certain code if “x” is equal to 2?',
        answers : {
            A : 'if(x 2)',
            B : 'if(x = 2)',
            C : 'if(x == 2)',
            D : 'if(x != 2 )'
        },
        correctAns : 'C'
    }
]

const countTimer = document.querySelector('.count');
const headerSection = document.querySelector('#header');
const quizStart = document.querySelector('.quizStart');
const quiz = document.querySelector('#quiz');
const question = document.querySelector('#question');
const ansChoices = document.querySelector('#choices');
const buttons = document.querySelector('#buttons');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const submit = document.querySelector('#submit');

//quiz start
let i = 0 ;
let time ;
quizStart.addEventListener('click' , event => {
    let count = 20 ;
    time = setInterval(() => {
           countTimer.innerHTML = count ;
           countTimer.style.border = '1px solid black';
           count-- ;
           if(count == -1){
           clearInterval(time);
           completeQuiz();
         }
    },1000);
    event.target.style.display = 'none';
    quiz.style.display = 'block';
    prevButton.style.display = 'none';
    submit.style.display = 'none';
    nextButton.style.display = 'inline-block';
    createQuiz( i );
})

let userAnswers = [];
function createQuiz( index ){

    question.innerHTML = quizQuestions[i].question ;
    Object.keys(quizQuestions[i].answers).map(item => {
    let choice = document.createElement('div');
    choice.setAttribute('id',item);
    choice.innerHTML = quizQuestions[i].answers[item];
    ansChoices.appendChild(choice);
    choice.addEventListener('click' , event => {
        event.target.style.background = '#c7ecee';
        event.target.className = 'active';
        let answer = event.target.id;
        userAnswers.push( 'key', i );
        userAnswers.push(answer);
        checkAnswer(answer , index);
        })
    });
    buttons.style.display = 'block';
}

let sum = 0 ;
function checkAnswer(value, index){
    if( value == quizQuestions[index].correctAns ){
        sum = sum + 25 ;
    }
}

prevButton.addEventListener('click', event => {
    clearDiv();
    i -= 1 ;
    if( i < 0 || i == 0){
        createQuiz( i = 0 );
        submit.style.display = 'none';
        prevButton.style.display = 'none';
    }else if(i == quizQuestions.length - 1){
        nextButton.style.display = 'inline-block';
        createQuiz( i );
    }else{
        createQuiz( i );
        submit.style.display = 'none';
        nextButton.style.display = 'inline-block';
    }
})

function clearDiv(){
    const allChoices = document.querySelectorAll('#choices > div');
    allChoices.forEach(div => {
        div.remove();
    })
}

nextButton.addEventListener('click' , event => {
       clearDiv();
       i += 1 ;
       prevButton.style.display = 'inline-block';
       if( i >= quizQuestions.length){
           completeQuiz();
       }else if(i == quizQuestions.length - 1) {
           submit.style.display = 'inline-block';
           nextButton.style.display  = 'none';   
           createQuiz( i );
       }else {
           createQuiz( i );
       }
})

//submit action
submit.addEventListener('click' , event => {
    event.preventDefault();
    clearInterval(time);
    completeQuiz();
})

function completeQuiz(){
    question.style.display = 'none';
    ansChoices.style.display = 'none';
    let quizScore = document.createElement('div');
    let quizText = document.createTextNode(`Your Total Score is  ${sum} %` );
    quizScore.className = 'finalDiv' ;
    quizScore.append(quizText);
    quiz.appendChild(quizScore);
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
    submit.style.display = 'none';
}
