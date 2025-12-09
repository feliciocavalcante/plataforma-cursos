import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importação das Páginas
import LandingPage from './pages/public/LandingPage';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import StudentDashboard from './pages/student/StudentDashboard';
import CoursePlayer from './pages/student/CoursePlayer';
import CreateCourse from './pages/admin/CreateCourse';

// --- COMPONENTE DE ROTA PRIVADA (SEGURANÇA REAL) ---
// Ele verifica se existe um token salvo no navegador.
const PrivateRoute = ({ children }) => {
  // Pega o token salvo no localStorage (criado no Login.jsx)
  const token = localStorage.getItem('token');

  // Se tiver token, libera o acesso. Se não, chuta para o login.
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas (Qualquer um acessa) */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />

        {/* Rotas Privadas (Só com Login) */}
        <Route
          path="/aluno"
          element={
            <PrivateRoute>
              <StudentDashboard />
            </PrivateRoute>
          }
        />

        {/* Rota da Aula (Dinâmica pelo ID) */}
        <Route
          path="/aula/:id"
          element={
            <PrivateRoute>
              <CoursePlayer />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/criar-curso"
          element={
            <PrivateRoute>
              <CreateCourse />
            </PrivateRoute>
          }
        />

        {/* Rota 404 - Se digitar endereço errado, volta pra home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>



  );
}

export default App;