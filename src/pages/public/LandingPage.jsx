import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Code, Globe, Cpu, Star, Users, ArrowRight, ShieldCheck, Clock, Loader2 } from 'lucide-react';

// Componente Contador (Mantive igual)
const AnimatedCounter = ({ end, duration = 2000, decimals = 0 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime = null;
    const startValue = 0;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(startValue + progress * (end - startValue));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return <span>{count.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>;
};

const LandingPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- BUSCAR CURSOS REAIS DA API ---
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <Play size={16} fill="white" className="text-white ml-0.5" />
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight">Dev<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Flix</span></span>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <Link to="/login" className="text-xs md:text-sm font-medium text-gray-300 hover:text-white transition">Fazer Login</Link>
            <Link to="/cadastro" className="px-4 py-2 md:px-5 md:py-2.5 bg-white text-black text-xs md:text-sm font-bold rounded-full hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.2)]">Começar</Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION (Mantive a versão responsiva que você gostou) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-10 px-4">
        <div className="absolute inset-0 z-0 w-full h-full">
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/40 z-10"></div>
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50">
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-lines-background-3047-large.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="max-w-7xl mx-auto w-full text-center relative z-20 flex flex-col items-center justify-center h-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] md:text-xs font-bold tracking-wide uppercase mb-6 backdrop-blur-sm mt-8 md:mt-0">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>Nova Plataforma
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1] drop-shadow-2xl px-2">
            Domine o Código <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient">Como no Cinema.</span>
          </h1>
          <p className="text-sm md:text-lg text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed font-light px-4">
            Projetos reais, instrutores experts e uma experiência imersiva. A Netflix da programação chegou.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full px-4 mb-12">
            <Link to="/cadastro" className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-500 transition shadow-[0_0_30px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2">
              Acessar Agora <ArrowRight size={20} />
            </Link>
          </div>
          
          {/* Social Proof (Lado a Lado no Mobile) */}
          <div className="w-full max-w-4xl border-t border-white/10 pt-6 md:pt-8">
            <div className="flex flex-row items-center justify-around md:justify-center gap-2 md:gap-16 text-gray-400">
             <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left">
               <div className="p-1.5 md:p-2 bg-indigo-500/10 rounded-lg"><Users className="text-indigo-400 w-5 h-5 md:w-6 md:h-6" /></div>
               <div><span className="block text-lg md:text-2xl font-bold text-white leading-none"><AnimatedCounter end={10000} duration={2500} />+</span><span className="text-[10px] md:text-xs font-medium uppercase tracking-wider">Alunos</span></div>
             </div>
             <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left">
               <div className="p-1.5 md:p-2 bg-yellow-500/10 rounded-lg"><Star className="text-yellow-400 w-5 h-5 md:w-6 md:h-6" /></div>
               <div><span className="block text-lg md:text-2xl font-bold text-white leading-none"><AnimatedCounter end={4.9} decimals={1} duration={2000} />/5</span><span className="text-[10px] md:text-xs font-medium uppercase tracking-wider">Nota</span></div>
             </div>
             <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left">
               <div className="p-1.5 md:p-2 bg-green-500/10 rounded-lg"><ShieldCheck className="text-green-400 w-5 h-5 md:w-6 md:h-6" /></div>
               <div><span className="block text-lg md:text-2xl font-bold text-white leading-none">7 Dias</span><span className="text-[10px] md:text-xs font-medium uppercase tracking-wider">Garantia</span></div>
             </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GRID DE CURSOS REAIS */}
      <section className="py-16 md:py-24 bg-[#050505] relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-4">
            <div className="text-center md:text-left w-full">
              <h2 className="text-2xl md:text-4xl font-bold mb-2 text-white">Cursos em Destaque</h2>
              <p className="text-gray-400 text-sm md:text-base">Confira os lançamentos mais recentes.</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center p-12"><Loader2 className="animate-spin text-indigo-600" size={40} /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Se não tiver cursos, mostra aviso */}
              {courses.length === 0 && <p className="text-gray-500 col-span-3 text-center">Nenhum curso disponível no momento.</p>}

              {/* MAPEAR CURSOS DO BANCO DE DADOS */}
              {courses.map((course) => (
                <div key={course._id} className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:border-indigo-500/30">
                  <div className="h-36 md:h-40 relative">
                    {/* Imagem Real do Curso */}
                    <img 
                      src={course.cover} 
                      alt={course.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
                      onError={(e) => e.target.src = 'https://via.placeholder.com/800x400?text=Capa'}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white border border-white/10 uppercase">
                      {course.category}
                    </div>
                  </div>
                  
                  <div className="p-5 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2 text-white group-hover:text-indigo-400 transition line-clamp-1">{course.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2 min-h-[40px]">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                      <div>
                        {/* AQUI APARECE O PREÇO QUE VOCÊ EDITOU */}
                        <span className="text-[10px] text-gray-500 block">Investimento</span>
                        <span className="text-lg font-bold text-white">
                          {Number(course.price) === 0 ? 'Grátis' : `R$ ${Number(course.price).toFixed(2)}`}
                        </span>
                      </div>
                      <Link to="/cadastro" className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition transform group-hover:rotate-45">
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-24 px-4 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">Pronto para evoluir?</h2>
            <Link to="/cadastro" className="w-full sm:w-auto inline-block px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition">Garantir minha vaga</Link>
          </div>
        </div>
        <footer className="max-w-7xl mx-auto mt-12 text-center text-gray-600 text-xs"><p>© 2025 DevFlix Education.</p></footer>
      </section>
    </div>
  );
};

export default LandingPage;