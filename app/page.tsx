"use client";

import { featuredProjects } from "./data/carousel/carousel";
import Image from "next/image";
import ProjectCard from "./components/projectcard/projectcard";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = () => setIndex((prev) => (prev + 1) % featuredProjects.length);
  const prev = () =>
    setIndex(
      (prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length,
    );

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % featuredProjects.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <main className="min-h-screen">
      {/* Language Change */}
      <section className="flex items-center justify-center bg-linear-to-b from-blue-600 to-blue-500">
        <div className="flex flex-row items-center gap-2 m-1">
          <p className="text-sm text-white/70 italic tracking-wide">
            {lang === "es" ? "Haz click aquí -->" : "Click here -->"}
          </p>
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="px-4 py-2 text-white font-semibold rounded-xl 
             bg-linear-to-b from-blue-300 to-blue-500 
             shadow-md hover:scale-105 hover:from-blue-400 hover:to-blue-600 
             transition-transform duration-300"
          >
            {lang === "es" ? "Switch to English" : "Cambiar a Español"}
          </button>
          <p className="text-sm text-white/70 italic tracking-wide">
            {lang === "es"
              ? "<-- para cambiar a inglés."
              : "<-- to switch to Spanish."}
          </p>
        </div>
      </section>

      {/* Hero Showcase */}
      <section className="h-screen flex flex-col items-center justify-center bg-linear-to-b from-blue-500 to-blue-400 text-white relative pb-3">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">
          {lang === "es" ? "Proyectos Destacados" : "Featured Projects"}
        </h1>

        <div
          className="relative w-full max-w-5xl h-[28rem] flex items-center justify-center gap-8 px-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Previous preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`prev-${index}`}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 0.7, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="w-[40%] h-[80%] bg-white text-black p-4 shadow rounded-lg"
            >
              <img
                src={
                  featuredProjects[
                    (index - 1 + featuredProjects.length) %
                      featuredProjects.length
                  ].screenshot
                }
                alt="Previous project"
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h4 className="text-sm font-semibold truncate">
                {
                  featuredProjects[
                    (index - 1 + featuredProjects.length) %
                      featuredProjects.length
                  ].title
                }
              </h4>
            </motion.div>
          </AnimatePresence>

          {/* Active card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={featuredProjects[index].key}
              initial={{ opacity: 0, y: -100, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -100, scale: 0.3 }}
              transition={{ duration: 0.5 }}
              className="w-[60%] h-[100%] bg-white text-black p-6 shadow-lg rounded-lg z-10"
            >
              <img
                src={featuredProjects[index].screenshot}
                alt={featuredProjects[index].title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold">
                {featuredProjects[index].title}
              </h3>
              <p className="mt-2">
                {lang === "es"
                  ? featuredProjects[index].descriptionEs
                  : featuredProjects[index].descriptionEn}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Next preview */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`next-${index}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 0.7, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="w-[40%] h-[80%] bg-white text-black p-4 shadow rounded-lg"
            >
              <img
                src={
                  featuredProjects[(index + 1) % featuredProjects.length]
                    .screenshot
                }
                alt="Next project"
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h4 className="text-sm font-semibold truncate">
                {featuredProjects[(index + 1) % featuredProjects.length].title}
              </h4>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={prev}
            className="px-4 py-2 bg-linear-to-b from-blue-300 to-blue-500 rounded hover:scale-110 hover:bg-linear-to-b hover:from-blue-400 hover:to-blue-600 transform transition-all duration-1000 ease-in-out"
          >
            {lang === "es" ? "Anterior" : "Previous"}
          </button>
          <button
            onClick={next}
            className="px-4 py-2 bg-linear-to-b from-blue-300 to-blue-500 rounded hover:scale-110 hover:bg-linear-to-b hover:from-blue-400 hover:to-blue-600 transform transition-all duration-1000 ease-in-out"
          >
            {lang === "es" ? "Siguiente" : "Next"}
          </button>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="p-8 bg-linear-to-b from-blue-400 to-gray-400">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div id="dream-canvas">
            <ProjectCard
              title="Dream Canvas"
              description={
                lang === "es"
                  ? "Proyecto frontend completo para escritorio. Aprovecha la gestión de assets de Next y animaciones personalizadas de Tailwind para crear una estética y experiencia únicas. Su característica principal es un lienzo vivo donde datos meteorológicos reales se obtienen de una API abierta y la app renderiza nubes, lluvia, niebla, viento, color del cielo, estrellas, meteoros, sol o luna para generar una versión estilizada del clima."
                  : "Full frontend project developed for desktop. It leverages Next's asset management and Tailwind custom animations to create a unique aesthetic and experience. Its main feature is a living canvas where real weather data is fetched from an open API and the app renders clouds, rain, fog, wind, sky color, stars, shooting stars, sun or moon accordingly to create a stylized version of real weather."
              }
              link="https://github.com/yourrepo/dream-canvas"
              screenshot="/images/dreamcanvas.jpg"
            />
          </div>

          <div id="lienzo-culinario">
            <ProjectCard
              title="Lienzo Culinario"
              description={
                lang === "es"
                  ? "Proyecto final de graduación en equipo. Simula el flujo completo de un e‑commerce: el administrador puede agregar o eliminar productos, los clientes pueden registrarse, iniciar sesión, buscar por nombre o ingrediente, colocar pedidos en el carrito, completar la compra y generar órdenes. El inventario se actualiza automáticamente, se pueden emitir cupones de descuento de un solo uso, los usuarios dejan reseñas y las tarjetas de producto muestran colores distintos según los ingredientes."
                  : "Final graduation team project. Simulates the full flow of an e‑commerce: admin can add or remove products, customers can register, log in, search by name or ingredient, place orders in the cart, complete purchases and generate orders. Inventory updates automatically, discount coupons can be issued and used once, users can leave reviews, and product cards feature unique color coding depending on ingredients."
              }
              link="https://github.com/yourrepo/lienzo-culinario"
              screenshot="/images/lienzoculinario.jpg"
            />
          </div>

          <div id="masterpiece-haven">
            <ProjectCard
              title="Masterpiece Haven"
              description={
                lang === "es"
                  ? "Proyecto temprano en el que busqué desarrollar mi sentido estético. Incluye un flujo de compra full stack sencillo pero funcional de pinturas de fantasía. Ofrece una experiencia completa: los usuarios pueden registrarse, comprar y luego ver su historial detallado de compras. El proyecto se centra en sentar las bases de UI y UX, comunicando toda la información relevante al usuario mientras mantiene una estética coherente."
                  : "An early project where I worked on developing my aesthetic sense. It features a simple but functional full stack purchase flow for fantasy paintings. Provides a complete experience: users can register, buy, and then view their detailed purchase history. The project focuses on laying the foundations of UI and UX, communicating all relevant information to the user while maintaining a coherent aesthetic."
              }
              link="https://github.com/yourrepo/masterpiece-haven"
              screenshot="/images/masterpiecehaven.jpg"
            />
          </div>

          {/*
          <div id="x">
          <ProjectCard
            title="Project X"
            description={lang === "es" ? "Placeholder español" : "Placeholder English"}
            link="Placeholder"
            screenshot="/images/placeholder.jpg"
          />
          </div>
          */}
        </div>
      </section>

      {/* About Section */}
      <section className="p-8 bg-linear-to-b from-gray-400 to-gray-500 text-black">
        <div className="flex-1 p-6 rounded-t-lg bg-linear-to-t from-blue-300 to-gray-400">
          <h2 className="text-2xl font-bold text-black text-center">
            {lang === "es" ? "Acerca de" : "About"}
          </h2>

          <div className="p-6 rounded-lg bg-linear-to-t from-blue-300 to-gray-400">
            <p className="font-serif text-lg">
              {lang === "es"
                ? "Soy desarrollador full stack especializado en frontend. Manejo tecnologías como Next.js, NestJS, JavaScript, TypeScript, Tailwind y Bootstrap, además de bases de datos relacionales y no relacionales con SQL. Soy bilingüe y cuento con buenas habilidades de comunicación y presentación, lo que me permite integrarme y aportar valor en equipos de trabajo."
                : "I am a full stack developer with a strong focus on frontend. My experience includes Next.js, NestJS, JavaScript, TypeScript, Tailwind, and Bootstrap, as well as relational and non-relational databases using SQL. I am bilingual and bring solid communication and presentation skills, enabling me to collaborate effectively and contribute within team environments."}
            </p>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 rounded-b-lg p-4 place-items-center bg-linear-to-b from-blue-300 to-gray-400">
          {/* Skills badges */}
          <img
            className="h-12 w-12 opacity-90"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-plain.svg"
          />

          <img
            className="h-12 w-12 opacity-90"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-line.svg"
          />

          <img
            className="h-12 w-12 opacity-90"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg"
          />
          <img
            className="h-12 w-12 opacity-90"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-plain.svg"
          />
          <img
            className="h-12 w-12 opacity-90"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
          />
          <img
            className="h-12 w-12 opacity-90"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-plain.svg"
          />
          <img
            className="h-12 w-12 opacity-90"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg"
          />
          <img
            className="h-12 w-12 opacity-90"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-plain.svg"
          />
        </div>
      </section>

      {/* Footer and Contact Section */}
      <footer className="h-48 bg-linear-to-b from-gray-500 to-gray-600 text-white flex flex-col items-center justify-center gap-4 relative">
        <p className="text-lg font-semibold tracking-wide">
          {lang === "es"
            ? "Pongamonos en contacto y construyamos algo único."
            : "Let's get in contact and build something unique."}
        </p>
        <div className="flex gap-6">
          <a
            href="mailto:agus5705@gmail.com"
            className="px-3 py-1 rounded hover:bg-white/20 hover:scale-110 transition bg-linear-to-br from-gray-400 to gray-500"
          >
            Email
          </a>
          <a
            href="www.linkedin.com/in/agustín-rodríguez-77ba3269"
            className="px-3 py-1 rounded hover:bg-white/20 hover:scale-110 transition bg-linear-to-br from-gray-400 to gray-500"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Agustin5705?tab=overview&from=2026-04-01&to=2026-04-17"
            className="px-3 py-1 rounded hover:bg-white/20 hover:scale-110 transition bg-linear-to-br from-gray-400 to gray-500"
          >
            GitHub
          </a>
        </div>
      </footer>
    </main>
  );
}
