import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import { Navigation } from './navigation/Navigation';

function App() {
  return (
    <ChakraProvider>
      <Navigation />
    </ChakraProvider>
  );
}

export default App;
