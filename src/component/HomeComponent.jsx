import React, {useEffect, useState} from 'react';
import {CategoryService, QuizService} from "../services/api_services.mjs";
import DiffcultyEnum from "../enum/DifficultyEnum.mjs";
import {useNavigate} from "react-router-dom";

const HomeComponent = () => {
    const navigate = useNavigate();
    const [userAnswer, setUserAnswer] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [quizOptions, setQuizOptions] = useState('');
    const [formData, setFormData] = useState({
        categoryId: '',
        difficultyLevel: ''
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [isQuizComplete, setIsQuizComplete] = useState(false);
    const [hoveredButton, setHoveredButton] = useState(null);

    useEffect(() => {
        setIsFormValid(formData.categoryId !== '' && formData.difficultyLevel !== '');
    }, [formData]);

    useEffect(() => {
        if (quizOptions) {
            setIsQuizComplete(userAnswer.length === quizOptions.length);
        }
    }, [userAnswer, quizOptions]);

    useEffect(() => {
        const loadOptions = async () => {
            try {
                return await CategoryService();
            } catch (error) {
                console.error('Error fetching category service :', error);
            }
        };
        loadOptions().then(response => setCategoryOptions(response.trivia_categories))
    }, []);

    const difficultyOptions = [
        {id: 0, level: DiffcultyEnum.EASY},
        {id: 1, level: DiffcultyEnum.MEDIUM},
        {id: 2, level: DiffcultyEnum.HARD}
    ]

    const handlerSelectCategory = (selectedValue) => {
        setFormData((prevData) => ({
            ...prevData,
            categoryId: selectedValue
        }));
    }
    const handlerSelectDifficulty = (selectedValue) => {
        setFormData((prevData) => ({
            ...prevData,
            difficultyLevel: selectedValue
        }));
    }

    const createQuiz = async (event) => {
        event.preventDefault();
        if (formData.categoryId && formData.difficultyLevel) {
            try {
                const response = await QuizService(formData);
                if (response && response.results) {
                    setQuizOptions(response.results);
                } else {
                    console.log('No results found');
                }
            } catch (error) {
                console.error('Error fetching quiz options:', error);
            }
        } else {
            console.log('formData is incomplete');
        }
    };

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
        <div>
            QUIZ MAKER
            <div>
                <select id='categorySelect' value={formData.id}
                        onChange={(event) => handlerSelectCategory(event.target.value)}>
                    <option value="">Select a Category</option>
                    {categoryOptions.map(option => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                </select>
                <select id='difficultySelect' value={formData.id}
                        onChange={(event) => handlerSelectDifficulty(event.target.value)}>
                    <option value="">Select difficulty</option>
                    {difficultyOptions.map(option => (
                        <option key={option.id} value={option.level}>{option.level}</option>
                    ))}
                </select>
                <button id='createBtn' onClick={createQuiz} disabled={!isFormValid}>Create</button>
            </div>
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
        </div>);
}

export default HomeComponent;
