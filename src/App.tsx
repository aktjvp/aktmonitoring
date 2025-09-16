import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import Departments from "./pages/Departments";
import AddDepartment from "./pages/AddDepartment";
import Computers from "./pages/Computers";
import AddComputer from "./pages/AddComputer";
import Phones from "./pages/Phones";
import Printers from "./pages/Printers";
import Serverxonalar from "./pages/Serverxonalar";
import Turniketlar from "./pages/Turniketlar";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="employees/add" element={<AddEmployee />} />
            <Route path="departments" element={<Departments />} />
            <Route path="departments/add" element={<AddDepartment />} />
            <Route path="computers" element={<Computers />} />
            <Route path="computers/add" element={<AddComputer />} />
            <Route path="phones" element={<Phones />} />
            <Route path="printers" element={<Printers />} />
            <Route path="serverxonalar" element={<Serverxonalar />} />
            <Route path="turniketlar" element={<Turniketlar />} />
            <Route path="reports" element={<Dashboard />} />
            <Route path="settings" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
