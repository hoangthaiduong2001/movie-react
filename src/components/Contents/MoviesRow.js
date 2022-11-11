import styled from "styled-components";
import { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { SmoothHorizontalScrolling } from "../../utils";
import { useState } from "react";
import { useEffect } from "react";
import { useViewport } from "../hook";
import { useDispatch } from "react-redux";
import { setMovieDetail } from "../store/action";


function MoviesRow(props) {
    const { movies, title, isVieWie, idSection } = props;
    const movieRef = useRef();
    const sliderRef = useRef();
    const [dragDown, setDragDown] = useState(0);
    const [dragMove, setDragMove] = useState(0);
    const [isDrag, setIsDrag] = useState(false);
    const [windownWidth] = useViewport();
    const dispatch = useDispatch();

    const handleSetMovie = (movie) => {
        dispatch(setMovieDetail(movie));
    }

    const handleScrollRight = () => {
        const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
        if (sliderRef.current.scrollLeft < maxScrollLeft) {
            SmoothHorizontalScrolling(sliderRef.current, 250, movieRef.current.clientWidth * 2, sliderRef.current.scrollLeft)
        };
    }

    const handleScrollLeft = () => {
        if (sliderRef.current.scrollLeft > 0) {
            SmoothHorizontalScrolling(sliderRef.current, 250, -movieRef.current.clientWidth * 2, sliderRef.current.scrollLeft)
        };
    }

    useEffect(() => {
        if (isDrag) {
            if (dragMove < dragDown) handleScrollRight();
            if (dragMove > dragDown) handleScrollLeft();
        }
    }, [dragDown, dragMove, isDrag])
    const onDragStart = e => {
        setIsDrag(true);
        setDragDown(e.screenX);
    }

    const onDragEnter = e => {
        setIsDrag(false);
    }

    const onDragEnd = e => {
        setDragMove(e.screenX);
    }
    return (
        <MoviesRowContainer draggable='false' id={idSection}>
            <h1 className="heading">{title}</h1>
            <MovieSlider
                ref={sliderRef}
                draggable='true'
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragEnter={onDragEnter}
                style={
                    movies && movies.length > 0
                        ? {
                            gridTemplateColumns: `repeat(${movies.length},
                            ${windownWidth > 1200 ? '360px'
                                    : windownWidth > 992 ? '360px'
                                        : windownWidth > 768 ? '250px' : '200px'
                                })`
                        } : {}
                }
            >
                {
                    movies && movies.length > 0 && movies.map((movie, index) => {
                        if (movie.poster_path && movie.backdrop_path !== null) {
                            let imageUrl = isVieWie
                                ? `http://image.tmdb.org/t/p/original/${movie.poster_path}`
                                : `http://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                            return (
                                (
                                    <div
                                        key={index}
                                        className="movieItem"
                                        ref={movieRef}
                                        draggable='false'
                                        onClick={() => handleSetMovie(movie)} 
                                    >
                                        <img src={imageUrl} alt="" draggable='false' />
                                        <div className="movieName">{movie.name || movie.title}</div>
                                    </div>
                                )
                            )
                        }
                    })
                }
            </MovieSlider>
            <div className={`btnLeft ${isVieWie && 'isVieWie'}`} onClick={handleScrollLeft}>
                <FiChevronLeft />
            </div>
            <div className={`btnRight ${isVieWie && 'isVieWie'}`} onClick={handleScrollRight}>
                <FiChevronRight />
            </div>
        </MoviesRowContainer>
    )
}
export default MoviesRow;

const MoviesRowContainer = styled.div`
    background-color: var(--color-background);
    color: white;
    padding: 20px 20px 0;
    position: relative;
    height: 100%;
    width: 100%;

    .heading{
        font-size: 20px;
        user-select: none;
    }
           
    .btnLeft{
        position: absolute;
        top: 50%;
        left: 30px;
        z-index: 20;
        transform-origin: center;    
        cursor: pointer;
        background-color: rgba(0,0,0,0.5);
        height: 70px;
        width: 50px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        transform: translateY(-20%);
        &:hover{
            background-color: rgba(0,0,0,0.8);
        }

        svg{
            opacity: 0.7;
            transition: all 0.3s linear;
            font-size: 50px;
        }

        &:hover svg{
            opacity: 1;
            transform: scale(1.2);
        }
        &.isNetflix{
            height: 100px;
            width: max-content;
        }
    }

    .btnRight {
        position: absolute;
        top: 50%;
        right: 30px;
        z-index: 20;
        transform-origin: center;    
        cursor: pointer;
        background-color: rgba(0,0,0,0.5);
        height: 70px;
        width: 50px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        transform: translateY(-20%);
        &:hover{
            background-color: rgba(0,0,0,0.8);
        }

        svg{
            opacity: 0.7;
            transition: all 0.3s linear;
            font-size: 50px;
        }

        &:hover svg{
            opacity: 1;
            transform: scale(1.2);
        }
        
        &.isNetflix {
            height: 100px;
            width: max-content;
        }
    }
`;

const MovieSlider = styled.div`
    display: grid;
    gap: 6px;
    transition: all 0.5s linear;
    user-select: none;
    overflow-y: hidden;
    overflow-x: auto;
    overflow: hidden;
    padding-top: 30px;
    padding-bottom: 30px;
    scroll-behavior: smooth;
    cursor: pointer;

    &:hover .movieItem{
        opacity: 0.5;
    }

    .movieItem{
        transform: scale(1);
        max-width: 400px;
        max-height: 500px;
        width: 100%;
        height: 100%;
        transition: all 0.3s linear;
        user-select: none;
        overflow: hidden;
        border-radius: 6px;
        transform: center left;
        position: relative;

        &:hover{
            opacity: 1;
            transform: scale(1.1);
            z-index: 10;
        }

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .movieName{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            padding: 4px;
            text-align: center;
            font-size: 14px;
            background-color: rgba(0,0,0,0.65);
        }
    }
`;