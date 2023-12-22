import { sql } from "../database/database.js";

const getTopicCount = async () => {
  const ret = await sql`SELECT COUNT(id) FROM topics`;
  return ret[0].count;
};

const getQuestionCount = async () => {
  const ret = await sql`SELECT COUNT(id) FROM questions`;
  return ret[0].count;
};

const getAnswerCount = async () => {
  const ret = await sql`SELECT COUNT(id) FROM question_answers`;
  return ret[0].count;
};

const getAllTopics = async () => {
  return await sql`SELECT * FROM topics`;
};

const createNewTopic = async (name, userId) => {
  await sql`INSERT INTO topics (name, user_id) VALUES (${name}, ${userId})`;
};

const deleteTopic = async (id) => {
  await sql`DELETE FROM topics WHERE id = ${id}`;
};

const getTopicById = async (id) => {
  const ret = await sql`SELECT * FROM topics WHERE id = ${id}`;
  return ret[0];
};

const createUser = async (email, password) => {
  await sql`INSERT INTO users (email, password) VALUES (${email}, ${password})`;
};

const findUser = async (email) => {
  return await sql`SELECT * FROM users WHERE email=${email}`;
};

const createQuestion = async (userId, topicId, text) => {
  await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${userId}, ${topicId}, ${text})`;
};

const deleteQuestion = async (questionId) => {
  await sql`DELETE FROM questions WHERE id = ${questionId}`;
};

const deleteQuestionByTopicId = async (topicId) => {
  await sql`DELETE FROM questions WHERE topic_id=${topicId}`;
};

const getQuestionsByTopicId = async (id) => {
  return await sql`SELECT * FROM questions WHERE topic_id = ${id}`;
};

const getQuestionByQuestionId = async (id) => {
  const ret = await sql`SELECT * FROM questions WHERE id = ${id}`;
  return ret[0];
};

const getRandomQuestionByTopic = async (topicId) => {
  const ret =
    await sql`SELECT * FROM questions WHERE topic_id = ${topicId} ORDER BY RANDOM() LIMIT 1`;
  return ret[0];
};

const getRandomQuestion = async () => {
  const ret = await sql`SELECT * FROM questions ORDER BY RANDOM() LIMIT 1`;
  if (ret.length != 0) {
    return ret[0];
  } else {
    return -1;
  }
};

const createAnswerOption = async (id, optionText, isCorrect) => {
  await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${id}, ${optionText}, ${isCorrect})`;
};

const getAnswerOptionById = async (id) => {
  const ret = await sql`SELECT * FROM question_answer_options WHERE id=${id}`;
  return ret[0];
};

const getAnswerOptionsByQuestionId = async (id) => {
  const ret =
    await sql`SELECT * FROM question_answer_options WHERE question_id = ${id}`;
  return ret;
};

const getAnswerOptionsByIdAndQuestionId = async (id, questionId) => {
  const ret =
    await sql`SELECT * FROM question_answer_options WHERE id=${id} AND question_id = ${questionId}`;
  return ret[0];
};

const saveAnswer = async (userId, questionId, optionId) => {
  await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES (${userId}, ${questionId}, ${optionId})`;
};

const getCorrectOptions = async (questionId) => {
  return await sql`SELECT * FROM question_answer_options WHERE is_correct = 'true' AND question_id = ${questionId}`;
};

const deleteAnswerOptionById = async (id) => {
  await sql`DELETE FROM question_answer_options WHERE id = ${id}`;
};

const deleteAnswerOptionsByQuestionId = async (questionId) => {
  await sql`DELETE FROM question_answer_options WHERE question_id=${questionId}`;
};

const deleteAnswersByAnswerOptionId = async (optionId) => {
  await sql`DELETE FROM question_answers WHERE question_answer_option_id=${optionId}`;
};

export {
  getTopicCount,
  getQuestionCount,
  getAnswerCount,
  createNewTopic,
  deleteTopic,
  getTopicById,
  getAllTopics,
  createUser,
  findUser,
  createQuestion,
  deleteQuestion,
  deleteQuestionByTopicId,
  getQuestionsByTopicId,
  getQuestionByQuestionId,
  createAnswerOption,
  saveAnswer,
  deleteAnswerOptionById,
  deleteAnswerOptionsByQuestionId,
  deleteAnswersByAnswerOptionId,
  getRandomQuestion,
  getRandomQuestionByTopic,
  getAnswerOptionById,
  getAnswerOptionsByQuestionId,
  getAnswerOptionsByIdAndQuestionId,
  getCorrectOptions,
};
