import React from 'react';
import { Typography, Container, Box, Grid, Link, IconButton, Divider } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#2c3e50', 
        color: 'white', 
        py: 6, 
        mt: 10, // مسافة بين المحتوى والفوتر
        borderTop: '5px solid #2980b9'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* القسم الأول: تعريف مختصر */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SecurityIcon sx={{ mr: 1, color: '#2980b9' }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
                HUMAN SECURITY
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ opacity: 0.7, lineHeight: 1.8 }}>
              Ensuring that digital knowledge remains a protected human right through advanced encryption and identity management.
            </Typography>
          </Grid>

          {/* القسم الثاني: روابط سريعة */}
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'center' } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Library Vault', 'Privacy Policy', 'Security Protocols'].map((text) => (
                <Link 
                  key={text} 
                  href="#" 
                  color="inherit" 
                  underline="none" 
                  sx={{ opacity: 0.7, '&:hover': { opacity: 1, color: '#2980b9', transition: '0.3s' } }}
                >
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* القسم الثالث: التواصل */}
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Connect With Us
            </Typography>
            <Box>
              {[FacebookIcon, TwitterIcon, LinkedInIcon, GitHubIcon].map((Icon, index) => (
                <IconButton 
                  key={index} 
                  sx={{ 
                    color: 'white', 
                    '&:hover': { color: '#2980b9', transform: 'scale(1.2)', transition: '0.3s' } 
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'rgba(255,255,255,0.1)' }} />

        <Box sx={{ textAlign: 'center', opacity: 0.6 }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Human Security Project. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;