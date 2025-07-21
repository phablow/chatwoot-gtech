import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AddAgent from "./pages/AddAgent";
import EditAgent from "./pages/EditAgent";
import AdminProfile from "./pages/AdminProfile";
import AdminSettings from "./pages/AdminSettings";
import AgentDashboard from "./pages/AgentDashboard";
import AgentProfile from "./pages/AgentProfile";
import AgentSettings from "./pages/AgentSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/add-agent" 
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AddAgent />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/edit-agent/:id" 
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <EditAgent />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/profile" 
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminProfile />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/admin/settings" 
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminSettings />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/agent" 
              element={
                <ProtectedRoute requiredRole="AGENT">
                  <AgentDashboard />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/agent/profile" 
              element={
                <ProtectedRoute requiredRole="AGENT">
                  <AgentProfile />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/agent/settings" 
              element={
                <ProtectedRoute requiredRole="AGENT">
                  <AgentSettings />
                </ProtectedRoute>
              } 
            />
            
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
