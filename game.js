const question =  document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Who is the first man to walk on the Moon?',
        choice1: 'Neil Armstrong',
        choice2: 'Albert Einstein',
        choice3: 'Neil Young',
        choice4: 'Stephen Hawking',
        answer: 1,
    },
    {
        question: 'What is the fastest land animal?',
        choice1: 'Turtle',
        choice2: 'Cheetah',
        choice3: 'Giraffe',
        choice4: 'Lion',
        answer: 2,
    },
    {
        question: 'What is the sweet food made by bees?',
        choice1: 'Donut',
        choice2: 'Candy',
        choice3: 'Sugar',
        choice4: 'Honey',
        answer: 4,
    },
    {
        question: 'Which planet is closest to Earth?',
        choice1: 'Mercury',
        choice2: 'Mars',
        choice3: 'Venus',
        choice4: 'Neptune',
        answer: 1,
    },
    {
        question: 'Who lives in a pineaple under the sea?',
        choice1: 'Tinkerbell',
        choice2: 'Spongebob Squarepants',
        choice3: 'Woody',
        choice4: 'Nemo',
        answer: 2, 
    },
    {
        question: 'What color is at the top of the rainbow?',
        choice1: 'Yellow',
        choice2: 'Orange',
        choice3: 'Red',
        choice4: 'Green',
        answer: 3,
    },
    {
        question: 'Which of the below option is an odd number?',
        choice1: '4',
        choice2: '12',
        choice3: '22',
        choice4: '1',
        answer: 4,
    }, {
        question: 'How many continents are there?',
        choice1: 'Five',
        choice2: 'Six',
        choice3: 'Seven',
        choice4: 'Eight',
        answer: 3,
    },{
        question: 'What is a "legislator" make?',
        choice1: 'Airplanes',
        choice2: 'Guns',
        choice3: 'Newspapers',
        choice4: 'Laws',
        answer: 4,
    },
    {
        question: 'The earth has a crust, a mantle, and what else??',
        choice1: 'A core',
        choice2: 'A basin',
        choice3: 'A range',
        choice4: 'A sink',
        answer: 1,
    }
]

const SCORE_POINTS = 10
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}
    getNewQuestion = () =>{ 
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true

}

choices.forEach(choice=>{
    choice.addEventListener('click', e =>{
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice =  e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply =  selectedAnswer == currentQuestion.answer ? 'correct': 'incorrect'

        if( classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore =  num =>{
    score +=num
    scoreText.innerText = score
}

startGame()