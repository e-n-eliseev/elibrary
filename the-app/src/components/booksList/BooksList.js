import { BookCard } from "../card/BookCard";
import uniqid from "uniqid";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getBooks, getSearchName, getTotalQuantity } from "../../store/selectors/getListOfBooksSelectors";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Pagination from '@mui/material/Pagination';
import { bookGenreSearchRequest, bookSearchRequest } from "../../store/actions/getListOfBooksActions";

export const BooksList = ({ genre }) => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const books = useSelector(getBooks, shallowEqual);

    const searchName = useSelector(getSearchName);
    const totalBookQuantity = useSelector(getTotalQuantity);

    const pages = Math.ceil(totalBookQuantity / 27);
    const currentPage = genre ? +location.pathname.slice(7) : +location.pathname.slice(11);

    const [page, setPage] = useState(currentPage ? currentPage : 1);

    useEffect(() => {
        if (!currentPage || currentPage > pages) {
            setPage(1);
            genre ? navigate(`/genre/1`) : navigate(`/bookslist/1`);
        }
        if (currentPage < page) {
            setPage(1);
        }
    }, [currentPage])

    const handleChange = (event, value) => {
        genre
            ? dispatch(bookGenreSearchRequest(searchName, (27 * (currentPage - 1) + 1)))
            : dispatch(bookSearchRequest(searchName, (27 * (currentPage - 1) + 1)))
        setPage(value);
        genre ? navigate(`/genre/${value}`) : navigate(`/bookslist/${value}`);
    };

    return (

        <main className='books-list'>
            <div className="books-list__content">
                {books.length
                    ? <>
                        {!genre
                            ? <h2 className="books-list__heading">
                                Результаты поиска по запросу представлены ниже.
                            </h2>
                            : <h2 className="books-list__heading">
                                Результаты поиска по жанру {searchName} представлены ниже.
                            </h2>
                        }
                        <div className="books-list__list">
                            {books.map((book) => (
                                <BookCard key={uniqid()} book={book} />
                            ))}
                        </div>
                        <Pagination
                            color="secondary"
                            count={pages}
                            page={page}
                            onChange={handleChange}
                            size="middle"
                            variant="outlined" />
                    </>
                    : <>
                        <h2 className="books-list__heading">
                            Вы не ввели поисковый запрос
                        </h2>
                    </>
                }
            </div>
        </main>

    )
}