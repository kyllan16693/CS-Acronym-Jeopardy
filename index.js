#!/usr/bin/env node

import {
  intro,
  outro,
  confirm,
  select,
  spinner,
  isCancel,
  cancel,
  text,
} from '@clack/prompts';
import { setTimeout } from 'timers/promises';
import color from 'picocolors';
import categories from './questions.json' assert {type: "json"};
import EventEmitter from 'events'; EventEmitter.setMaxListeners(0);

function addingSpaces(word) {
  var word = word.toString();
  var totalLength = 21;
  var spaces = '';
  var front = Math.floor((totalLength - word.length) / 2);
  var back = totalLength - word.length - front;

  for (var i = 0; i < front; i++) {
    spaces += ' ';
  }
  spaces += word;
  for (var i = 0; i < back; i++) {
    spaces += ' ';
  }
  return spaces;
}

function checkAnswer(userAnswer, correctAnswer) {
  if (!userAnswer || !correctAnswer) {
    return false;
  }

  const cleanedUserAnswer = userAnswer.replace(/[\s\W_]+/g, "").toLowerCase();
  const cleanedCorrectAnswer = correctAnswer.replace(/[\s\W_]+/g, "").toLowerCase();

  return cleanedUserAnswer === cleanedCorrectAnswer;
}

const logo = color.bold(
  '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\n' +
  '. _______  _______     _______  _______  ______    _______  __    _  __   __  __   __ .\n' +
  '.|       ||       |   |   _   ||       ||    _ |  |       ||  |  | ||  | |  ||  |_|  |.\n' +
  '.|       ||  _____|   |  |_|  ||       ||   | ||  |   _   ||   |_| ||  |_|  ||       |.\n' +
  '.|       || |_____    |       ||       ||   |_||_ |  | |  ||       ||       ||       |.\n' +
  '.|      _||_____  |   |       ||      _||    __  ||  |_|  ||  _    ||_     _||       |.\n' +
  '.|     |_  _____| |   |   _   ||     |_ |   |  | ||       || | |   |  |   |  | ||_|| |.\n' +
  '.|_______||_______|   |__| |__||_______||___|  |_||_______||_|  |__|  |___|  |_|   |_|.\n' +
  '.         ___  _______  _______  _______  _______  ______    ______   __   __  __     .\n' +
  '.        |   ||       ||       ||       ||   _   ||    _ |  |      | |  | |  ||  |    .\n' +
  '.        |   ||    ___||   _   ||    _  ||  |_|  ||   | ||  |  _    ||  |_|  ||  |    .\n' +
  '.        |   ||   |___ |  | |  ||   |_| ||       ||   |_||_ | | |   ||       ||  |    .\n' +
  '.     ___|   ||    ___||  |_|  ||    ___||       ||    __  || |_|   ||_     _||__|    .\n' +
  '.    |       ||   |___ |       ||   |    |   _   ||   |  | ||       |  |   |   __     .\n' +
  '.    |_______||_______||_______||___|    |__| |__||___|  |_||______|   |___|  |__|    .\n' +
  '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\n');

async function main() {
  intro(color.inverse('Welcome to the CLI Jeopardy Game!'));

  const name = await text({
    message: 'What is your name?',
    placeholder: 'Anonymous',
    initialValue: 'Anonymous',
  });

  if (isCancel(name)) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  const ready = await confirm({
    message: '                               Welcome to ...\n' +
      logo +
      'Are you ready to play ' + name + '?\n',
    initial: true,
  });

  if (isCancel(ready)) {
    cancel('Operation cancelled');
    return process.exit(0);
  }

  if (!ready) {
    console.log('Goodbye!');
    return process.exit(0);
  }

  var game = true;
  var score = 0;
  var categoryArray = [];
  for (var i = 0; i < 6; i++) {
    categoryArray.push(categories.categories[i].name);
  }
  var questions = new Array(6);
  for (var i = 0; i < 6; i++) {
    questions[i] = new Array(5);
    for (var j = 0; j < 5; j++) {
      questions[i][j] = (j + 1) * 200;
    }
  }

  while (game) {
    const BoardSpinner = spinner();
    BoardSpinner.start('Loading board...');
    await setTimeout(200);
    BoardSpinner.stop();

    const category = await select({
      message: name + '\'s Score : ' + score + '\n' +
        '+---------------------------------------------------------------------+\n' +
        '|                    Computer Science Acronym Jeopardy                |\n' +
        '+---------------------------------------------------------------------+\n' +
        '| Hardware | Networking | Programming |  Database  | Graphics | Linux |\n' +
        '|          |            |  Languages  | Management |          |       |\n' +
        '+---------------------------------------------------------------------+\n' +
        '|   ' + questions[0][0] + '    |    ' + questions[1][0] + '     |     ' + questions[2][0] + '     |     ' + questions[3][0] + '    |   ' + questions[4][0] + '    |  ' + questions[5][0] + '  |\n' +
        '+---------------------------------------------------------------------+\n' +
        '|   ' + questions[0][1] + '    |    ' + questions[1][1] + '     |     ' + questions[2][1] + '     |     ' + questions[3][1] + '    |   ' + questions[4][1] + '    |  ' + questions[5][1] + '  |\n' +
        '+---------------------------------------------------------------------+\n' +
        '|   ' + questions[0][2] + '    |    ' + questions[1][2] + '     |     ' + questions[2][2] + '     |     ' + questions[3][2] + '    |   ' + questions[4][2] + '    |  ' + questions[5][2] + '  |\n' +
        '+---------------------------------------------------------------------+\n' +
        '|   ' + questions[0][3] + '    |    ' + questions[1][3] + '     |     ' + questions[2][3] + '     |     ' + questions[3][3] + '    |   ' + questions[4][3] + '    |  ' + questions[5][3] + '  |\n' +
        '+---------------------------------------------------------------------+\n' +
        '|  ' + questions[0][4] + '    |   ' + questions[1][4] + '     |    ' + questions[2][4] + '     |    ' + questions[3][4] + '    |  ' + questions[4][4] + '    | ' + questions[5][4] + '  |\n' +
        '+---------------------------------------------------------------------+\n' +
        'Select a category: ',
      options: [
        { title: 'Hardware', value: 'Hardware' },
        { title: 'Networking', value: 'Networking' },
        { title: 'Programming Languages', value: 'Programming Languages' },
        { title: 'Database Management', value: 'Database Management' },
        { title: 'Graphics', value: 'Graphics' },
        { title: 'Linux', value: 'Linux' },
      ],
    });

    if (isCancel(category)) {
      cancel('Operation cancelled');
      return process.exit(0);
    }

    var categoryIndex = 0;
    for (var i = 0; i < categoryArray.length; i++) {
      if (categoryArray[i] == category) {
        categoryIndex = i;
      }
    }

    var categoryAvailable = false;
    for (var i = 0; i < 5; i++) {
      if (!questions[categoryIndex][i].toString().includes('X')) {
        categoryAvailable = true;
      }
    }
    if (!categoryAvailable) {
      console.log('No questions available for this category!');
      continue;
    }

    const question = await select({
      message: name + '\'s Score : ' + score + '\n' +
        '+---------------------+\n' +
        '|    CSA Jeopardy     |\n' +
        '+---------------------+\n' +
        '|' + addingSpaces(category) + '|\n' +
        '+---------------------+\n' +
        '|' + addingSpaces(questions[categoryIndex][0]) + '|\n' +
        '+---------------------+\n' +
        '|' + addingSpaces(questions[categoryIndex][1]) + '|\n' +
        '+---------------------+\n' +
        '|' + addingSpaces(questions[categoryIndex][2]) + '|\n' +
        '+---------------------+\n' +
        '|' + addingSpaces(questions[categoryIndex][3]) + '|\n' +
        '+---------------------+\n' +
        '|' + addingSpaces(questions[categoryIndex][4]) + '|\n' +
        '+---------------------+\n' +
        'Select a question: ',
      options: [
        { title: '200', value: 200 },
        { title: '400', value: 400 },
        { title: '600', value: 600 },
        { title: '800', value: 800 },
        { title: '1000', value: 1000 },
      ],
    });

    if (isCancel(question)) {
      cancel('Operation cancelled');
      return process.exit(0);
    }

    if (questions[categoryIndex][question / 200 - 1].toString().includes('X')) {
      console.log('Question already answered!');
      continue;
    }

    var questionArray = [];
    for (var i = 0; i < categories.categories[categoryIndex].questions.length; i++) {
      if (categories.categories[categoryIndex].questions[i].points == question) {
        questionArray.push(categories.categories[categoryIndex].questions[i]);
      }
    }
    var randomQuestion = Math.floor(Math.random() * questionArray.length);
    var questionText = questionArray[randomQuestion].question;

    const answer = await text({
      message: name + '\'s Score : ' + score + '\n' +
        '+---------------------+\n' +
        '|    CSA Jeopardy     |\n' +
        '+---------------------+\n' +
        '|' + addingSpaces(category) + '|\n' +
        '+---------------------+\n' +
        '|' + addingSpaces(questionText) + '|\n' +
        '+---------------------+\n' +
        'Enter your answer: ',
    });

    if (isCancel(answer)) {
      cancel('Operation cancelled');
      return process.exit(0);
    }

    const CheckAnswerSpinner = spinner();
    CheckAnswerSpinner.start('Checking your answer...');
    await setTimeout(1000);
    CheckAnswerSpinner.stop('    Your answer is: ' + answer + '\n' + 'The correct answer is: ' + questionArray[randomQuestion].answer);

    if (checkAnswer(answer, questionArray[randomQuestion].answer)) {
      score += question;
      const Continue = await confirm({
        message:
          'You got ' + question + ' points!\n' +
          'Your score is now ' + score + '\n' +
          'Ready to continue?',
        initial: true,
      });

      if (isCancel(Continue)) {
        cancel('Operation cancelled');
        return process.exit(0);
      }
      if (!Continue) {
        game = Continue;
        break;
      }
    } else {
      const Continue = await confirm({
        message:
          'You got 0 points, better luck next time!\n' +
          'Your score is still ' + score + '\n' +
          'Ready to continue?',
        initial: true,
      });

      if (isCancel(Continue)) {
        cancel('Operation cancelled');
        return process.exit(0);
      }
      if (!Continue) {
        game = Continue;
        break;
      }
    }

    if (question == 1000) {
      questions[categoryIndex][question / 200 - 1] = 'XXXX';
    } else {
      questions[categoryIndex][question / 200 - 1] = 'XXX';
    }

    game = false;
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 5; j++) {
        if (!questions[i][j].toString().includes('X')) {
          game = true;
        }
      }
    }

  }

  outro('                               Thanks for playing \n' +
    logo +
    'Your final score is: ' + score + '\n' +
    'See you next time!');
  await setTimeout(1000);
}

main().catch(console.error);