import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-lg text-slate-600">We are here to help. Reach out to us for any inquiries or emergencies.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Our Location</h3>
                <p className="text-slate-600 text-sm">123 Healthcare Ave, Medical District, NY 10001, USA</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Phone Number</h3>
                <p className="text-slate-600 text-sm">+1 (555) 123-4567<br/>Emergency: 911</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Email Address</h3>
                <p className="text-slate-600 text-sm">contact@tajucare.com<br/>support@tajucare.com</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Opening Hours</h3>
                <p className="text-slate-600 text-sm">Mon-Sun: 24/7 (Emergency)<br/>Outpatient: 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h3>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Your Name</label>
                  <input type="text" required className="w-full border-slate-200 rounded-xl py-3 px-4 border focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input type="email" required className="w-full border-slate-200 rounded-xl py-3 px-4 border focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                <input type="text" required className="w-full border-slate-200 rounded-xl py-3 px-4 border focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea required rows={5} className="w-full border-slate-200 rounded-xl py-3 px-4 border focus:ring-blue-500 focus:border-blue-500"></textarea>
              </div>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-8 rounded-xl transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
