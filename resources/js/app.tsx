import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/header/header';
import Footer from './components/footer';
import AppRoutes from './routes'; 

import '../css/app.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadAuthState = async () => {
      const userString = localStorage.getItem('user');
      const token = localStorage.getItem('token');

      if (userString && token) {
        try {
          const userData = JSON.parse(userString);
          setIsAuthenticated(true);
          setUser(userData);
          if (userData && userData.roles && userData.roles.length > 0) {
            setUserRole(userData.roles[0].name);
          } else {
            setUserRole(null);
          }
        } catch (e) {
          console.error("App.tsx - Error al parsear la informaci\u00f3n del usuario desde localStorage", e);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setUserRole(null);
          setUser(null);
        }
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
        setUser(null);
      }
      setLoading(false);
    };

    loadAuthState();
  }, []);

  if (loading) {
    return <div>Cargando la aplicaci&oacute;n...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header userRole={userRole} isLoggedIn={isAuthenticated} setIsLoggedIn={setIsAuthenticated} />
        <main className="flex-grow">
          <AppRoutes
            isAuthenticated={isAuthenticated}
            loading={loading}
            userRole={userRole}
            setIsAuthenticated={setIsAuthenticated}
            setUserRole={setUserRole}
            user={user}
          />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('react-root')!).render(<App />);