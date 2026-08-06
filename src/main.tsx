import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import "./i18n";
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import "@fontsource-variable/inter"
import { ProjectProvider } from './context/ProjectContext.tsx'
import { queryClient } from './lib/queryClient.ts'; //query clienti butun uygulamaya acar
import { QueryClientProvider } from '@tanstack/react-query'; 


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
              <ProjectProvider>
                <App />
              </ProjectProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
