export const tag = (type) => {
  if (type?.includes('meals')) {
    return 'Meal';
  }
  if (type?.includes('drinks')) {
    return 'Drink';
  }
};

export const recipeTypes = (type) => {
  if (type?.includes('meals')) {
    return 'meals';
  }
  if (type?.includes('drinks')) {
    return 'drinks';
  }
};
