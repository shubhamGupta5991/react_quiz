function Options({ question, dispatch, answer }) {
  console.log(question);
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <buttton
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
           hasAnswered? index === question.correctOption ? "correct" : "wrong":''
          }`}
          key={option}
          onClick={() => dispatch({ type: "answer", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </buttton>
      ))}
    </div>
  );
}

export default Options;
