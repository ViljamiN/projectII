import * as dataBaseService from "../../services/dataBaseService.js";

const showMain = async ({ render }) => {
  const data = {
    topicsCount: await dataBaseService.getTopicCount(),
    questionsCount: await dataBaseService.getQuestionCount(),
    answersCount: await dataBaseService.getAnswerCount(),
  };
  render("main.eta", data);
};

export { showMain };
