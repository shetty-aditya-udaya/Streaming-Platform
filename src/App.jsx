import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Landing />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
