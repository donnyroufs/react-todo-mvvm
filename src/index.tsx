import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from "./App";
import { ServiceLocator } from "./shared/ServiceLocator";

function bootstrap(): void {
  const locator = ServiceLocator.getInstance();

  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <ChakraProvider resetCSS={true}>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  );
}

bootstrap()