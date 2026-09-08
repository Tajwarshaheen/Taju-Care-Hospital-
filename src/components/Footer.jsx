import { Activity, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-white mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Activity size={24} />
              </div>
              <span className="font-bold text-2xl tracking-tight">Taju Care</span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Quality Healthcare, Caring for You. We provide world-class medical treatment with compassion and care.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/departments" className="hover:text-blue-400 transition-colors">Departments</Link></li>
              <li><Link to="/doctors" className="hover:text-blue-400 transition-colors">Our Doctors</Link></li>
              <li><Link to="/book-appointment" className="hover:text-blue-400 transition-colors">Book Appointment</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Departments</h3>
            <ul className="space-y-3">
              <li><Link to="/departments" className="hover:text-blue-400 transition-colors">Cardiology</Link></li>
              <li><Link to="/departments" className="hover:text-blue-400 transition-colors">Neurology</Link></li>
              <li><Link to="/departments" className="hover:text-blue-400 transition-colors">Orthopedics</Link></li>
              <li><Link to="/departments" className="hover:text-blue-400 transition-colors">Pediatrics</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                <span>123 Healthcare Ave, Medical District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500" />
                <span>contact@tajucare.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Taju Care Hospital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
