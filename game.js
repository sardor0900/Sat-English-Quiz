const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0 
let availableQuestions =[]

let questions = [
    {
        question: "To give up a position (v)",
        choice1: 'Berate',
        choice2: 'Immerse',
        choice3: 'Abdicate',
        choice4: 'Lose',
        answer: 3,
    },
    {
        question: "Something that differs from the norm (n)",
        choice1: 'Acute',
        choice2: 'Aberration',
        choice3: 'Bias',
        choice4: 'Calamity',
        answer: 2,
    },
    {
        question: "To stress, highlight, focus attention on(v)",
        choice1: 'Constrain',
        choice2: 'Discern',
        choice3: 'Deliberate',
        choice4: 'Accentuate',
        answer: 4,
    },
    {
        question: "Sharp, severe (adj)",
        choice1: 'Acute',
        choice2: 'Concise',
        choice3: 'Deliberate',
        choice4: 'Abdicate',
        answer: 1,
    },
    {
        question: "Extremely skilled (adj)",
        choice1: 'Eminent',
        choice2: 'Forlorn',
        choice3: 'Adebt',
        choice4: 'Frivolous',
        answer: 3,
    },
    {
        question: "Favorable, not threating, mild (adj)",
        choice1: 'Favourite',
        choice2: 'Diligent',
        choice3: 'Benign',
        choice4: 'Epitome',
        answer: 3,
    },
    {
        question: "To scold (ругать) (v) ",
        choice1: 'Fight',
        choice2: 'Berate',
        choice3: 'Accentuate',
        choice4: 'Impute',
        answer: 2,
    },
    {
        question: "An event with disastrous consequences (n)",
        choice1: 'Dormant',
        choice2: 'Calamity',
        choice3: 'Earthquake',
        choice4: 'Abberation',
        answer: 2,
    },
    {
        question: "To charge, inspire (v)",
        choice1: 'Catalyze',
        choice2: 'Constrain',
        choice3: 'Emulate',
        choice4: 'Force',
        answer: 1,
    },
  
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 9

startGame = ()=> {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = ()=> {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('C:/Users/99890/Downloads/work/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']


    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
     if(classToApply === 'correct') {
         incrementScore(SCORE_POINTS)
     }

    

     selectedChoice.parentElement.classList.add(classToApply)

     setTimeout(() =>{
         selectedChoice.parentElement.classList.remove(classToApply)
         getNewQuestion()

     }, 1500)
   })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()