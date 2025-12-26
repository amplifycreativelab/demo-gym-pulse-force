import { createSignal, createMemo, onMount, For } from "solid-js";
import type { ClassSession, Trainer } from "../data/schemas";
import autoAnimate from "@formkit/auto-animate";

interface Props {
    initialClasses: ClassSession[];
    trainers: Trainer[];
}

export default function ScheduleFilter(props: Props) {
    const [selectedDay, setSelectedDay] = createSignal<string>("All");
    const [selectedType, setSelectedType] = createSignal<string>("All");
    const [selectedIntensity, setSelectedIntensity] = createSignal<string>("All");

    let parent: HTMLDivElement | undefined;

    onMount(() => {
        if (parent) {
            autoAnimate(parent);
        }
    });

    const days = ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const types = ["All", "Strength", "HIIT", "Recovery", "Boxing", "Yoga"];
    const intensities = ["All", "Low", "Moderate", "High", "Extreme"];

    const filteredClasses = createMemo(() => {
        return props.initialClasses.filter((c) => {
            const matchDay = selectedDay() === "All" || c.day === selectedDay();
            const matchType = selectedType() === "All" || c.type === selectedType();
            const matchIntensity = selectedIntensity() === "All" || c.intensity === selectedIntensity();
            return matchDay && matchType && matchIntensity;
        });
    });

    const getTrainerName = (id: string) => {
        return props.trainers.find((t) => t.id === id)?.name ?? "Unknown Trainer";
    };

    return (
        <div class="schedule-system flex flex-col gap-8">
            {/* Filters */}
            <div class="flex flex-wrap gap-4 p-6 glass-dark border border-white/5 rounded-sm">
                <div class="flex flex-col gap-3 min-w-[150px]">
                    <label class="text-[10px] font-black uppercase tracking-widest text-muted">Select Day</label>
                    <div class="flex flex-wrap gap-2">
                        <For each={days}>
                            {(day) => (
                                <button
                                    onClick={() => setSelectedDay(day)}
                                    class={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-all rounded-sm border ${selectedDay() === day
                                        ? "bg-volt text-void border-volt"
                                        : "bg-transparent text-muted border-white/10 hover:border-white/30 hover:text-white"
                                        }`}
                                >
                                    {day}
                                </button>
                            )}
                        </For>
                    </div>
                </div>

                <div class="flex flex-col gap-3 min-w-[150px]">
                    <label class="text-[10px] font-black uppercase tracking-widest text-muted">Session Type</label>
                    <div class="flex flex-wrap gap-2">
                        <For each={types}>
                            {(type) => (
                                <button
                                    onClick={() => setSelectedType(type)}
                                    class={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-all rounded-sm border ${selectedType() === type
                                        ? "bg-flux text-void border-flux"
                                        : "bg-transparent text-muted border-white/10 hover:border-white/30 hover:text-white"
                                        }`}
                                >
                                    {type}
                                </button>
                            )}
                        </For>
                    </div>
                </div>

                <div class="flex flex-col gap-3 min-w-[150px]">
                    <label class="text-[10px] font-black uppercase tracking-widest text-muted">Intensity Level</label>
                    <div class="flex flex-wrap gap-2">
                        <For each={intensities}>
                            {(intensity) => (
                                <button
                                    onClick={() => setSelectedIntensity(intensity)}
                                    class={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-all rounded-sm border ${selectedIntensity() === intensity
                                        ? "bg-white text-void border-white"
                                        : "bg-transparent text-muted border-white/10 hover:border-white/30 hover:text-white"
                                        }`}
                                >
                                    {intensity}
                                </button>
                            )}
                        </For>
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <div
                ref={parent}
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <For each={filteredClasses()}
                    fallback={
                        <div class="col-span-full py-20 text-center border border-dashed border-white/10 rounded-sm">
                            <p class="text-muted font-heading uppercase tracking-widest text-sm">No sessions found matching your Forge filters.</p>
                        </div>
                    }
                >
                    {(c) => (
                        <div class="group relative p-6 bg-armor border border-white/5 rounded-sm hover:border-volt/30 transition-all duration-300">
                            <div class="flex justify-between items-start mb-6">
                                <div>
                                    <span class="inline-block px-2 py-0.5 bg-void text-volt text-[10px] font-black uppercase tracking-[0.2em] mb-3 border border-volt/20">
                                        {c.type}
                                    </span>
                                    <h3 class="font-heading font-black text-xl uppercase tracking-tighter text-white group-hover:text-volt transition-colors">
                                        {c.name}
                                    </h3>
                                </div>
                                <div class="text-right">
                                    <span class="block text-xl font-black text-white">{c.time}</span>
                                    <span class="block text-[10px] text-muted uppercase font-bold">{c.duration} MIN</span>
                                </div>
                            </div>

                            <div class="flex items-center gap-3 mb-6">
                                <div class="w-8 h-8 rounded-full bg-void border border-white/10 flex items-center justify-center overflow-hidden">
                                    <svg class="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <span class="block text-[10px] text-muted uppercase font-bold">Trainer</span>
                                    <span class="block text-xs text-white font-bold">{getTrainerName(c.trainerId)}</span>
                                </div>
                            </div>

                            <div class="flex items-center justify-between pt-4 border-t border-white/5">
                                <div class="flex items-center gap-2">
                                    <div class={`w-2 h-2 rounded-full ${c.intensity === 'Extreme' ? 'bg-signal' :
                                        c.intensity === 'High' ? 'bg-volt' :
                                            c.intensity === 'Moderate' ? 'bg-flux' :
                                                c.intensity === 'Low' ? 'bg-sky-400' : 'bg-blue-400' // Added explicit 'Low' intensity color
                                        }`}></div>
                                    <span class="text-[10px] text-muted uppercase font-black tracking-widest">{c.intensity} Intensity</span>
                                </div>
                                <span class={`text-[10px] font-black uppercase tracking-widest ${c.spotsLeft <= 5 ? 'text-signal' : 'text-flux'}`}>
                                    {c.spotsLeft} Spots Left
                                </span>
                            </div>

                            <a
                                href={`#`}
                                class="absolute inset-0 z-10"
                                aria-label={`Book ${c.name}`}
                            ></a>
                        </div>
                    )}
                </For>
            </div>
        </div>
    );
}
