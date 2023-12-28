import * as dataBaseService from "../../services/dataBaseService.js";
import { validasaur } from "../../deps.js";

const validationRules = {
    text: [validasaur.required, validasaur.minLength(1)],
};

const addQuestion = async ({ params, request, response, render, state }) => {
    const topicID = params.id;
    const id = (await state.session.get("user")).id;
    const body = await request.body({ type: "form" });
    const formParams = await body.value;

    const data = {
        id: topicID,
        text: formParams.get("question_text"),
    };
    const [passes, errors] = await validasaur.validate(data, validationRules);
    if (passes) {
        await dataBaseService.createQuestion(id, topicID, data.text);
        response.redirect(`/topics/${topicID}`);
    } else {
        data.errors = errors;
        data.topic = await dataBaseService.getTopicById(topicID);
        data.questions = await dataBaseService.getQuestionsByTopicId(topicID);
        render("partials/questionsView.eta", data);
    }
};

const showQuestions = async ({ params, render }) => {
    const id = params.id;
    const data = {
        id,
        questions: await dataBaseService.getQuestionsByTopicId(id),
        topic: await dataBaseService.getTopicById(id),
    };
    render("partials/questionsView.eta", data);
};

const showQuestion = async ({ params, render }) => {
    const questionId = params.questionId;
    const data = {
        question: await dataBaseService.getQuestionByQuestionId(questionId),
        options: await dataBaseService.getAnswerOptionsByQuestionId(questionId),
    };
    render("partials/questionView.eta", data);
};

const removeQuestion = async ({ response, params }) => {
    const questionId = params.questionId;
    await dataBaseService.deleteQuestion(questionId);
    response.redirect(`/topics/${params.id}`);
};

export { addQuestion, removeQuestion, showQuestion, showQuestions };
