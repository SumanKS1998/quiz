import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { questions } from "../../constants";
import { motion } from "framer-motion";
const Question = () => {
  const [answers, setAnswers] = useState(null);
  const {
    steps,
    incrementStep,
    decrementStep,
    savedAnswers,
    setSavedAnswers,
    setTestOver,
  } = useContext(AppContext);
  const selectedQuestion = questions[steps - 1].question;
  const options = questions[steps - 1].options;
  const correctAnswer = questions[steps - 1].answer;
  useEffect(() => {
    const selectedAnswerIndex = savedAnswers[steps - 1].selectedAnswer;
    setAnswers(selectedAnswerIndex);
  }, [steps]);
  const AnswerHandler = (selectedOption) => {
    const isCorrect = options[selectedOption] === correctAnswer;

    setAnswers(selectedOption);

    setSavedAnswers((prevSavedAnswers) => {
      const newAnswerArray = prevSavedAnswers.map((answer, index) =>
        index === steps - 1
          ? { ...answer, isCorrect, selectedAnswer: selectedOption }
          : answer
      );
      return newAnswerArray;
    });
  };
  const incrementHandler = () => {
    if (steps === questions.length) {
      setTestOver(true);
      return;
    }
    incrementStep();
  };
  const isSelectedAnswer = (i) => answers === i;
  const renderOptions = () => {
    return (
      <ol type="a" className="gap-4 flex flex-col mt-8">
        {options.map((item, i) => (
          <li
            key={i}
            className={`${
              !isSelectedAnswer(i) && `border`
            } p-3 rounded-xl cursor-pointer relative`}
            onClick={() => AnswerHandler(i)}
          >
            {isSelectedAnswer(i) && (
              <motion.div
                layoutId="option"
                className="absolute bg-primary top-0 right-0 left-0 bottom-0 rounded-xl"
              />
            )}
            <h2
              className={`z-10 relative ${
                isSelectedAnswer(i) ? "text-white" : "text-black"
              }`}
            >
              {item}
            </h2>
          </li>
        ))}
      </ol>
    );
  };
  const renderBtns = () => {
    return (
      <div className="flex gap-3 mt-16">
        {steps !== 1 && (
          <button
            className="border-primary text-primary py-1 border-2 rounded-xl w-[100px]"
            onClick={decrementStep}
          >
            Prev
          </button>
        )}
        <button
          className="bg-primary text-white py-1  rounded-xl w-[100px]"
          onClick={incrementHandler}
        >
          {steps === 10 ? "Submit" : "Next"}
        </button>
      </div>
    );
  };
  return (
    <div className="border p-3 md:p-8 rounded-[16px]">
      <h1 className="text-xl">{selectedQuestion}</h1>
      {renderOptions()}
      {renderBtns()}
    </div>
  );
};

export default Question;
