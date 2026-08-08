export type TrackingStepStatus = 'pending' | 'current' | 'done';

export interface TrackingStep {
  id: string; // unique string id for the step, e.g. "pt-1"
  title: string;
  status: TrackingStepStatus;
  date: string | null;
}

export const TRACKING_TEMPLATES: Record<string, TrackingStep[]> = {
  'Pendirian PT': [
    { id: '1', title: 'Pemberkasan Dokumen', status: 'pending', date: null },
    { id: '2', title: 'Pengecekan Nama PT', status: 'pending', date: null },
    { id: '3', title: 'Drafting Akta Notaris', status: 'pending', date: null },
    { id: '4', title: 'Tanda Tangan Akta', status: 'pending', date: null },
    { id: '5', title: 'SK Kemenkumham Terbit', status: 'pending', date: null },
    { id: '6', title: 'NIB & Izin Usaha Terbit', status: 'pending', date: null },
    { id: '7', title: 'Penyerahan Dokumen', status: 'pending', date: null },
  ],
  'Pendirian CV': [
    { id: '1', title: 'Pemberkasan Dokumen', status: 'pending', date: null },
    { id: '2', title: 'Pengecekan Nama CV', status: 'pending', date: null },
    { id: '3', title: 'Drafting Akta Notaris', status: 'pending', date: null },
    { id: '4', title: 'Tanda Tangan Akta', status: 'pending', date: null },
    { id: '5', title: 'SK Kemenkumham Terbit', status: 'pending', date: null },
    { id: '6', title: 'NIB & Izin Usaha Terbit', status: 'pending', date: null },
    { id: '7', title: 'Penyerahan Dokumen', status: 'pending', date: null },
  ],
  'Pendaftaran Merek': [
    { id: '1', title: 'Pemberkasan & Pengecekan', status: 'pending', date: null },
    { id: '2', title: 'Pendaftaran DJKI', status: 'pending', date: null },
    { id: '3', title: 'Pemeriksaan Formalitas', status: 'pending', date: null },
    { id: '4', title: 'Masa Pengumuman', status: 'pending', date: null },
    { id: '5', title: 'Pemeriksaan Substantif', status: 'pending', date: null },
    { id: '6', title: 'Sertifikat Merek Terbit', status: 'pending', date: null },
  ],
  'Perubahan Akta': [
    { id: '1', title: 'Pemberkasan & RUPS', status: 'pending', date: null },
    { id: '2', title: 'Drafting Akta Perubahan', status: 'pending', date: null },
    { id: '3', title: 'Tanda Tangan Akta', status: 'pending', date: null },
    { id: '4', title: 'SK Kemenkumham Terbit', status: 'pending', date: null },
    { id: '5', title: 'Update NIB & Izin Usaha', status: 'pending', date: null },
  ],
  'Layanan Lainnya': [
    { id: '1', title: 'Pemberkasan', status: 'pending', date: null },
    { id: '2', title: 'Proses Pengerjaan', status: 'pending', date: null },
    { id: '3', title: 'Selesai', status: 'pending', date: null },
  ]
};

export const getTrackingTemplate = (serviceType: string): TrackingStep[] => {
  const template = TRACKING_TEMPLATES[serviceType] || TRACKING_TEMPLATES['Layanan Lainnya'];
  // Clone to avoid mutation
  return JSON.parse(JSON.stringify(template));
};

export const TRACKING_SERVICES = Object.keys(TRACKING_TEMPLATES);
