import React from "react";

export default function CallToActionSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Reading Journey?</h2>
        <p className="text-lg mb-8">Sign up now and join a passionate community of literature lovers.</p>
        <a href="/auth/login" className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-100 transition">Join Now</a>
      </div>
    </section>
  );
}
