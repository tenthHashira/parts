const SET_SEARCH_PARTS = 'search/setParts'
const CLEAR_SEARCH = 'search/clearSearch'
const SET_IS_LOADING = 'search/setIsLoading'
const SET_ERROR = 'search/setError'

const initialState = {
    parts: [],
}

export const searchReducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_SEARCH_PARTS:
            return {
                ...state,
                parts:action.payload
            }
        case CLEAR_SEARCH:
            return {
                ...state,
                parts: []
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading:action.payload
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export const setSearchParts = (parts) => ({
    type: SET_SEARCH_PARTS,
    payload: parts
})

export const clearSearch = () => ({
    type: CLEAR_SEARCH
})

export const setIsLoading = (isLoading) => ({
    type:SET_IS_LOADING,
    payload: isLoading
})

export const setError = (error) => ({
    type:SET_ERROR,
    payload: error
})