import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/public/LandingPage';
import Login from './pages/public/Login';
import StudentDashboard from './pages/student/StudentDashboard';
import CoursePlayer from './pages/student/CoursePlayer';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = true; // Mude para false para testar o redirecionamento
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<div>Página de Cadastro</div>} />

        {/* Rotas Privadas (Aluno) */}
        <Route 
          path="/aluno" 
          element={
            <PrivateRoute>
              <StudentDashboard />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/aula/:id" 
          element={
            <PrivateRoute>
              <CoursePlayer />
            </PrivateRoute>
          } 
        />
        
        {/* Rotas Privadas (Admin) */}
        <Route path="/admin" element={<div>Painel Admin (Em breve)</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;