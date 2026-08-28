import { useAuth } from '../lib/auth'

const navItems = [
  { icon: 'dashboard', label: 'Dashboard', path: '#/dashboard' },
  { icon: 'description', label: 'Artikel', path: '#/articles' },
  { icon: 'mail_outline', label: 'Newsletter', path: '#/newsletter' },
  { icon: 'campaign', label: 'Email Blasting', path: '#/email-blast' },
  { icon: 'web', label: 'Landing Pages', path: '#/landing-pages' },
  { icon: 'place', label: 'Tracking Project', path: '#/tracking' },
  { icon: 'group', label: 'Subscriber', path: '#/contacts' },
  { icon: 'shuffle', label: 'Redirects', path: '#/redirects' },
  { icon: 'local_offer', label: 'Promos', path: '#/promos' },
  { icon: 'phone_in_talk', label: 'Rotator WhatsApp', path: '#/whatsapp-rotator' },
  { icon: 'group', label: 'Leads WhatsApp', path: '#/whatsapp-leads' },
  { icon: 'settings', label: 'Settings', path: '#/settings' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const hash = window.location.hash || '#/dashboard'

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      {/* SideNavBar from Stitch */}
      <nav className="fixed left-0 top-0 h-full w-[260px] bg-surface dark:bg-inverse-surface border-r border-border-base dark:border-secondary-fixed-variant flex flex-col py-6 z-50">
        <div className="px-6 mb-8 flex flex-col gap-2">
          <h1 className="text-headline-md font-headline-md font-bold text-primary dark:text-inverse-primary tracking-tight">EasyLegal</h1>
          <p className="text-label-caps font-label-caps text-secondary uppercase tracking-widest">Admin Dashboard</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = hash.startsWith(item.path)
              return (
                <li key={item.path}>
                  <a 
                    href={item.path}
                    className={`flex items-center gap-3 px-6 py-3 transition-colors duration-200 ${
                      isActive 
                        ? 'bg-oxblood-soft dark:bg-on-primary-fixed text-primary dark:text-on-primary-container border-l-4 border-primary opacity-90' 
                        : 'text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container dark:hover:bg-on-secondary-fixed-variant'
                    }`}
                  >
                    <span className={`material-symbols-outlined ${isActive ? 'icon-fill' : ''}`}>{item.icon}</span>
                    <span className="text-body-base font-body-bold">{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="mt-auto px-0 pt-4 border-t border-border-base dark:border-secondary-fixed-variant">
          <button onClick={logout} className="w-full flex items-center gap-3 px-6 py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container dark:hover:bg-on-secondary-fixed-variant transition-colors duration-200 text-left">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-body-base font-body-bold">Logout</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 ml-[260px] flex flex-col h-full relative w-full overflow-hidden">
        {/* We let the children handle the TopNavBar if it's the PageBuilder, 
            or we can render a generic TopNavBar for other pages here.
            Since PageBuilder renders its own TopNavBar, we check if it's the builder. */}
        {hash.startsWith('#/landing-pages/build') ? (
          children // PageBuilder is fully immersive
        ) : (
          <>
            <header className="h-16 bg-canvas-white/88 dark:bg-inverse-surface/88 backdrop-blur-md border-b border-border-base flex justify-between items-center px-gutter shrink-0">
              <div className="flex items-center gap-4">
                <span className="text-primary font-bold text-headline-md font-headline-md">Admin Workspace</span>
              </div>
              <div className="flex items-center gap-4 text-secondary">
                <span className="text-sm font-body-bold">Halo, {user?.username}</span>
              </div>
            </header>
            <main className="flex-1 overflow-auto p-gutter bg-surface-container-low">
              {children}
            </main>
          </>
        )}
      </div>
    </div>
  )
}
