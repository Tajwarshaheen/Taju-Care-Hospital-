import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Search, Plus, Edit, Trash2, MoreVertical, X } from 'lucide-react';

export default function PatientsManager() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const q = query(collection(db, 'patients'));
      const snapshot = await getDocs(q);
      setPatients(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching patients", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.target ;
    const formData = new FormData(form);
    
    const patientData = {
      name: formData.get('name'),
      age: Number(formData.get('age')),
      gender: formData.get('gender'),
      phone: formData.get('phone'),
      address: formData.get('address'),
      bloodGroup: formData.get('bloodGroup'),
      status: formData.get('status'),
    };

    try {
      if (currentPatient) {
        await updateDoc(doc(db, 'patients', currentPatient.id), patientData);
      } else {
        await addDoc(collection(db, 'patients'), {
          ...patientData,
          createdAt: new Date().toISOString()
        });
      }
      setIsModalOpen(false);
      fetchPatients();
    } catch (error) {
      console.error("Error saving patient", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      try {
        await deleteDoc(doc(db, 'patients', id));
        fetchPatients();
      } catch (error) {
        console.error("Error deleting", error);
      }
    }
  };

  const openModal = (patient = null) => {
    setCurrentPatient(patient);
    setIsModalOpen(true);
  };

  const filteredPatients = patients.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone?.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Patient Management</h1>
        <button 
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={20} /> Add New Patient
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
              placeholder="Search patients..."
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
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Info</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Age/Gender</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contact</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Blood</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">Loading patients...</td>
                </tr>
              ) : filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">No patients found.</td>
                </tr>
              ) : (
                filteredPatients.map(patient => (
                  <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-medium text-slate-900">{patient.name}</div>
                      <div className="text-sm text-slate-500">ID: {patient.id.substring(0, 8)}</div>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{patient.age} / {patient.gender}</td>
                    <td className="py-4 px-6 text-slate-600">{patient.phone}</td>
                    <td className="py-4 px-6 font-medium text-red-500">{patient.bloodGroup}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'Admitted' ? 'bg-blue-100 text-blue-700' :
                        patient.status === 'Discharged' ? 'bg-green-100 text-green-700' :
                        patient.status === 'Emergency' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openModal(patient)} className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(patient.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors">
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
              <h2 className="text-xl font-bold text-slate-900">{currentPatient ? 'Edit Patient' : 'Add New Patient'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input required name="name" defaultValue={currentPatient?.name} type="text" className="w-full border-slate-200 rounded-lg py-2.5 px-3 border focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input required name="phone" defaultValue={currentPatient?.phone} type="tel" className="w-full border-slate-200 rounded-lg py-2.5 px-3 border focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                  <input required name="age" defaultValue={currentPatient?.age} type="number" className="w-full border-slate-200 rounded-lg py-2.5 px-3 border focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                  <select required name="gender" defaultValue={currentPatient?.gender} className="w-full border-slate-200 rounded-lg py-2.5 px-3 border focus:ring-blue-500 focus:border-blue-500">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Blood Group</label>
                  <select required name="bloodGroup" defaultValue={currentPatient?.bloodGroup} className="w-full border-slate-200 rounded-lg py-2.5 px-3 border focus:ring-blue-500 focus:border-blue-500">
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select required name="status" defaultValue={currentPatient?.status || 'Waiting'} className="w-full border-slate-200 rounded-lg py-2.5 px-3 border focus:ring-blue-500 focus:border-blue-500">
                    <option value="Waiting">Waiting</option>
                    <option value="Admitted">Admitted</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Discharged">Discharged</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                  <input required name="address" defaultValue={currentPatient?.address} type="text" className="w-full border-slate-200 rounded-lg py-2.5 px-3 border focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 border border-slate-200 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  Save Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
