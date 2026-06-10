export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col flex-grow">{children}</div>;
}
