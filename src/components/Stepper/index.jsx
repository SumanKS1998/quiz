import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { questions } from "../../constants";
import { motion } from "framer-motion";

const Stepper = () => {
  const { steps, stepHandler } = useContext(AppContext);

  return (
    <div className="hidden lg:flex flex-wrap gap-2 justify-center ">
      {questions.map((item, i) => (
        <div
          key={item.question}
          className="relative h-[40px] w-[40px] flex items-center justify-center cursor-pointer"
          onClick={() => stepHandler(i + 1)}
        >
          {steps === i + 1 && (
            <motion.div
              layoutId="step"
              className="absolute bg-primary top-0 right-0 left-0 bottom-0 rounded-full"
            />
          )}
          <h2
            className={`text-[16px] z-10 ${
              steps === i + 1 ? "text-white" : "text-black"
            }`}
          >
            {i + 1}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
