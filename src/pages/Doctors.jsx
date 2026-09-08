import { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Clock, Star } from 'lucide-react';



export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const q = query(collection(db, 'doctors'));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDoctors(docs);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Specialists</h1>
            <p className="text-lg text-slate-600">Find and book an appointment with our highly qualified doctors.</p>
          </div>
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredDoctors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className="bg-white rounded-3xl p-6 border border-slate-100 hover:shadow-xl transition-shadow flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl">
                    {doctor.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    doctor.status === 'Available' ? 'bg-green-100 text-green-700' :
                    doctor.status === 'Busy' ? 'bg-amber-100 text-amber-700' :
                    doctor.status === 'On Leave' ? 'bg-red-100 text-red-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {doctor.status || 'Offline'}
                  </span>
                </div>
                
                <h3 className="font-bold text-xl text-slate-900 mb-1">{doctor.name}</h3>
                <p className="text-blue-600 font-medium text-sm mb-4">{doctor.specialty}</p>
                
                <div className="space-y-2 mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Star className="w-4 h-4 text-slate-400" />
                    <span>{doctor.qualification} • {doctor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{doctor.availableDays}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>{doctor.availableTime}</span>
                  </div>
                </div>
                
                <Link 
                  to={`/book-appointment?doctor=${doctor.id}`}
                  className="w-full text-center bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white py-3 rounded-xl font-medium transition-colors"
                >
                  Book Appointment
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-2">No doctors found</h3>
            <p className="text-slate-500">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
