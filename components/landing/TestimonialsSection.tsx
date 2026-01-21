import React from "react";

const testimonials = [
  {
    name: "Xyz A.",
    text: "Literature Lovers helped me find amazing books and connect with other readers! Highly recommended.",
  },
  {
    name: "Abc S.",
    text: "The personalized recommendations are spot on. My reading list keeps growing!",
  },
  {
    name: "Jkl H.",
    text: "A beautiful platform for book lovers. The community is so welcoming!",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl shadow p-6 flex flex-col items-center text-center">
              <p className="text-lg italic mb-4">“{t.text}”</p>
              <span className="font-semibold text-blue-700">{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
