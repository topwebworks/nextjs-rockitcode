import React from 'react';

const MultiPageNavigationPreview: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-200">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            🌐 Multi-Page Navigation: Building Professional Websites
          </h2>
          <p className="text-gray-600">
            Transform your single-page portfolio into a complete multi-page website with professional navigation
          </p>
        </div>

        {/* Navigation Preview */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
              <div className="text-white font-bold text-xl">Your Name</div>
              <nav className="flex space-x-6">
                <a href="#" className="text-white bg-white bg-opacity-30 px-3 py-2 rounded font-medium">Home</a>
                <a href="#" className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded transition-colors">About</a>
                <a href="#" className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded transition-colors">Projects</a>
                <a href="#" className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded transition-colors">Contact</a>
              </nav>
            </div>
          </div>
          <div className="p-6 text-center bg-gradient-to-r from-blue-50 to-purple-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Hi, I'm Your Name</h1>
            <p className="text-gray-600 mb-4">Aspiring Web Developer | Building Amazing Digital Experiences</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Learn About Me
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                View My Work
              </button>
            </div>
          </div>
        </div>

        {/* File Structure */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              📁 Professional File Structure
            </h3>
            <div className="font-mono text-sm text-gray-700 space-y-1">
              <div>my-portfolio/</div>
              <div className="ml-4">├── index.html <span className="text-gray-500">(Home page)</span></div>
              <div className="ml-4">├── about.html <span className="text-gray-500">(About page)</span></div>
              <div className="ml-4">├── projects.html <span className="text-gray-500">(Projects page)</span></div>
              <div className="ml-4">├── contact.html <span className="text-gray-500">(Contact page)</span></div>
              <div className="ml-4">├── css/</div>
              <div className="ml-8">│   └── styles.css</div>
              <div className="ml-4">├── images/</div>
              <div className="ml-8">│   ├── profile.jpg</div>
              <div className="ml-8">│   └── project1.jpg</div>
              <div className="ml-4">└── README.md</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              🎯 What You'll Learn
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-gray-700">Professional file organization</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-gray-700">Multi-page website architecture</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-gray-700">Navigation systems that work</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-gray-700">Consistent design across pages</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-gray-700">Professional user experience</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✅</span>
                <span className="text-gray-700">Mobile-responsive navigation</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-lg border border-green-200">
            <div className="text-center">
              <div className="text-2xl mb-2">🏗️</div>
              <h4 className="font-semibold text-gray-800 mb-1">Professional Structure</h4>
              <p className="text-sm text-gray-600">Organize files like real developers</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-4 rounded-lg border border-blue-200">
            <div className="text-center">
              <div className="text-2xl mb-2">🧭</div>
              <h4 className="font-semibold text-gray-800 mb-1">Smooth Navigation</h4>
              <p className="text-sm text-gray-600">Users can easily find any page</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-100 p-4 rounded-lg border border-purple-200">
            <div className="text-center">
              <div className="text-2xl mb-2">📱</div>
              <h4 className="font-semibold text-gray-800 mb-1">Mobile Ready</h4>
              <p className="text-sm text-gray-600">Works perfectly on all devices</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-3">
            Ready to build a complete professional website? 🚀
          </p>
          <div className="flex justify-center space-x-4">
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              50 minutes
            </span>
            <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Beginner Friendly
            </span>
            <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              Interactive Playground
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiPageNavigationPreview;
