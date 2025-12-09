import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, BookOpen, Award, User, LogOut, Play, Clock, Menu, Search, Bell, Star, ChevronRight, Loader2, Edit } from 'lucide-react';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- ESTADOS REAIS ---
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Visitante' };

  // --- BUSCAR CURSOS NA API ---
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Calcula estatísticas reais
  const stats = [
    { label: 'Cursos Disponíveis', value: courses.length, icon: BookOpen, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Horas Totais', value: '120h', icon: Clock, color: 'text-emerald-400', bg: 'bg-emerald-500/10' }, // (Pode calcular somando as aulas depois)
    { label: 'Conquistas', value: '0', icon: Award, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  ];

  // O Curso em Destaque será o ÚLTIMO que você criou (novidade)
  const featuredCourse = courses.length > 0 ? courses[courses.length - 1] : null;

  if (loading) {
    return (
      <div className="h-screen bg-[#0a0a0a] flex items-center justify-center text-white">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-gray-100 font-sans overflow-hidden selection:bg-indigo-500/30">

      {/* 1. SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-300
        md:relative md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.6)] z-10 relative">
              <Play size={20} fill="white" className="text-white ml-1" />
            </div>
            <div className="absolute inset-0 bg-indigo-600 blur-lg opacity-50"></div>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Dev<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Flix</span></span>
        </div>

        <nav className="flex-1 px-6 space-y-2 py-6">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Menu Principal</p>
          <NavItem icon={Layout} label="Início" active />
          <NavItem icon={BookOpen} label="Meus Cursos" />
          <NavItem icon={Award} label="Certificados" />

          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-8 mb-4 px-2">Admin</p>
          {/* Link direto para criar curso */}
          <Link to="/admin/criar-curso" className="flex items-center gap-3 w-full p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition font-medium text-sm">
            <Layout size={18} /> <span>Criar Curso</span>
          </Link>
        </nav>

        <div className="p-6 border-t border-white/5 bg-black/20">
          <div className="flex items-center gap-3 w-full text-left group">
            <div className="w-10 h-10 rounded-full bg-indigo-600 p-[2px] flex items-center justify-center">
              <User className="text-white" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">Aluno</p>
            </div>
            <button onClick={handleLogout} className="p-2 hover:bg-white/10 rounded-full text-gray-500 hover:text-red-500 transition" title="Sair">
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

        <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-gray-400"><Menu /></button>
            <div className="hidden md:flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-full border border-white/5 w-96">
              <Search size={18} className="text-gray-500" />
              <input type="text" placeholder="Buscar curso..." className="bg-transparent border-none outline-none text-sm text-white w-full" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white transition"><Bell size={20} /></button>
          </div>
        </header>

        <div className="max-w-[1600px] mx-auto p-6 md:p-8 space-y-12 pb-24">

          {/* HERO BANNER (Destaque do Banco de Dados) */}
          {featuredCourse ? (
            <section className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
              <div className="absolute inset-0">
                <img
                  src={featuredCourse.cover}
                  alt="Destaque"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition duration-[20s]"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/800x400?text=Capa+Indisponivel'} // Fallback se a imagem quebrar
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
              </div>

              <div className="relative z-10 h-full flex flex-col justify-center max-w-2xl px-8 md:px-12">
                <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full mb-4 w-fit">
                  NOVO LANÇAMENTO
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                  {featuredCourse.title}
                </h1>
                <p className="text-gray-300 text-lg mb-8 line-clamp-2">
                  {featuredCourse.description}
                </p>

                <Link
                  to={`/aula/${featuredCourse._id}`}
                  className="flex items-center gap-3 w-fit px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition shadow-lg"
                >
                  <Play fill="black" size={20} />
                  Assistir Agora
                </Link>
              </div>
            </section>
          ) : (
            <div className="p-10 text-center border border-white/10 rounded-2xl">
              <p className="text-gray-400">Nenhum curso encontrado. Crie o primeiro no menu Admin!</p>
            </div>
          )}

          {/* STATS */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white/5 border border-white/5 backdrop-blur-sm p-6 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition">
                <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                </div>
              </div>
            ))}
          </section>

          {/* LISTA DE CURSOS DO BANCO */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Todos os Cursos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div key={course._id} className="group bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="h-40 relative overflow-hidden">
                    <img src={course.cover} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500" />
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

                    <p className="text-xs text-indigo-400 font-bold mb-3">
                      {Number(course.price) === 0 ? 'Acesso Gratuito' : `Valor: R$ ${Number(course.price).toFixed(2)}`}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} /> {course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0)} aulas
                      </div>

                      <div className="flex gap-2">
                        {/* BOTÃO EDITAR (Leva para a mesma tela de criar, mas passando o ID) */}
                        <Link
                          to={`/admin/criar-curso/${course._id}`}
                          className="p-2 bg-yellow-500/10 text-yellow-500 rounded-full hover:bg-yellow-500 hover:text-black transition"
                          title="Editar Curso"
                        >
                          <Edit size={16} /> {/* Importe o Edit do lucide-react */}
                        </Link>

                        <Link to={`/aula/${course._id}`} className="text-sm font-bold text-white group-hover:text-indigo-400 transition flex items-center gap-1">
                          Acessar <ChevronRight size={14} />
                        </Link>
                      </div>
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