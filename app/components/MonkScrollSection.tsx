"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 302;
const FRAME_WIDTH = 1920;
const FRAME_HEIGHT = 3413;

const KEYFRAME_STEP = 10;

function getFrameSrc(index: number): string {
  const padded = String(index).padStart(3, "0");
  return `/frames/monk_${padded}.webp`;
}

function loadImage(
  frameIndex: number,
  priority: "high" | "low" | "auto" = "auto"
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.fetchPriority = priority;
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = getFrameSrc(frameIndex + 1);
  });
}

export default function MonkScrollSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(FRAME_COUNT).fill(null)
  );
  const frameIndexRef = useRef(0);
  const rafIdRef = useRef<number>(0);
  const abortRef = useRef(false);

  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  /* ---------- Canvas Draw ---------- */
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const targetIdx = frameIndexRef.current;
    let img = imagesRef.current[targetIdx];

    if (!img) {
      for (let offset = 1; offset < FRAME_COUNT; offset++) {
        const before = targetIdx - offset;
        const after = targetIdx + offset;
        if (before >= 0 && imagesRef.current[before]) {
          img = imagesRef.current[before];
          break;
        }
        if (after < FRAME_COUNT && imagesRef.current[after]) {
          img = imagesRef.current[after];
          break;
        }
      }
    }

    if (!img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  const requestDraw = useCallback(() => {
    cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(drawFrame);
  }, [drawFrame]);

  /* ---------- Progressive Preload ---------- */
  useEffect(() => {
    abortRef.current = false;
    const images = imagesRef.current;

    async function preload() {
      try {
        const first = await loadImage(0, "high");
        if (abortRef.current) return;
        images[0] = first;
        requestDraw();
      } catch { /* continue */ }

      const keyframes: number[] = [];
      for (let i = KEYFRAME_STEP; i < FRAME_COUNT; i += KEYFRAME_STEP) {
        keyframes.push(i);
      }
      if (keyframes[keyframes.length - 1] !== FRAME_COUNT - 1) {
        keyframes.push(FRAME_COUNT - 1);
      }

      for (let b = 0; b < keyframes.length; b += 4) {
        if (abortRef.current) return;
        const batch = keyframes.slice(b, b + 4);
        const results = await Promise.allSettled(
          batch.map((idx) => loadImage(idx, "auto"))
        );
        results.forEach((result, j) => {
          if (result.status === "fulfilled") images[batch[j]] = result.value;
        });
        if (batch.some((idx) => idx === frameIndexRef.current) || !images[frameIndexRef.current]) {
          requestDraw();
        }
      }

      const remaining: number[] = [];
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (!images[i]) remaining.push(i);
      }

      for (let b = 0; b < remaining.length; b += 6) {
        if (abortRef.current) return;
        const batch = remaining.slice(b, b + 6);
        const results = await Promise.allSettled(
          batch.map((idx) => loadImage(idx, "low"))
        );
        results.forEach((result, j) => {
          if (result.status === "fulfilled") images[batch[j]] = result.value;
        });
        requestDraw();
      }
    }

    preload();
    return () => { abortRef.current = true; };
  }, [requestDraw]);

  /* ---------- GSAP ScrollTrigger (single timeline, dynamic end) ---------- */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const pinned = pinnedRef.current;
    const t1 = text1Ref.current;
    const t2 = text2Ref.current;
    const t3 = text3Ref.current;
    if (!wrapper || !pinned || !t1 || !t2 || !t3) return;

    // Helper to compute exact scroll distance: wrapper height - viewport height (px)
    const computeScrollDistance = () => {
      return Math.max(0, wrapper.offsetHeight - window.innerHeight);
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          pin: pinned,                        // single pin here
          start: "top top",
          end: () => `+=${computeScrollDistance()}`, // dynamic px-based end
          scrub: true,
          anticipatePin: 1,
          // markers:true, // uncomment while debugging to see start/end
          onUpdate: (self) => {
            const index = Math.min(
              FRAME_COUNT - 1,
              Math.floor(self.progress * (FRAME_COUNT - 1))
            );
            if (index !== frameIndexRef.current) {
              frameIndexRef.current = index;
              requestDraw();
            }
          },
        },
        defaults: { ease: "none" },
      });

      // t1
      tl.fromTo(t1, { opacity: 1, y: 0 }, { opacity: 1, y: 0, duration: 0.22 }, 0);
      tl.to(t1, { opacity: 0, y: -20, duration: 0.08 }, 0.22);

      // t2
      tl.fromTo(t2, { opacity: 0, y: 20 }, { opacity: 0, y: 20, duration: 0.33 }, 0);
      tl.to(t2, { opacity: 1, y: 0, duration: 0.08 }, 0.33);
      tl.to(t2, { opacity: 1, y: 0, duration: 0.14 }, 0.41);
      tl.to(t2, { opacity: 0, y: -20, duration: 0.08 }, 0.55);

      // t3
      tl.fromTo(t3, { opacity: 0, y: 20 }, { opacity: 0, y: 20, duration: 0.67 }, 0);
      tl.to(t3, { opacity: 1, y: 0, duration: 0.08 }, 0.67);
      tl.to(t3, { opacity: 1, y: 0, duration: 0.25 }, 0.75);

      // -> tl is automatically associated with the scrollTrigger above
    }, wrapper);

    // Refresh on resize to recalc the dynamic end; this keeps the end value accurate
    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert(); // kills timeline + scrollTrigger created in the context
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [requestDraw]);
  /* ---------- Canvas intrinsic size ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = FRAME_WIDTH;
    canvas.height = FRAME_HEIGHT;
    requestDraw();
  }, [requestDraw]);

  return (
    <section
      ref={wrapperRef}
      className="relative"
      style={{ height: "800vh" }}
      id="monk-scroll"
    >
      {/* Pinned container */}
      <div ref={pinnedRef} className="h-screen w-full overflow-hidden bg-transparent">
        {/*
                 * ONE canvas, always mounted — ref stays valid on both breakpoints.
                 *
                 * Mobile  (<md): flex-col
                 *   canvas  → 55 vh, full width
                 *   text    → 45 vh, full width
                 *
                 * Desktop (md+): flex-row, 50/50
                 *   canvas  → left half, full height
                 *   text    → right half, full height
                 */}
        <div className="flex flex-col md:flex-row h-full">

          {/* ── Canvas column ── */}
          <div
            className="
                            relative flex items-center justify-center flex-shrink-0
                            w-full h-[68vh]
                            md:w-1/2 md:h-full
                        "
          >
            <canvas
              ref={canvasRef}
              className="object-contain"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "100%",
              }}
            />
          </div>

          {/* ── Text column ── */}
          <div
            className="
                            relative flex items-center justify-center flex-shrink-0
                            w-full h-[32vh]
                            md:w-1/2 md:h-full
                        "
          >
            {/* Text 1 */}
            <div
              ref={text1Ref}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center"
            >
              <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold text-foreground mb-2 md:mb-4 leading-tight">
                The Lazy
                <br />
                <span className="text-amber-500 dark:text-amber-200">Monk</span>
              </h2>
              <p className="text-foreground/70 text-sm md:text-xl max-w-xs md:max-w-md text-center leading-relaxed">
                In stillness, the journey begins. A single breath before the storm of creation.
              </p>
            </div>

            {/* Text 2 */}
            <div
              ref={text2Ref}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center"
              style={{ opacity: 0 }}
            >
              <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold text-foreground mb-2 md:mb-4 leading-tight">
                Awakening
                <br />
                <span className="text-cyan-500 dark:text-cyan-200">to the Code</span>
              </h2>
              <p className="text-foreground/70 text-sm md:text-xl max-w-xs md:max-w-md text-center leading-relaxed">
                Eyes open. Fingers type. The monk transforms idle thought into electric purpose.
              </p>
            </div>

            {/* Text 3 */}
            <div
              ref={text3Ref}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 md:px-16 text-center"
              style={{ opacity: 0 }}
            >
              <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold text-foreground mb-2 md:mb-4 leading-tight">
                Flow
                <br />
                <span className="text-emerald-500 dark:text-emerald-200">State</span>
              </h2>
              <p className="text-foreground/70 text-sm md:text-xl max-w-xs md:max-w-md text-center leading-relaxed">
                Time dissolves. Code flows like water. The monk and the machine become one.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
