import { useState, useEffect } from 'react';
import { AlertTriangle, Users, BedDouble, Activity, Plus, Search, Edit, Trash2, X } from 'lucide-react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function EmergencyDash() {
  const [emergencies, setEmergencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmergency, setCurrentEmergency] = useState(null);

  useEffect(() => {
    fetchEmergencies();
  }, []);

  const fetchEmergencies = async () => {
    try {
      const snap = await getDocs(collection(db, 'emergencies'));
      setEmergencies(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const form = e.target ;
    const formData = new FormData(form);
    
    const emergencyData = {
      patientName: formData.get('patientName'),
      condition: formData.get('condition'),
      triageLevel: formData.get('triageLevel'),
      arrivalTime: formData.get('arrivalTime'),
      status: formData.get('status'),
      assignedDoctor: formData.get('assignedDoctor'),
    };

    try {
      if (currentEmergency) {
        await updateDoc(doc(db, 'emergencies', currentEmergency.id), emergencyData);
      } else {
        await addDoc(collection(db, 'emergencies'), {
          ...emergencyData,
          createdAt: new Date().toISOString()
        });
      }
      setIsModalOpen(false);
      fetchEmergencies();
    } catch (error) {
      console.error("Error saving emergency case", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this emergency case?')) {
      try {
        await deleteDoc(doc(db, 'emergencies', id));
        fetchEmergencies();
      } catch (error) {
        console.error("Error deleting emergency case", error);
      }
    }
  };

  const openModal = (emergency = null) => {
    setCurrentEmergency(emergency);
    setIsModalOpen(true);
  };

  const filteredEmergencies = emergencies.filter(em => 
    em.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    em.condition?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Emergency Dashboard</h1>
        <button 
          onClick={() => openModal()}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <AlertTriangle size={20} /> Add Emergency Case
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
          <div className="text-red-600 mb-2"><AlertTriangle size={24} /></div>
          <p className="text-xs text-red-600 uppercase tracking-wider font-semibold mb-1">Critical Patients</p>
          <p className="text-2xl font-bold text-red-700">
            {emergencies.filter(e => e.triageLevel === 'Level 1 - Resuscitation' || e.triageLevel === 'Level 2 - Emergent').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <div className="text-blue-500 mb-2"><Users size={24} /></div>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Waiting Patients</p>
          <p className="text-2xl font-bold text-slate-900">
            {emergencies.filter(e => e.status === 'Waiting').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <div className="text-amber-500 mb-2"><BedDouble size={24} /></div>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Available Beds</p>
          <p className="text-2xl font-bold text-slate-900">14</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <div className="text-green-500 mb-2"><Activity size={24} /></div>
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Available Doctors</p>
          <p className="text-2xl font-bold text-slate-900">4</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-slate-900">Active Emergency Cases</h3>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search cases..."
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
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Name</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Condition</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Triage Level</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Arrival Time</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">Loading cases...</td>
                </tr>
              ) : filteredEmergencies.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">No emergency cases found.</td>
                </tr>
              ) : (
                filteredEmergencies.map(em => (
                  <tr key={em.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">{em.patientName}</td>
                    <td className="py-4 px-6 text-slate-600">{em.condition}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        em.triageLevel.includes('Level 1') ? 'bg-red-100 text-red-700' :
                        em.triageLevel.includes('Level 2') ? 'bg-orange-100 text-orange-700' :
                        em.triageLevel.includes('Level 3') ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {em.triageLevel}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{em.arrivalTime}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        em.status === 'Treated' ? 'bg-green-100 text-green-700' : 
                        em.status === 'In Treatment' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {em.status || 'Waiting'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => openModal(em)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(em.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                        >
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">
                {currentEmergency ? 'Edit Emergency Case' : 'Add Emergency Case'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                <input 
                  type="text" 
                  name="patientName" 
                  required
                  defaultValue={currentEmergency?.patientName}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Condition / Chief Complaint</label>
                <input 
                  type="text" 
                  name="condition" 
                  required
                  defaultValue={currentEmergency?.condition}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Triage Level</label>
                  <select 
                    name="triageLevel" 
                    defaultValue={currentEmergency?.triageLevel || 'Level 3 - Urgent'}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Level 1 - Resuscitation">Level 1 - Resuscitation</option>
                    <option value="Level 2 - Emergent">Level 2 - Emergent</option>
                    <option value="Level 3 - Urgent">Level 3 - Urgent</option>
                    <option value="Level 4 - Less Urgent">Level 4 - Less Urgent</option>
                    <option value="Level 5 - Non Urgent">Level 5 - Non Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Arrival Time</label>
                  <input 
                    type="time" 
                    name="arrivalTime" 
                    required
                    defaultValue={currentEmergency?.arrivalTime || new Date().toTimeString().slice(0,5)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select 
                    name="status" 
                    defaultValue={currentEmergency?.status || 'Waiting'}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Waiting">Waiting</option>
                    <option value="In Treatment">In Treatment</option>
                    <option value="Admitted">Admitted</option>
                    <option value="Discharged">Discharged</option>
                    <option value="Transferred">Transferred</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Doctor</label>
                  <input 
                    type="text" 
                    name="assignedDoctor" 
                    defaultValue={currentEmergency?.assignedDoctor}
                    placeholder="e.g. Dr. Smith"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
                >
                  {currentEmergency ? 'Save Changes' : 'Add Case'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
