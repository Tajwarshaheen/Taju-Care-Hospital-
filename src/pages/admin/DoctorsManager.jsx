import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Search, Plus, Edit, Trash2, X } from 'lucide-react';

export default function DoctorsManager() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [doctorsSnap, deptsSnap] = await Promise.all([
        getDocs(collection(db, 'doctors')),
        getDocs(collection(db, 'departments'))
      ]);
      setDoctors(doctorsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setDepartments(deptsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.target ;
    const formData = new FormData(form);
    
    const doctorData = {
      name: formData.get('name'),
      specialty: formData.get('specialty'),
      qualification: formData.get('qualification'),
      experience: formData.get('experience'),
      departmentId: formData.get('departmentId'),
      availableDays: formData.get('availableDays'),
      availableTime: formData.get('availableTime'),
      status: formData.get('status'),
    };

    try {
      if (currentDoctor) {
        await updateDoc(doc(db, 'doctors', currentDoctor.id), doctorData);
      } else {
        await addDoc(collection(db, 'doctors'), {
          ...doctorData,
          createdAt: new Date().toISOString()
        });
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error saving doctor", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this doctor?")) {
      try {
        await deleteDoc(doc(db, 'doctors', id));
        fetchData();
      } catch (error) {
        console.error("Error deleting", error);
      }
    }
  };

  const openModal = (doctor = null) => {
    setCurrentDoctor(doctor);
    setIsModalOpen(true);
  };

  const filteredDoctors = doctors.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Doctor Management</h1>
        <button 
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={20} /> Add New Doctor
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="relative w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Doctor Info</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Specialty & Exp</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Schedule</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">Loading doctors...</td>
                </tr>
              ) : filteredDoctors.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500">No doctors found.</td>
                </tr>
              ) : (
                filteredDoctors.map(doctor => (
                  <tr key={doctor.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-900">{doctor.name}</div>
                      <div className="text-sm text-slate-500">{doctor.qualification}</div>
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      <div className="font-medium">{doctor.specialty}</div>
                      <div className="text-sm">{doctor.experience}</div>
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      <div className="text-sm">{doctor.availableDays}</div>
                      <div className="text-sm">{doctor.availableTime}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        doctor.status === 'Available' ? 'bg-green-100 text-green-700' :
                        doctor.status === 'Busy' ? 'bg-amber-100 text-amber-700' :
                        doctor.status === 'On Leave' ? 'bg-red-100 text-red-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {doctor.status || 'Offline'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openModal(doctor)} className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(doctor.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">{currentDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input required name="name" defaultValue={currentDoctor?.name} type="text" className="w-full border-slate-200 rounded-lg py-2.5 px-3 border focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Specialty</label>
                  <input required name="specialty" defaultValue={currentDoctor?.specialty} type="text" className="w-full border-slate-200 rounded-lg py-2.5 px-3 border focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Qualification</label>
                  <input required name="qualification" defaultValue={currentDoctor?.qualification} type="text" placeholder="e.g. MBBS, MD" className="w-full border-slate-200 rounded-lg py-2.5 px-3 border focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
                  <input required name="experience" defaultValue={currentDoctor?.experience} type="text" placeholder="e.g. 10 Years" className="w-full border-slate-200 rounded-lg py-2.5 px-3 border focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                  <select name="departmentId" defaultValue={currentDoctor?.departmentId} className="w-full border-slate-200 rounded-lg py-2.5 px-3 border focus:ring-blue-500 focus:border-blue-500">
                    <option value="">Select Department</option>
                    {departments.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select required name="status" defaultValue={currentDoctor?.status || 'Available'} className="w-full border-slate-200 rounded-lg py-2.5 px-3 border focus:ring-blue-500 focus:border-blue-500">
                    <option value="Available">Available</option>
                    <option value="Busy">Busy</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Offline">Offline</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Available Days</label>
                  <input required name="availableDays" defaultValue={currentDoctor?.availableDays} type="text" placeholder="e.g. Mon - Fri" className="w-full border-slate-200 rounded-lg py-2.5 px-3 border focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Available Time</label>
                  <input required name="availableTime" defaultValue={currentDoctor?.availableTime} type="text" placeholder="e.g. 09:00 AM - 05:00 PM" className="w-full border-slate-200 rounded-lg py-2.5 px-3 border focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Save Doctor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
