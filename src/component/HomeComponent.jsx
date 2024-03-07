import React, {useEffect, useState} from 'react';
import {CategoryService, QuizService} from "../services/api_services.mjs";
import { useForm } from 'react-hook-form';
import SelectComponent from "./SelectComponent";
import {difficultyOptions} from "../const/difficultyOptions";
import { useNavigate} from "react-router-dom";

const HomeComponent = () => {
    const navigate = useNavigate();
    const [categoryOptions, setCategoryOptions] = useState([]);

    const [messageError, setMessageError] = useState('');

    const { register, watch , handleSubmit} = useForm({
        defaultValues: {
            categorySelect: '',
            difficultySelect: ''
        }
    });

    const [categoryValue, difficultyValue] = watch(['categorySelect', 'difficultySelect']);
    const isSubmitEnabled = categoryValue !== '' && difficultyValue!== '';


    useEffect(() => {
        const loadOptions = async () => {
            try {
                return await CategoryService();
            } catch (error) {
                return error.message;
            }
        };
        loadOptions().then(response => setCategoryOptions(response?.trivia_categories))
    }, []);


    const onSubmit = async (data) => {
        if (data.categorySelect && data.difficultySelect) {
            try{
                const response = await QuizService({
                    categorySelect: data.categorySelect, difficultySelect: difficultyOptions[data.difficultySelect].name
                });
                if(response && response.results.length > 0) {
                    response.results= response.results.map((item, index) => {
                        const allAnswers = [item?.correct_answer, ...item?.incorrect_answers];
                        return {...item, allAnswers: allAnswers.sort(() => 0.5 - Math.random())};
                    });
                    navigate('/quiz', {state: response.results});
                } else {
                    setMessageError('No results found');
                }
            } catch(error) {
                throw error;
            }
        }
    }

    return (
        <div>
            QUIZ MAKER
            <form onSubmit={handleSubmit(onSubmit)}>
                <SelectComponent name='categorySelect' placeHolder='Select a Category' register={register} options={categoryOptions} />
                <SelectComponent name='difficultySelect' placeHolder='Select difficulty' register={register} options={difficultyOptions} />
                <button id='createBtn' disabled={!isSubmitEnabled}>Create</button>
            </form>
          {messageError}
        </div>);
}

export default HomeComponent;
