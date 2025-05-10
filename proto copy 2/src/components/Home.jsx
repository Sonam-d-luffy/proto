import React from "react";
import { Leaf, CloudRain, TreePine, Droplets, AlertTriangle } from "lucide-react";
import { useNavigate , Link} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    const homepage = () => {
        navigate("/")
    }
  return (
    <main className="text-gray-800 bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section - Bigger and Glossier */}
      <section className="bg-gradient-to-r from-green-500 to-emerald-600 py-24 text-center text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-lg"></div>
        <div className="relative z-10">
          <Leaf className="inline-block mb-4 text-white w-16 h-16" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Environment Reporter</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto font-light">
            Join our global community to protect and preserve our planet. 
            Report issues, raise awareness, and drive meaningful action.
          </p>
            <Link to="/report">
          <button className="mt-8 bg-white text-green-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-50 transition-all shadow-lg">
            Get Started
          </button>
                    </Link>
        </div>
      </section>

      {/* What We Do Section - More Visually Engaging */}
      <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-green-800 text-center">What We Do</h2>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-t-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <AlertTriangle className="text-green-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-green-700 mb-3">Report Issues</h3>
            <p className="text-gray-600">
              Document environmental concerns in your area with our easy-to-use reporting system.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-t-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <CloudRain className="text-green-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-green-700 mb-3">Raise Awareness</h3>
            <p className="text-gray-600">
              Share your findings with local communities and bring attention to environmental challenges.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-t-4 border-green-500">
            <div className="bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
              <TreePine className="text-green-600 w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-green-700 mb-3">Take Action</h3>
            <p className="text-gray-600">
              Connect with NGOs and environmental groups who can implement solutions.
            </p>
          </div>
        </div>
        
        <p className="text-gray-700 max-w-4xl mx-auto mt-12 text-lg text-center">
          Our platform enables individuals to report critical environmental issues like soil degradation,
          water pollution, and deforestation. This data is then shared with organizations capable of making a difference.
        </p>
      </section>

      {/* Environmental Activities - Visual Gallery */}
      <section className="py-16 px-6 bg-green-50">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-green-800 text-center">Environmental Impact</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-xl shadow-lg group">
            <div className="h-64 bg-green-200 flex items-center justify-center">
              <img src="/api/placeholder/600/400" alt="Conservation efforts" className="w-full h-full object-cover" />
            </div>
            <div className="p-6 bg-white">
              <h3 className="font-bold text-xl text-green-700">Forest Conservation</h3>
              <p className="text-gray-600 mt-2">Protecting critical habitats and biodiversity hotspots</p>
            </div>
          </div>
          
          <div className="overflow-hidden rounded-xl shadow-lg group">
            <div className="h-64 bg-green-200 flex items-center justify-center">
              <img src="/api/placeholder/600/400" alt="Water protection" className="w-full h-full object-cover" />
            </div>
            <div className="p-6 bg-white">
              <h3 className="font-bold text-xl text-green-700">Water Protection</h3>
              <p className="text-gray-600 mt-2">Ensuring clean water sources for communities worldwide</p>
            </div>
          </div>
          
          <div className="overflow-hidden rounded-xl shadow-lg group">
            <div className="h-64 bg-green-200 flex items-center justify-center">
              <img src="/api/placeholder/600/400" alt="Community action" className="w-full h-full object-cover" />
            </div>
            <div className="p-6 bg-white">
              <h3 className="font-bold text-xl text-green-700">Community Action</h3>
              <p className="text-gray-600 mt-2">Empowering local groups to drive environmental change</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Report - More Visual */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-green-800 text-center">How to Report an Issue</h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-500">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="font-semibold text-green-700 mb-2">Create Account</h3>
              <p className="text-gray-600 text-sm">Sign up for free access to all reporting tools</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-500">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-green-700 mb-2">Capture Evidence</h3>
              <p className="text-gray-600 text-sm">Take photos or videos of environmental issues</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-500">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="font-semibold text-green-700 mb-2">Add Details</h3>
              <p className="text-gray-600 text-sm">Describe the issue and its potential impact</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-500">
                <span className="text-2xl font-bold text-green-600">4</span>
              </div>
              <h3 className="font-semibold text-green-700 mb-2">Submit Report</h3>
              <p className="text-gray-600 text-sm">Your location is automatically included</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-md transition-all">
              Start Reporting Now
            </button>
          </div>
        </div>
      </section>

      {/* About Us - Enhanced */}
      <section className="py-16 px-6 bg-gradient-to-b from-green-100 to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <Droplets className="inline-block mb-4 text-green-600 w-12 h-12" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-800">About Us</h2>
          <p className="text-lg text-gray-700 mb-8">
            Environment Reporter is a student-driven initiative connecting communities with
            environmental NGOs through real-time issue reporting. Our mission is to create a
            network of active environmental stewards worldwide.
          </p>
          <p className="text-lg text-gray-700">
            Together, we can make a sustainable impact and protect our planet for future generations.
            Join our growing community of over 5,000 environmental advocates around the world.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <div className="px-6 py-3 bg-white rounded-full shadow-md">
              <span className="font-bold text-green-700">5,000+</span> 
              <span className="text-gray-600 ml-1">Active Users</span>
            </div>
            <div className="px-6 py-3 bg-white rounded-full shadow-md">
              <span className="font-bold text-green-700">3,200+</span> 
              <span className="text-gray-600 ml-1">Reports Filed</span>
            </div>
            <div className="px-6 py-3 bg-white rounded-full shadow-md">
              <span className="font-bold text-green-700">120+</span> 
              <span className="text-gray-600 ml-1">Partner NGOs</span>
            </div>
          </div>
        </div>
      </section>


            <section className="py-12 bg-green-600 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
                <p className="max-w-2xl mx-auto mb-8 text-green-50">
                    Join thousands of environmental advocates working together to preserve our planet.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                    <Link to="/UserRegister">
                        <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all shadow-md">
                            Sign Up Now
                        </button>
                    </Link>
                    <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all">
                        Learn More
                    </button>
                </div>
            </section>

      {/* Footer - Enhanced */}
      <footer className="py-10 bg-green-800 text-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold flex items-center">
                <Leaf className="mr-2" /> Environment Reporter
              </h2>
              <p className="text-green-200 mt-2">Empowering environmental action worldwide</p>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="hover:text-white">About</a>
              <a href="#" className="hover:text-white">Reports</a>
              <a href="#" className="hover:text-white">Resources</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
          </div>
          
          <div className="pt-6 mt-6 border-t border-green-700 text-center text-green-200">
            &copy; {new Date().getFullYear()} Environment Reporter | Built with 💚 for the planet
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
