import './App.css';
import Reader from './Components/QR-Reader/Reader';
import Generate from './Components/QR-Generator/Generator';
import Home from './Components/Home/Home';
import { Link, Route, Routes } from 'react-router-dom';
import { Fragment } from 'react';

const App = () => {
  return (
    <Fragment>
      <header>
        {/* <Link to='/'>Home</Link> */}
        <Link to='/'>Home</Link>
        <Link to='./generator'>QR Code Generator</Link>
        <Link to='./scanner'>QR Code Scanner</Link>
      </header>
      <section className='links'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/generator' element={<Generate />} />
          <Route path='/scanner' element={<Reader />} />
        </Routes>
      </section>
      <footer>
        <p> <sup>For Personal Use</sup> </p>
      </footer>
    </Fragment>
  )
}

export default App;