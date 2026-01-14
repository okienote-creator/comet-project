export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-50">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg animate-spin"></div>
        <div className="absolute inset-1 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-lg flex items-center justify-center">
          <div className="text-2xl font-bold text-purple-400">VQ</div>
        </div>
      </div>
    </div>
  );
}
