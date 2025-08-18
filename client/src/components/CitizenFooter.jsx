import React from 'react'

const CitizenFooter = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-12 mt-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
        </div>
        
        <div className="container mx-auto px-5 relative z-10">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                🏛️
              </div>
              <div className="text-2xl font-bold">Indore Municipal Corporation</div>
            </div>
            <p className="text-blue-200 max-w-2xl mx-auto">
              Building a cleaner, smarter, and more efficient Indore for all citizens through innovative solutions and dedicated service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-300">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Submit Complaint</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Track Status</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Apply for Services</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Download Forms</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-300">Information</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">About IMC</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">RTI Information</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Citizen Charter</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Feedback</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-300">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Terms of Use</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Disclaimer</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-yellow-300">Connect</h3>
              <div className="flex gap-3 mb-4">
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-yellow-300 hover:text-blue-900 transition-all duration-300">📘</a>
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-yellow-300 hover:text-blue-900 transition-all duration-300">🐦</a>
                <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-yellow-300 hover:text-blue-900 transition-all duration-300">📷</a>
              </div>
              <p className="text-sm text-blue-200">Follow us for updates</p>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-white/20">
            <p className="text-blue-200">&copy; 2024 Indore Municipal Corporation. All rights reserved.</p>
            <p className="text-sm text-blue-300 mt-2">Last updated: August 10, 2024</p>
          </div>
        </div>
      </footer>
  )
}

export default CitizenFooter