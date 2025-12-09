import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <--- Importei useNavigate
import { Layout, BookOpen, Award, User, LogOut, Play, Clock, TrendingUp, Menu, Search, Bell, Star, ChevronRight } from 'lucide-react';

const StudentDashboard = () => {
  const navigate = useNavigate(); // <--- Hook de navegação
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Recuperar nome do usuário salvo no Login (opcional, mas fica legal)
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Visitante' };

  // --- FUNÇÃO DE LOGOUT ---
  const handleLogout = () => {
    // 1. Limpa tudo do armazenamento local
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // 2. Redireciona para o login
    navigate('/login');
  };

  // Dados Mockados
  const stats = [
    { label: 'Cursos Ativos', value: '3', icon: BookOpen, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Horas Totais', value: '24h', icon: Clock, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Conquistas', value: '12', icon: Award, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  ];

  const featuredCourse = {
    id: 1,
    title: "Masterclass Front-end Cinema",
    description: "Domine a arte de criar interfaces imersivas com React, Tailwind e Motion. O curso definitivo para quem quer ir além do básico.",
    cover: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop",
    progress: 35,
    nextLesson: "Módulo 1: A Imersão Começa"
  };

  const otherCourses = [
    {
      id: 2,
      title: "Backend Ninja com Node.js",
      category: "Backend",
      cover: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1000&auto=format&fit=crop",
      progress: 10,
      totalLessons: 60,
      completedLessons: 6
    },
    {
      id: 3,
      title: "UI Design Dark Mode",
      category: "Design",
      cover: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop",
      progress: 0,
      totalLessons: 20,
      completedLessons: 0
    },
    {
      id: 4,
      title: "DevOps na Prática",
      category: "Infra",
      cover: "https://images.unsplash.com/photo-1667372393119-c81c0cda0a29?q=80&w=1000&auto=format&fit=crop",
      progress: 0,
      totalLessons: 45,
      completedLessons: 0
    }
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-100 font-sans overflow-hidden selection:bg-indigo-500/30">
      
      {/* 1. SIDEBAR GLASSY (Esquerda) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-300
        md:relative md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo Neon */}
        <div className="p-8 flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.6)] z-10 relative">
              <Play size={20} fill="white" className="text-white ml-1" />
            </div>
            <div className="absolute inset-0 bg-indigo-600 blur-lg opacity-50"></div>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Dev<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Flix</span></span>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 px-6 space-y-2 py-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Menu Principal</p>
          <NavItem icon={Layout} label="Início" active />
          <NavItem icon={BookOpen} label="Meus Cursos" />
          <NavItem icon={Award} label="Certificados" />
          <NavItem icon={Star} label="Favoritos" />
          
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-8 mb-4 px-2">Conta</p>
          <NavItem icon={User} label="Meu Perfil" />
        </nav>

        {/* User Mini Profile & Logout */}
        <div className="p-6 border-t border-white/5 bg-black/20">
          <div className="flex items-center gap-3 w-full text-left group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 p-[2px]">
              <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center">
                 <User className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-white truncate group-hover:text-indigo-400 transition">
                {user.name}
              </p>
              <p className="text-xs text-gray-500 truncate">Plano Premium</p>
            </div>
            
            {/* BOTÃO DE SAIR - Agora funciona! */}
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-white/10 rounded-full text-gray-500 hover:text-red-500 transition tooltip"
              title="Sair"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay Mobile */}
      {mobileMenuOpen && (
        <div onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"></div>
      )}

      {/* 2. ÁREA PRINCIPAL */}
      <main className="flex-1 overflow-y-auto bg-[#0a0a0a] relative scroll-smooth">
        
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-gray-400"><Menu /></button>
            <div className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-full border border-white/5 focus-within:border-indigo-500/50 focus-within:bg-white/10 transition w-96">
              <Search size={18} className="text-gray-500" />
              <input 
                type="text" 
                placeholder="O que você quer aprender hoje?" 
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-gray-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-black"></span>
            </button>
          </div>
        </header>

        <div className="max-w-[1600px] mx-auto p-6 md:p-8 space-y-12 pb-24">
          
          {/* HERO BANNER */}
          <section className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
             <div className="absolute inset-0">
               <img 
                 src={featuredCourse.cover} 
                 alt="Destaque" 
                 className="w-full h-full object-cover transform group-hover:scale-105 transition duration-[20s]" 
               />
               <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
             </div>

             <div className="relative z-10 h-full flex flex-col justify-center max-w-2xl px-8 md:px-12">
               <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full mb-4 w-fit shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                 CONTINUAR ASSISTINDO
               </span>
               <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                 {featuredCourse.title}
               </h1>
               <p className="text-gray-300 text-lg mb-8 line-clamp-2">
                 {featuredCourse.description}
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                 <Link 
                   to={`/aula/${featuredCourse.id}`} 
                   className="flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                 >
                   <Play fill="black" size={20} />
                   Assistir Aula
                 </Link>
                 
                 <div className="flex flex-col gap-1 w-full sm:w-48">
                    <div className="flex justify-between text-xs font-medium text-gray-400">
                      <span>Progresso</span>
                      <span className="text-white">{featuredCourse.progress}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${featuredCourse.progress}%` }}></div>
                    </div>
                 </div>
               </div>
             </div>
          </section>

          {/* STATS ROW */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {stats.map((stat, idx) => (
               <div key={idx} className="bg-white/5 border border-white/5 backdrop-blur-sm p-6 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition group">
                 <div className={`p-4 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition`}>
                   <stat.icon size={24} />
                 </div>
                 <div>
                   <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                   <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                 </div>
               </div>
             ))}
          </section>

          {/* LISTA DE CURSOS */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Explorar Cursos</h2>
              <button className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition">
                Ver todos <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherCourses.map((course) => (
                <div key={course.id} className="group bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
                  <div className="h-40 relative overflow-hidden">
                    <img src={course.cover} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent"></div>
                    <div className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-md rounded-full text-white/80 border border-white/10">
                       <Play size={14} fill="white" />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-[10px] font-bold text-indigo-400 px-2 py-0.5 bg-indigo-500/10 rounded border border-indigo-500/20 uppercase tracking-wide">
                         {course.category}
                       </span>
                    </div>
                    <h3 className="text-base font-bold text-white mb-4 line-clamp-1">{course.title}</h3>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} /> {course.totalLessons} aulas
                      </div>
                      <Link to={`/aula/${course.id}`} className="text-sm font-bold text-white group-hover:text-indigo-400 transition flex items-center gap-1">
                        Acessar <ChevronRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon: Icon, label, active }) => (
  <button className={`
    flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-200 font-medium text-sm
    ${active 
      ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/10 text-white border-l-4 border-indigo-500' 
      : 'text-gray-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
    }
  `}>
    <Icon size={18} />
    <span>{label}</span>
  </button>
);

export default StudentDashboard;