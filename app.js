//creating quiz class
class Quiz {
    constructor(questions){
        this.score = 0;
        this.questions = questions;
        this.questionIdx = 0;
    }
    //get the current index of question user is on
    getQuestionIdx() {
        return this.questions[this.questionIdx];
    }
    //takes users answer and checks if its correct
    guess(answer){
        if(this.getQuestionIdx().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIdx++;
    }
    //check if quiz is complete
    isEnded() {
        return this.questionIdx === this.questions.length;
    }
}

//creating question class
class Question {
    constructor(text, choices, answer){
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    //checks if users answer is correct 
    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

//function to display quiz contents
const displayQuestion = () => {
    if(quiz.isEnded()){
        displayScores();
    }else {
        //display question to ask 
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIdx().text;
        //display question options
        let choices = quiz.getQuestionIdx().choices;
        for(let i = 0;i<choices.length;i++){
            let choiceElement = document.getElementById(`choice${i}`);
            choiceElement.innerHTML = choices[i]
            guess(`btn${i}`,choices[i])
        }

        showProgress();
    };
};

//guess function 
const guess = (id,guess) =>{
    let button = document.getElementById(id)
    button.onclick = () => {
        quiz.guess(guess);
        displayQuestion()
    }
}

//show quiz progress 
const showProgress = () =>{
    let currentQuestionNumber = quiz.questionIdx + 1;
    let progressElement = document.getElementById("progress")
    progressElement.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}

//show score
const displayScores = () => {
    let quizEndHTML = `
        <h1>Quiz Completed</h1>
        <h2 id="score">You Scored: ${quiz.score} of ${quiz.questions.length}</h2>
        <div class="quiz-repeat">
            <a href="index.html">Take Quiz Again</a>
        </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
}

//quiz questions 
let questions = [
    new Question(
        "Who is Manchester United all time top scorer?", ["Wayne Rooney", "Cristiano Ronaldo","Marcus Rashford", "Bobby Charlton"], "Wayne Rooney"
    ),
    new Question(
        "When was Manchester United F.C. founded?", ["1910", "1878","1885", "1899"], "1878"
    ),
    new Question(
        "What year did Manchester United win the treble", ["2009", "1999","2017", "2008"], "1999"
    ),
    new Question(
        "What is the name of Manchester United home stadium?", ["Wembley", "Emptyhad","Old Trafford", "Camp Nou"], "Old Trafford"
    ),
    new Question(
        "When did Manchester United last win the Premier League", ["2010", "2009","2017", "2012"], "2012"
    ),
    new Question(
        "When did Manchester United last win the Champion's League", ["2014", "2009","2000", "2008"], "2008"
    ),
]

let quiz = new Quiz(questions);

displayQuestion();

let time = 10;
let quizTimeInMin = time * 60*60;

let quizTime = quizTimeInMin/60

let counting = document.getElementById("count-down");

//set quiz time remaining 
const startCountdown = () => {
    let quizTimer = setInterval(()=> {
        if(quizTime<=0){
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--
            let sec = Math.floor(quizTime%60);
            let min = Math.floor(quizTime/60)%60;
            counting.innerHTML = `Time: ${min}:${sec}`;
        }
    },1000)
}

startCountdown()


