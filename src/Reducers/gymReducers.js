
export const gymReducer = (state = [], action) => {
    switch (action.type) {
        case "create":
            return [...state, action.payload]
        case "edit":
            return state.map(task => {
                if (task.id === action.payload.id) {
                    return action.payload;
                } else {
                    return task;
                }
            });
        case "delete":
            return state.filter(task => task.id !== action.payload);
        default:
            return state;
    }
}