import { combineReducers, legacy_createStore as createStore } from "redux";
import { searchReducer } from "@/features/search-parts";


const rootReducer = combineReducers({
    search: searchReducer
})
export const store = createStore(rootReducer)

