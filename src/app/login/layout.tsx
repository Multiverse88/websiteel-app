export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-shell min-h-screen bg-gray-50 flex flex-col justify-center">
      {children}
    </div>
  );
}
