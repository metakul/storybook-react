import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import HomePage1 from './HomePage1';
import RoadmapSection from './RoadmapSection';
import HowItWorks from './HowItWorks';
import FaqSection from './FaqSection';
import Footer from '../../layout/Footer';
// Add custom CSS for animations
const customStyles = `
@keyframes fadeInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInFromRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Add a global reset to ensure no unexpected margins or padding */
body, html {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
}

* {
  box-sizing: border-box;
}
`;

const HomePage: React.FC = () => {
  return (
    <Box sx={{ width: '100%', overflowX: 'hidden' }}>
      {/* Add CssBaseline to normalize CSS */}
      <CssBaseline />
      
      {/* Add custom animations */}
      <style>{customStyles}</style>
      
      {/* Original HomePage components */}
      <HomePage1 />
      
      {/* New Roadmap Section with Timeline Animation */}
      <RoadmapSection />
      <HowItWorks/>
      
      {/* FAQ Section */}
      <FaqSection />
      <Footer/>
    </Box>
  );
};

export default HomePage;