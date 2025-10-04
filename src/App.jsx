import { useState, useEffect } from "react";
import IntroSection from "./IntroSection.jsx";

import Question from "./Question.jsx";

function App() {
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const result =
    answers &&
    questions.filter(function (item) {
      return item.correct_answer === answers[item.question];
    });

  const score = answers && result.length;
  console.log("result", result, score);

  useEffect(
    function () {
      if (isPlaying) {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
          .then((res) => res.json())
          .then((data) => {
            setQuestions(data.results);
          })
          .catch((err) => console.error(err));
      }
    },
    [isPlaying]
  );

  function handleForm(formData) {
    const userAnswer = Object.fromEntries(formData);
    setAnswers(userAnswer);
    setIsPlaying((prevIsplaying) => !prevIsplaying);
  }

  function playQuiz() {
    if (!isPlaying) {
      setIsPlaying((prevIsplaying) => !prevIsplaying);
    }
    setAnswers(null);
    setQuestions(null);
  }

  const questionElements =
    questions &&
    questions.map(function (item, i) {
      return <Question answers={answers} question={item} id={i} key={i} />;
    });

  return (
    <main className="">
      {!answers && !isPlaying && <IntroSection playQuiz={playQuiz} />}
      {(isPlaying || answers) && (
        <form
          className="  flex justify-center flex-col min-w-[300px] "
          action={handleForm}
        >
          {questionElements}
          {questions && !answers && (
            <button className="  py-3 block mx-auto px-5 text-nowrap rounded-lg bg-[#4D5B9E] text-[#F5F7FB] font-inter font-semibold text-xs text-center">
              Check Answers
            </button>
          )}
        </form>
      )}
      {answers && (
        <div className="flex mx-auto justify-center items-center gap-2 max-w-[360px]">
          <h3 className="text-sm font-inter font-bold  text-center text-[#293264]">
            You scored {score}/5 correct answers
          </h3>
          <button
            className="rounded-[10px] font-inter text-nowrap font-semibold text-center py-2 px-4 text-[#F5F7FB] text-xs bg-[#4D5B9E]"
            onClick={playQuiz}
          >
            Play Again
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
