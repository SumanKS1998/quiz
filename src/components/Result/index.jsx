import React, { useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { questions } from "../../constants";
import { motion } from "framer-motion";
const Result = () => {
  const { savedAnswers } = React.useContext(AppContext);
  const [score, setScore] = useState(0);
  useEffect(() => {
    const marks = savedAnswers.reduce((acc, ans) => {
      if (ans.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setScore(marks);
  }, [savedAnswers]);

   return (
    <div className="flex  flex-col p-8 gap-8 border rounded-xl  md:w-[70%] overflow-hidden">
      <h1 className="text-xl font-bold">Your score: {score}/{questions.length}</h1>
      <div className="flex flex-col gap-4 ">
        {savedAnswers.map((item, i) => (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.4, delay: i * 0.1 },
            }}
            key={i}
            className="flex flex-col md:flex-row justify-between md:items-center"
          >
            <h2>{questions[i].question}</h2>
            {questions[i].options[item.selectedAnswer] ??
              "No option selected"}{" "}
            {item.isCorrect ? "✅" : "❌"}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Result;
