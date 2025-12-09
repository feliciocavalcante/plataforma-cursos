import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash, Save, Layout, Video, Image, DollarSign, Layers, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Estado do Curso
  const [course, setCourse] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    cover: '',
    modules: [] // Começa vazio, vamos adicionar dinamicamente
  });

  // Atualiza campos simples (título, preço, etc)
  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  // --- GERENCIAMENTO DE MÓDULOS ---
  const addModule = () => {
    setCourse({
      ...course,
      modules: [...course.modules, { title: '', lessons: [] }]
    });
  };

  const updateModuleTitle = (index, value) => {
    const newModules = [...course.modules];
    newModules[index].title = value;
    setCourse({ ...course, modules: newModules });
  };

  const removeModule = (index) => {
    const newModules = course.modules.filter((_, i) => i !== index);
    setCourse({ ...course, modules: newModules });
  };

  // --- GERENCIAMENTO DE AULAS ---
  const addLesson = (moduleIndex) => {
    const newModules = [...course.modules];
    newModules[moduleIndex].lessons.push({ title: '', videoUrl: '', duration: '' });
    setCourse({ ...course, modules: newModules });
  };

  const updateLesson = (moduleIndex, lessonIndex, field, value) => {
    const newModules = [...course.modules];
    newModules[moduleIndex].lessons[lessonIndex][field] = value;
    setCourse({ ...course, modules: newModules });
  };

  const removeLesson = (moduleIndex, lessonIndex) => {
    const newModules = [...course.modules];
    newModules[moduleIndex].lessons = newModules[moduleIndex].lessons.filter((_, i) => i !== lessonIndex);
    setCourse({ ...course, modules: newModules });
  };

  // --- SALVAR NO BACKEND ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(course)
      });

      if (response.ok) {
        alert('Curso criado com sucesso!');
        navigate('/aluno'); // Volta para o dashboard para ver o curso lá
      } else {
        alert('Erro ao criar curso');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 font-sans selection:bg-indigo-500/30">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-2 transition">
              <ArrowLeft size={16} /> Voltar
            </button>
            <h1 className="text-3xl font-bold">Criar Novo Curso</h1>
            <p className="text-gray-400">Preencha os dados abaixo para publicar seu conteúdo.</p>
          </div>
          <div className="hidden md:block">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]">
              <Layout size={24} />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. Informações Básicas */}
          <section className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-400">
              <Layout size={20} /> Informações Básicas
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">Título do Curso</label>
                <input required name="title" value={course.title} onChange={handleChange} placeholder="Ex: Masterclass React" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 focus:border-indigo-500 outline-none transition" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">Categoria</label>
                <input required name="category" value={course.category} onChange={handleChange} placeholder="Ex: Frontend" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 focus:border-indigo-500 outline-none transition" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1"><DollarSign size={12}/> Preço (R$)</label>
                <input required name="price" type="number" value={course.price} onChange={handleChange} placeholder="97.00" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 focus:border-indigo-500 outline-none transition" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1"><Image size={12}/> URL da Capa</label>
                <input required name="cover" value={course.cover} onChange={handleChange} placeholder="https://..." className="w-full bg-black/30 border border-white/10 rounded-lg p-3 focus:border-indigo-500 outline-none transition" />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase text-gray-500">Descrição</label>
                <textarea required name="description" value={course.description} onChange={handleChange} placeholder="Sobre o que é este curso?" rows="3" className="w-full bg-black/30 border border-white/10 rounded-lg p-3 focus:border-indigo-500 outline-none transition" />
              </div>
            </div>
          </section>

          {/* 2. Construtor de Currículo (Módulos e Aulas) */}
          <section className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-400">
                <Layers size={20} /> Grade Curricular
              </h2>
              <button type="button" onClick={addModule} className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition flex items-center gap-2">
                <Plus size={16} /> Adicionar Módulo
              </button>
            </div>

            {course.modules.length === 0 && (
              <div className="text-center p-12 border-2 border-dashed border-white/10 rounded-2xl text-gray-500">
                Nenhum módulo criado. Clique no botão acima para começar.
              </div>
            )}

            {course.modules.map((module, mIndex) => (
              <div key={mIndex} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                {/* Header do Módulo */}
                <div className="bg-white/5 p-4 flex items-center gap-4 border-b border-white/5">
                  <span className="bg-indigo-600 w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold">{mIndex + 1}</span>
                  <input 
                    placeholder="Nome do Módulo (Ex: Introdução)" 
                    className="flex-1 bg-transparent border-none outline-none font-bold placeholder-gray-600 text-lg"
                    value={module.title}
                    onChange={(e) => updateModuleTitle(mIndex, e.target.value)}
                  />
                  <button type="button" onClick={() => removeModule(mIndex)} className="text-gray-500 hover:text-red-500"><Trash size={18}/></button>
                </div>

                {/* Lista de Aulas */}
                <div className="p-4 space-y-3">
                  {module.lessons.map((lesson, lIndex) => (
                    <div key={lIndex} className="flex flex-col md:flex-row gap-3 items-start md:items-center bg-black/20 p-3 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Video size={16} />
                        <span className="text-xs font-mono">{lIndex + 1}</span>
                      </div>
                      
                      <input 
                        placeholder="Título da Aula" 
                        className="flex-1 bg-transparent border-b border-white/10 focus:border-indigo-500 outline-none text-sm px-2 py-1"
                        value={lesson.title}
                        onChange={(e) => updateLesson(mIndex, lIndex, 'title', e.target.value)}
                      />
                      
                      <input 
                        placeholder="Link do Vídeo (MP4/Youtube)" 
                        className="flex-1 bg-transparent border-b border-white/10 focus:border-indigo-500 outline-none text-sm px-2 py-1 text-gray-400"
                        value={lesson.videoUrl}
                        onChange={(e) => updateLesson(mIndex, lIndex, 'videoUrl', e.target.value)}
                      />

                      <input 
                        placeholder="Dur. (05:00)" 
                        className="w-24 bg-transparent border-b border-white/10 focus:border-indigo-500 outline-none text-sm px-2 py-1 text-gray-400 text-center"
                        value={lesson.duration}
                        onChange={(e) => updateLesson(mIndex, lIndex, 'duration', e.target.value)}
                      />

                      <button type="button" onClick={() => removeLesson(mIndex, lIndex)} className="text-gray-600 hover:text-red-500 p-1"><X size={16}/></button>
                    </div>
                  ))}
                  
                  <button type="button" onClick={() => addLesson(mIndex)} className="w-full py-2 border border-dashed border-white/10 rounded-lg text-xs text-gray-500 hover:text-indigo-400 hover:border-indigo-500/30 transition flex items-center justify-center gap-2">
                    <Plus size={14} /> Adicionar Aula
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* Botão Salvar */}
          <div className="flex justify-end pt-6 border-t border-white/10">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.4)] transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Publicar Curso</>}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

// Ícone X que faltou importar no topo, vou adicionar um componente simples pra não quebrar
const X = ({size}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
)

export default CreateCourse;