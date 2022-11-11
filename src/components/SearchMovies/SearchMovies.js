import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useViewport } from '../hook';
import { getSearchMovies, setMovieDetail } from '../store/action';

function SearchMovies(props) {

    const [windownWidth] = useViewport();
    const dispatch = useDispatch();
    const { SearchMovies } = useSelector(state => state.infoMovies);
    const useQuery = () => new URLSearchParams(useLocation().search);
    const keywords = useQuery().get('keywords');
    console.log(keywords);

    useEffect(() => {
        if (keywords) dispatch(getSearchMovies(keywords))
    }, [keywords, dispatch]);
    return (
        <SearchPane>
            {
                SearchMovies && SearchMovies.length > 0 ?
                    (
                        <div className="searchContent"
                            style={{
                                gridTemplateColumns: `repeat(${windownWidth > 1200 ? 5 :
                                    windownWidth > 992 ? 4 :
                                        windownWidth > 768 ? 3 :
                                            windownWidth > 600 ? 2 : 1
                                    }, auto)`
                            }}
                        >
                            {
                                SearchMovies.map((movie, index) => {
                                    if (movie.backdrop_path !== null && movie.media_type !== 'person') {
                                        const imageUrl = `http://image.tmdb.org/t/p/w500/${movie.poster_path}`
                                        return (
                                            <div 
                                            className="movieItem" 
                                            key={index}
                                            onClick={() => dispatch(setMovieDetail(movie))}
                                            >
                                                <img src={imageUrl} alt="" />
                                                <span>{movie.title || movie.name}</span>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    ) : (
                        <NotFound>
                            <h1>Your search for no looking</h1>
                        </NotFound>
                    )
            }
        </SearchPane>
    );
}

export default SearchMovies;

const SearchPane = styled.div`
    width: 100%;
    min-height: 92vh;
    padding-top: 80px;
    background: var(--color-background);
    transition: all 0.3s linear;

    .searchContent {
        padding: 40px 60px;
        display: grid;
        gap: 8px;

        &:hover .movieItem{
            opacity: 0.7;
            cursor: pointer;
        }

        .movieItem{
            position: relative;
            max-width: 400px;
            width: 100%;
            height: 400px;
            border-radius: 12px;
            margin: 20px 0;
            overflow: hidden;
            transform: scale(1);
            transition: 0.3s all linear;

            &:hover {
                transform: scale(1.2);
                z-index: 10;
                opacity: 1;
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            span{
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                text-align: center;
                padding: 4px;
                background-color: rgba(0, 0, 0, 0.5);
                color: var(--color-white);  
                font-weight: bold;
            }
        }
    }
`;

const NotFound = styled.div`
    padding: 5rem 8rem;
    color: var(--color-white);
`;