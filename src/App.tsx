import {useEffect, useState} from 'react'
import './App.css'
import {IQuestion, IUserAnswer} from "./types.ts";
import {getQuestionList} from "./services/fetchQuestions.tsx";
import {Difficulty, totalQuestions} from "./constants";
import AppSpinner from "./components/AppSpinner";
import {Box, Heading} from "@chakra-ui/react";
import AppButton from "./components/AppButton";
import QuestionCard from "./components/QuestionCard";

function App() {
    const [startQuiz, setStartQuiz] = useState(false);
    const [chosenAnswer, setChosenAnswer] = useState("");
    const [hasSelected, setHasSelected] = useState(false);
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [userAnswer, setUserAnswer] = useState<IUserAnswer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const fetchQuestions = async () => {
            const questionListing = await getQuestionList(
                totalQuestions,
                Difficulty.EASY
            );
            setQuestions(questionListing);
            setIsLoading(false);
        };
        fetchQuestions();
    }, []);

    const startQuizGame = () => {
        setStartQuiz(true);
    }

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setHasSelected(true);
        setChosenAnswer(e.currentTarget.innerText);
    }

    const nextQuestion = () => {
        const nextQuestion = questionNumber + 1;
        if(gameOver) return;

        const correct = chosenAnswer === questions[questionNumber]?.correct_answer;
        //if correct, score + 1
        if(correct) setScore((prev) => prev+1);
        //user answers will be displayed at the last page after game over.
        const answerObj = {
            question: questions[questionNumber]?.question,
            answer: chosenAnswer,
            correct,
            correctAnswer: questions[questionNumber]?.correct_answer,
        };
        setUserAnswer((prev) => [...prev, answerObj]);

        if(totalQuestions === nextQuestion){
            setGameOver(true);
        }
        setQuestionNumber(nextQuestion);
        setHasSelected(false);

        console.log(userAnswer);
    };

    const replayQuiz = () => {
        setStartQuiz(false);
        setGameOver(false);
        setQuestionNumber(0);
        setScore(0);
        setUserAnswer([]);
    }

    return (
    <main>
        {
            isLoading && (
                <div className="app-spinner">
                    <AppSpinner
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="purple"
                        size="lg"
                        thickness="5px"
                    />
                </div>
            )
        }
        {
            userAnswer.length === questionNumber &&
            !gameOver &&
            !isLoading &&
            !startQuiz ?
                (
                    <div className="greeting-box">
                      <Box  p="6" bg="white" maxW="560px">
                        <Heading as="h2" size="lg" mb={2}>
                            Quiz App
                        </Heading>
                      </Box>
                        <p>
                            Answer {totalQuestions} True/False questions.
                        </p>
                        <AppButton
                            colorScheme="pink"
                            variant="solid"
                            onClick={startQuizGame}
                            value="Start Quiz Game"
                        />
                    </div>
                )
                :
                null
        }

        {!isLoading && !gameOver && startQuiz && (
            <Box boxShadow="base" p="6" rounded="md" bg="white" maxW="560px">
                <QuestionCard
                    questions={questions[questionNumber].question}
                    category={questions[questionNumber].category}
                    checkAnswer={checkAnswer}
                    totalQuestions={totalQuestions}
                    questionNumber={questionNumber}
                />
                <AppButton
                    isDisabled={
                        /*when True/False button gets selected,
                        * userAnswer arr will have a length of
                        * prev length + 1.*/
                        !hasSelected
                    }
                    colorScheme="pink"
                    variant="solid"
                    onClick={nextQuestion}
                    value="Next Question"
                    className="next-button"
                    width="full"
                >

                </AppButton>
            </Box>
        )
        }

        {gameOver && (
            <>
                <Box boxShadow="base" p="6" rounded="md" bg="white" maxW="560px">
                    <Box mb={4}>
                        <Box fontWeight="bold" as="h3" fontSize="4xl">
                            Game Over!
                        </Box>
                        <Box as="h3" fontSize="xl">
                            Your score is {score}/{totalQuestions}.
                        </Box>
                    </Box>

                    {userAnswer.map((answer, index) => (
                        <Box key={index}>
                            <div className="answer-list">
                                <Box fontSize="md" fontWeight="bold">
                                    Q{index + 1}.
                                    <p dangerouslySetInnerHTML={{__html: answer.question}}/>
                                </Box>
                                <ul>
                                    <li>You answered: {answer.answer}</li>
                                    <li>Correct answer: {answer.correctAnswer}</li>
                                </ul>
                            </div>
                        </Box>
                    ))}
                    <AppButton
                        colorScheme="pink"
                        variant="solid"
                        onClick={replayQuiz}
                        value="Replay Quiz"
                        width="full"
                    />
                </Box>
            </>

        )

        }

    </main>
  )
}

export default App
