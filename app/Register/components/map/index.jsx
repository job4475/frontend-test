import { Box } from '@mui/system';
import MapPage from '@/components/map/index';
import { useContext } from 'react';  
import { StateContext } from '@/context/Context';
import { Skeleton } from '@mui/material';

const Index = () => {
  const { state, setState } = useContext(StateContext);

  return (
    <Box>
      <MapPage />
    </Box>
  );
};

export default Index;
