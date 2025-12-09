import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plus, Trash, Save, Layout, Video, Image, DollarSign, Layers, ArrowLeft, UploadCloud, X, AlertCircle, Loader2 } from 'lucide-react';

const CreateCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL se for edição
  const isEditing = !!id; // True se estiver editando

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  
  const [course, setCourse] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    cover: null, // Arquivo ou URL
    coverPreview: '', 
    modules: []
  });

  // --- CARREGAR DADOS SE FOR EDIÇÃO ---
  useEffect(() => {
    if (isEditing) {
      const fetchCourse = async () => {
        setFetching(true);
        try {
          const res = await fetch(`http://localhost:5000/api/courses/${id}`);
          const data = await res.json();
          
          setCourse({
            title: data.title,
            description: data.description,
            category: data.category,
            price: data.price,
            cover: data.cover, // URL da imagem antiga
            coverPreview: data.cover,
            modules: data.modules
          });
        } catch (error) {
          alert('Erro ao carregar curso');
        } finally {
          setFetching(false);
        }
      };
      fetchCourse();
    }
  }, [id, isEditing]);

  // --- HANDLERS (Iguais ao anterior, apenas resumidos aqui) ---
  const handleChange = (e) => setCourse({ ...course, [e.target.name]: e.target.value });
  
  const handleImageSelect = (file) => {
    const previewUrl = URL.createObjectURL(file);
    setCourse({ ...course, cover: file, coverPreview: previewUrl });
  };
  
  const addModule = () => setCourse({ ...course, modules: [...course.modules, { title: '', lessons: [] }] });
  
  const updateModuleTitle = (i, v) => {
    const newM = [...course.modules]; newM[i].title = v; setCourse({ ...course, modules: newM });
  };
  
  const removeModule = (i) => {
    setCourse({ ...course, modules: course.modules.filter((_, idx) => idx !== i) });
  };

  const addLesson = (mI) => {
    const newM = [...course.modules]; 
    newM[mI].lessons.push({ title: '', videoUrl: '', duration: '' });
    setCourse({ ...course, modules: newM });
  };

  const updateLesson = (mI, lI, field, val) => {
    const newM = [...course.modules];
    newM[mI].lessons[lI][field] = val;
    setCourse({ ...course, modules: newM });
  };

  const removeLesson = (mI, lI) => {
    const newM = [...course.modules];
    newM[mI].lessons = newM[mI].lessons.filter((_, idx) => idx !== lI);
    setCourse({ ...course, modules: newM });
  };

  // --- ENVIO COM FORMDATA (ARQUIVOS REAIS) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('description', course.description);
    formData.append('category', course.category);
    formData.append('price', course.price);
    
    // Se cover for um arquivo novo, anexa. Se for string (URL antiga), o backend ignora.
    if (course.cover instanceof File) {
      formData.append('cover', course.cover);
    }

    // Módulos e Aulas precisam ir como string JSON, pois FormData é plano
    formData.append('modules', JSON.stringify(course.modules));

    try {
      const url = isEditing 
        ? `http://localhost:5000/api/courses/${id}`
        : 'http://localhost:5000/api/courses';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        // NÃO coloque Content-Type: application/json, o navegador define multipart/form-data automático
        body: formData
      });

      if (response.ok) {
        alert(isEditing ? 'Curso atualizado!' : 'Curso criado!');
        navigate('/aluno');
      } else {
        alert('Erro ao salvar.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="text-white text-center mt-20">Carregando dados...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 font-sans selection:bg-indigo-500/30">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <button onClick={() => navigate('/aluno')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-2 transition">
              <ArrowLeft size={16} /> Cancelar
            </button>
            <h1 className="text-3xl font-bold">{isEditing ? 'Editar Curso' : 'Criar Novo Curso'}</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <section className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-400">Informações</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">Título</label>
                <input name="title" value={course.title} onChange={handleChange} className="w-full bg-black/30 border border-white/10 rounded-lg p-3" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">Categoria</label>
                <input name="category" value={course.category} onChange={handleChange} className="w-full bg-black/30 border border-white/10 rounded-lg p-3" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">Preço</label>
                <input name="price" type="number" value={course.price} onChange={handleChange} className="w-full bg-black/30 border border-white/10 rounded-lg p-3" />
              </div>

              {/* Upload de Capa */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase text-gray-500">Capa do Curso</label>
                <div className="relative w-full h-48 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center cursor-pointer bg-black/20 hover:border-indigo-500 overflow-hidden">
                  <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => e.target.files[0] && handleImageSelect(e.target.files[0])} />
                  {course.coverPreview ? (
                    <img src={course.coverPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-gray-400"><Image className="mx-auto mb-2"/>Clique para selecionar</div>
                  )}
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase text-gray-500">Descrição</label>
                <textarea name="description" value={course.description} onChange={handleChange} rows="3" className="w-full bg-black/30 border border-white/10 rounded-lg p-3" />
              </div>
            </div>
          </section>

          {/* Módulos (Simplificado para o exemplo) */}
          <section className="space-y-4">
            <div className="flex justify-between">
               <h2 className="text-xl font-bold text-indigo-400">Conteúdo</h2>
               <button type="button" onClick={addModule} className="bg-white/10 px-3 py-1 rounded hover:bg-white/20">+ Módulo</button>
            </div>
            {course.modules.map((module, mI) => (
              <div key={mI} className="bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="flex gap-2 mb-3">
                   <input value={module.title} onChange={(e) => updateModuleTitle(mI, e.target.value)} placeholder="Nome do Módulo" className="flex-1 bg-transparent font-bold text-lg outline-none" />
                   <button type="button" onClick={() => removeModule(mI)} className="text-red-500"><Trash size={16}/></button>
                </div>
                <div className="pl-4 space-y-2 border-l-2 border-white/10">
                   {module.lessons.map((lesson, lI) => (
                     <div key={lI} className="flex gap-2">
                        <input value={lesson.title} onChange={(e) => updateLesson(mI, lI, 'title', e.target.value)} placeholder="Aula" className="bg-black/30 p-2 rounded flex-1 border border-white/5" />
                        <input value={lesson.videoUrl} onChange={(e) => updateLesson(mI, lI, 'videoUrl', e.target.value)} placeholder="Link Vídeo" className="bg-black/30 p-2 rounded flex-1 border border-white/5 text-gray-400" />
                        <button type="button" onClick={() => removeLesson(mI, lI)} className="text-red-500"><X size={16}/></button>
                     </div>
                   ))}
                   <button type="button" onClick={() => addLesson(mI)} className="text-xs text-indigo-400 hover:underline">+ Aula</button>
                </div>
              </div>
            ))}
          </section>

          <div className="flex justify-end pt-6">
            <button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2">
              {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> {isEditing ? 'Salvar Alterações' : 'Publicar Curso'}</>}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateCourse;