// import DateCounter from './DateCounter'
import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextQuestion from "./components/NextQuestion";
import Progress from "./components/Progress";
import FinishedScreen from "./components/FinishedScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";

const initialState = {
  question: [],
  // 'loading','error','ready','active','finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  timeRemaining: null,
};
const SECS = 30
function reducer(state, action) {
  console.log(state);
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        question: action.payload,
        status: "ready",
      };
      case "dataFailed":
        return {
          ...state,
          status: "error",
        };
        case "start":
          return {
            ...state,
            status: "active",
            timeRemaining: state.question.length * SECS,
          };
          case "answer":
      const question = state.question[(state.index)]
      return { ...state, answer: action.payload , points: action.payload === question.correctOption ? state.points + question.points:state.points};
      case 'nextQuestion':
        return {...state,index: state.index +1,answer:null}
        case 'finish':
          return {...state,status:'finished', highScore: state.points>state.highScore?state.points:state.highScore}
        case 'reset':
          console.log(state.question)
          return {...initialState,question:state.question,status: 'ready',}
          case 'tick':
            return {...state,timeRemaining: state.timeRemaining -1,status: state.timeRemaining === 0?'finished':state.status}
    default:
      throw new Error("something unexpected happened");
  }
}
function App() {
  const [{ question, status, index, answer,points,highScore,timeRemaining}, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    async function dataFetch() {
      try {
        const res = await axios.get(`http://localhost:9000/questions`);
        // console.log(res.data)
        const data = dispatch({ type: "dataReceived", payload: res.data });
        console.log(data);
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }

    dataFetch();
  }, []);
  const questionLenth = question.length;
  const totalPoints = question.reduce((prev,curr)=>prev + curr.points,0)

  return (
    <div className="app">
      <Header />
      <Main>
        {/* <p>1/15</p>
        <p>Questions</p> */}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen length={questionLenth} dispatch={dispatch} />
        )}
        {status === "active" && (<>
        <Progress index={index} numQuestions={questionLenth} points={points} totalPoints={totalPoints} answer={answer}/>
         <Questions   questions={question[index]}
            dispatch={dispatch}
            answer={answer}
          />
          
          <Footer/>
          <Timer dispatch={dispatch} timeRemaining={timeRemaining}/>
        <NextQuestion dispatch={dispatch} answer={answer} index={index} numQuestion={questionLenth}/>

      
        </>
        )}
        {status==='finished' && <FinishedScreen points={points} totalPoints={totalPoints} highScore={highScore} dispatch={dispatch}/>}

      </Main>
    </div>
  );
}

export default App;
