export const reducer = (state, action) => {
    switch (action.type) {
        case ('add'):
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    done: false
                }
            ];
        case ('edit'):
            return state.map((task) =>
                task.id === action.id ? {...task, text: action.text} : task
            );
        case ('delete'):
            return state.filter((t) => t.id !== action.id);
        case ('checked'):
            return state.map((task) =>
                task.id === action.id ? {...task, done: !task.done} : task
            );
        case ('sort'):
            let newState = state;
            newState.sort((a, b) => {
                let fa = a.text.toLowerCase(), fb = b.text.toLowerCase();
                if (fa > fb) {
                    return action.sortType ? -1 : 1;
                } else if (fa < fb) {
                    return action.sortType ? 1 : -1;
                }
                return 0;
            })
            return newState;
        default:
            return state;
    }
}