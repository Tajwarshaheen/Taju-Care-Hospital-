import { useState, useEffect } from 'react';
import { Pill, AlertCircle, Plus, Search, Edit, Trash2, X } from 'lucide-react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function PharmacyManager() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMedicine, setCurrentMedicine] = useState(null);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const snap = await getDocs(collection(db, 'medicines'));
      setMedicines(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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
    
    const medData = {
      name: formData.get('name'),
      category: formData.get('category'),
      quantity: Number(formData.get('quantity')),
      lowStockWarning: Number(formData.get('lowStockWarning')),
      expiryDate: formData.get('expiryDate'),
      price: Number(formData.get('price')),
    };

    try {
      if (currentMedicine) {
        await updateDoc(doc(db, 'medicines', currentMedicine.id), medData);
      } else {
        await addDoc(collection(db, 'medicines'), {
          ...medData,
          createdAt: new Date().toISOString()
        });
      }
      setIsModalOpen(false);
      fetchMedicines();
    } catch (error) {
      console.error("Error saving medicine", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      try {
        await deleteDoc(doc(db, 'medicines', id));
        fetchMedicines();
      } catch (error) {
        console.error("Error deleting medicine", error);
      }
    }
  };

  const openModal = (medicine = null) => {
    setCurrentMedicine(medicine);
    setIsModalOpen(true);
  };

  const filteredMedicines = medicines.filter(med => 
    med.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    med.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-slate-900">Pharmacy Inventory</h1>
        <button 
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={20} /> Add Medicine
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
              placeholder="Search inventory..."
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
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Medicine Name</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Expiry Date</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">Loading inventory...</td>
                </tr>
              ) : filteredMedicines.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">No medicines found.</td>
                </tr>
              ) : (
                filteredMedicines.map(med => (
                  <tr key={med.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">{med.name}</td>
                    <td className="py-4 px-6 text-slate-600">{med.category || 'N/A'}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${med.quantity <= (med.lowStockWarning || 10) ? 'text-red-600' : 'text-slate-700'}`}>
                          {med.quantity}
                        </span>
                        {med.quantity <= (med.lowStockWarning || 10) && (
                          <AlertCircle size={14} className="text-red-500" title="Low Stock" />
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-600">{med.expiryDate || 'N/A'}</td>
                    <td className="py-4 px-6 text-slate-600">${med.price || '0.00'}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button 
                          onClick={() => openModal(med)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(med.id)}
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
                {currentMedicine ? 'Edit Medicine' : 'Add New Medicine'}
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
                <label className="block text-sm font-medium text-slate-700 mb-1">Medicine Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required
                  defaultValue={currentMedicine?.name}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <input 
                    type="text" 
                    name="category" 
                    defaultValue={currentMedicine?.category}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    name="price" 
                    required
                    defaultValue={currentMedicine?.price}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Quantity in Stock</label>
                  <input 
                    type="number" 
                    name="quantity" 
                    required
                    defaultValue={currentMedicine?.quantity}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Low Stock Warning At</label>
                  <input 
                    type="number" 
                    name="lowStockWarning" 
                    defaultValue={currentMedicine?.lowStockWarning || 10}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date</label>
                <input 
                  type="date" 
                  name="expiryDate" 
                  required
                  defaultValue={currentMedicine?.expiryDate}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
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
                  className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                >
                  {currentMedicine ? 'Save Changes' : 'Add Medicine'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
