import { validasaur } from "../../deps.js";
import * as dataBaseService from "../../services/dataBaseService.js";

const validationRules = {
    text: [validasaur.required, validasaur.minLength(1)],
};

const addOption = async ({ params, request, response, render }) => {
    const questionId = params.questionId;
    const body = await request.body({ type: "form" });
    const formParams = await body.value;
    const check = formParams.get("is_correct");
    let isCorrect = false;
    if (check === "on") {
        isCorrect = true;
    }
    const data = {
        text: formParams.get("option_text"),
        isCorrect: isCorrect,
    };
    const [passes, errors] = await validasaur.validate(data, validationRules);
    if (passes) {
        await dataBaseService.createAnswerOption(questionId, data.text, data.isCorrect);
        response.redirect(`/topics/${params.id}/questions/${questionId}`);
    } else {
        data.errors = errors;
        data.question = await dataBaseService.getQuestionByQuestionId(questionId);
        data.options = await dataBaseService.getAnswerOptionsByQuestionId(questionId);
        render("partials/questionView.eta", data);
    }
};

const removeOption = async ({ params, response }) => {
    await dataBaseService.deleteAnswersByAnswerOptionId(params.optionId);
    await dataBaseService.deleteAnswerOptionById(params.optionId);
    response.redirect(`/topics/${params.id}/questions/${params.questionId}`);
};

export { addOption, removeOption };
