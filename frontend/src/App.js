import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Todo from './components/Todo';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
}

export default App;
