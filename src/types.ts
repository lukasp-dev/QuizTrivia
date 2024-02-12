export interface IUserAnswer {
    answer: string;
    correct: boolean; //true if the answer equals to the correctAnswer
    correctAnswer: string;
    question: string;
}

export interface IQuestion {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    totalQuestions: number;
    questionNumber: number;
}