import React from 'react';
import { BookOpen, Video, FileText, Layout } from 'lucide-react';

const StudentDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div className="p-6 text-2xl font-bold text-blue-600">DevAcademy</div>
        <nav className="flex-1 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg">
            <Layout size={20} /> Meus Cursos
          </a>
          <a href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Video size={20} /> Aulas
          </a>
          <a href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <FileText size={20} /> Documentos
          </a>
          <a href="#" className="flex items-center gap-3 p-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <BookOpen size={20} /> Provas
          </a>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Olá, Estudante!</h2>
          <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            E
          </div>
        </header>

        {/* Card de Curso em Andamento */}
        <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
          <h3 className="text-lg font-bold mb-2">Continuar de onde parou</h3>
          <div className="flex gap-4 items-center">
            <div className="w-32 h-20 bg-gray-200 rounded-lg"></div> {/* Thumbnail */}
            <div>
              <p className="font-semibold">Curso FullStack Master</p>
              <p className="text-sm text-gray-500">Aula 12: Introdução ao React Hooks</p>
              <div className="w-64 h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-2 bg-green-500 rounded-full w-[45%]"></div>
              </div>
              <span className="text-xs text-gray-500">45% concluído</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;