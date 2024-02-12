import React from 'react'
import {Box, Flex, Heading, Spacer} from "@chakra-ui/react";
import AppButton from "../AppButton";

interface QuestionCardProps {
    questions: string;
    category: string;
    totalQuestions?: number;
    questionNumber?: number;
    checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = (
    {
        questions,
        category,
        totalQuestions,
        questionNumber,
        checkAnswer
    }
) => {
    return <>
        <Box bg="white" w="100%">
            <Box mb={6} fontSize="md" fontWeight="bold" textTransform="uppercase">
                your progress: {questionNumber}/{totalQuestions}
            </Box>
            <Box fontSize="sm" mb={1}>
                {category}
            </Box>
            <Heading as="h1" size="lg">
                <p dangerouslySetInnerHTML={{__html: questions}}/>
            </Heading>
            <Flex flexDirection="column">
                <Box w={"100%"} mb={4} mt={4}>
                    <AppButton
                        colorScheme="purple"
                        variant="outline"
                        onClick={checkAnswer}
                        value="True"
                        width="full"
                    />
                </Box>
                <Spacer/>
                <Box w="100%" mb={4}>
                    <AppButton
                        colorScheme="purple"
                        variant="outline"
                        onClick={checkAnswer}
                        value="False"
                        width="full"
                    />
                </Box>
            </Flex>
        </Box>
    </>
}

export default QuestionCard;