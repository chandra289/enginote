import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function ParticlesBackground() {

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (

    <Particles
      init={particlesInit}
      className="absolute inset-0"
      options={{
        background: { color: "#020617" },

        particles: {
          number: { value: 60 },

          color: { value: "#00ffff" },

          links: {
            enable: true,
            distance: 150,
            color: "#00ffff"
          },

          move: {
            enable: true,
            speed: 1
          },

          size: {
            value: 3
          }
        }
      }}
    />

  );
}