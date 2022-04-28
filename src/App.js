import  './App.css';
import Board from './components/board/Board';
import {Provider} from 'react-redux';
import {createStore} from 'redux'
import baseReducer from './store/reducers';
const store =  createStore(baseReducer);



function App() {
  return (
    <Provider store={store}>
    <div className="App">
      <Board />
    </div>
    </Provider>
  );
}

export default App;
