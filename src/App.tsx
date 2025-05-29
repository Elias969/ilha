import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Lendas from './pages/Lendas';
import Canais from './pages/Canais';
import Calendario from './pages/Calendario';
import Loja from './pages/Loja';
import Cartinhas from './pages/Cartinhas';
import Videos from './pages/Videos';
import Forum from './pages/Forum';
import Parcerias from './pages/Parcerias';
import Blog from './pages/Blog';
import Membros from './pages/Membros';
import Torneios from './pages/Torneios';
import Guias from './pages/Guias';

// Importar o ScrollToTop
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Faz scroll para o topo a cada mudança de rota */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lendas" element={<Lendas />} />
          <Route path="/canais" element={<Canais />} />
          <Route path="/calendario" element={<Calendario />} />
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
