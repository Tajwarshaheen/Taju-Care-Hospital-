import { Link } from 'react-router-dom';
import { Heart, Activity, Shield, Users, Phone, Calendar, Beaker, Pill, Bone, Brain, Baby, Eye } from 'lucide-react';

export default function Departments() {
  const departments = [
    { title: 'Emergency', desc: '24/7 rapid response for critical medical situations.', icon: Phone, color: 'text-red-500', bg: 'bg-red-50' },
    { title: 'Cardiology', desc: 'Expert care for your heart with advanced diagnostics.', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
    { title: 'Neurology', desc: 'Comprehensive treatment for brain and nervous system.', icon: Brain, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { title: 'General Medicine', desc: 'Primary care and holistic treatment for adults.', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Pediatrics', desc: 'Compassionate healthcare for infants and children.', icon: Baby, color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'Orthopedics', desc: 'Specialized care for bones, joints, and muscles.', icon: Bone, color: 'text-teal-500', bg: 'bg-teal-50' },
    { title: 'Gynecology', desc: 'Dedicated healthcare for women of all ages.', icon: Users, color: 'text-pink-500', bg: 'bg-pink-50' },
    { title: 'Dermatology', desc: 'Advanced skincare and treatment for skin conditions.', icon: Activity, color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'Dental', desc: 'Comprehensive oral care and dental surgeries.', icon: Shield, color: 'text-cyan-500', bg: 'bg-cyan-50' },
    { title: 'Radiology', desc: 'State-of-the-art imaging and diagnostic services.', icon: Eye, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Laboratory', desc: 'Accurate and timely clinical testing services.', icon: Beaker, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Pharmacy', desc: 'Fully stocked pharmacy with expert pharmacists.', icon: Pill, color: 'text-lime-500', bg: 'bg-lime-50' },
  ];

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Departments</h1>
          <p className="text-lg text-slate-600">Discover our comprehensive range of specialized medical departments designed to provide you with the best possible care.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {departments.map((dept) => (
            <div key={dept.title} className="p-6 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow bg-white flex flex-col">
              <div className={`w-12 h-12 ${dept.bg} ${dept.color} rounded-2xl flex items-center justify-center mb-4`}>
                <dept.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{dept.title}</h3>
              <p className="text-slate-600 mb-6 flex-grow text-sm">{dept.desc}</p>
              <Link to="/book-appointment" className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-block mt-auto text-sm">
                Book Appointment →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
