import React from "react";
import { BookOpen, Users, Star } from "lucide-react";

const features = [
  {
    icon: <BookOpen className="w-8 h-8 text-blue-600" />,
    title: "Vast Library",
    description: "Access a wide range of e-books across genres and categories."
  },
  {
    icon: <Users className="w-8 h-8 text-purple-600" />,
    title: "Community",
    description: "Connect with fellow readers, share reviews, and join discussions."
  },
  {
    icon: <Star className="w-8 h-8 text-yellow-500" />,
    title: "Personalized",
    description: "Get recommendations tailored to your interests and reading history."
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Why Literature Lovers?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center hover:scale-105 transition-transform">
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
