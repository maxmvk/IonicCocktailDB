import { FilterType } from "../types/types";

const SET_FILTERS = "SET_FILTERS";
const APPLY_SELECTED_FILTERS = "APPLY_SELECTED_FILTERS";
const SET_DISPLAYED_ITEMS = "SET_DISPLAYED_ITEMS";
const SET_SELECTED = "SET_SELECTED";
const REFRESH_FILTERS = "REFRESH_FILTERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

export type InitialStateType = {
    filters: Array<FilterType>,
    selectedFilters: Array<FilterType>,
    displayedItems: Array<FilterType>,
    currentPage: number
}

let initialState: InitialStateType = {
    filters: [] as Array<FilterType>,
    selectedFilters: [] as Array<FilterType>,
    displayedItems: [] as Array<FilterType>,
    currentPage: 1
}

const filtersReducer = (state = initialState, action: any):InitialStateType => {
    switch (action.type) {
        case SET_FILTERS: {
            return {...state, filters: [...state.filters, action.filter]}
        }

        case APPLY_SELECTED_FILTERS: {
            return {...state, selectedFilters: [...state.selectedFilters, action.selectedFilter]}
        }

        case SET_DISPLAYED_ITEMS: {
            return {...state, displayedItems: [...state.displayedItems, action.displayedItem]}
        }

        case REFRESH_FILTERS: {
            return {...state, selectedFilters: [], displayedItems: [], currentPage: 1}
        }

        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }

        case SET_SELECTED:
            return {
                ...state,
                filters: state.filters.map( f => {
                    if(f.id === action.filterId) {
                        return {...f, selected: !f.selected}
                    }
                    return f;
                })
            };

        default:
            return state;
    }
}

type SetFiltersActionType = {
    type: typeof SET_FILTERS
    filter: FilterType
}

type ApplySelectedFiltersActionType = {
    type: typeof APPLY_SELECTED_FILTERS
    selectedFilter: FilterType
}

type SetDisplayedItemsActionType = {
    type: typeof SET_DISPLAYED_ITEMS
    displayedItem: FilterType
}

type SetSelectedActionType = {
    type: typeof SET_SELECTED
    filterId: number
}

type RefreshFiltersActionType = {
    type: typeof REFRESH_FILTERS
}

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export const setFilters = (filter: FilterType):SetFiltersActionType => ({ type: SET_FILTERS, filter })
export const applySelectedFilters = (selectedFilter: FilterType):ApplySelectedFiltersActionType => ({ type: APPLY_SELECTED_FILTERS, selectedFilter })
export const setDisplayedItems = (displayedItem: FilterType):SetDisplayedItemsActionType => ({ type: SET_DISPLAYED_ITEMS, displayedItem })
export const setSelected = (filterId: number):SetSelectedActionType => ({ type: SET_SELECTED, filterId })
export const refreshFilters = ():RefreshFiltersActionType => ({ type: REFRESH_FILTERS})
export const setCurrentPage = (currentPage: number):SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage})

export default filtersReducer;