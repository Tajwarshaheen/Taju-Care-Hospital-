import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Departments from './pages/Departments';
import Doctors from './pages/Doctors';
import BookAppointment from './pages/BookAppointment';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminLayout from './components/AdminLayout';
import DashboardOverview from './pages/admin/DashboardOverview';
import PatientsManager from './pages/admin/PatientsManager';
import DoctorsManager from './pages/admin/DoctorsManager';
import AppointmentsManager from './pages/admin/AppointmentsManager';
import BedsManager from './pages/admin/BedsManager';
import EmergencyDash from './pages/admin/EmergencyDash';
import PharmacyManager from './pages/admin/PharmacyManager';
import LabManager from './pages/admin/LabManager';
import BillingManager from './pages/admin/BillingManager';

function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="departments" element={<Departments />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="book-appointment" element={<BookAppointment />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="patients" element={<PatientsManager />} />
          <Route path="doctors" element={<DoctorsManager />} />
          <Route path="appointments" element={<AppointmentsManager />} />
          <Route path="beds" element={<BedsManager />} />
          <Route path="emergency" element={<EmergencyDash />} />
          <Route path="pharmacy" element={<PharmacyManager />} />
          <Route path="laboratory" element={<LabManager />} />
          <Route path="billing" element={<BillingManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
