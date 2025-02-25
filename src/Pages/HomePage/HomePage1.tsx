import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import MetaCopImage from './assets/06.png';
import { useNavigate } from 'react-router-dom';
import { Pages } from '../../Datatypes/enums';
import { getColors } from '../../layout/Theme/themes';

const HomePage1 = () => {

  const navigate=useNavigate()
  
  const navigateToStake= ()=>{
    navigate(Pages.Staking)
  }
  const navigateToBuy= ()=>{
    navigate(Pages.Swap)
  }

  return(
    <Box sx={{
      background:getColors().yellowAccent[100]
    }} className="bg-opacity-30 py-10 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                <div>
                    <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">Memecoin for Real Estates</p>
                    <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl">Connect & join with the thai community</h1>
                    <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">The Ultimate crypto to invest in Thailand Real Estates.</p>

                    <div onClick={navigateToBuy}  className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-16 hover:bg-yellow-400 focus:bg-yellow-400  cursor-pointer" role="button">
                        Buy $THAI Now 
                        <svg className="w-6 h-6 ml-8 -mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <p className="mt-5 text-gray-600">Already Bought? <span onClick={navigateToStake} className=" cursor-pointer text-black transition-all duration-200 hover:underline">Stake Now</span></p>
                </div>

                <div>
                    <img className="w-full" src="thaicoin.png" alt="" />
                </div>
            </div>
        </div>
    </Box>
  );
};

// Define the prop types for the StatCard component
interface StatCardProps {
  number: string;
  label: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, label, color }) => (
  <Grid item xs={12} md={3}>
    <Paper sx={{ 
      bgcolor: 'black',
      p: 4,
      borderRadius: 2,
      textAlign: 'center',
      fontFamily: 'BakBak One'
    }}>
      <Typography sx={{ 
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: color,
        mb: 1,
        fontFamily: 'BakBak One'
      }}>
        {number}
      </Typography>
      <Typography sx={{ 
        color: 'grey.300',
        fontSize: '1.25rem',
        fontFamily: 'BakBak One'
      }}>
        {label}
      </Typography>
    </Paper>
  </Grid>
);

export default HomePage1;