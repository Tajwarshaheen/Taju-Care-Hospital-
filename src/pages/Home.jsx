import { ArrowRight, Phone, Clock, Calendar, Users, Activity, Heart, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-50 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-6">
                <Heart size={18} />
                <span>Dedicated to Your Well-being</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Quality Healthcare, <br />
                <span className="text-blue-600">Caring for You</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Taju Care Hospital provides world-class medical treatment with state-of-the-art facilities and a team of highly experienced medical professionals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/book-appointment" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-medium transition-colors flex items-center gap-2">
                  Book Appointment <ArrowRight size={18} />
                </Link>
                <a href="tel:911" className="bg-red-50 hover:bg-red-100 text-red-600 px-8 py-3.5 rounded-full font-medium transition-colors flex items-center gap-2">
                  <Phone size={18} /> Emergency Contact
                </a>
              </div>
            </div>
            
            <div className="relative hidden lg:block">
              {/* Abstract decorative elements */}
              <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-3 scale-105 opacity-10"></div>
              <div className="relative bg-white p-8 rounded-[3rem] shadow-xl border border-slate-100">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-6 rounded-2xl">
                      <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center mb-4">
                        <Users size={24} />
                      </div>
                      <h3 className="font-bold text-xl text-slate-900 mb-1">Expert Doctors</h3>
                      <p className="text-slate-600">Top specialists from around the world.</p>
                    </div>
                    <div className="bg-teal-50 p-6 rounded-2xl">
                      <div className="w-12 h-12 bg-teal-600 text-white rounded-xl flex items-center justify-center mb-4">
                        <Shield size={24} />
                      </div>
                      <h3 className="font-bold text-xl text-slate-900 mb-1">Modern Tech</h3>
                      <p className="text-slate-600">Advanced medical equipment.</p>
                    </div>
                  </div>
                  <div className="space-y-6 mt-8">
                    <div className="bg-indigo-50 p-6 rounded-2xl">
                      <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-4">
                        <Clock size={24} />
                      </div>
                      <h3 className="font-bold text-xl text-slate-900 mb-1">24/7 Support</h3>
                      <p className="text-slate-600">Always here when you need us.</p>
                    </div>
                    <div className="bg-rose-50 p-6 rounded-2xl">
                      <div className="w-12 h-12 bg-rose-600 text-white rounded-xl flex items-center justify-center mb-4">
                        <Activity size={24} />
                      </div>
                      <h3 className="font-bold text-xl text-slate-900 mb-1">Emergency</h3>
                      <p className="text-slate-600">Rapid response emergency care.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">25+</div>
              <div className="text-blue-200 font-medium">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">75+</div>
              <div className="text-blue-200 font-medium">Specialist Doctors</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">10k+</div>
              <div className="text-blue-200 font-medium">Happy Patients</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">12+</div>
              <div className="text-blue-200 font-medium">Departments</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Departments */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Featured Departments</h2>
            <p className="text-slate-600 text-lg">We offer a wide range of specialized medical services to cater to your every healthcare need.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Cardiology', desc: 'Expert care for your heart with advanced diagnostics.', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50' },
              { title: 'Neurology', desc: 'Comprehensive treatment for brain and nervous system.', icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-50' },
              { title: 'Orthopedics', desc: 'Specialized care for bones, joints, and muscles.', icon: Shield, color: 'text-teal-500', bg: 'bg-teal-50' },
              { title: 'Pediatrics', desc: 'Compassionate healthcare for infants and children.', icon: Users, color: 'text-amber-500', bg: 'bg-amber-50' },
              { title: 'Emergency', desc: '24/7 rapid response for critical medical situations.', icon: Phone, color: 'text-red-500', bg: 'bg-red-50' },
              { title: 'General Medicine', desc: 'Primary care and holistic treatment for adults.', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-50' },
            ].map((dept) => (
              <div key={dept.title} className="p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-shadow bg-white">
                <div className={`w-14 h-14 ${dept.bg} ${dept.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <dept.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{dept.title}</h3>
                <p className="text-slate-600 mb-6">{dept.desc}</p>
                <Link to="/departments" className="text-blue-600 font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/departments" className="inline-flex items-center justify-center px-8 py-3.5 border border-slate-200 rounded-full text-slate-700 font-medium hover:bg-slate-50 transition-colors">
              View All Departments
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 pattern-dots"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Ready to get the best care?</h2>
          <p className="text-slate-300 text-lg mb-10">Book your appointment today and take the first step towards better health.</p>
          <Link to="/book-appointment" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-colors inline-flex items-center gap-2">
            <Calendar size={20} /> Book an Appointment Now
          </Link>
        </div>
      </section>
    </div>
  );
}
