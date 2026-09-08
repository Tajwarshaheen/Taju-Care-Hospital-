export default function About() {
  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-900 mb-8">About Taju Care Hospital</h1>
      <p className="text-lg text-slate-600 mb-12 max-w-3xl">
        Founded in 2000, Taju Care Hospital has been at the forefront of providing exceptional healthcare services to our community. Our state-of-the-art facilities and compassionate staff ensure that every patient receives the best possible care.
      </p>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="bg-blue-50 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Mission</h2>
          <p className="text-blue-800">To deliver high-quality, patient-centered healthcare with excellence, compassion, and innovation, improving the health and well-being of the communities we serve.</p>
        </div>
        <div className="bg-teal-50 p-8 rounded-3xl">
          <h2 className="text-2xl font-bold text-teal-900 mb-4">Our Vision</h2>
          <p className="text-teal-800">To be the premier healthcare provider recognized for outstanding clinical outcomes, exceptional patient experiences, and continuous advancement in medical science.</p>
        </div>
      </div>
      
      {/* Facilities & Achievements would go here */}
    </div>
  );
}
