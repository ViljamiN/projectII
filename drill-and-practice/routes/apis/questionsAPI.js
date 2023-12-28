import * as dataBaseService from "../../services/dataBaseService.js";

const getRandomQuestion = async ({ response }) => {
    const randomQuestion = await dataBaseService.getRandomQuestion();
    if (randomQuestion === -1) {
        response.body = {};
    } else {
        const questionId = randomQuestion.id;
        const text = randomQuestion.question_text;
        const fetchedAnswers = await dataBaseService.getAnswerOptionsByQuestionId(questionId);
        const answers = [];
        fetchedAnswers.forEach((element) => {
            const answer = {
                optionId: element.id,
                optionText: element.option_text,
            };
            answers.push(answer);
        });
        const data = {
            questionId: questionId,
            questionText: text,
            answerOptions: answers,
        };
        response.body = data;
    }
};

const answerQuestion = async ({ response, request }) => {
    const body = await request.body({ type: "json" });
    const content = await body.value;
    const fetchedOptions = await dataBaseService.getAnswerOptionsByIdAndQuestionId(
        content.optionId,
        content.questionId
    );
    let correctOrNot = { correct: false };
    if (fetchedOptions !== undefined) {
        correctOrNot = { correct: fetchedOptions.is_correct };
    }
    response.body = correctOrNot;
};

export { getRandomQuestion, answerQuestion };
