import { Router } from "../deps.js";
import * as answerController from "./controllers/answerController.js";
import * as mainController from "./controllers/mainController.js";
import * as questionsApi from "./apis/questionsApi.js";
import * as questionController from "./controllers/questionController.js";
import * as quizController from "./controllers/quizController.js";
import * as topicController from "./controllers/topicController.js";
import * as userController from "./controllers/userController.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/api/questions/random", questionsApi.getRandomQuestion);
router.get("/auth/login", userController.showLoginPage);
router.get("/auth/register", userController.showRegisterPage);
router.get("/quiz", quizController.showTopics);
router.get("/quiz/:id", quizController.getRandomQuestion);
router.get("/quiz/:id/questions/:questionId", quizController.showQuiz);
router.get(
  "/quiz/:id/questions/:questionId/correct",
  quizController.showCorrect
);
router.get(
  "/quiz/:id/questions/:questionId/incorrect",
  quizController.showIncorrect
);
router.get("/topics", topicController.showTopics);
router.get("/topics/:id", questionController.showQuestions);
router.get(
  "/topics/:id/questions/:questionId",
  questionController.showQuestion
);
router.post("/api/questions/answer", questionsApi.answerQuestion);
router.post("/auth/login", userController.authenticate);
router.post("/auth/register", userController.addUser);
router.post(
  "/quiz/:id/questions/:questionId/options/:optionId",
  quizController.checkAnswer
);
router.post("/topics", topicController.addTopic);
router.post("/topics/:id/delete", topicController.removeTopic);
router.post("/topics/:id/questions", questionController.addQuestion);
router.post(
  "/topics/:id/questions/:questionId/delete",
  questionController.removeQuestion
);
router.post(
  "/topics/:id/questions/:questionId/options",
  answerController.addOption
);
router.post(
  "/topics/:id/questions/:questionId/options/:optionId/delete",
  answerController.removeOption
);

export { router };
