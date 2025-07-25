import { useParams } from "react-router-dom";
import { projects } from "../data";
import Navbar from "./Navbar";
import Availability from "./Availability";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id.toString() === id);

  if (!project)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Project not found.
      </div>
    );

  return (
    <div className="min-h-screen text-gray-950 px-6 lg:px-20 py-12 flex flex-col items-center justify-center">
      <Availability />
      <h1 className="text-5xl font-light text-center m-6">{project.name}</h1>
      <p className="text-xl font-light text-center max-w-3xl mb-12">
        {project.description || project.scope}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="border border-neutral-700 px-4 py-2 text-center">
          <span className="block text-sm text-neutral-400">CLIENT</span>
          <span className="font-medium uppercase">{project.client}</span>
        </div>
        <div className="border border-neutral-700 px-4 py-2 text-center">
          <span className="block text-sm text-neutral-400">TIMELINE</span>
          <span className="font-medium uppercase">{project.timeline}</span>
        </div>
        <div className="border border-neutral-700 px-4 py-2 text-center">
          <span className="block text-sm text-neutral-400">SERVICES</span>
          <span className="font-medium uppercase">{project.services}</span>
        </div>
        <div className="border border-neutral-700 px-4 py-2 text-center">
          <span className="block text-sm text-neutral-400">WEBSITE</span>
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium uppercase hover:underline"
          >
            {project.website}
          </a>
        </div>
      </div>

      <button
        className="mb-8 flex items-center gap-2 hover:text-neutral-300 transition"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
      >
        ↓ MORE DETAILS
      </button>

      <div className="relative w-full max-w-4xl">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="2"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="1 0 0 0 0.35
                      0.5 0.25 0 0 0.25
                      0.2 0.1 0.1 0 0.15
                      0 0 0 1 0"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
        <img
          src={project.image}
          alt={project.name}
          className="w-full rounded-lg shadow-xl object-cover"
        />
      </div>
    </div>
  );
}
