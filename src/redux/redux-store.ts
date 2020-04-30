import { createStore, combineReducers } from "redux";
import filtersReducer from "./filters-reducer";

let rootReducer = combineReducers({
    filtersState: filtersReducer
});

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(rootReducer);

export default store;