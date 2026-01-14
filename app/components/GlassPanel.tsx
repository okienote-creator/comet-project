'use client';

interface GlassPanelProps {
  title: string;
  icon: string;
  description: string;
}

export default function GlassPanel({ title, icon, description }: GlassPanelProps) {
  return (
    <div className="glass-panel group cursor-pointer">
      <div className="glass-glare"></div>
      <div className="relative z-10">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-purple-200 text-sm">{description}</p>
      </div>
    </div>
  );
}
