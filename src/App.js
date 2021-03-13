import { Provider } from 'react-redux';
import store from './store';
import Todo from './components/todo';

export default function App() {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  );
}
