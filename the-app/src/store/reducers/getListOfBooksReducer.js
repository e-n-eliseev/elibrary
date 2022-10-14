import { randomBooks1, randomBooks2, randomBooks3 } from "../../helpers/randomBooks";
import { BOOKS_SEARCH, GENRE_SEARCH, TEXT_SEARCH } from "../types/types";

const initialState = {
    sliderBooks: [
        ...randomBooks1,
        ...randomBooks2,
        ...randomBooks3,
    ],
    books: [],
    book: '',
}

export const getListOfBooksReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GENRE_SEARCH:
            return {
                ...state,
                books: payload.books
            }
        case BOOKS_SEARCH:
            return {
                ...state,
                books: payload.books
            }
        case TEXT_SEARCH:
            return {
                ...state,
                book: payload.book
            }
        default:
            return state
    }
}