import React, { useState } from 'react';
import { PlayCircle, CheckCircle, ChevronDown, ChevronUp, Menu, Play, BookOpen, FileText, MessageSquare } from 'lucide-react';

const courseData = {
  title: "Masterclass Front-end Cinema",
  modules: [
    {
      id: 1,
      title: "Módulo 1: A Imersão Começa",
      lessons: [
        { 
          id: 101, 
          title: "Aula 1: Introdução ao Ambiente Dark", 
          duration: "02:30", 
          videoUrl: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
        },
        { 
          id: 102, 
          title: "Aula 2: Exemplo Prático (Coelho)", 
          duration: "05:30", 
          videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }
      ]
    },
    {
      id: 2,
      title: "Módulo 2: Técnicas Avançadas",
      lessons: [
        { id: 201, title: "Aula 3: Componentização Moderna", duration: "10:15", videoUrl: "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4" },
      ]
    }
  ]
};

const CoursePlayer = () => {
  const [activeLesson, setActiveLesson] = useState(courseData.modules[0].lessons[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile: começa fechada
  const [expandedModule, setExpandedModule] = useState(1);

  return (
    // CONTÊINER GERAL: Fundo Preto, ocupa toda a tela, sem scroll na janela principal
    <div className="flex h-screen bg-black text-gray-100 overflow-hidden font-sans">
      
      {/* 1. ÁREA ESQUERDA (VÍDEO + CONTEÚDO) - ROLÁVEL */}
      <main className="flex-1 h-full overflow-y-auto relative scroll-smooth bg-black custom-scrollbar">
        
        {/* Header Mobile (Só aparece no celular) */}
        <div className="md:hidden bg-zinc-900 border-b border-white/10 p-4 flex justify-between items-center sticky top-0 z-30">
          <span className="font-bold truncate text-sm text-gray-100">{activeLesson.title}</span>
          <button onClick={() => setSidebarOpen(true)} className="p-2 bg-zinc-800 rounded-lg text-gray-300">
            <Menu size={20} />
          </button>
        </div>

        {/* --- BLOCCO DO VÍDEO (Estilo Cinema) --- */}
        <div className="w-full flex items-center justify-center bg-black py-8 px-4 md:py-12 md:px-12">
           <div className="w-full max-w-6xl aspect-video relative z-10 bg-zinc-900 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-lg overflow-hidden border border-white/5">
             <video 
                key={activeLesson.videoUrl}
                controls 
                autoPlay={true}
                className="w-full h-full object-contain"
                poster="https://wallpaperaccess.com/full/2663986.jpg"
             >
                <source src={activeLesson.videoUrl} type="video/mp4" />
             </video>
           </div>
        </div>

        {/* --- DETALHES E DESCRIÇÃO (Abaixo do vídeo) --- */}
        <div className="bg-zinc-900 min-h-screen border-t border-white/5">
          <div className="max-w-6xl mx-auto p-6 md:p-12 space-y-10 pb-32">
            
            {/* Título e Botão */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-white/10 pb-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs tracking-widest uppercase">
                  <BookOpen size={14} />
                  <span>{courseData.title}</span>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                  {activeLesson.title}
                </h1>
              </div>
              
              <button className="cursor-pointer bg-indigo-600 text-white px-8 py-3 rounded-lg flex items-center gap-3 hover:bg-indigo-500 transition-all font-bold shadow-lg shadow-indigo-500/20 whitespace-nowrap shrink-0">
                <CheckCircle size={20} />
                <span>Concluir Aula</span>
              </button>
            </div>

            {/* Abas e Texto */}
            <div className="space-y-8">
               <div className="flex gap-8 border-b border-white/10 text-gray-400 font-medium">
                  <button className="pb-4 border-b-2 border-indigo-500 text-indigo-400">Visão Geral</button>
                  <button className="pb-4 hover:text-white transition flex items-center gap-2"><FileText size={18}/> Materiais</button>
                  <button className="pb-4 hover:text-white transition flex items-center gap-2"><MessageSquare size={18}/> Comentários</button>
               </div>
               
               <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed">
                 <p className="text-lg text-gray-300">
                   Nesta aula, configuramos o ambiente dark mode para máxima imersão. Observe como o contraste entre o fundo <span className="text-white bg-zinc-800 px-1 rounded">Zinc 900</span> e o acento <span className="text-indigo-400">Indigo</span> cria uma hierarquia visual clara sem cansar a vista.
                 </p>
                 <p>
                   A sidebar à direita permanece fixa, permitindo que você navegue entre as aulas sem perder o contexto, enquanto esta área de descrição pode ter o tamanho que for necessário.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </main>

      {/* 2. SIDEBAR LATERAL DIREITA (FIXA) */}
      <aside className={`
        fixed inset-y-0 right-0 z-40 w-80 bg-zinc-950 border-l border-white/10 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:w-96 md:shadow-none
        ${sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        
        {/* Cabeçalho da Sidebar */}
        <div className="p-6 border-b border-white/10 bg-zinc-950 shrink-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg text-white tracking-tight">Playlist do Curso</h2>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
              <ChevronDown className="-rotate-90" size={24}/>
            </button>
          </div>
          
          <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase mb-2">
            <span>Progresso</span>
            <span className="text-indigo-400">35%</span>
          </div>
          <div className="w-full bg-zinc-800 rounded-full h-1 overflow-hidden">
            <div className="bg-indigo-500 h-1 rounded-full w-[35%] shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
          </div>
        </div>

        {/* Lista de Aulas (Scrollável independentemente) */}
        <div className="flex-1 overflow-y-auto bg-black/20 custom-scrollbar">
          {courseData.modules.map((module) => (
            <div key={module.id} className="border-b border-white/5 last:border-b-0">
              <button 
                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                className="w-full py-4 px-6 flex justify-between items-center hover:bg-white/5 transition-colors group"
              >
                <span className="font-medium text-sm text-gray-300 group-hover:text-white transition-colors">{module.title}</span>
                <ChevronDown size={16} className={`text-gray-600 group-hover:text-gray-300 transition-transform ${expandedModule === module.id ? '-rotate-180' : ''}`}/>
              </button>
              
              {expandedModule === module.id && (
                <div className="bg-black/40 pb-2">
                  {module.lessons.map((lesson) => {
                     const isActive = activeLesson.id === lesson.id;
                     return (
                    <button 
                      key={lesson.id}
                      onClick={() => {
                        setActiveLesson(lesson);
                        setSidebarOpen(false); // Fecha sidebar no mobile ao clicar
                      }}
                      className={`w-full py-3 px-6 flex items-start gap-3 text-left border-l-[3px] transition-all relative group
                        ${isActive 
                          ? 'border-indigo-500 bg-white/5 text-white' 
                          : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
                        }
                      `}
                    >
                      <div className="mt-0.5 shrink-0">
                         {isActive 
                           ? <PlayCircle className="text-indigo-500 drop-shadow-[0_0_5px_rgba(99,102,241,0.8)]" size={16} fill="currentColor" /> 
                           : <Play size={16} className="text-gray-600 group-hover:text-gray-400 transition-colors" /> 
                         }
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`block text-sm truncate ${isActive ? 'font-bold' : 'font-medium'}`}>{lesson.title}</span>
                        <span className="text-xs text-gray-600 mt-1 block">{lesson.duration}</span>
                      </div>
                    </button>
                  )})}
                </div>
              )}
            </div>
          ))}
        </div>
      </aside>
      
      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-30"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default CoursePlayer;