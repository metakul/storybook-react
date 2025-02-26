import React from 'react';
import { Box } from '@mui/material';
import HomePage1 from './HomePage1';
import RoadmapSection from './RoadmapSection';
import HowItWorks from './HowItWorks';
import FaqSection from './FaqSection';
// Add custom CSS for animations

const HomePage: React.FC = () => {
  return (
    <Box sx={{ 
     }}>
      {/* Original HomePage components */}
      <HomePage1 />
      
      {/* New Roadmap Section with Timeline Animation */}
      <RoadmapSection />
      <HowItWorks/>
      
      {/* FAQ Section */}
      <FaqSection />
    </Box>
  );
};

export default HomePage;