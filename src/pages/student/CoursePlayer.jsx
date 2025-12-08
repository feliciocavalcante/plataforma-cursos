import React, { useState } from 'react';
import { PlayCircle, CheckCircle, ChevronDown, ChevronUp, Menu } from 'lucide-react';

const courseData = {
  title: "Plataforma de Cursos (Modo Nativo)",
  modules: [
    {
      id: 1,
      title: "Módulo 1: Introdução",
      lessons: [
        { 
          id: 101, 
          title: "Aula Teste (Servidor Rápido)", 
          duration: "02:30", 
          // Link direto de um servidor de alta velocidade (CDN)
          videoUrl: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
        },
        { 
          id: 102, 
          title: "Aula Exemplo (Coelho)", 
          duration: "05:30", 
          videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }
      ]
    }
  ]
};

const CoursePlayer = () => {
  const [activeLesson, setActiveLesson] = useState(courseData.modules[0].lessons[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModule, setExpandedModule] = useState(1);

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row font-sans">
      
      {/* 1. Área Principal */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header Mobile */}
        <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center">
          <span className="font-bold truncate text-sm">{activeLesson.title}</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1">
            <Menu size={24} />
          </button>
        </div>

        {/* --- ÁREA DO PLAYER (HTML5 PURO) --- */}
        <div style={{ backgroundColor: '#000', width: '100%', display: 'flex', justifyContent: 'center', padding: '20px' }}>
           
           {/* Aqui está a mágica. A tag <video> é nativa do navegador.
              Se isso não rodar, é o seu computador bloqueando vídeo.
           */}
           <video 
              key={activeLesson.videoUrl} // O 'key' força o player a recarregar quando muda a aula
              controls 
              autoPlay={false} // Autoplay desligado para não travar
              style={{ maxWidth: '900px', width: '100%', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
           >
              <source src={activeLesson.videoUrl} type="video/mp4" />
              Seu navegador não suporta vídeos.
           </video>

        </div>

        {/* Detalhes da Aula */}
        <div className="flex-1 overflow-y-auto bg-white p-6">
            <h1 className="text-2xl font-bold mb-2">{activeLesson.title}</h1>
            <p className="text-gray-600 mb-4">Se você consegue ver este vídeo, a plataforma está funcionando.</p>
            <button className="bg-green-600 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-green-700">
              <CheckCircle size={18} /> Concluir Aula
            </button>
        </div>
      </main>

      {/* 2. Sidebar Lateral */}
      <aside className={`
        fixed inset-y-0 right-0 z-30 w-80 bg-white border-l shadow-2xl transform transition-transform duration-300
        md:relative md:translate-x-0 md:shadow-none
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full md:hidden'}
      `}>
        <div className="p-4 border-b bg-gray-100 font-bold">Conteúdo do Curso</div>
        <div className="overflow-y-auto h-full">
            {courseData.modules.map((module) => (
              <div key={module.id}>
                <button 
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                  className="w-full p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 border-b"
                >
                  <span className="font-semibold text-sm">{module.title}</span>
                  {expandedModule === module.id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </button>
                
                {expandedModule === module.id && (
                  <div>
                    {module.lessons.map((lesson) => (
                      <button 
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full p-3 pl-5 flex items-center gap-3 text-left border-b text-sm
                          ${activeLesson.id === lesson.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-50'}
                        `}
                      >
                        <PlayCircle size={16} />
                        {lesson.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </aside>
    </div>
  );
};

export default CoursePlayer;