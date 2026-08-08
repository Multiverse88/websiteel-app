import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Check, Search, Calendar, ChevronRight } from 'lucide-react';
import { api } from '../lib/api';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { getTrackingTemplate, TRACKING_SERVICES, type TrackingStep, type TrackingStepStatus } from '../lib/tracking-templates';

interface TrackingProject {
  id: string;
  trackingCode: string;
  clientName: string;
  serviceType: string;
  timelineData: TrackingStep[];
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Tracking() {
  const [projects, setProjects] = useState<TrackingProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  
  // Quick Action Modal State
  const [quickActionProject, setQuickActionProject] = useState<TrackingProject | null>(null);
  const [quickActionStep, setQuickActionStep] = useState<TrackingStep | null>(null);
  const [quickActionDate, setQuickActionDate] = useState<string>('');
  
  // Form State
  const [formId, setFormId] = useState<string | null>(null);
  const [trackingCode, setTrackingCode] = useState('');
  const [clientName, setClientName] = useState('');
  const [serviceType, setServiceType] = useState(TRACKING_SERVICES[0]);
  const [timelineData, setTimelineData] = useState<TrackingStep[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await api.getTrackingProjects();
      setProjects(data as TrackingProject[]);
    } catch (err) {
      console.error(err);
      alert('Gagal memuat data tracking project');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openModal = (project?: TrackingProject) => {
    if (project) {
      setFormId(project.id);
      setTrackingCode(project.trackingCode);
      setClientName(project.clientName);
      setServiceType(project.serviceType);
      setTimelineData(project.timelineData || []);
      setIsCompleted(project.isCompleted);
    } else {
      setFormId(null);
      // Generate a random tracking code
      const rand = Math.floor(1000 + Math.random() * 9000);
      setTrackingCode(`EL-${new Date().getFullYear()}-${rand}`);
      setClientName('');
      setServiceType(TRACKING_SERVICES[0]);
      setTimelineData(getTrackingTemplate(TRACKING_SERVICES[0]));
      setIsCompleted(false);
    }
    setIsModalOpen(true);
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setServiceType(val);
    if (!formId) {
      // Only auto-fill template if creating a new project
      setTimelineData(getTrackingTemplate(val));
    } else {
      if (confirm('Anda sedang mengedit project yang sudah ada. Apakah Anda yakin ingin me-reset timeline ke template default layanan ini? Data progress sebelumnya akan hilang.')) {
        setTimelineData(getTrackingTemplate(val));
      }
    }
  };

  const updateStep = (id: string, field: keyof TrackingStep, value: any) => {
    setTimelineData(prev => 
      prev.map(step => step.id === id ? { ...step, [field]: value } : step)
    );
  };

  const addStep = () => {
    setTimelineData(prev => [
      ...prev,
      { id: Date.now().toString(), title: 'Langkah Baru', status: 'pending', date: null }
    ]);
  };

  const removeStep = (id: string) => {
    setTimelineData(prev => prev.filter(step => step.id !== id));
  };



  const confirmQuickAdvance = (project: TrackingProject) => {
    const currentStep = project.timelineData.find(s => s.status === 'current') 
                     || project.timelineData.find(s => s.status === 'pending');
    if (!currentStep) return;
    
    setQuickActionProject(project);
    setQuickActionStep(currentStep);
    setQuickActionDate(new Date().toISOString().split('T')[0]);
  };

  const executeQuickAdvance = async () => {
    if (!quickActionProject || !quickActionStep) return;
    
    try {
      setIsSaving(true);
      const newTimeline = [...quickActionProject.timelineData];
      const stepIndex = newTimeline.findIndex(s => s.id === quickActionStep.id);
      
      if (stepIndex !== -1) {
        newTimeline[stepIndex].status = quickActionStep.status === 'pending' ? 'current' : 'done';
        if (newTimeline[stepIndex].status === 'done') {
          newTimeline[stepIndex].date = quickActionDate || new Date().toISOString().split('T')[0];
          // Mark next as current
          if (stepIndex + 1 < newTimeline.length) {
            newTimeline[stepIndex + 1].status = 'current';
          }
        }
      }

      const isCompleted = newTimeline.every(s => s.status === 'done');

      await api.updateTrackingProject(quickActionProject.id, {
        timelineData: newTimeline,
        isCompleted,
        updatedAt: new Date().toISOString()
      });

      setQuickActionProject(null);
      fetchProjects();
    } catch (err) {
      alert('Gagal mengupdate progress');
    } finally {
      setIsSaving(false);
    }
  };

  const handleQuickAdvance = async (project: TrackingProject) => {
    try {
      const newTimeline = [...project.timelineData];
      let updated = false;

      const currentIndex = newTimeline.findIndex(s => s.status === 'current');
      
      if (currentIndex !== -1) {
        newTimeline[currentIndex].status = 'done';
        newTimeline[currentIndex].date = new Date().toISOString().split('T')[0];
        
        if (currentIndex + 1 < newTimeline.length) {
          newTimeline[currentIndex + 1].status = 'current';
        }
        updated = true;
      } else {
        const firstPendingIndex = newTimeline.findIndex(s => s.status === 'pending');
        if (firstPendingIndex !== -1) {
          newTimeline[firstPendingIndex].status = 'current';
          updated = true;
        }
      }

      if (!updated) return;

      const isCompleted = newTimeline.every(s => s.status === 'done');

      await api.updateTrackingProject(project.id, {
        timelineData: newTimeline,
        isCompleted,
        updatedAt: new Date().toISOString()
      });

      fetchProjects();
    } catch (err) {
      alert('Gagal mengupdate progress');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode || !clientName) return alert('Kode Tracking dan Nama Klien wajib diisi');
    
    try {
      setIsSaving(true);
      const payload = {
        trackingCode,
        clientName,
        serviceType,
        timelineData,
        isCompleted,
        updatedAt: new Date().toISOString()
      };

      if (formId) {
        await api.updateTrackingProject(formId, payload);
      } else {
        await api.createTrackingProject({
          ...payload,
          id: crypto.randomUUID(),
        });
      }
      
      setIsModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      alert(err.message || 'Gagal menyimpan data');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus project ini?')) return;
    try {
      setIsDeletingId(id);
      await api.deleteTrackingProject(id);
      fetchProjects();
    } catch (err: any) {
      alert(err.message || 'Gagal menghapus data');
    } finally {
      setIsDeletingId(null);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.trackingCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { key: 'trackingCode', label: 'Kode Resi', render: (_: any, p: TrackingProject) => <span className="font-mono text-sm font-semibold text-[#6f0000] bg-[#6f0000]/10 px-2 py-1 rounded">{p.trackingCode}</span> },
    { key: 'clientName', label: 'Klien' },
    { key: 'serviceType', label: 'Layanan' },
    { key: 'progress', label: 'Progres', render: (_: any, p: TrackingProject) => {
      const doneCount = p.timelineData.filter(s => s.status === 'done').length;
      const total = p.timelineData.length;
      const currentStep = p.timelineData.find(s => s.status === 'current') || p.timelineData.find(s => s.status === 'pending');
      const pct = total > 0 ? Math.round((doneCount/total)*100) : 0;
      
      return (
        <div className="flex flex-col gap-1.5 w-32">
          <div className="flex items-center justify-between text-[10px]">
            <span className="font-bold text-gray-700">{doneCount}/{total} Selesai</span>
            <span className="text-gray-500 font-medium">{pct}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#6f0000] h-full rounded-full transition-all duration-500" style={{ width: `${pct}%` }}></div>
          </div>
          <div className="text-[10px] text-gray-500 truncate" title={currentStep?.title}>
            {p.isCompleted ? '✅ Tuntas' : (currentStep ? `👉 ${currentStep.title}` : 'Menunggu')}
          </div>
        </div>
      )
    }},
    {
      key: 'actions', label: 'Aksi Cepat', render: (_: any, p: TrackingProject) => {
        const hasActionable = p.timelineData.some(s => s.status !== 'done');
        const currentStep = p.timelineData.find(s => s.status === 'current');
        
        return (
        <div className="flex items-center gap-2">
          {hasActionable && (
            <button 
              onClick={() => confirmQuickAdvance(p)}
              className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition shadow-sm border ${
                currentStep 
                  ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' 
                  : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
              }`}
            >
              {currentStep ? '✅ Selesaikan Tahap' : '▶️ Mulai Tahap'}
            </button>
          )}
          <button onClick={() => openModal(p)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded" title="Edit Detail">
            <Edit2 size={16} />
          </button>
          <button 
            onClick={() => handleDelete(p.id)} 
            disabled={isDeletingId === p.id}
            className="p-1.5 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
            title="Hapus"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    }
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tracking Project</h1>
          <p className="text-gray-500 mt-1">Kelola progres layanan klien untuk dilacak via website.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-[#6f0000] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#850000] transition"
        >
          <Plus size={20} />
          <span>Project Baru</span>
        </button>
      </div>

      <div className="mb-6 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Cari nama klien atau resi..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6f0000]/20"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat data...</div>
        ) : (
          <DataTable
            columns={columns}
            data={filteredProjects}
            emptyMessage="Belum ada project tracking"
          />
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => !isSaving && setIsModalOpen(false)} title={formId ? 'Edit Tracking Project' : 'Buat Tracking Project'}>
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Resi (Tracking Code)</label>
              <input
                type="text"
                required
                value={trackingCode}
                onChange={e => setTrackingCode(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg font-mono text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Klien / Perusahaan</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={e => setClientName(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Layanan</label>
              <select
                value={serviceType}
                onChange={handleServiceChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg"
              >
                {TRACKING_SERVICES.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer p-2.5">
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={e => setIsCompleted(e.target.checked)}
                  className="w-4 h-4 text-[#6f0000] rounded focus:ring-[#6f0000]"
                />
                <span className="text-sm font-medium text-gray-700">Tandai Project Selesai Total</span>
              </label>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-gray-900">Timeline / Milestone</h3>
              <button type="button" onClick={addStep} className="text-sm text-[#6f0000] font-semibold hover:underline flex items-center gap-1">
                <Plus size={16} /> Tambah Langkah
              </button>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {timelineData.map((step, index) => (
                <div key={step.id} className="flex items-start gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg group">
                  <div className="pt-2 text-gray-400 font-mono text-xs">{index + 1}.</div>
                  <div className="flex-1 space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={step.title}
                        onChange={e => updateStep(step.id, 'title', e.target.value)}
                        placeholder="Nama Langkah"
                        className="flex-1 p-2 border border-gray-300 rounded text-sm"
                      />
                      <select
                        value={step.status}
                        onChange={e => updateStep(step.id, 'status', e.target.value)}
                        className={`p-2 border border-gray-300 rounded text-sm font-medium ${
                          step.status === 'done' ? 'bg-green-50 text-green-700' :
                          step.status === 'current' ? 'bg-yellow-50 text-yellow-700' :
                          'bg-gray-100 text-gray-600'
                        }`}
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="current">🔄 Sedang Diproses</option>
                        <option value="done">✅ Selesai</option>
                      </select>
                    </div>
                    
                    {(step.status === 'done' || step.status === 'current') && (
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-gray-400" />
                        <input
                          type="date"
                          value={step.date || ''}
                          onChange={e => updateStep(step.id, 'date', e.target.value)}
                          className="p-1.5 border border-gray-300 rounded text-xs text-gray-600"
                        />
                        <span className="text-xs text-gray-400 italic">Kosongkan jika belum ada tanggal pasti</span>
                      </div>
                    )}
                  </div>
                  <button type="button" onClick={() => removeStep(step.id)} className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition">
                    <X size={16} />
                  </button>
                </div>
              ))}
              {timelineData.length === 0 && (
                <div className="text-center py-6 text-gray-500 text-sm">Belum ada timeline. Klik "Tambah Langkah".</div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition font-medium">Batal</button>
            <button type="submit" disabled={isSaving} className="px-4 py-2 bg-[#6f0000] text-white rounded-lg hover:bg-[#850000] transition font-bold disabled:opacity-50 flex items-center gap-2">
              {isSaving ? 'Menyimpan...' : (formId ? 'Simpan Perubahan' : 'Buat Project')}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!quickActionProject} onClose={() => !isSaving && setQuickActionProject(null)} title="Update Progress Tahapan">
        {quickActionProject && quickActionStep && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <div className="text-xs text-blue-500 font-bold uppercase tracking-wider mb-1">Klien</div>
              <div className="font-bold text-gray-900">{quickActionProject.clientName}</div>
              <div className="text-sm text-gray-600">{quickActionProject.trackingCode} • {quickActionProject.serviceType}</div>
            </div>

            <div className="text-center py-4">
              <div className="text-sm text-gray-500 mb-2">Tahap yang akan diupdate:</div>
              <h3 className="text-xl font-extrabold text-[#6f0000]">{quickActionStep.title}</h3>
              <div className="mt-2 inline-flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 line-through">{quickActionStep.status === 'pending' ? 'Menunggu' : 'Sedang Diproses'}</span>
                <span className="text-gray-400">➔</span>
                <span className={`text-xs font-bold px-2 py-1 rounded ${quickActionStep.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                  {quickActionStep.status === 'pending' ? 'Mulai Dikerjakan' : 'Tandai Selesai'}
                </span>
              </div>
            </div>

            {quickActionStep.status !== 'pending' && (
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tanggal Selesai</label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="date"
                      value={quickActionDate}
                      onChange={e => setQuickActionDate(e.target.value)}
                      className="w-full pl-10 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6f0000]/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Tanggal ini akan ditampilkan di halaman tracking klien.</p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-6 border-t">
              <button onClick={() => setQuickActionProject(null)} className="px-4 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition">Batal</button>
              <button 
                onClick={executeQuickAdvance} 
                disabled={isSaving} 
                className={`px-6 py-2.5 text-white rounded-xl font-bold transition flex items-center gap-2 ${quickActionStep.status === 'pending' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {isSaving ? 'Menyimpan...' : (quickActionStep.status === 'pending' ? 'Mulai Tahap Ini' : 'Selesaikan Tahap')}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
