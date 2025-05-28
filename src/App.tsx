import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Lendas from './pages/Lendas';
import Canais from './pages/Canais';
import Calendario from './pages/Calendario';
import Loja from './pages/Loja'; // Importar nova página
import Cartinhas from './pages/Cartinhas'; // Importar nova página
import Videos from './pages/Videos'; // Importar nova página
import Forum from './pages/Forum'; // Importar nova página
import Parcerias from './pages/Parcerias'; // Importar nova página
import Blog from './pages/Blog'; // Importar nova página
import Membros from './pages/Membros'; // Importar nova página
import Torneios from './pages/Torneios'; // Importar nova página
import Guias from './pages/Guias'; // Importar nova página

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lendas" element={<Lendas />} />
          <Route path="/canais" element={<Canais />} />
          <Route path="/calendario" element={<Calendario />} />
          {/* Adicionar rotas para as novas páginas */}
          <Route path="/loja" element={<Loja />} />
          <Route path="/cartinhas" element={<Cartinhas />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/parcerias" element={<Parcerias />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/membros" element={<Membros />} />
          <Route path="/torneios" element={<Torneios />} />
          <Route path="/guias" element={<Guias />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

