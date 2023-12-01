import { sql } from "../database/database.js";

const getStatistics = async () => {
    //const [topicsCount] = await sql`SELECT COUNT(*) FROM topics`;
    //const [questionsCount] = await sql`SELECT COUNT(*) FROM questions`;
    //const [answersCount] = await sql`SELECT COUNT(*) FROM question_answers`;
    const rows = await sql`SELECT * FROM users`;
    rows.forEach((obj) => {
        console.log(obj.name);
      });

    return {
        //topicsCount: topicsCount.count,
        //questionsCount: questionsCount.count,
        //answersCount: answersCount.count,
        usersCount: rows
    };
};

export { getStatistics };
