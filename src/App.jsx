import React, { useContext, useMemo, useState } from "react";
import AppContextProvider, { AppContext } from "./context/AppContext";
import Stepper from "./components/Stepper";
import Question from "./components/Question";
import Timer from "./components/Timer";
import Result from "./components/Result";

const App = () => {
  const { testOver } = useContext(AppContext);
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      {testOver ? (
        <Result />
      ) : (
        <div className="flex flex-col p-3 md:p-8 gap-8 border rounded-[16px]  md:w-[70%]">
          <div className="flex justify-between">
            <Stepper />
            <Timer />
          </div>
          <Question />
        </div>
      )}
    </div>
  );
};

export default App;
