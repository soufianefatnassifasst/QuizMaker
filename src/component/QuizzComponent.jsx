import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const QuizzComponent = ({quizOptions}) => {
    const navigate = useNavigate();
    const [userAnswer, setUserAnswer] = useState([]);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null);

    useEffect(() => {
        if (quizOptions) {
            setIsQuizComplete(userAnswer.length === quizOptions.length);
        }
    }, [userAnswer, quizOptions]);

    const getAnswerStyle = (questionIndex, answer, isHovered) => {
        let style = {
            cursor: 'pointer',
            margin: '5px',
            padding: '10px',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease',
            backgroundColor: isHovered ? 'lightgreen' : 'white',
            color: 'green'
        };
        const isSelected = userAnswer.some(a => a.id === questionIndex && a.answer === answer);

        if (isSelected) {
            style = {...style, backgroundColor: 'green', borderColor: 'green', color: 'white'};
        }
        return style;
    }

    const handleAnswerSelect = (index, answer) => {
        const newAnswer = {id: index, answer};
        setUserAnswer(prev => {
            const existingAnswerIndex = prev.findIndex(a => a.id === index);
            if (existingAnswerIndex >= 0) {
                return [...prev.slice(0, existingAnswerIndex), newAnswer, ...prev.slice(existingAnswerIndex + 1)];
            } else {
                return [...prev, newAnswer];
            }
        });
    }
    const submitQuiz = () => {
        navigate('/score', {state: {quizOptions, userAnswer}});
    }
return (
    <>
    <div style={{marginTop: '20px'}}>
        {quizOptions && quizOptions.map((quizItem, index) => (
            <div key={index}>
                <span>{quizItem.question}</span>
                <ul>
                    {[quizItem?.correct_answer, ...quizItem?.incorrect_answers].sort().map((answer, answerIndex) => (
                        <button key={answerIndex}
                                style={getAnswerStyle(index, answer, hoveredButton === `${index}-${answer}`)}
                                onMouseEnter={() => setHoveredButton(`${index}-${answer}`)}
                                onMouseLeave={() => setHoveredButton(null)}
                                onClick={() => handleAnswerSelect(index, answer)}>{answer}</button>
                    ))}
                </ul>
            </div>
        ))}
    </div>

    {isQuizComplete &&
    <button onClick={submitQuiz}>Submit</button>}
    </>
)
}

export default QuizzComponent;
