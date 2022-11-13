import { BOOKS_SEARCH, BOOKS_SORT, TEXT_SEARCH, TOTAL_BOOK_QUANTITY, } from "../types/types";

import { setLoading, setError, setSuccess } from "./commonActions";

import axios from 'axios';
import { bookApiKey } from "../../helpers/googleBookApiKey";
import { maxResults } from "../../helpers/vars";
import { missingData } from "../../helpers/bookRequest";
import { postData } from "../../helpers/bookRequest"


export const textSearch = (data) => ({
    type: TEXT_SEARCH,
    data
})

export const bookSearch = (data) => ({
    type: BOOKS_SEARCH,
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
        // const books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchName}+inauthor:${searchName}&key=${bookApiKey}&maxResults=${maxResults}&startIndex=${startIndex}`);

        const books = await postData('http://localhost:5000/api/booksearch/searchbook', { searchName, maxResults, startIndex, sortParam })
            .then((data) => {
                return data
            });

        console.log(books);
        // dispatch(setTotalItems(books.data,totalItems));
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
export const bookGenreSearchRequest = (searchName, startIndex, sortParam = '') => async (dispatch) => {
    try {
        dispatch(setLoading());
        // const books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${searchName}&key=${bookApiKey}&maxResults=${maxResults}&startIndex=${startIndex}`);
        const books = await postData('http://localhost:5000/api/booksearch/searchgenre', { searchName, maxResults, startIndex, sortParam })
            .then((data) => {
                return data
            });
        dispatch(setTotalItems(books.totalItems));
        // dispatch(setTotalItems(books.data.totalItems));
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
        // dispatch(setLoading());
        // const books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${searchName}&key=${bookApiKey}&maxResults=${maxResults}&${sortParam}&startIndex=${startIndex}`);

        const books = await postData('http://localhost:5000/api/booksearch/sortbook', { searchName, maxResults, sortParam, startIndex })
            .then((data) => {
                return data
            });

        // dispatch(setTotalItems(books.data.totalItems));
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
    // dispatch(setLoading());
    // const books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:${searchName}&key=${bookApiKey}&maxResults=${maxResults}&${sortParam}&startIndex=${startIndex}`);

    // const books = await postData('http://localhost:5000/api/booksearch/sortbook', { searchName, maxResults, sortParam, startIndex })
    //     .then((data) => {
    //         return data
    //     });

    // console.log(sortParam);
    // dispatch(setTotalItems(books.data.totalItems));
    dispatch(setTotalItems(totalBookQuantity));
    // dispatch(bookSearch(missingData(books)));
    dispatch(textSearch(searchName));
    dispatch(setSuccess());
}