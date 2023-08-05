import { createContext, useMemo, useState } from "react";
import { questions } from "../constants";

const AppContext = createContext();
const AppContextProvider = ({ children }) => {
  const [steps, setSteps] = useState(1);
  const [testOver, setTestOver] = useState(false);
  const initialSavedAnswers = questions.map((_, index) => ({
    questionIndex: index,
    isCorrect: false,
    selectedAnswer: null,
  }));
  const [savedAnswers, setSavedAnswers] = useState(initialSavedAnswers);

  const incrementStep = () => {
    setSteps((prevCount) => prevCount + 1);
  };

  const decrementStep = () => {
    setSteps((prevCount) => prevCount - 1);
  };
  const stepHandler = (input) => {
    setSteps(input);
  };
  const contextValues = useMemo(() => {
    return {
      steps,
      incrementStep,
      decrementStep,
      stepHandler,
      testOver,
      setTestOver,
      savedAnswers,
      setSavedAnswers,
    };
  }, [steps, testOver]);

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};
export { AppContext };
export default AppContextProvider;
