import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Keycloak from 'keycloak-js';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Books from './pages/Books';
import Footer from './components/Footer'; 

import { CssBaseline, CircularProgress, Box } from '@mui/material';

const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'LibraryRealm',
  clientId: 'library-app'
};

function App() {
  const [keycloak, setKeycloak] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const kc = new Keycloak(keycloakConfig);
    
    // التعديل هنا: إضافة الإعدادات التي تمنع التحميل المستمر وتظهر الأخطاء بوضوح
    kc.init({ 
      onLoad: 'login-required', 
      checkLoginIframe: false,   // منع Keycloak من استخدام iframe يسبب التعليق
      pkceMethod: 'S256',        // زيادة الأمان وضمان توافق الـ Flow
      enableLogging: true        // تفعيل السجلات في الـ Console لمعرفة أي خطأ
    }).then(auth => {
      setKeycloak(kc);
      setAuthenticated(auth);
      console.log("Authenticated successfully!");
    }).catch(err => {
      console.error("Keycloak initialization failed:", err);
    });
  }, []);

  if (!authenticated) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        {/* نص مساعد يظهر إذا طال وقت التحميل */}
        <Box sx={{ ml: 2 }}>جاري التحقق من الهوية...</Box>
      </Box>
    );
  }

  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CssBaseline />
        <Navbar keycloak={keycloak} />
        
        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books keycloak={keycloak} />} />
          </Routes>
        </Box>

        <Footer /> 
      </Box>
    </Router>
  );
}

export default App;