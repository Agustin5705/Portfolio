"use client";

import { featuredProjects } from "./data/carousel/carousel";
import Image from "next/image";
import ProjectCard from "./components/projectcard/projectcard";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const UruguayanFlag = () => (
  <svg
    width={30}
    height={20}
    viewBox="0 0 30 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width={30} height={20} fill="#F5F5F5" />
    <rect
      width={1876}
      height={988}
      transform="translate(-1696 -900)"
      fill="white"
    />
    <path d="M30 0H0V20H30V0Z" fill="#F0F0F0" />
    <path d="M30 0H0V2.85721H30V0Z" fill="#338AF3" />
    <path d="M30 5.71448H0V8.57169H30V5.71448Z" fill="#338AF3" />
    <path d="M30 11.429H0V14.2862H30V11.429Z" fill="#338AF3" />
    <path d="M30 17.1427H0V19.9999H30V17.1427Z" fill="#338AF3" />
    <path d="M15 0H0V11.429H15V0Z" fill="#F0F0F0" />
    <path
      d="M11.25 5.71423L9.71771 6.43501L10.5336 7.91904L8.86975 7.6007L8.65893 9.28161L7.5 8.04538L6.34102 9.28161L6.13025 7.6007L4.46637 7.91899L5.28229 6.43501L3.75 5.71423L5.28229 4.99345L4.46637 3.50948L6.1302 3.82777L6.34107 2.14685L7.5 3.38315L8.65898 2.14685L8.86975 3.82777L10.5337 3.50948L9.71771 4.99351L11.25 5.71423Z"
      fill="#FFDA44"
    />
  </svg>
);

const SpanishFlag = () => (
  <svg
    width={30}
    height={20}
    viewBox="0 0 30 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width={30} height={20} fill="#F5F5F5" />
    <rect
      width={1876}
      height={988}
      transform="translate(-1160 -796)"
      fill="white"
    />
    <path d="M30 0H0V20H30V0Z" fill="#FFDA44" />
    <path d="M30 0H0V6.66643H30V0Z" fill="#D80027" />
    <path d="M30 13.3329H0V19.9993H30V13.3329Z" fill="#D80027" />
  </svg>
);

const BritishFlag = () => (
  <svg
    width={30}
    height={20}
    viewBox="0 0 30 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width={30} height={20} fill="#F5F5F5" />
    <rect
      width={1876}
      height={988}
      transform="translate(-1294 -900)"
      fill="white"
    />
    <path d="M30 0.00012207H0V20H30V0.00012207Z" fill="#F0F0F0" />
    <path
      d="M16.875 0H13.125V8.1248H0V11.8747H13.125V19.9995H16.875V11.8747H30V8.1248H16.875V0Z"
      fill="#D80027"
    />
    <path d="M23.0742 13.4779L30.0009 17.326V13.4779H23.0742Z" fill="#0052B4" />
    <path
      d="M18.2617 13.4779L30.0009 19.9995V18.1554L21.5813 13.4779H18.2617Z"
      fill="#0052B4"
    />
    <path
      d="M26.8739 19.9995L18.2617 15.2146V19.9995H26.8739Z"
      fill="#0052B4"
    />
    <path
      d="M18.2617 13.4779L30.0009 19.9995V18.1554L21.5813 13.4779H18.2617Z"
      fill="#F0F0F0"
    />
    <path
      d="M18.2617 13.4779L30.0009 19.9995V18.1554L21.5813 13.4779H18.2617Z"
      fill="#D80027"
    />
    <path d="M5.29341 13.4778L0 16.4185V13.4778H5.29341Z" fill="#0052B4" />
    <path
      d="M11.7397 14.3071V19.9995H1.49414L11.7397 14.3071Z"
      fill="#0052B4"
    />
    <path
      d="M8.41951 13.4779L0 18.1554V19.9995L11.7391 13.4779H8.41951Z"
      fill="#D80027"
    />
    <path d="M6.92665 6.52159L0 2.67346V6.52159H6.92665Z" fill="#0052B4" />
    <path
      d="M11.7391 6.52159L0 0V1.84414L8.41951 6.52159H11.7391Z"
      fill="#0052B4"
    />
    <path d="M3.12695 0L11.7392 4.78491V0H3.12695Z" fill="#0052B4" />
    <path
      d="M11.7391 6.52159L0 0V1.84414L8.41951 6.52159H11.7391Z"
      fill="#F0F0F0"
    />
    <path
      d="M11.7391 6.52159L0 0V1.84414L8.41951 6.52159H11.7391Z"
      fill="#D80027"
    />
    <path d="M24.707 6.5217L30.0004 3.58093V6.5217H24.707Z" fill="#0052B4" />
    <path d="M18.2617 5.69233V0H28.5072L18.2617 5.69233Z" fill="#0052B4" />
    <path
      d="M21.5813 6.52159L30.0009 1.84414V0L18.2617 6.52159H21.5813Z"
      fill="#D80027"
    />
  </svg>
);

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
      <section className="flex items-center justify-center bg-linear-to-b from-blue-600 to-blue-500 p-4">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full max-w-4xl">
          {/* Intro */}
          <p className="text-lg text-white font-semibold tracking-wide text-center md:text-left">
            {lang === "es"
              ? "Hola, soy Agustín. Bienvenido a mi portafolio."
              : "Hello, I'm Agustín. Welcome to my portfolio."}
          </p>

          {/* Navigation */}
          <div className="flex flex-row gap-2">
            <button
              onClick={() =>
                document
                  .getElementById("gallery")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-3 py-2 text-white rounded-lg bg-linear-to-b from-blue-300 to-blue-500 shadow-md hover:scale-105 transition-transform duration-300"
            >
              {lang === "es" ? "Galería" : "Gallery"}
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-3 py-2 text-white rounded-lg bg-linear-to-b from-blue-300 to-blue-500 shadow-md hover:scale-105 transition-transform duration-300"
            >
              {lang === "es" ? "Acerca de" : "About"}
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-3 py-2 text-white rounded-lg bg-linear-to-b from-blue-300 to-blue-500 shadow-md hover:scale-105 transition-transform duration-300"
            >
              {lang === "es" ? "Contacto" : "Contact"}
            </button>
          </div>

          {/* Language switch */}
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="flex items-center gap-2 px-4 py-2 text-white font-semibold rounded-xl 
             bg-linear-to-b from-blue-300 to-blue-500 
             shadow-md hover:scale-105 hover:from-blue-400 hover:to-blue-600 
             transition-transform duration-300"
          >
            {lang === "es" ? "Switch to English" : "Cambiar a Español"}
            {lang === "es" ? <BritishFlag /> : <SpanishFlag />}
          </button>
        </div>
      </section>

      {/* Hero Showcase */}
      <section className="h-screen flex flex-col items-center justify-center bg-linear-to-b from-blue-500 to-blue-400 text-white relative pb-3">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white/70 italic tracking-wide animate-pulse">
          {lang === "es" ? "Proyectos Destacados" : "Featured Projects"}
        </h1>

        <div
          className="relative w-full max-w-5xl h-112 flex items-center justify-center gap-8 px-4"
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
              className="w-[40%] h-[80%] bg-linear-to-br from-blue-400 to-gray-400 text-black p-4 shadow rounded-lg"
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
              className="w-[60%] h-full bg-linear-to-br from-blue-400 to-gray-400 text-black p-6 shadow-lg rounded-lg z-10"
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
              className="w-[40%] h-[80%] bg-linear-to-br from-blue-400 to-gray-400 text-black p-4 shadow rounded-lg"
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
      <section
        className="p-8 bg-linear-to-b from-blue-400 to-gray-400"
        id="gallery"
      >
        <motion.div
          initial={{ opacity: 0.2, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div id="dream-canvas">
              <ProjectCard
                title="Dream Canvas"
                description={
                  lang === "es"
                    ? "Proyecto frontend completo para escritorio. Aprovecha la gestión de assets de Next y animaciones personalizadas de Tailwind para crear una estética y experiencia únicas. Su característica principal es un lienzo vivo donde datos meteorológicos reales se obtienen de una API abierta y la app renderiza nubes, lluvia, niebla, viento, color del cielo, estrellas, meteoros, sol o luna para generar una versión estilizada del clima."
                    : "Full frontend project developed for desktop. It leverages Next's asset management and Tailwind custom animations to create a unique aesthetic and experience. Its main feature is a living canvas where real weather data is fetched from an open API and the app renders clouds, rain, fog, wind, sky color, stars, shooting stars, sun or moon accordingly to create a stylized version of real weather."
                }
                link="https://dream-canvas-nu.vercel.app/"
                link2="https://github.com/Agustin5705/dream-canvas"
                screenshot="/images/dreamcanvas.jpg"
                className="bg-linear-to-bl from-blue-500 to-gray-400"
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
                link="https://lienzofront.vercel.app/"
                link2="https://github.com/Agustin5705/LienzoCulinario"
                screenshot="/images/lienzoculinario.jpg"
                className="bg-linear-to-bl from-blue-500 to-gray-400"
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
                link2="https://github.com/Agustin5705/Masterpiece-Haven"
                screenshot="/images/masterpiecehaven.jpg"
                className="bg-linear-to-bl from-blue-500 to-gray-400"
              />
            </div>

            <div id="ecommerce-backend">
              <ProjectCard
                title="E-Commerce Backend"
                description={
                  lang === "es"
                    ? "Proyecto en etapa temprana orientado a expandir mis habilidades como full stack. Backend desarrollado con NestJS, utilizando Docker y PostgreSQL para la gestión de datos. El objetivo es implementar un flujo de pedidos robusto, validaciones y una integración futura con pasarelas de pago. Actualmente se encuentra en fase inicial, con la base de datos y la arquitectura del servidor en construcción."
                    : "Early-stage project aimed at expanding my full stack skills. Backend built with NestJS, using Docker and PostgreSQL for data management. The goal is to implement a robust order flow, validations, and future integration with payment gateways. Currently in its initial phase, with database and server architecture under development."
                }
                link2="https://github.com/Agustin5705/GrowBack"
                className="bg-linear-to-bl from-blue-500 to-gray-400"
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
        </motion.div>
      </section>

      {/* About Section */}
      <section
        className="p-8 bg-linear-to-b from-gray-400 to-gray-500 text-black"
        id="about"
      >
        <motion.div
          initial={{ opacity: 0.2, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex-1 p-6 rounded-t-lg bg-linear-to-t from-blue-300 to-gray-400">
            <h2 className="text-2xl font-bold text-black text-center">
              {lang === "es" ? "Acerca de" : "About"}
            </h2>

            <div className="p-6 rounded-lg bg-linear-to-t from-blue-300 to-gray-400 font-sans font-semibold">
              <p className="font-serif text-lg">
                {lang === "es"
                  ? "Soy desarrollador full stack especializado en frontend. Manejo tecnologías como Next.js, NestJS, JavaScript, TypeScript, Tailwind y Bootstrap, además de bases de datos relacionales y no relacionales con SQL. Soy bilingüe y cuento con buenas habilidades de comunicación y presentación, lo que me permite integrarme y aportar valor en equipos de trabajo."
                  : "I am a full stack developer with a strong focus on frontend. My experience includes Next.js, NestJS, JavaScript, TypeScript, Tailwind, and Bootstrap, as well as relational and non-relational databases using SQL. I am bilingual and bring solid communication and presentation skills, enabling me to collaborate effectively and contribute within team environments."}
              </p>

              {/* Bulletpoints */}
              <motion.div
                initial={{ opacity: 0.2, scale: 0.2 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.5 }}
              >
                <div className="flex flex-col md:flex-row gap-4 mt-6">
                  <div className="flex-1 p-4 rounded-lg bg-linear-to-t from-blue-300 to-gray-400">
                    <p className="text-md">
                      {lang === "es"
                        ? "Resolviendo problemas complejos de frontend para encontrar la causa raíz de los problemas."
                        : "Troubleshooting complex frontend issues to find the root cause of issues."}
                    </p>
                  </div>

                  <div className="flex-1 p-4 rounded-lg bg-linear-to-t from-blue-300 to-gray-400">
                    <p className="text-md">
                      {lang === "es"
                        ? "Colaborando en equipos para asegurar comunicación fluida."
                        : "Contributing in teams to ensure smooth communication."}
                    </p>
                  </div>

                  <div className="flex-1 p-4 rounded-lg bg-linear-to-t from-blue-300 to-gray-400">
                    <p className="text-md">
                      {lang === "es"
                        ? "Adaptándome a distintos frameworks y herramientas según los requisitos del proyecto."
                        : "Adapting to different frameworks and tools as project requirements evolve."}
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0.2, scale: 0.2 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.5 }}
              >
                <div className="flex flex-col md:flex-row gap-4 mt-6">
                  <div className="flex-1 p-4 rounded-lg bg-linear-to-t from-blue-300 to-gray-400">
                    <p className="text-md">
                      {lang === "es"
                        ? "Backend stack: NestJS, Node.js, bases de datos SQL y NoSQL (PostgreSQL, MongoDB), APIs REST y GraphQL."
                        : "Backend stack: NestJS, Node.js, SQL and NoSQL databases (PostgreSQL, MongoDB), REST and GraphQL APIs."}
                    </p>
                  </div>

                  <div className="flex-1 p-4 rounded-lg bg-linear-to-t from-blue-300 to-gray-400">
                    <p className="text-md">
                      {lang === "es"
                        ? "Frontend stack: Next.js, React, TypeScript, JavaScript, Tailwind, Bootstrap, animaciones y diseño responsivo."
                        : "Frontend stack: Next.js, React, TypeScript, JavaScript, Tailwind, Bootstrap, animations and responsive design."}
                    </p>
                  </div>

                  <div className="flex-1 p-4 rounded-lg bg-linear-to-t from-blue-300 to-gray-400">
                    <p className="text-md">
                      {lang === "es"
                        ? "Habilidades blandas: comunicación clara, trabajo en equipo, resolución de problemas, adaptabilidad y enfoque en la experiencia del usuario."
                        : "Soft skills: clear communication, teamwork, problem‑solving, adaptability, and focus on user experience."}
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0.2, scale: 0.2 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.5 }}
              >
                <div className="flex flex-col md:flex-row gap-4 mt-6">
                  <div className="flex-1 p-4 rounded-lg bg-linear-to-t from-blue-300 to-gray-400">
                    <p className="text-md">
                      {lang === "es"
                        ? "Prácticas de desarrollo: pruebas unitarias, depuración eficiente y control de versiones con Git."
                        : "Development practices: unit testing, efficient debugging, and version control with Git."}
                    </p>
                  </div>

                  <div className="flex-1 p-4 rounded-lg bg-linear-to-t from-blue-300 to-gray-400">
                    <p className="text-md">
                      {lang === "es"
                        ? "Flujo de trabajo: metodologías ágiles, entregas iterativas y despliegues continuos (CI/CD)."
                        : "Workflow: agile methodologies, iterative delivery, and continuous deployment (CI/CD)."}
                    </p>
                  </div>

                  <div className="flex-1 p-4 rounded-lg bg-linear-to-t from-blue-300 to-gray-400">
                    <p className="text-md">
                      {lang === "es"
                        ? "Herramientas: Docker, plataformas en la nube y automatización para mejorar la eficiencia."
                        : "Tooling: Docker, cloud platforms, and automation to improve efficiency."}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 rounded-b-lg p-4 place-items-center bg-linear-to-b from-blue-300 to-gray-400">
            {/* Skills badges */}
            <img
              alt="Badge"
              className="h-12 w-12 opacity-90 hover:animate-ping"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-plain.svg"
            />

            <img
              alt="Badge"
              className="h-12 w-12 opacity-90 hover:animate-ping"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-line.svg"
            />

            <img
              alt="Badge"
              className="h-12 w-12 opacity-90 hover:animate-ping"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg"
            />
            <img
              alt="Badge"
              className="h-12 w-12 opacity-90 hover:animate-ping"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-plain.svg"
            />
            <img
              alt="Badge"
              className="h-12 w-12 opacity-90 hover:animate-ping"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg"
            />
            <img
              alt="Badge"
              className="h-12 w-12 opacity-90 hover:animate-ping"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-plain.svg"
            />
            <img
              alt="Badge"
              className="h-12 w-12 opacity-90 hover:animate-ping"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg"
            />
            <img
              alt="Badge"
              className="h-12 w-12 opacity-90 hover:animate-ping"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-plain.svg"
            />
          </div>
        </motion.div>
      </section>

      {/* Footer and Contact Section */}
      <footer
        className="h-48 bg-linear-to-b from-gray-500 to-gray-600 text-white flex flex-col items-center justify-center gap-4 relative"
        id="contact"
      >
        <a
          href={lang === "es" ? "/CV.pdf" : "/EngCV.pdf"}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 rounded hover:bg-white/20 hover:scale-110 transition bg-linear-to-br from-gray-400 to-gray-500"
        >
          {lang === "es"
            ? "Haz click aquí para ver mi CV"
            : "Click here to see my resume"}
        </a>
        <p className="text-lg font-semibold tracking-wide">
          {lang === "es"
            ? "Pongamonos en contacto y construyamos algo único."
            : "Let's get in contact and build something unique."}
        </p>
        <div className="flex gap-6">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=agus5705@gmail.com"
            target="_blank"
            className="px-3 py-1 rounded hover:bg-white/20 hover:scale-110 transition bg-linear-to-br from-gray-400 to-gray-500"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/agust%C3%ADn-rodr%C3%ADguez-77ba3269/"
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
        <div className="">
          <UruguayanFlag />
        </div>

        <p className="text-lg font-semibold tracking-wide pb-2">
          Montevideo, Uruguay.
        </p>
      </footer>
    </main>
  );
}
