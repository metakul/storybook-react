import React from 'react';
import { Box } from '@mui/material';
import HomePage1 from './HomePage1';
import RoadmapSection from './RoadmapSection';
import HowItWorks from './HowItWorks';
import FaqSection from './FaqSection';
import { getColors } from '../../layout/Theme/themes';
// Add custom CSS for animations

const HomePage: React.FC = () => {
  return (
    <Box sx={{ 
              background: `linear-gradient(135deg, ${getColors().yellowAccent[100]} 0%,${getColors().yellowAccent[100]} 50%, ${getColors().yellowAccent[300]} 100%)`,
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