import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import Container from './components/Container/Container';
import AppBar from './components/AppBar';
import HomeView from './views/HomeView';
import RegisterView from './views/RegisterView';
import LoginView from './views/LoginView';
import { authOperations } from './redux/auth';
import Phonebook from 'components/Phonebook/Phonebook';
import { useSelector } from 'react-redux';
import { authSelectors } from './redux/auth';

export default function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      <AppBar />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route
          path="/register"
          element={isLoggedIn ? <Phonebook /> : <RegisterView />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Phonebook /> : <LoginView />}
        />
        <Route
          path="/contacts"
          element={isLoggedIn ? <Phonebook /> : <Navigate to="/login" />}
        />
      </Routes>
    </Container>
  );
}
