import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

function Index() {
  const scrollY = useScrollY();
  const blackholeRef = useRef<HTMLDivElement>(null);
  const [bhProgress, setBhProgress] = useState(0);

  useEffect(() => {
    if (!blackholeRef.current) return;
    const rect = blackholeRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 when section bottom enters viewport, 1 when section is centered/passed
    const raw = 1 - rect.top / vh;
    setBhProgress(Math.min(1, Math.max(0, raw)));
  }, [scrollY]);

  // Section 2 parallax offsets
  const p1 = scrollY * -0.25;
  const p2 = scrollY * -0.55;
  const p3 = scrollY * -0.15;

  // Black hole compression: scale 1 -> 0.25, letter-spacing 0.05em -> -0.08em
  const bhScale = 1 - bhProgress * 0.75;
  const bhSpacing = 0.05 - bhProgress * 0.13;
  const bhRotate = bhProgress * 25;

  return (
    <main className="bg-black text-white">
      {/* ============ SECTION 1: THE EMPTINESS ============ */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
        <div className="starfield starfield-sparse" />
        <div className="absolute left-8 top-8 font-mono-sci text-[10px] uppercase tracking-[0.4em] text-[#333]">
          01 — Пустота
        </div>
        <div className="absolute right-8 top-8 font-mono-sci text-[10px] uppercase tracking-[0.4em] text-[#333]">
          ∞ / ∅
        </div>
        <p className="animate-cosmic-fade font-mono-sci text-[11px] tracking-[0.3em] text-[#888] md:text-xs">
          Мы всего лишь пылинки во Вселенной...
        </p>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono-sci text-[10px] tracking-[0.5em] text-[#222] animate-pulse-dim">
          ↓ SCROLL
        </div>
      </section>

      {/* ============ SECTION 2: ZERO GRAVITY & SCALE ============ */}
      <section className="relative min-h-[220vh] overflow-hidden bg-[#020203]">
        <div className="starfield" />
        <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
          <div className="absolute left-8 top-8 font-mono-sci text-[10px] uppercase tracking-[0.4em] text-[#333]">
            02 — Невесомость
          </div>

          <div
            className="animate-float-y-slow will-change-transform"
            style={{ transform: `translateY(${p1}px)` }}
          >
            <h2 className="font-display text-outline whitespace-nowrap text-[18vw] leading-none tracking-tight">
              БЕСКОНЕЧНОСТЬ
            </h2>
          </div>

          <div
            className="animate-float-y mt-[-4vw] will-change-transform"
            style={{ transform: `translateY(${p2}px)` }}
          >
            <h2 className="font-display whitespace-nowrap text-[22vw] leading-none tracking-tighter text-white">
              ТИШИНА
            </h2>
          </div>

          <div
            className="absolute bottom-10 right-8 max-w-xs font-mono-sci text-[10px] leading-relaxed tracking-[0.2em] text-[#444]"
            style={{ transform: `translateY(${p3}px)` }}
          >
            // нет звука — только пустота между атомами и звёздами.
          </div>
        </div>
      </section>

      {/* ============ SECTION 3: DEPTH OF FIELD ============ */}
      <section className="relative min-h-screen overflow-hidden bg-[#040406] py-40">
        <div className="absolute left-8 top-8 font-mono-sci text-[10px] uppercase tracking-[0.4em] text-[#333]">
          03 — Глубина
        </div>

        {/* Background layer — heavily blurred */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span
            className="font-display text-[24vw] leading-none tracking-tighter text-white/15"
            style={{ filter: "blur(28px)" }}
          >
            ∞
          </span>
        </div>

        <div
          className="pointer-events-none absolute left-[5%] top-[20%] font-display text-[8vw] leading-none tracking-tight text-white/30"
          style={{ filter: "blur(14px)" }}
        >
          ГАЛАКТИКИ
        </div>

        {/* Mid layer — medium blur */}
        <div
          className="pointer-events-none absolute right-[8%] top-[55%] font-display text-[5vw] leading-none tracking-tight text-white/60"
          style={{ filter: "blur(5px)" }}
        >
          ЗВЁЗДЫ
        </div>
        <div
          className="pointer-events-none absolute left-[12%] bottom-[18%] font-mono-sci text-[1.4vw] tracking-[0.3em] text-white/50"
          style={{ filter: "blur(3px)" }}
        >
          // 13.8 млрд лет
        </div>

        {/* Foreground — sharp */}
        <div className="relative z-10 mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-6 text-center">
          <p className="font-display text-3xl leading-tight md:text-5xl lg:text-6xl">
            Где-то рождаются звёзды.
            <br />
            <span className="text-outline">Где-то гаснут галактики.</span>
            <br />
            <span className="text-white/90">А мы здесь,</span>{" "}
            <span className="italic text-white/60">в темноте.</span>
          </p>
          <div className="mt-12 h-px w-24 bg-white/30" />
          <p className="mt-6 font-mono-sci text-[10px] tracking-[0.4em] text-[#555]">
            DISTANCE — UNDEFINED
          </p>
        </div>
      </section>

      {/* ============ SECTION 4: BLACK HOLE ============ */}
      <section
        ref={blackholeRef}
        className="relative flex min-h-[150vh] items-start justify-center overflow-hidden bg-blackhole"
      >
        <div className="absolute inset-0 bg-event-horizon" />
        <div className="absolute left-8 top-8 font-mono-sci text-[10px] uppercase tracking-[0.4em] text-[#333]">
          04 — Сингулярность
        </div>

        <div className="sticky top-0 flex h-screen w-full items-center justify-center">
          <h2
            className="font-display whitespace-nowrap text-center text-white will-change-transform"
            style={{
              fontSize: "11vw",
              transform: `scale(${bhScale}) rotate(${bhRotate}deg)`,
              letterSpacing: `${bhSpacing}em`,
              transition: "transform 0.1s linear, letter-spacing 0.1s linear",
              textShadow: `0 0 ${40 * bhProgress}px rgba(255,255,255,${0.5 * bhProgress})`,
            }}
          >
            ГРАВИТАЦИЯ СЖИМАЕТ ВРЕМЯ
          </h2>

          {/* Singularity dot */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
            style={{
              width: `${bhProgress * 60}px`,
              height: `${bhProgress * 60}px`,
              boxShadow: `0 0 ${120 * bhProgress}px ${20 * bhProgress}px rgba(255,255,255,${0.15 * bhProgress})`,
              opacity: bhProgress,
            }}
          />
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono-sci text-[10px] tracking-[0.5em] text-[#222]">
          END / КОНЕЦ
        </div>
      </section>
    </main>
  );
}
