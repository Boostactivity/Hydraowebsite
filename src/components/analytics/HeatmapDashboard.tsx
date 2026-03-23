import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MousePointer, 
  Eye, 
  Click,
  Move,
  PlayCircle,
  Pause,
  SkipForward,
  Calendar,
  Filter,
  TrendingUp,
  Users,
  Zap,
  MapPin,
  Activity,
  Download
} from 'lucide-react';

type HeatmapType = 'clicks' | 'scroll' | 'move' | 'attention';
type DeviceType = 'all' | 'desktop' | 'mobile' | 'tablet';

interface SessionRecording {
  id: string;
  userId: string;
  duration: number;
  date: Date;
  device: 'desktop' | 'mobile' | 'tablet';
  conversions: number;
  pageViews: number;
  thumbnail: string;
}

export function HeatmapDashboard() {
  const [heatmapType, setHeatmapType] = useState<HeatmapType>('clicks');
  const [deviceFilter, setDeviceFilter] = useState<DeviceType>('all');
  const [selectedRecording, setSelectedRecording] = useState<SessionRecording | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock heatmap data
  const heatmapData = {
    clicks: [
      { x: 20, y: 15, intensity: 95, label: 'CTA Principal' },
      { x: 45, y: 30, intensity: 75, label: 'Calculateur' },
      { x: 65, y: 50, intensity: 60, label: 'Avis clients' },
      { x: 30, y: 70, intensity: 45, label: 'FAQ' },
      { x: 80, y: 25, intensity: 85, label: 'Acheter maintenant' }
    ],
    scroll: [
      { depth: 100, users: 100 },
      { depth: 75, users: 85 },
      { depth: 50, users: 60 },
      { depth: 25, users: 40 },
      { depth: 0, users: 15 }
    ]
  };

  // Mock session recordings
  const recordings: SessionRecording[] = [
    { id: '1', userId: 'user-456', duration: 180, date: new Date(), device: 'desktop', conversions: 1, pageViews: 5, thumbnail: '🖥️' },
    { id: '2', userId: 'user-789', duration: 240, date: new Date(), device: 'mobile', conversions: 0, pageViews: 8, thumbnail: '📱' },
    { id: '3', userId: 'user-123', duration: 120, date: new Date(), device: 'tablet', conversions: 1, pageViews: 3, thumbnail: '📲' }
  ];

  const stats = {
    totalSessions: 12547,
    avgDuration: 156,
    conversionRate: 4.8,
    topClickZone: 'CTA Principal (95%)'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            Analytics Avancées
          </motion.h1>
          <p className="text-gray-600">
            Heatmaps, session recordings et insights comportementaux
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Sessions totales</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalSessions.toLocaleString()}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">Durée moyenne</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.avgDuration}s</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Taux conversion</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.conversionRate}%</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 border border-gray-200"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-sm text-gray-600">Zone top clics</span>
            </div>
            <div className="text-lg font-bold text-gray-900">{stats.topClickZone}</div>
          </motion.div>
        </div>

        {/* Heatmap Controls */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Heatmaps Interactives</h2>
            <div className="flex gap-3">
              <select
                value={deviceFilter}
                onChange={(e) => setDeviceFilter(e.target.value as DeviceType)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#6B1E3E] focus:outline-none"
              >
                <option value="all">Tous appareils</option>
                <option value="desktop">Desktop</option>
                <option value="mobile">Mobile</option>
                <option value="tablet">Tablet</option>
              </select>
              <button className="px-4 py-2 bg-[#6B1E3E] text-white rounded-lg font-semibold hover:bg-[#8B2E4E] transition-colors flex items-center gap-2">
                <Download className="w-4 h-4" />
                <span>Exporter</span>
              </button>
            </div>
          </div>

          {/* Heatmap Type Selector */}
          <div className="flex gap-2 mb-6">
            {[
              { type: 'clicks', icon: Click, label: 'Clics', color: 'red' },
              { type: 'scroll', icon: Move, label: 'Scroll', color: 'blue' },
              { type: 'move', icon: MousePointer, label: 'Mouvement', color: 'purple' },
              { type: 'attention', icon: Eye, label: 'Attention', color: 'orange' }
            ].map((item) => (
              <button
                key={item.type}
                onClick={() => setHeatmapType(item.type as HeatmapType)}
                className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                  heatmapType === item.type
                    ? `bg-${item.color}-500 text-white shadow-lg`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Heatmap Visualization */}
          <div className="relative bg-gray-100 rounded-xl overflow-hidden" style={{ height: '500px' }}>
            {/* Mock page preview */}
            <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-100 p-8">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-32 bg-gray-100 rounded"></div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg shadow-sm p-4 h-40"></div>
                  <div className="bg-white rounded-lg shadow-sm p-4 h-40"></div>
                  <div className="bg-white rounded-lg shadow-sm p-4 h-40"></div>
                </div>
              </div>
            </div>

            {/* Heatmap overlay - Click points */}
            {heatmapType === 'clicks' && heatmapData.clicks.map((point, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.7 }}
                transition={{ delay: index * 0.1 }}
                className="absolute"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  width: `${point.intensity}px`,
                  height: `${point.intensity}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div 
                  className="w-full h-full rounded-full"
                  style={{
                    background: `radial-gradient(circle, rgba(239, 68, 68, ${point.intensity / 100}) 0%, rgba(239, 68, 68, 0) 70%)`
                  }}
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-semibold whitespace-nowrap">
                  {point.label} {point.intensity}%
                </div>
              </motion.div>
            ))}

            {/* Scroll depth visualization */}
            {heatmapType === 'scroll' && (
              <div className="absolute right-8 top-0 bottom-0 w-24">
                <div className="h-full bg-gradient-to-b from-green-500 via-yellow-500 to-red-500 rounded-lg opacity-30"></div>
                {heatmapData.scroll.map((depth, index) => (
                  <div
                    key={index}
                    className="absolute right-0 left-0 flex items-center justify-between text-xs font-semibold"
                    style={{ top: `${100 - depth.depth}%` }}
                  >
                    <div className="bg-white px-2 py-1 rounded shadow">
                      {depth.users}% users
                    </div>
                    <div className="text-gray-600">{depth.depth}%</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm text-gray-600">Haute activité (80-100%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span className="text-sm text-gray-600">Moyenne (50-80%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-gray-600">Basse (20-50%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-sm text-gray-600">Très basse (&lt;20%)</span>
            </div>
          </div>
        </div>

        {/* Session Recordings */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Session Recordings</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:border-gray-400 transition-colors flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Dernières 24h</span>
              </button>
              <button className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold hover:border-gray-400 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>Filtres</span>
              </button>
            </div>
          </div>

          {/* Recordings List */}
          <div className="space-y-3">
            {recordings.map((recording) => (
              <div
                key={recording.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => setSelectedRecording(recording)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-3xl">
                    {recording.thumbnail}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 mb-1">
                      Session {recording.userId}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{recording.duration}s</span>
                      <span>•</span>
                      <span>{recording.pageViews} pages</span>
                      <span>•</span>
                      <span>{recording.device}</span>
                      <span>•</span>
                      <span>{recording.date.toLocaleTimeString('fr-FR')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {recording.conversions > 0 && (
                    <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      ✓ Converti
                    </div>
                  )}
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <PlayCircle className="w-6 h-6 text-[#6B1E3E]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Session Player Modal */}
        <AnimatePresence>
          {selectedRecording && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
              onClick={() => setSelectedRecording(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl max-w-6xl w-full p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Session Recording - {selectedRecording.userId}
                  </h3>
                  <button
                    onClick={() => setSelectedRecording(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Player */}
                <div className="bg-gray-100 rounded-xl mb-4" style={{ height: '500px' }}>
                  <div className="h-full flex items-center justify-center text-gray-400">
                    Session replay player (intégration avec Hotjar, LogRocket, etc.)
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-3 bg-[#6B1E3E] text-white rounded-lg hover:bg-[#8B2E4E] transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
                  </button>
                  <button className="p-3 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                    <SkipForward className="w-5 h-5 text-gray-600" />
                  </button>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-[#6B1E3E] rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">0:45 / {selectedRecording.duration}s</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
