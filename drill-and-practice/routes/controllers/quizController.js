import * as dataBaseService from "../../services/dataBaseService.js";

const showTopics = async ({ render }) => {
    const data = {
        topics: await dataBaseService.getAllTopics(),
    };
    render("partials/quizTopics.eta", data);
};

const showQuiz = async ({ params, render }) => {
    const questionId = params.questionId;
    const data = {
        question: await dataBaseService.getQuestionByQuestionId(questionId),
        options: await dataBaseService.getAnswerOptionsByQuestionId(questionId),
    };
    if (data.question === undefined) {
        render("partials/quizView.eta", { errors: "No questions found." });
    }
    render("partials/quizView.eta", data);
};

const showCorrect = async ({ params, render }) => {
    const data = {
        params: params,
    };
    render("partials/feedback/correct.eta", data);
};

const showIncorrect = async ({ params, render }) => {
    const questionId = params.questionId;
    const data = {
        correct: await dataBaseService.getCorrectOptions(questionId),
        params: params,
    };
    render("partials/feedback/false.eta", data);
};

const getRandomQuestion = async ({ params, response, render }) => {
    const topicID = params.id;
    let data = await dataBaseService.getRandomQuestionByTopic(topicID);
    if (data) {
        response.redirect(`/quiz/${topicID}/questions/${data.id}`);
    } else {
        data = {
            errors: "This topic does not have any questions yet.",
        };
        render("partials/quizView.eta", data);
    }
};

const checkAnswer = async ({ params, response, state }) => {
    const questionId = params.questionId;
    const optionId = params.optionId;
    const userId = (await state.session.get("user")).id;
    await dataBaseService.saveAnswer(userId, questionId, optionId);
    const data = await dataBaseService.getAnswerOptionById(params.optionId);
    if (data.is_correct) {
        response.redirect(`/quiz/${params.id}/questions/${params.questionId}/correct`);
    } else {
        response.redirect(`/quiz/${params.id}/questions/${params.questionId}/incorrect`);
    }
};

export { showQuiz, showTopics, showCorrect, showIncorrect, getRandomQuestion, checkAnswer };
