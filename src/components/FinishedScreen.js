function FinishedScreen({points,totalPoints,highScore,dispatch}) {
    const percent = (points/totalPoints)*100;
    return (
        <>
        <p className="result">
            You scored <strong>{points}</strong> points out of {totalPoints}.({Math.ceil(percent)}%)
        </p>
        <p className="highscore">(Highest score: {highScore} points)</p>
        <button className="btn btn-ui" onClick={()=>dispatch({type: 'reset'})}>Restart Quiz</button>
        </>
    )
}

export default FinishedScreen
