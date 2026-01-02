import React, { useEffect } from 'react';
import { Typography, Container, Box, Paper, Grid } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SecurityIcon from '@mui/icons-material/Security';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GppGoodIcon from '@mui/icons-material/GppGood';


function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const hoverStyle = {
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    }
  };

  return (
    <Container maxWidth="lg">
      {/* 1. الهيدر الرئيسي - صورة الكتب الرقمية المحمية */}
      <Box sx={{ mt: 8, mb: 10, textAlign: 'center' }} data-aos="fade-down">
        <Paper elevation={6} sx={{ p: 5, borderRadius: 8, background: 'linear-gradient(135deg, #ffffff 0%, #f0f4f8 100%)', ...hoverStyle }}>
          <Typography variant="h2" gutterBottom color="primary" sx={{ fontWeight: 'bold', fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            Human Security Essentials
          </Typography>
          <Typography variant="h5" color="textSecondary" sx={{ mb: 4, lineHeight: 1.6 }}>
            "Welcome to the Secure Library Management System. This project aims to enhance 'Human Security' by protecting information and ensuring authorized access to digital data."
          </Typography>
          {/* تم استبدال الرابط برابط مباشر من freepikCDN */}
          <Box 
            component="img" 
            src="https://img.freepik.com/free-vector/shield-protects-digital-library-books-data-privacy-security-online-education-safety-concept_335657-3171.jpg" 
            sx={{ width: '100%', maxWidth: 550, borderRadius: 4, display: 'block', margin: '0 auto' }} 
            alt="Library Security"
          />
        </Paper>
      </Box>

      {/* 2. مربعات الميزات */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12} md={6} data-aos="fade-right">
          <Paper sx={{ p: 4, display: 'flex', alignItems: 'center', borderRadius: 4, height: '100%', ...hoverStyle }}>
            <AdminPanelSettingsIcon sx={{ fontSize: 60, color: '#27ae60', mr: 3 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Identity Protection</Typography>
              <Typography color="textSecondary">Keycloak ensures only authorized access to the database.</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} data-aos="fade-left">
          <Paper sx={{ p: 4, display: 'flex', alignItems: 'center', borderRadius: 4, height: '100%', ...hoverStyle }}>
            <SecurityIcon sx={{ fontSize: 60, color: '#2980b9', mr: 3 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>Data Encryption</Typography>
              <Typography color="textSecondary">All data is secured via encrypted JWT tokens.</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* 3. المستودع الآمن */}
      <Box data-aos="zoom-in" sx={{ mb: 6 }}>
        <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 4, backgroundColor: '#2c3e50', color: 'white', ...hoverStyle }}>
          <LibraryBooksIcon sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h4" sx={{ mb: 2 }}>Secure Knowledge Repository</Typography>
          <Typography variant="h6" sx={{ opacity: 0.8 }}>Safe access to knowledge is a fundamental human right.</Typography>
        </Paper>
      </Box>

      {/* 4. الحالة والخصوصية */}
      <Grid container spacing={4} sx={{ mb: 8 }} data-aos="fade-up">
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', borderRadius: 3, borderLeft: '6px solid #2980b9', ...hoverStyle }}>
            <VerifiedUserIcon sx={{ fontSize: 45, color: '#2980b9', mr: 3 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>System Status</Typography>
              <Typography variant="body2" color="textSecondary">Real-time monitoring and active security protocols.</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', borderRadius: 3, borderLeft: '6px solid #27ae60', ...hoverStyle }}>
            <GppGoodIcon sx={{ fontSize: 45, color: '#27ae60', mr: 3 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Privacy Policy</Typography>
              <Typography variant="body2" color="textSecondary">Highest standards of data privacy are implemented.</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* 5. صور الكتب تحت بعض - تم تغيير الروابط لضمان الظهور */}
      <Box sx={{ mb: 10 }}>
        {/* الصورة الأولى: كتب ديجيتال */}
        <Grid container spacing={4} alignItems="center" data-aos="fade-right" sx={{ mb: 6 }}>
          <Grid item xs={12} md={5}>
            <Box sx={{ ...hoverStyle, borderRadius: 4, overflow: 'hidden', height: 320 }}>
              <Box 
                component="img" 
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=1000" 
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#2c3e50' }}>
              Digital Book Vaulting
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Ensuring the integrity of every digital page against unauthorized manipulation.
            </Typography>
          </Grid>
        </Grid>

        {/* الصورة الثانية: كتاب آمن */}
        <Grid container spacing={4} alignItems="center" data-aos="fade-left" sx={{ flexDirection: { xs: 'column', md: 'row-reverse' } }}>
          <Grid item xs={12} md={5}>
            <Box sx={{ ...hoverStyle, borderRadius: 4, overflow: 'hidden', height: 320 }}>
              <Box 
                component="img" 
                src="https://img.freepik.com/free-photo/open-book-with-bright-glowing-light-inside_23-2148882765.jpg" 
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#2c3e50' }}>
              Secure Access to Wisdom
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Our encryption layers protect both the reader and the library content.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ pb: 5, textAlign: 'center', opacity: 0.5 }}>
        <Typography variant="body2">© 2025 Human Security Project - Developed with React</Typography>
      </Box>
    </Container>
  );
}

export default Home;