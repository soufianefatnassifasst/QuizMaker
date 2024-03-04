export const CategoryService = async () => {
    const response = await fetch('https://opentdb.com/api_category.php');
    return await response.json();
}

export const QuizService = async (args) => {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${args.categoryId}&difficulty=${args.difficultyLevel}&type=multiple`);
    return await response.json();
}
