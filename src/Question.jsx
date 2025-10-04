import { useRef } from "react";
import he from "he";

import { shuffleArray } from "./shuffleArray.js";
function Question(props) {
  const decodedIncorrectAns = props.question.incorrect_answers.map(function (
    answer
  ) {
    return he.decode(answer);
  });
  const decodedCorrectAns = he.decode(props.question.correct_answer);
  const optionsArr = [...decodedIncorrectAns, decodedCorrectAns];
  // console.log(props.question.incorrect_answers);
  const randomOptionsArr = useRef(shuffleArray(optionsArr));
  // console.log(props.answers)
  return (
    <>
      <h2 className="text-[#293264] max-w-96 mb-3 font-karla font-bold">
        {he.decode(props.question.question)}
      </h2>
      <div>
        {randomOptionsArr.current.map(function (item, i) {
          const isWrong =
            props.answers &&
            Object.values(props.answers).some(function (val) {
              return decodedCorrectAns !== item && item === val;
            });
          const wrongClass = isWrong ? "bg-[#F8BCBC] border-0 opacity-50" : "";
          const rightClass =
            props.answers && decodedCorrectAns === item
              ? "bg-[#94D7A2] border-0"
              : "";
          let opacityClass = "";
          if (props.answers) {
            if (!rightClass) {
              opacityClass = "opacity-50";
            }
          }

          return (
            <label htmlFor={`${props.question.question}-${item}`} key={item}>
              <input
                id={`${props.question.question}-${item}`}
                key={item}
                className="sr-only peer"
                type="radio"
                name={props.question.question}
                value={item}
              />
              <span
                className={`${rightClass} ${wrongClass} ${opacityClass} transition-colors duration-500 ease-in-out mb-2  sm:mb-0 mr-3 inline-block px-2 py-1 cursor-pointer border border-[#4D5B9E] rounded-lg text-[#293264] font-inter font-medium text-xs text-center min-w-16  peer-checked:bg-[#D6DBF5] `}
              >
                {item}
              </span>
            </label>
          );
        })}
        <hr className="w-[400px] my-4 border-t border-[#DBDEF0]"></hr>
      </div>
    </>
  );
}

export default Question;
