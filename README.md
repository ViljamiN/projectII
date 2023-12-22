# Project 2: Drill and practice

This is a quiz-answering application, where users can create and answer quizzes.

As a user you can access topics created by admins by clicking the topics link.
You can choose any topic, and create and delete questions and multiple choice answers for that topic.
There is also a quiz tab where you can answer questions submitted by yourself or other users.
On the main page you can see some application statistics.

The application is **not running online** - it was specified in the assignment that having the application running online is currently not required.

## Running the application locally

To run the application, open an integrated terminal in the root folder of the application and run the command `docker compose up --build`.
You can stop the application with command `ctrl + C`, or by accessing it in Docker Desktop and clicking the stop button.

## Running the tests

The application comes with 10 end-to-end tests in the folder /e2e-playwright/tests.
These tests are supposed to be run with an empty database, so remember to run the command `docker-compose rm -sf`before proceeding to run the tests.
These tests can be run by opening an integrated terminal in the root folder and running the command `docker-compose run --entrypoint=npx e2e-playwright playwright test`.
Note: you may need to run the command `docker-compose run --entrypoint=npm e2e-playwright install` before running the tests if you have not done so before.
