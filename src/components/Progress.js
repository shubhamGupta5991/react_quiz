function Progress({index,numQuestions,points,totalPoints,answer}) {
    return (
        <header className="progress">
            <progress max={numQuestions} value={index + Number(answer !== null)}/>
            <p>Questions <strong>{index+1}</strong>/{numQuestions}</p>
            <p>Points: <strong>{points}</strong>/{totalPoints}</p>
        </header>
    )
}

export default Progress
