import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
const ADD_MESSAGE_COLOR = "#3d84b8";
const REGULAR_MESSAGE_COLOR = "#2b2e4a";
const ERROR_MESSAGE_COLOR = "#fb3640";

const ScoreCardContext = createContext({
  messages: [],
  deleteAll: () => {},
  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
});

const makeMessage = (message, color) => {
  return { message, color };
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [check, setCheck] = useState(false);
  const deleteAll = () => {
    setMessages([[], makeMessage("Database cleared", REGULAR_MESSAGE_COLOR)]);
  };
  const addCardMessage = (message) => {
    setMessages([...messages, makeMessage(message, ADD_MESSAGE_COLOR)]);
  };

  const addRegularMessage = (...ms) => {
    setMessages([
      ...messages,
      ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR)),
    ]);
    setCheck(true);
  };

  //   useEffect(() => {
  //     if (check === true) {
  //       deleteAll();
  //     }
  //   }, [check]);

  const addErrorMessage = (message) => {
    setMessages([...messages, makeMessage(message, ERROR_MESSAGE_COLOR)]);
  };

  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
        deleteAll,
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
