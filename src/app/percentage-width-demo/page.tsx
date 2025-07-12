'use client'

export default function PercentageWidthDemo() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">📐 Percentage Width Responsive Demo</h1>
        
        <div className="space-y-8">
          {/* Example from user */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Your Example (Perfect Approach):</h2>
            <div className="p-4 rounded-t-xl bg-green-100">
              <div className="flex-col space-y-4 text-center text-white font-bold">
                <div className="w-[420px] bg-green-600 p-3 rounded">Exact width in pixels</div>
                <div className="w-[35%] bg-green-600 p-3 rounded">
                  Width based on parent percentage
                </div>
                <div className="w-[min(80vw,600px)] bg-green-600 p-3 rounded">
                  Clamp-like behavior
                </div>
              </div>
            </div>
          </div>

          {/* Monaco Editor Buttons Simulation */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Monaco Editor Action Buttons (Now Fixed):</h2>
            
            <div className="bg-[#2c2c2c] p-3 rounded">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <span className="text-[#cccccc] text-xs px-2 py-1 bg-[#1e1e1e] rounded">Output</span>
                  <span className="text-[#cccccc] text-xs px-2 py-1">Problems</span>
                  <span className="text-[#cccccc] text-xs px-2 py-1">Terminal</span>
                </div>
                
                <div className="flex-1" />
                
                {/* Action buttons with percentage-based responsive design */}
                <div 
                  className="flex items-center space-x-1"
                  style={{ 
                    minWidth: 'min(25%, 200px)',
                    padding: 'clamp(4px, 1vw, 8px)'
                  }}
                >
                  {/* View in Browser Button */}
                  <button 
                    className="demo-btn bg-[#16825d] text-white rounded text-xs flex items-center hover:bg-[#1a9966] transition-colors"
                  >
                    <span className="btn-icon-only">🌐</span>
                    <span className="btn-text-full">🌐 View in Browser</span>
                  </button>
                  
                  {/* Run Code Button */}
                  <button 
                    className="demo-btn bg-[#0e639c] text-white rounded text-xs flex items-center hover:bg-[#1177bb] transition-colors"
                  >
                    <span className="btn-icon-only">▶</span>
                    <span className="btn-text-full">▶ Run Code</span>
                  </button>
                  
                  {/* Clear Button */}
                  <button 
                    className="demo-btn text-[#cccccc] hover:text-white rounded text-xs flex items-center"
                  >
                    <span className="btn-icon-only">🗑️</span>
                    <span className="btn-text-full">🗑️ Clear</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">✅ How This Fixes the Responsive Issue</h3>
            <div className="space-y-3 text-blue-700">
              <p><strong>The Problem:</strong> Tailwind breakpoints (`md:`, `sm:`) only trigger at specific pixel widths and require JavaScript state updates.</p>
              
              <p><strong>The Solution:</strong> Use CSS percentage widths, `clamp()`, `min()`, and `max()` functions for true fluid behavior:</p>
              
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><code>width: clamp(28px, 8vw, auto)</code> - Scales with viewport width</li>
                <li><code>minWidth: min(25%, 200px)</code> - Percentage-based with max limit</li>
                <li><code>padding: clamp(4px, 1vw, 8px)</code> - Responsive padding that scales smoothly</li>
                <li><code>fontSize: clamp(10px, 1.2vw, 12px)</code> - Font size that adapts to container</li>
              </ul>
              
              <p><strong>Result:</strong> ✅ Instant responsive behavior without page refresh, smooth scaling at any screen width.</p>
            </div>
          </div>

          {/* Live Test */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-800 mb-3">🧪 Live Test Instructions</h3>
            <div className="space-y-2 text-green-700">
              <p>1. <strong>Resize this browser window</strong> by dragging the edge</p>
              <p>2. <strong>Notice</strong> how the buttons above change size and text smoothly</p>
              <p>3. <strong>No page refresh needed</strong> - everything adapts instantly</p>
              <p>4. <strong>Test the Monaco editor</strong> at <code>/fluid-responsive-test</code></p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
            .demo-btn {
              width: clamp(28px, 8vw, auto);
              height: clamp(28px, 4vh, 32px);
              padding: clamp(2px, 0.5vw, 8px) clamp(4px, 1vw, 12px);
              font-size: clamp(10px, 1.2vw, 12px);
            }
            
            .btn-text-full {
              display: none;
            }
            
            .btn-icon-only {
              display: inline;
            }
            
            /* Show full text when container is wide enough */
            @media (min-width: 600px) {
              .btn-text-full {
                display: inline;
              }
              
              .btn-icon-only {
                display: none;
              }
              
              .demo-btn {
                width: auto;
                min-width: clamp(80px, 12vw, 140px);
              }
            }
          `}</style>
    </div>
  )
}
