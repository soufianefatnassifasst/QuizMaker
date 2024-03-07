import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export const ScoreComponent = () => {
    const location = useLocation();
    const {quizOptions, userAnswer} = location.state;
    const navigate = useNavigate();
    const [score, setScore]= useState(0);
    const [correctAnswer, setCorrectAnswers]= useState([]);

    useEffect(() =>{
        const data = [];
        userAnswer.forEach((item) => {
            if (quizOptions[item.id]?.correct_answer !== item.answer) {
                data.push({id: item.id, correctAnswer: quizOptions[item.id]?.correct_answer})
            }
        });
        setCorrectAnswers(data);
        setScore(quizOptions.length - correctAnswer.length);
    }, [userAnswer, quizOptions, correctAnswer.length]);
    const getScoreColor = (score) => {
        let style = {marginTop: '20px', color: 'black'};
        switch (true) {
            case (score <= 1):
                return {...style, backgroundColor: 'red'};
            case (score <= 3):
                return {...style, backgroundColor: 'yellow'};
            case (score <= 5):
                return {...style, backgroundColor: 'green'};
            default:
                return 'Invalid score';
        }
    }

    const getAnswerStyle = (questionIndex, answer) => {
        const baseStyle = {
            cursor: 'pointer',
            margin: '5px',
            padding: '10px',
            borderRadius: '5px'
        };
        const isSelected = userAnswer.some(a => a.id === questionIndex && a.answer === answer);
        const isCorrect = correctAnswer.some(inc => inc.id === questionIndex && inc.correctAnswer === answer);
        const isInCorrect = correctAnswer.some(inc => inc.id === questionIndex && inc.correctAnswer !== answer);

        let style = {...baseStyle, color: 'green'};

            if(isSelected || isCorrect) {
                style = {...style, backgroundColor: 'green', borderColor: 'green', color: 'white'};
            }

            if (isInCorrect && isSelected) {
                style = {...style, backgroundColor: 'red', borderColor: 'red', color: 'white'};
            }

        return style;
    }

    return(
    <>
        <h3>RESULTS</h3>
        <div style={{marginTop: '20px'}}>
            {quizOptions && quizOptions.map((quizItem, index) => (
                <div key={index}>
                    <span>{quizItem.question}</span>
                    <ul>
                        {[quizItem?.correct_answer, ...quizItem?.incorrect_answers].sort().map((answer, answerIndex) => (
                            <button key={answerIndex} style={getAnswerStyle(index, answer)}>{answer}</button>
                        ))}
                    </ul>

                </div>
            ))}
        </div>
        <div style={getScoreColor(score)}>
            <span>You scored {score} out of {quizOptions.length}</span>
        </div>
        <button onClick={() => navigate('/')}>Create a new quiz</button>
    </>);
}

export default ScoreComponent;
