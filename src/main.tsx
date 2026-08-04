import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import "./i18n";
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { TodoProvider } from './context/TodoContext.tsx'
import "@fontsource-variable/inter"
import { ProjectProvider } from './context/ProjectContext.tsx'


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <TodoProvider>
            <ProjectProvider>
              <App />
            </ProjectProvider>
          </TodoProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
