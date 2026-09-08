import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useSearchParams } from 'react-router-dom';
import { User, Phone, Mail, CheckCircle2 } from 'lucide-react';

export default function BookAppointment() {
  const [searchParams] = useSearchParams();
  const preselectedDoctor = searchParams.get('doctor');

  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    departmentId: '',
    doctorId: preselectedDoctor || '',
    date: '',
    time: '',
    reason: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [docsSnap, deptsSnap] = await Promise.all([
          getDocs(collection(db, 'doctors')),
          getDocs(collection(db, 'departments'))
        ]);
        setDoctors(docsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setDepartments(deptsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'appointments'), {
        ...formData,
        status: 'Pending',
        createdAt: new Date().toISOString()
      });
      setSuccess(true);
    } catch (error) {
      console.error("Error booking:", error);
      alert("Failed to book appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="py-20 min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-slate-100 shadow-xl text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Appointment Confirmed!</h2>
          <p className="text-slate-600 mb-8">
            Thank you, {formData.patientName}. Your request has been submitted.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3.5 rounded-xl transition-colors"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Book an Appointment</h1>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Patient Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input required type="text" name="patientName" value={formData.patientName} onChange={handleChange} className="pl-11 w-full border-slate-200 rounded-xl py-3 border focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400" />
                  </div>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="pl-11 w-full border-slate-200 rounded-xl py-3 border focus:ring-blue-500 focus:border-blue-500" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="pl-11 w-full border-slate-200 rounded-xl py-3 border focus:ring-blue-500 focus:border-blue-500" placeholder="john@example.com" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                <select required name="departmentId" value={formData.departmentId} onChange={handleChange} className="w-full border-slate-200 rounded-xl py-3 border focus:ring-blue-500 focus:border-blue-500 px-4">
                  <option value="">Select Department</option>
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Doctor</label>
                <select name="doctorId" value={formData.doctorId} onChange={handleChange} className="w-full border-slate-200 rounded-xl py-3 border focus:ring-blue-500 focus:border-blue-500 px-4">
                  <option value="">Any Available Doctor</option>
                  {doctors.filter(d => !formData.departmentId || d.departmentId === formData.departmentId).map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full border-slate-200 rounded-xl py-3 border focus:ring-blue-500 focus:border-blue-500 px-4" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Time</label>
                <select required name="time" value={formData.time} onChange={handleChange} className="w-full border-slate-200 rounded-xl py-3 border focus:ring-blue-500 focus:border-blue-500 px-4">
                  <option value="">Select Time</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Reason</label>
                <textarea required name="reason" value={formData.reason} onChange={handleChange} rows={4} className="w-full border-slate-200 rounded-xl py-3 border focus:ring-blue-500 px-4" placeholder="Reason..."></textarea>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl">
              {loading ? 'Submitting...' : 'Confirm Appointment'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
