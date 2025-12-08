import React from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle, CheckCircle } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header / Navbar */}
      <header className="flex justify-between items-center p-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">DevAcademy</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
          <Link to="/cadastro" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Começar Agora
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between p-12 md:p-24">
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-5xl font-bold leading-tight">
            Domine a Programação <span className="text-blue-600">Do Zero ao Pro</span>
          </h2>
          <p className="text-lg text-gray-600">
            Aprenda com projetos práticos, tenha acesso vitalício e certificado reconhecido.
          </p>
          <div className="flex gap-4">
            <Link to="/cadastro" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition">
              Quero me matricular
            </Link>
            <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <PlayCircle /> Ver como funciona
            </button>
          </div>
        </div>
        
        {/* Imagem Ilustrativa (Placeholder) */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <div className="bg-blue-100 rounded-2xl h-80 w-full flex items-center justify-center border-2 border-dashed border-blue-300">
            <span className="text-blue-400">Imagem/Vídeo Promocional</span>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="bg-white py-16 px-12">
        <h3 className="text-3xl font-bold text-center mb-12">Por que escolher nossa plataforma?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Acesso Vitalício", desc: "Estude no seu ritmo, quando e onde quiser." },
            { title: "Certificado", desc: "Comprovação de horas e tecnologias aprendidas." },
            { title: "Projetos Reais", desc: "Saia da teoria e construa portfólio." }
          ].map((item, index) => (
            <div key={index} className="p-6 border rounded-xl hover:shadow-lg transition">
              <CheckCircle className="text-green-500 mb-4 h-8 w-8" />
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;