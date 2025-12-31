import { ProgramSchema, TrainerSchema } from "./schemas";

import strengthImg from "../assets/images/programs/strength.webp";
import hiitImg from "../assets/images/programs/hiit.webp";
import recoveryImg from "../assets/images/programs/recovery.webp";
import alexImg from "../assets/images/trainers/alex.webp";
import sarahImg from "../assets/images/trainers/sarah.webp";
import jaxImg from "../assets/images/trainers/jax.webp";

const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

export const programs = [
    {
        id: "strength",
        title: "Forge Strength",
        description: "Progressive overload meets kinetic science. Build explosive power and functional mass.",
        image: strengthImg,
        href: `${base}programs/strength`,
        color: "#D4FF00",
    },
    {
        id: "hiit",
        title: "Pulse HIIT",
        description: "High-intensity metabolic conditioning designed to incinerate body fat and push VO2 Max.",
        image: hiitImg,
        href: `${base}programs/hiit`,
        color: "#2EFF7B",
    },
    {
        id: "recovery",
        title: "Flux Recovery",
        description: "Active recovery, mobility, and soft tissue work to ensure you're always ready for the next session.",
        image: recoveryImg,
        href: `${base}programs/recovery`,
        color: "#00E0FF",
    },
].map(p => ProgramSchema.parse(p));

export const trainers = [
    {
        id: "alex-vane",
        name: "Alex Vane",
        role: "Head of Performance",
        bio: "Ex-tier 1 operator specializing in functional physiology and mindset conditioning.",
        specialties: ["Strength", "Tactical Fitness", "Bio-mechanics"],
        image: alexImg,
    },
    {
        id: "sarah-flux",
        name: "Sarah Flux",
        role: "Metabolic Lead",
        bio: "Record-holding powerlifter and nutrition expert focused on body recomposition.",
        specialties: ["HIIT", "Powerlifting", "Nutrition"],
        image: sarahImg,
    },
    {
        id: "jax-volt",
        name: "Jax Volt",
        role: "Recovery Specialist",
        bio: "Former Olympic physiotherapist dedicated to longevity and structural balance.",
        specialties: ["Mobility", "Yoga", "Injury Prevention"],
        image: jaxImg,
    },
].map(t => TrainerSchema.parse(t));
