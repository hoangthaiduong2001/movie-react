import { useSelector } from 'react-redux';
import './App.css';
import Contents from './components/Contents/Contents';
import Intro from './components/Intro/Intro';
import Menus from './components/Menus/Menus';
import Navbar from './components/Navbar/Navbar';
import MoviesDetail from './components/MoviesDetail/MoviesDetail';
import SearchMovies from './components/SearchMovies/SearchMovies';
import Home from './components/Pages/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Search from './components/Pages/Search';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/search' element={<Search />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
