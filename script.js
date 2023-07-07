/* $ para ter saber que a variável ja existe no html */
const $startGameButton = document.querySelector(".start-quiz")
const $questionsContainer = document.querySelector(".questions-container")
const $answersContainer = document.querySelector(".answers-container")
const $questionText = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".next-question")

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

let currentQuestionIndex = 0 // começar as pergutas do 0 e dizer onde o jogador está
let totalCorrect = 0 // placar do jogo

/* desaparecer o botão de começar o jogo, após aparece a div  */
function startGame() {
  $startGameButton.classList.add ("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState() //rodar a função descrita dentro do resetState

  if(questions.length  === currentQuestionIndex) {
    return finishGame ()
  }

  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  /* acessar a primeira pergunta do banco de perguntas e cada resposta. Criar botão para respostas e se selecionou a correta ou não. */
  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answer.forEach(answer => {
    const newAnswer = document.createElement("button")
    newAnswer.classList.add("button", "answer")
    newAnswer.textContent = answer.text
    if (answer.correct) {
      newAnswer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAnswer)
    newAnswer.addEventListener("click", selectAnswer)
  }) 
}
// Apagar as answer do index e selecionar as novas answer
function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")// remove as perguntas inicias
  $nextQuestionButton.classList.add("hide")//aparecer o botão de proximo
}
// adicionar o evento de click 
function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++ // somar a pontuaçao
  } else {
    document.body.classList.add("incorrect")
  }
// adicionar aos botoes as se acertou ou nao
  document.querySelectorAll(".answer").forEach(button => {
    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
// nao dar opçao para a o jogador escolher novamente
    button.disabled = true
  })

  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++ //adicionar a pontuaçao
 
}

function finishGame () {
  const totalQuestion = questions.length
  const performance = Math.floor(totalCorrect *100 / totalQuestion)// somar o placar e adicionar a messagem com forme a pontuaçao 

  let message = ""

  switch(true) {
    case (performance > 90):
      message = "Parabéns voce Conseguiu"
      break  
    case (performance > 70):
      message = "Maravilha"
      break
    case (performance > 50):
      message = "Bom"
      break 
      default :
      message = "Você pode fazer melhor que isso !"
  } 
 // criar um html para mostrar a mesagem final e adicionar class para adicionar um botao e personalizar
  $questionsContainer.innerHTML =
  `
  <p class="final-message">
   Você acertou ${totalCorrect} de ${totalQuestion} questões!
  <span>Resultado : ${message}</span>
  </p>
  <button onclick=window.location.reload() class="button"> 
  Tentar novamente
  </butoon>
  `
}














/* Banco de Perguntas - pergunta com respostas e verdadeiro ou falso   */
const questions = [
  {
    question: "Qual fruta abaixo é considerada como cítrica?",
    answer: [
      { text: "Maça", correct: false },
      { text: "Abacate", correct: false },
      { text: "Morango", correct: true },
      { text: "Melancia", correct: false }
    ]
  },
  {
    question: "Qual fruta abaixo é considerada como fonte de potássio?",
    answer: [
      { text: "Amora", correct: false },
      { text: "Banana", correct: true },
      { text: "Uva", correct: false },
      { text: "Pêssego", correct: false }
    ]
  },
  {
    question: "Qual fruta abaixo é considerada como rica em vitamina C?",
    answer: [
      { text: "Laranja", correct: true },
      { text: "Ameixa", correct: false },
      { text: "Kiwi", correct: false },
      { text: "Maracujá", correct: false }
    ]
  }
]
