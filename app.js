const url = "https://opentdb.com/api.php?amount=10";

let questionIndex = 0; // Id della domanda corrente
let correctCount = 0; // Contatore delle risposte corrette
let fine = document.querySelector("main")

const renderQuestion = async () => {
    const questionContainer = document.getElementById('questionContainer');
    const answerContainer = document.getElementById('answerContainer');
    const correctCountElement = document.getElementById('correctCount');


    try {
        const response = await fetch(url);
        const quizData = await response.json();

        const currentQuestion = quizData.results[questionIndex];
        const correctAnswer = currentQuestion.correct_answer;

        questionContainer.innerHTML = `<p>${currentQuestion.question}</p>`;
        answerContainer.innerHTML = ''; // Elimino il contenuto di prima

        currentQuestion.incorrect_answers.concat(correctAnswer).forEach(answer => {
            const button = document.createElement('button');
            button.className = 'abcd';
            button.textContent = answer;

            button.addEventListener('click', () => handleAnswerClick(button.textContent, correctAnswer));

            answerContainer.appendChild(button);
        });

        correctCountElement.textContent = `Risposte corrette: ${correctCount}`;
    } catch (error) {
        console.error('Errore durante la richiesta API o il rendering:', error);
    }
};

const handleAnswerClick = (selectedAnswer, correctAnswer) => {
    const isCorrect = selectedAnswer === correctAnswer;

    // Passa alla domanda successiva
    questionIndex++;

    // Se ho risposto a tutte e 10 le domande finissce
    if (questionIndex < 10) {
        renderQuestion();
    } else {
        console.log(`Hai risposto correttamente a ${correctCount} domande su 10.`);
        fine.className = "fine";
        fine.innerHTML = `Hai risposto correttamente a ${correctCount} domande su 10!`
        
    }

    // Aggiorna il contatore delle risposte corrette se la risposta è corretta
    if (isCorrect) {
        correctCount++;

    }

    console.log(`Risposta corretta: ${isCorrect}`);
};

document.addEventListener('DOMContentLoaded', renderQuestion);
