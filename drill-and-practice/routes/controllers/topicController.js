import * as dataBaseService from "../../services/dataBaseService.js";
import { validasaur } from "../../deps.js";

const validationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

const addTopic = async ({ request, response, state, render }) => {
  const id = (await state.session.get("user")).id;
  const admin = (await state.session.get("user")).admin;
  const body = await request.body({ type: "form" });
  const params = await body.value;
  const data = {
    admin: admin,
    name: params.get("name"),
  };
  const [passes, errors] = await validasaur.validate(data, validationRules);
  if (passes && admin) {
    await dataBaseService.createNewTopic(params.get("name"), id);
    response.redirect("/topics");
  } else {
    data.errors = errors;
    if (!admin) {
      data.errors = { name: { required: "You are not an admin" } };
    }
    data.topics = await dataBaseService.getAllTopics();
    render("partials/topicView.eta", data);
  }
};

const showTopics = async ({ render, state }) => {
  const data = {
    admin: (await state.session.get("user")).admin,
    topics: await dataBaseService.getAllTopics(),
  };
  render("partials/topicView.eta", data);
};

const removeTopic = async ({ response, params, state, render }) => {
  const id = params.id;
  const admin = (await state.session.get("user")).admin;
  const questions = await dataBaseService.getQuestionsByTopicId(params.id);
  if (admin) {
    for (const elem of questions) {
      const option = await dataBaseService.getAnswerOptionsByQuestionId(
        elem.id
      );
      for (const element of option) {
        await dataBaseService.deleteAnswersByAnswerOptionId(element.id);
      }
      await dataBaseService.deleteAnswerOptionsByQuestionId(elem.id);
    }
    await dataBaseService.deleteQuestionByTopicId(id);
    await dataBaseService.deleteTopic(id);
    response.redirect("/topics");
  } else {
    const data = {
      admin: (await state.session.get("user")).admin,
    };
    data.errors = { name: { required: "You are not an admin" } };
    data.topics = await dataBaseService.retrieveAllTopics();
    render("partials/topicView.eta", data);
  }
};

export { addTopic, showTopics, removeTopic };
