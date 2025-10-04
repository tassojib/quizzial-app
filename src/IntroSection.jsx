import React from "react";

function IntroSection(props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="mb-2 font-karla text-3xl font-bold text-center text-blue-900">
        Quizzical
      </h1>
      <h2 className="mb-7 text-[#293264] font-inter font-normal max-w-sm sm:max-w-none text-base text-center">
        Every question is a chance to learn something new. Jump in!
      </h2>
      <button
        className="bg-[#4D5B9E] rounded-[15px] font-inter w-50 mx-auto block font-medium text-[#F5F7FB] py-4 px-11 text-center"
        onClick={props.playQuiz}
      >
        Start quiz
      </button>
    </div>
  );
}

export default IntroSection;
