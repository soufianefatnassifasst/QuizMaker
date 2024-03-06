const url = 'https://opentdb.com';

export const CategoryService = async () => {
    try {
        const response = await fetch(`${url}/api_category.php`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        throw error;
    }
}

export const QuizService = async ({categorySelect, difficultySelect}) => {
    try {
        const response = await fetch(`${url}/api.php?amount=5&category=${categorySelect}&difficulty=${difficultySelect}&type=multiple`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    } catch (error) {
        throw error;
    }
}
