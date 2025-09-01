import React, { useState, useRef, useEffect } from 'react';

const LogViewer = ({ logs }) => {
  const [filter, setFilter] = useState('all');
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const logContainerRef = useRef(null);

  useEffect(() => {
    if (isAutoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = 0;
    }
  }, [logs, isAutoScroll]);

  const getLogTypeColor = (type) => {
    switch (type) {
      case 'success':
        return 'text-green-400 border-green-400/20 bg-green-400/10';
      case 'error':
        return 'text-red-400 border-red-400/20 bg-red-400/10';
      case 'warning':
        return 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10';
      default:
        return 'text-blue-400 border-blue-400/20 bg-blue-400/10';
    }
  };

  const getLogTypeIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✗';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    return log.type === filter;
  });

  const clearLogs = () => {
    // This would need to be implemented in the parent component
    // For now, we'll just show a message
    console.log('Clear logs functionality would be implemented here');
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Activity Log</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsAutoScroll(!isAutoScroll)}
            className={`px-2 py-1 text-xs rounded ${
              isAutoScroll 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-500 text-white'
            }`}
          >
            {isAutoScroll ? 'Auto' : 'Manual'}
          </button>
          <button
            onClick={clearLogs}
            className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex space-x-2 mb-4">
        {['all', 'info', 'success', 'error', 'warning'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              filter === type
                ? 'bg-blue-500 text-white'
                : 'bg-white/10 text-blue-200 hover:bg-white/20'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Log Count */}
      <div className="text-sm text-blue-200 mb-3">
        Showing {filteredLogs.length} of {logs.length} logs
      </div>

      {/* Logs Container */}
      <div 
        ref={logContainerRef}
        className="bg-black/20 rounded-lg p-4 h-64 overflow-y-auto space-y-2"
      >
        {filteredLogs.length === 0 ? (
          <div className="text-center text-blue-200 py-8">
            <div className="text-2xl mb-2">📝</div>
            <p>No logs to display</p>
            <p className="text-sm opacity-75">NFC interactions will appear here</p>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className={`p-3 rounded-lg border ${getLogTypeColor(log.type)} transition-all duration-200 hover:bg-white/5`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    log.type === 'success' ? 'bg-green-400/20' :
                    log.type === 'error' ? 'bg-red-400/20' :
                    log.type === 'warning' ? 'bg-yellow-400/20' :
                    'bg-blue-400/20'
                  }`}>
                    {getLogTypeIcon(log.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium break-words">
                      {log.message}
                    </div>
                    <div className="text-xs opacity-75 mt-1">
                      {log.timestamp}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Log Statistics */}
      <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
        <div className="text-center">
          <div className="text-blue-400 font-semibold">
            {logs.filter(log => log.type === 'info').length}
          </div>
          <div className="text-blue-200">Info</div>
        </div>
        <div className="text-center">
          <div className="text-green-400 font-semibold">
            {logs.filter(log => log.type === 'success').length}
          </div>
          <div className="text-green-200">Success</div>
        </div>
        <div className="text-center">
          <div className="text-yellow-400 font-semibold">
            {logs.filter(log => log.type === 'warning').length}
          </div>
          <div className="text-yellow-200">Warning</div>
        </div>
        <div className="text-center">
          <div className="text-red-400 font-semibold">
            {logs.filter(log => log.type === 'error').length}
          </div>
          <div className="text-red-200">Error</div>
        </div>
      </div>
    </div>
  );
};

export default LogViewer;
