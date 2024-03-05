const url = 'https://opentdb.com';

export const CategoryService = async () => {
    const response = await fetch(`${url}/api_category.php`);
    return response.json();
}

export const QuizService = async (args) => {
    try {
        const response = await fetch(`${url}/api.php?amount=5&category=${args.categorySelect}&difficulty=${args.difficultySelect}&type=multiple`);
        if(!response.ok) {
            console.error(`something wrong ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}
