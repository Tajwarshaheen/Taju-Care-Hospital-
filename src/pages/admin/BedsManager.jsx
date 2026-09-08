import { useState } from 'react';
import { BedDouble, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export default function BedsManager() {
  const [beds] = useState([
    { id: '1', number: '101-A', type: 'General', status: 'Occupied', patient: 'John Doe', department: 'Cardiology' },
    { id: '2', number: '101-B', type: 'General', status: 'Available', patient: null, department: 'Cardiology' },
    { id: '3', number: '102-A', type: 'ICU', status: 'Occupied', patient: 'Jane Smith', department: 'Neurology' },
    { id: '4', number: '102-B', type: 'ICU', status: 'Cleaning', patient: null, department: 'Neurology' },
    { id: '5', number: '103-A', type: 'Emergency', status: 'Reserved', patient: 'Mike Johnson', department: 'Emergency' },
    { id: '6', number: '103-B', type: 'Emergency', status: 'Available', patient: null, department: 'Emergency' },
    { id: '7', number: '201-A', type: 'General', status: 'Occupied', patient: 'Sarah Williams', department: 'Orthopedics' },
    { id: '8', number: '201-B', type: 'General', status: 'Available', patient: null, department: 'Orthopedics' },
  ]);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Available': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'Occupied': return <BedDouble className="w-5 h-5 text-blue-500" />;
      case 'Reserved': return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'Cleaning': return <Clock className="w-5 h-5 text-purple-500" />;
      default: return null;
    }
  };

  const getStatusStyle = (status) => {
    switch(status) {
      case 'Available': return 'bg-green-50 border-green-200';
      case 'Occupied': return 'bg-blue-50 border-blue-200';
      case 'Reserved': return 'bg-amber-50 border-amber-200';
      case 'Cleaning': return 'bg-purple-50 border-purple-200';
      default: return 'bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Bed Management</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Add New Bed
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Total Beds</p>
            <p className="text-2xl font-bold text-slate-900">8</p>
          </div>
          <div className="h-10 w-10 bg-slate-100 text-slate-600 rounded-lg flex items-center justify-center"><BedDouble size={20} /></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-green-600 uppercase tracking-wider font-semibold mb-1">Available</p>
            <p className="text-2xl font-bold text-green-700">3</p>
          </div>
          <div className="h-10 w-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center"><CheckCircle2 size={20} /></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-blue-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-blue-600 uppercase tracking-wider font-semibold mb-1">Occupied</p>
            <p className="text-2xl font-bold text-blue-700">3</p>
          </div>
          <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><BedDouble size={20} /></div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-purple-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-purple-600 uppercase tracking-wider font-semibold mb-1">Cleaning</p>
            <p className="text-2xl font-bold text-purple-700">1</p>
          </div>
          <div className="h-10 w-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center"><Clock size={20} /></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {beds.map(bed => (
          <div key={bed.id} className={`rounded-2xl border p-5 ${getStatusStyle(bed.status)} relative overflow-hidden transition-all hover:shadow-md`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900">{bed.number}</h3>
                <p className="text-xs font-medium text-slate-500 bg-white/60 px-2 py-0.5 rounded inline-block mt-1">{bed.type}</p>
              </div>
              {getStatusIcon(bed.status)}
            </div>
            
            <div className="space-y-3 mt-6">
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Patient</p>
                <p className="font-medium text-slate-900 text-sm">{bed.patient || '---'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">Department</p>
                <p className="font-medium text-slate-900 text-sm">{bed.department}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-900/10">
              <select 
                className="w-full bg-white/80 border border-slate-200 rounded-lg text-sm px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={bed.status}
              >
                <option value="Available">Mark Available</option>
                <option value="Occupied">Mark Occupied</option>
                <option value="Reserved">Mark Reserved</option>
                <option value="Cleaning">Mark Cleaning</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
