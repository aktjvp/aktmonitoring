import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import Departments from "./pages/Departments";
import AddDepartment from "./pages/AddDepartment";
import Computers from "./pages/Computers";
import AddComputer from "./pages/AddComputer";
import Phones from "./pages/Phones";
import AddPhone from "./pages/AddPhone";
import Printers from "./pages/Printers";
import AddPrinter from "./pages/AddPrinter";
import Serverxonalar from "./pages/Serverxonalar";
import Turniketlar from "./pages/Turniketlar";
import Reports from "./pages/Reports";
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
            <Route path="employees/:id/edit" element={<EditEmployee />} />
            <Route path="departments" element={<Departments />} />
            <Route path="departments/add" element={<AddDepartment />} />
            <Route path="computers" element={<Computers />} />
            <Route path="computers/add" element={<AddComputer />} />
            <Route path="phones" element={<Phones />} />
            <Route path="phones/add" element={<AddPhone />} />
            <Route path="printers" element={<Printers />} />
            <Route path="printers/add" element={<AddPrinter />} />
            <Route path="serverxonalar" element={<Serverxonalar />} />
            <Route path="turniketlar" element={<Turniketlar />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
