import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'; // Importação PADRÃO (sem /lazy)
import { PlayCircle, CheckCircle, ChevronDown, ChevronUp, Menu } from 'lucide-react';

const courseData = {
  title: "FullStack Master com React e Node",
  modules: [
    {
      id: 1,
      title: "Módulo 1: Introdução",
      lessons: [
        { 
          id: 101, 
          title: "Aula 1: Introdução (YouTube)", 
          duration: "10:00", 
          videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ", 
          type: "youtube"
        },
        { 
          id: 102, 
          title: "Aula 2: Arquivo Nativo (Teste CDN)", 
          duration: "05:30", 
          // Link MP4 de alta velocidade (Garantido não travar)
          videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", 
          type: "native"
        }
      ]
    },
    {
      id: 2,
      title: "Módulo 2: Dominando React",
      lessons: [
        { id: 201, title: "Criando componentes", duration: "15:20", videoUrl: "https://www.youtube.com/watch?v=ysz5S6P_z-U", type: "youtube" },
      ]
    }
  ]
};

const CoursePlayer = () => {
  const [activeLesson, setActiveLesson] = useState(courseData.modules[0].lessons[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedModule, setExpandedModule] = useState(1);
  
  // --- A CORREÇÃO MÁGICA ---
  // Isso garante que o player só tente carregar quando o navegador estiver pronto
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);
  // --------------------------

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row font-sans">
      
      {/* 1. Área Principal */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="md:hidden bg-gray-900 text-white p-4 flex justify-between items-center z-20">
          <span className="font-bold truncate text-sm">{activeLesson.title}</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-gray-800 rounded">
            <Menu size={24} />
          </button>
        </div>

        {/* --- ÁREA DO PLAYER --- */}
        <div className="bg-black w-full flex items-center justify-center p-4 md:p-8 shrink-0">
           <div className="w-full max-w-3xl aspect-video relative shadow-2xl bg-black rounded-lg overflow-hidden border border-gray-800">
              
              {/* Só renderiza o player se a página estiver PRONTA (isReady) */}
              {isReady ? (
                <ReactPlayer 
                  className="absolute top-0 left-0"
                  url={activeLesson.videoUrl}
                  width="100%"
                  height="100%"
                  controls={true} // Controles ativados
                  playing={false} // Autoplay desligado para evitar bloqueio
                  
                  // Configurações para tentar limpar o YouTube
                  config={{
                    youtube: {
                      playerVars: { showinfo: 0, modestbranding: 1, rel: 0 }
                    },
                    file: { 
                      attributes: { controlsList: 'nodownload' } 
                    }
                  }}
                  
                  // Tratamento de erros
                  onError={(e) => console.log("Erro de Player:", e)}
                />
              ) : (
                // Enquanto carrega, mostra isso:
                <div className="flex items-center justify-center h-full text-white">
                  Carregando Player...
                </div>
              )}

           </div>
        </div>

        {/* Detalhes da Aula */}
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="max-w-3xl mx-auto p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
              <div>
                <h1 className="text-xl font-bold text-gray-900 mb-1">{activeLesson.title}</h1>
                <p className="text-gray-500 text-sm">Aula ID: {activeLesson.id}</p>
              </div>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition font-medium text-sm">
                <CheckCircle size={16} /> Concluir Aula
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 2. Sidebar Lateral */}
      <aside className={`
        fixed inset-y-0 right-0 z-30 w-80 bg-white border-l shadow-2xl transform transition-transform duration-300
        md:relative md:translate-x-0 md:shadow-none
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full md:hidden'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="font-bold text-gray-800">Conteúdo</h2>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden"><ChevronDown className="-rotate-90"/></button>
          </div>
          <div className="flex-1 overflow-y-auto">
            {courseData.modules.map((module) => (
              <div key={module.id} className="border-b">
                <button 
                  onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                  className="w-full p-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
                >
                  <span className="font-semibold text-sm text-gray-700">{module.title}</span>
                  {expandedModule === module.id ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                </button>
                {expandedModule === module.id && (
                  <div className="bg-white">
                    {module.lessons.map((lesson) => (
                      <button 
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full p-3 pl-5 flex items-center gap-3 text-left transition text-sm border-l-[3px]
                          ${activeLesson.id === lesson.id ? 'bg-blue-50 text-blue-700 border-blue-600' : 'hover:bg-gray-50 border-transparent'}
                        `}
                      >
                        {activeLesson.id === lesson.id ? <PlayCircle size={16} /> : <div className="w-4 h-4 border border-gray-300 rounded-full"></div>}
                        <span className="truncate">{lesson.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CoursePlayer;