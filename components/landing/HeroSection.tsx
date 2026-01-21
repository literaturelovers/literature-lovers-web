import React from "react";

export default function HeroSection() {
  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white px-4 py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Welcome to Literature Lovers</h1>
      <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto">Discover, read, and share your favorite e-books. Join a vibrant community of book enthusiasts and unlock a world of knowledge and stories.</p>
      <a href="/auth/login" className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-100 transition">Get Started</a>
    </section>
  );
}
