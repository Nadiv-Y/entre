import './App.css';
import { HomePage } from './HomePage';
import {Routes, Route} from 'react-router-dom'
import { TopicPage } from './TopicPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={ <HomePage/>} />
      <Route path='/topics/:topicId' element={ <TopicPage/>} />
    </Routes>         
  );
}

export default App;
