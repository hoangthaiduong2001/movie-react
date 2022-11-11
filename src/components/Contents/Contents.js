import React from 'react';
import styled, { StyledComponent } from 'styled-components';
import MoviesRow from './MoviesRow';
import * as ACTION from '../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FaArrowAltCircleUp } from 'react-icons/fa'
import { animateScroll as scroll} from 'react-scroll'
import { useScrollY } from '../hook';

const ScrolltoTop = () => {
    scroll.scrollToTop();
}


function Contents(props) {
    const dispatch = useDispatch();
    const [scrollY] = useScrollY();
    const { 
        VieWieOriginals,
        TrendingMovies,
        TopRatedMovies,
        ActionMovies,
        ComedyMovies,
        HorrorMovies,
        RomanceMovies,
        DocumentariesMovies
    } = useSelector(state => state.infoMovies)
    useEffect(() => {
        dispatch(ACTION.getVieWieOriginals());
        dispatch(ACTION.getTrendingMovies());
        dispatch(ACTION.getTopRatedMovies());
        dispatch(ACTION.getActionMovies());
        dispatch(ACTION.getComedyMovies());
        dispatch(ACTION.getHorrorMovies());
        dispatch(ACTION.getRomanceMovies());
        dispatch(ACTION.getDocumentariesMovies());

    }, [dispatch])
    return (
        <div>
            <MoviesRow movies={VieWieOriginals} title="VieWie Originals" isVieWie={true} idSection='vieWie'/>
            <MoviesRow movies={TrendingMovies} title="Trending Movies" isVieWie={true} idSection='trending'/>
            <MoviesRow movies={TopRatedMovies} title="Top Rated Movies" idSection='topRated'/>
            <MoviesRow movies={ActionMovies} title="Action Movies" idSection='action'/>
            <MoviesRow movies={ComedyMovies} title="Comedy Movies" idSection='comedy'/>
            <MoviesRow movies={HorrorMovies} title="horror Movies" idSection='horror'/>
            <MoviesRow movies={RomanceMovies} title="Romance Movies" idSection='romance'/>
            <MoviesRow movies={DocumentariesMovies} title="Documentaries Movies" idSection='documentaries'/>
            <GoToTop 
                onClick={() => ScrolltoTop()}
                style={{ visibility: `${scrollY > 600 ? 'visible' : 'hidden'}`}}
            >
                <FaArrowAltCircleUp />
            </GoToTop>
        </div>
    );
}

export default Contents;

const GoToTop = styled.div`
position: fixed;
z-index: 10;
right: 70px;
bottom: 50px;
font-size: 50px;
color: rgba(255, 255, 255, 0.4);
transition: all 0,3s linear;
cursor: pointer;

&:hover {
    color: rgba(255, 255, 255, 0.8);
}

@media screen and (max-width: 600px){
    right: 40px;
}
`