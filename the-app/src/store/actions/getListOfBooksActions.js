import { BOOKS_SEARCH, BOOKS_SORT, CURRENT_BOOK, TEXT_SEARCH, TOTAL_BOOK_QUANTITY, BOOK_RATING } from "../types/types";

import { setLoading, setError, setSuccess } from "./commonActions";
import { maxResults } from "../../helpers/vars";
import { bookAdapter, missingData } from "../../helpers/bookRequest";
import { postData } from "../../helpers/bookRequest";
import { serverhost } from "../../helpers/vars"


export const textSearch = (data) => ({
    type: TEXT_SEARCH,
    data
})

export const bookSearch = (data) => ({
    type: BOOKS_SEARCH,
    data
})
export const currentBook = (data) => ({
    type: CURRENT_BOOK,
    data
})
export const addRating = (data) => ({
    type: BOOK_RATING,
    data
})
export const sortBooksByTitle = (data) => ({
    type: BOOKS_SORT,
    data
});

export const setTotalItems = (data) => ({
    type: TOTAL_BOOK_QUANTITY,
    data
})
export const bookSearchRequest = (searchName, startIndex, sortParam = '') => async (dispatch) => {
    try {
        dispatch(setLoading());

        const books = await postData(`${serverhost}/api/booksearch/searchbook`, { searchName, maxResults, startIndex, sortParam });

        dispatch(setTotalItems(books.totalItems));
        dispatch(bookSearch(missingData(books)));
        dispatch(textSearch(searchName));
        dispatch(setSuccess());
    }
    catch (error) {
        console.log(error);
        dispatch(setError(error));
    }
}
export const currentBookRequest = (id) => async (dispatch) => {
    try {
        dispatch(setLoading());
        const book = await postData(`${serverhost}/api/booksearch/currentbook`, { id });
        dispatch(currentBook(bookAdapter(book)));
        dispatch(setSuccess());
    }
    catch (error) {
        console.log(error);
        dispatch(setError(error));
    }
}
export const bookGenreSearchRequest = (searchName, startIndex, sortParam = '') => async (dispatch) => {
    try {
        dispatch(setLoading());

        const books = await postData(`${serverhost}/api/booksearch/searchgenre`, { searchName, maxResults, startIndex, sortParam });

        dispatch(setTotalItems(books.totalItems));
        dispatch(bookSearch(missingData(books)));
        dispatch(textSearch(searchName));
        dispatch(setSuccess());
    }
    catch (error) {
        console.log(error);
        dispatch(setError(error));
    }
}
export const booksSortRequest = (searchName, startIndex, sortParam = '') => async (dispatch) => {
    try {

        const books = await postData(`${serverhost}/api/booksearch/sortbook`, { searchName, maxResults, sortParam, startIndex });

        dispatch(setTotalItems(books.totalItems));
        dispatch(bookSearch(missingData(books)));
        dispatch(textSearch(searchName));
        dispatch(setSuccess());
    }
    catch (error) {
        console.log(error);
        dispatch(setError(error));
    }
}
export const booksSortBySortMethod = (searchName, books, totalBookQuantity) => (dispatch) => {

    dispatch(sortBooksByTitle(books));
    dispatch(setTotalItems(totalBookQuantity));
    dispatch(textSearch(searchName));
    dispatch(setSuccess());
}
export const toAddRating = (newValue, book) => (dispatch) => {

    const oldRating = book.volumeInfo.averageRating ? undefined : 0;
    let oldCounts = book.volumeInfo.ratingsCount;
    const nweRating = (oldRating * oldCounts + newValue) / ++oldCounts;

    if (book.volumeInfo.ratingsCount) {

        const oldRating = book.volumeInfo.averageRating;
        let oldCounts = book.volumeInfo.ratingsCount;
        const nweRating = (oldRating * oldCounts + newValue) / ++oldCounts;

        book.volumeInfo.ratingsCount++;
        book.volumeInfo.averageRating = nweRating;

    } else {

        const oldRating = 0;
        let oldCounts = 0;
        const nweRating = (oldRating * oldCounts + newValue) / ++oldCounts;

        book.volumeInfo.ratingsCount = 1;
        book.volumeInfo.averageRating = nweRating;
    }
    dispatch(addRating(book));
}