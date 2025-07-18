import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './components/Auth/Login';
import Friends from './components/Tabs/Friends';
import Chat from './components/Tabs/Chat';
import ForYou from './components/Tabs/ForYou';
import My from './components/Tabs/My';
import CharacterCreation from './components/CharacterCreation';
import PersonaCreation from './components/PersonaCreation';
import ChatRoom from './components/ChatRoom';
import StyleGuide from './pages/StyleGuide';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="mobile-container">
        <div className="min-h-screen bg-silky-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mingle-rose mx-auto mb-4"></div>
            <p className="text-night-ink">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// App Routes Component
const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="mobile-container">
        <div className="min-h-screen bg-silky-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mingle-rose mx-auto mb-4"></div>
            <p className="text-night-ink">로딩 중...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mobile-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="mobile-container">
      <Routes>
        {/* 전체 화면 페이지들 (레이아웃 없음) */}
        <Route path="/character/create" element={<ProtectedRoute><CharacterCreation /></ProtectedRoute>} />
        <Route path="/persona/create" element={<ProtectedRoute><PersonaCreation /></ProtectedRoute>} />
        <Route path="/chat/:id" element={<ProtectedRoute><ChatRoom /></ProtectedRoute>} />
        <Route path="/styleguide" element={<ProtectedRoute><StyleGuide /></ProtectedRoute>} />
        
        {/* 탭 레이아웃이 있는 페이지들 */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/friends" element={<Friends />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/foryou" element={<ForYou />} />
              <Route path="/my" element={<My />} />
              <Route path="/" element={<Navigate to="/chat" replace />} />
              <Route path="*" element={<Navigate to="/chat" replace />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
