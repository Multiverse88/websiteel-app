import { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface TrackingProject {
  id: string;
  trackingCode: string;
  clientName: string;
  serviceType: string;
  timelineData: any[];
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface DashboardStats {
  totalArticles: number;
  totalSubscribers: number;
  activeCampaigns: number;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    totalSubscribers: 0,
    activeCampaigns: 0,
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
  });
  const [recentProjects, setRecentProjects] = useState<TrackingProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const [articles, subscribers, campaigns, projects] = await Promise.all([
        api.getArticles().catch(() => []),
        api.getNewsletter().catch(() => []),
        api.getCampaigns().catch(() => []),
        api.getTrackingProjects().catch(() => []),
      ]);

      const projectsArray = Array.isArray(projects) ? projects : [];
      const activeProjects = projectsArray.filter((p: TrackingProject) => 
        !p.isCompleted && p.timelineData?.some((s: any) => s.status === 'current' || s.status === 'pending')
      ).length;
      const completedProjects = projectsArray.filter((p: TrackingProject) => p.isCompleted).length;

      setStats({
        totalArticles: Array.isArray(articles) ? articles.length : 0,
        totalSubscribers: Array.isArray(subscribers) ? subscribers.length : 0,
        activeCampaigns: Array.isArray(campaigns) ? campaigns.length : 0,
        totalProjects: projectsArray.length,
        activeProjects,
        completedProjects,
      });

      setRecentProjects(projectsArray.slice(0, 5));
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getProjectProgress = (project: TrackingProject) => {
    const doneCount = project.timelineData?.filter((s: any) => s.status === 'done').length || 0;
    const total = project.timelineData?.length || 0;
    return total > 0 ? Math.round((doneCount / total) * 100) : 0;
  };

  const getCurrentStep = (project: TrackingProject) => {
    return project.timelineData?.find((s: any) => s.status === 'current') 
        || project.timelineData?.find((s: any) => s.status === 'pending');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-[32px]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] font-sans text-gray-900">Overview</h2>
            <p className="text-[14px] leading-[22px] font-sans text-gray-500 mt-1">Key metrics and recent activity across your legal ecosystem.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 p-[20px] animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-20 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-[32px]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-[24px] leading-[32px] font-semibold tracking-[-0.01em] font-sans text-gray-900">Overview</h2>
          <p className="text-[14px] leading-[22px] font-sans text-gray-500 mt-1">Key metrics and recent activity across your legal ecosystem.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => window.location.hash = '#/tracking'}
            className="bg-white border border-gray-200 font-semibold text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">location_on</span> Tracking Project
          </button>
          <button 
            onClick={() => window.location.hash = '#/email-blast/tambah'}
            className="bg-[#6f0000] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#7A0101] transition-colors shadow-sm text-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">add</span> New Campaign
          </button>
        </div>
      </div>

      {/* Bento Grid: Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Articles */}
        <div className="bg-white rounded-xl border border-gray-200 p-[20px] flex flex-col justify-between group hover:shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest font-mono">Total Articles</span>
            <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#6f0000] group-hover:bg-[#6f0000] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">description</span>
            </div>
          </div>
          <div>
            <div className="text-[32px] leading-[40px] font-bold tracking-[-0.02em] font-sans text-gray-900">{stats.totalArticles}</div>
            <div className="flex items-center gap-1 mt-1 text-sm">
              <span className="text-gray-500">articles published</span>
            </div>
          </div>
        </div>

        {/* Total Subscribers */}
        <div className="bg-white rounded-xl border border-gray-200 p-[20px] flex flex-col justify-between group hover:shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest font-mono">Total Subscribers</span>
            <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#6f0000] group-hover:bg-[#6f0000] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">group</span>
            </div>
          </div>
          <div>
            <div className="text-[32px] leading-[40px] font-bold tracking-[-0.02em] font-sans text-gray-900">{stats.totalSubscribers.toLocaleString()}</div>
            <div className="flex items-center gap-1 mt-1 text-sm">
              <span className="text-gray-500">active subscribers</span>
            </div>
          </div>
        </div>

        {/* Active Campaigns */}
        <div className="bg-white rounded-xl border border-gray-200 p-[20px] flex flex-col justify-between group hover:shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest font-mono">Campaigns</span>
            <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#6f0000] group-hover:bg-[#6f0000] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">campaign</span>
            </div>
          </div>
          <div>
            <div className="text-[32px] leading-[40px] font-bold tracking-[-0.02em] font-sans text-gray-900">{stats.activeCampaigns}</div>
            <div className="flex items-center gap-1 mt-1 text-sm">
              <span className="text-gray-500">email campaigns</span>
            </div>
          </div>
        </div>

        {/* Total Projects */}
        <div className="bg-white rounded-xl border border-gray-200 p-[20px] flex flex-col justify-between group hover:shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest font-mono">Tracking Projects</span>
            <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center text-[#6f0000] group-hover:bg-[#6f0000] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">location_on</span>
            </div>
          </div>
          <div>
            <div className="text-[32px] leading-[40px] font-bold tracking-[-0.02em] font-sans text-gray-900">{stats.totalProjects}</div>
            <div className="flex items-center gap-2 mt-1 text-sm">
              <span className="text-emerald-600 font-medium">{stats.completedProjects} selesai</span>
              <span className="text-gray-400">•</span>
              <span className="text-amber-600 font-medium">{stats.activeProjects} aktif</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        {/* Recent Tracking Projects (Spans 8 cols on large screens) */}
        <div className="lg:col-span-8 bg-white rounded-[32px] border border-gray-200 p-6 md:p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[18px] leading-[24px] font-semibold font-sans text-gray-900">Recent Tracking Projects</h3>
            <button 
              onClick={() => window.location.hash = '#/tracking'}
              className="text-[11px] font-semibold tracking-widest font-mono text-[#6f0000] hover:text-[#990202] uppercase"
            >
              View All
            </button>
          </div>
          
          {recentProjects.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">location_on</span>
                <p className="text-sm">Belum ada project tracking</p>
                <button 
                  onClick={() => window.location.hash = '#/tracking'}
                  className="mt-2 text-sm text-[#6f0000] font-medium hover:underline"
                >
                  Buat Project Baru
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              {recentProjects.map((project) => {
                const progress = getProjectProgress(project);
                const currentStep = getCurrentStep(project);
                
                return (
                  <div 
                    key={project.id}
                    className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-[#6f0000]/30 transition cursor-pointer"
onClick={() => window.location.hash = '#/tracking'}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-semibold text-[#6f0000] bg-[#6f0000]/10 px-2 py-0.5 rounded">
                            {project.trackingCode}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            project.isCompleted 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {project.isCompleted ? 'SELESAI' : 'AKTIF'}
                          </span>
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{project.clientName}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{project.serviceType}</p>
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg font-bold text-gray-900">{progress}%</div>
                        <div className="w-20 bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-[#6f0000] h-full rounded-full transition-all duration-500" 
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {currentStep && !project.isCompleted && (
                      <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                        <span className="text-[#6f0000]">→</span>
                        <span>{currentStep.title}</span>
                      </div>
                    )}
                    
                    <div className="mt-2 text-[10px] text-gray-400">
                      {formatDate(project.createdAt)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Stats Panel (Spans 4 cols on large screens) */}
        <div className="lg:col-span-4 bg-white rounded-[32px] border border-gray-200 p-6 md:p-8 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[18px] leading-[24px] font-semibold font-sans text-gray-900">Project Summary</h3>
          </div>
          <div className="flex-1 space-y-6">
            {/* Active Projects Breakdown */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sedang Diproses</span>
                <span className="text-sm font-bold text-amber-600">{stats.activeProjects}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: stats.totalProjects > 0 ? `${(stats.activeProjects / stats.totalProjects) * 100}%` : '0%' }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Selesai</span>
                <span className="text-sm font-bold text-emerald-600">{stats.completedProjects}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: stats.totalProjects > 0 ? `${(stats.completedProjects / stats.totalProjects) * 100}%` : '0%' }}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Quick Actions */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Quick Actions</h4>
              <button 
                onClick={() => window.location.hash = '#/tracking'}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-left hover:border-[#6f0000]/30 hover:bg-[#6f0000]/5 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#6f0000]/10 flex items-center justify-center text-[#6f0000] group-hover:bg-[#6f0000] group-hover:text-white transition">
                    <span className="material-symbols-outlined text-lg">add</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Buat Project Baru</div>
                    <div className="text-xs text-gray-500">Tambah tracking project klien</div>
                  </div>
                </div>
              </button>
              
              <button 
                onClick={() => window.location.hash = '#/articles/tambah'}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-left hover:border-[#6f0000]/30 hover:bg-[#6f0000]/5 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#6f0000]/10 flex items-center justify-center text-[#6f0000] group-hover:bg-[#6f0000] group-hover:text-white transition">
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Tulis Artikel Baru</div>
                    <div className="text-xs text-gray-500">Buat konten hukum terbaru</div>
                  </div>
                </div>
              </button>
              
              <button 
                onClick={() => window.location.hash = '#/email-blast'}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-left hover:border-[#6f0000]/30 hover:bg-[#6f0000]/5 transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#6f0000]/10 flex items-center justify-center text-[#6f0000] group-hover:bg-[#6f0000] group-hover:text-white transition">
                    <span className="material-symbols-outlined text-lg">campaign</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Kirim Email Blast</div>
                    <div className="text-xs text-gray-500">Broadcast ke subscriber</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
