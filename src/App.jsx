import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

/* Final Cyan birthday app (centered, large, festival) */
export default function App() {
  const [scene, setScene] = useState("intro");
  const [titleTyped, setTitleTyped] = useState("");
  const [subtitleTyped, setSubtitleTyped] = useState("");
  const [count, setCount] = useState(3);
  const [decorated, setDecorated] = useState(false);
  const [candleLit, setCandleLit] = useState(false);
  const [balloonsPopped, setBalloonsPopped] = useState(0);
  const [cardOpen, setCardOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fairyFlash, setFairyFlash] = useState(false);

  const audioRef = useRef(null);
  const popRef = useRef(null);
  const confettiSize = useRef({ width: window.innerWidth, height: window.innerHeight });

  const slides = ["/anime1.jpg", "/anime2.jpg", "/anime3.jpg", "/anime4.jpg"];
  const slideCaptions = [
    "Our love shines brighter than any galaxy 💫",
    "You are my moonlight and my melody 🌙",
    "Even the stars blush when we smile 💖",
    "You and I — a poem written in constellations ✨",
  ];

  const letterLines = [
    "My Dearest Cyan 💙",
    "Sometimes I wonder what I did to deserve someone like you.",
    "You walked into my world so quietly — yet somehow, you became my peace, my laughter, my favorite person to dream about. 🌙",
    "You’ve painted my heart with colors I never knew existed, and every moment with you feels like a soft melody that never stops playing. 🎶",
    "When I look at you, I see home. Not a place — but a feeling, a warmth that stays even when the world turns cold.",
    "Thank you for being my calm in every storm, my light when everything feels dark.",
    "On your special day, I just want you to know — you are deeply loved, beyond words, beyond time, beyond everything I can ever say. 💫",
    "Happy Birthday, my Cyan 💙",
    "Forever yours, Thaibeen 💋",
  ];

  useEffect(() => {
    const title = "Happy Birthday Cyan 💙";
    const sub = "From Thaibeen, with endless love — open your surprise.";
    let i = 0;
    const t = setInterval(() => {
      setTitleTyped(title.slice(0, i++));
      if (i > title.length) {
        clearInterval(t);
        let j = 0;
        const s = setInterval(() => {
          setSubtitleTyped(sub.slice(0, j++));
          if (j > sub.length) clearInterval(s);
        }, 30);
      }
    }, 28);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (scene === "countdown") {
      setCount(3);
      const id = setInterval(() => {
        setCount((c) => {
          if (c <= 1) {
            clearInterval(id);
            setScene("cake");
            return 0;
          }
          return c - 1;
        });
      }, 900);
      return () => clearInterval(id);
    }
  }, [scene]);

  useEffect(() => {
    if (scene === "slideshow") {
      const id = setInterval(() => setSlideIndex((s) => (s + 1) % slides.length), 4200);
      return () => clearInterval(id);
    }
  }, [scene]);

  useEffect(() => {
    const onResize = () => (confettiSize.current = { width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.28;
      const p = audioRef.current.play();
      if (p && p.catch) p.catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (candleLit) {
      if (audioRef.current) {
        audioRef.current.volume = 0.45;
        const p = audioRef.current.play();
        if (p && p.catch) p.catch(() => {});
      }
      setShowConfetti(true);
      setFairyFlash(true);
      setTimeout(() => {
        setShowConfetti(false);
        setFairyFlash(false);
      }, 2200);
    }
  }, [candleLit]);

  useEffect(() => {
    if (balloonsPopped >= 6) {
      setTimeout(() => setScene("letter"), 900);
    }
  }, [balloonsPopped]);

  const startSurprise = () => setScene("countdown");
  const decorate = () => setDecorated(true);
  const lightCandle = () => {
    setCandleLit(true);
    setTimeout(() => setScene("balloons"), 1400);
  };

  const popBalloon = (i) => {
    if (i >= 0 && balloonsPopped < 6) {
      popRef.current?.play().catch(() => {});
      setBalloonsPopped((p) => p + 1);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 900);
    }
  };

  const openCard = () => {
    setCardOpen(true);
    setFairyFlash(true);
    setTimeout(() => setFairyFlash(false), 1200);
  };

  const goSlideshow = () => setScene("slideshow");
  const goFinal = () => setScene("final");
  const replay = () => {
    setScene("intro");
    setTitleTyped("");
    setSubtitleTyped("");
    setCount(3);
    setDecorated(false);
    setCandleLit(false);
    setBalloonsPopped(0);
    setCardOpen(false);
    setSlideIndex(0);
    setShowConfetti(false);
    setFairyFlash(false);
    const title = "Happy Birthday Cyan 💙";
    const sub = "From Thaibeen, with endless love — open your surprise.";
    let i = 0;
    const t = setInterval(() => {
      setTitleTyped(title.slice(0, i++));
      if (i > title.length) {
        clearInterval(t);
        let j = 0;
        const s = setInterval(() => {
          setSubtitleTyped(sub.slice(0, j++));
          if (j > sub.length) clearInterval(s);
        }, 30);
      }
    }, 28);
    setTimeout(() => setScene("countdown"), 700);
  };

  function FairyLights() {
    const bulbs = 12;
    const colors = ["#ff3b7a", "#ffd166", "#34d399", "#60a5fa"];
    return (
      <div className="absolute top-2 left-0 right-0 z-50 pointer-events-none flex justify-center">
        <div className={`w-full max-w-5xl px-6 flex items-center justify-center gap-6`}>
          {[...Array(bulbs)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.2 + (i % 3) * 0.2, delay: i * 0.08 }}
              className={`w-4 h-4 rounded-full drop-shadow-lg`}
              style={{
                background: colors[i % colors.length],
                boxShadow: fairyFlash ? "0 0 16px rgba(255,255,255,0.6)" : "0 6px 20px rgba(0,0,0,0.35)",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  function StarsBG() {
    return (
      <div className="absolute inset-0 -z-20 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.25 }}
            animate={{ opacity: [0.25, 0.95, 0.25], y: [0, -8, 0] }}
            transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.25 }}
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              position: "absolute",
              fontSize: `${Math.random() * 8 + 6}px`,
              color: "rgba(255,255,255,0.9)",
              textShadow: "0 0 10px rgba(255,240,255,0.06)",
            }}
          >
            ✦
          </motion.div>
        ))}
      </div>
    );
  }

  function BalloonCluster() {
    const colors = ["#fb7185", "#60a5fa", "#a78bfa", "#ffd166", "#ff7ab6", "#9f7aea"];
    return (
      <div className="relative w-96 h-96 flex items-center justify-center">
        {[...Array(6)].map((_, i) => {
          const angle = (i - 2.5) * 18;
          const left = 40 + i * 8;
          const popped = i < balloonsPopped;
          return (
            <motion.div
              key={i}
              onClick={() => !popped && popBalloon(i)}
              initial={{ y: 200, scale: 0.95 }}
              animate={popped ? { scale: 0, opacity: 0 } : { y: [200, 10, 0, -6], scale: [1, 1.02, 0.98, 1] }}
              transition={{ duration: 3 + (i % 3) * 0.6, delay: 0.3 + i * 0.08 }}
              className="absolute flex flex-col items-center cursor-pointer"
              style={{ left: `${left}%`, transform: `rotate(${angle}deg)` }}
            >
              <div
                style={{
                  width: 110,
                  height: 140,
                  borderRadius: 84,
                  background: `linear-gradient(180deg, ${colors[i]}, rgba(255,255,255,0.26))`,
                  boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
                }}
              />
              <div style={{ width: 2, height: 76, background: "rgba(255,255,255,0.12)" }} />
            </motion.div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#24062f] via-[#6b2e6f] to-[#0b1020] text-white overflow-hidden font-sans">
      <FairyLights />
      <StarsBG />
      <AnimatePresence>{(showConfetti || scene !== "intro") && <Confetti width={confettiSize.current.width} height={confettiSize.current.height} recycle={true} numberOfPieces={160} />}</AnimatePresence>
      <audio ref={audioRef} src="/kaun_tujhe.mp3" loop preload="auto" />
      <audio ref={popRef} src="/pop.mp3" preload="auto" />
      <div className="fixed top-16 left-0 right-0 z-40 flex justify-center pointer-events-none">
        <motion.div animate={{ textShadow: ["0 0 16px rgba(255,255,255,0.06)", "0 0 36px rgba(255,255,255,0.18)", "0 0 16px rgba(255,255,255,0.06)"] }} transition={{ repeat: Infinity, duration: 3 }} className="px-8 py-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#ff7ab6] via-[#ffd166] to-[#60a5fa]">Happy Birthday Cyan 💙</h1>
        </motion.div>
      </div>
      <div className="relative z-30 max-w-6xl mx-auto px-6 py-36 flex flex-col items-center justify-center gap-12">
        <AnimatePresence mode="wait">
          {scene === "intro" && (
            <motion.section key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex flex-col items-center justify-center gap-6">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#ffd1f0] via-[#ff7ab6] to-[#a78bfa] drop-shadow-2xl">{titleTyped}</h2>
              <p className="mt-2 text-lg md:text-xl text-white/85 max-w-2xl text-center">{subtitleTyped}</p>
              <motion.button onClick={() => setScene("countdown")} whileHover={{ scale: 1.04 }} className="mt-8 px-10 py-4 rounded-full bg-gradient-to-r from-[#ff7ab6] to-[#6dd3ff] text-black font-bold text-lg shadow-2xl">Open Your Surprise 🎁</motion.button>
            </motion.section>
          )}
          {scene === "countdown" && (
            <motion.section key="count" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center justify-center gap-4">
              <div className="text-8xl md:text-9xl lg:text-[120px] font-black bg-clip-text text-transparent bg-gradient-to-r from-[#fff7f8] to-[#ffd9fb] drop-shadow-2xl">{count > 0 ? count : "Go!"}</div>
              <p className="mt-2 text-lg text-white/75">Breathe... the magic is about to begin ✨</p>
            </motion.section>
          )}
          {scene === "cake" && (
            <motion.section key="cake" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center justify-center gap-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#fff0ff] drop-shadow-lg">🎂 Make the cake shine</h2>
              <div className="relative flex items-center justify-center">
                <div className="absolute -bottom-12 w-96 h-48 rounded-full blur-3xl bg-[radial-gradient(ellipse_at_center,_rgba(255,192,203,0.12),_transparent_60%)] pointer-events-none" />
                <div className="z-20">
                  <svg width="640" height="420" viewBox="0 0 640 420" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="320" cy="390" rx="240" ry="34" fill="#fff7f6" opacity="0.95" />
                    <g>
                      <rect x="140" y="200" rx="36" ry="36" width="360" height="160" fill="#fff3fb" stroke="#ffdfe8" strokeWidth="2" />
                      <rect x="155" y="180" rx="32" ry="32" width="330" height="120" fill="#ffd1f0" />
                      <rect x="170" y="160" rx="28" ry="28" width="300" height="100" fill="#e89ff8" />
                      <path d="M170 160 q40 -40 100 10 t100 0 t100 0 v24 h-300 z" fill="#fffaf9" opacity="0.98" />
                    </g>
                    <g transform="translate(320,100)">
                      <rect x="-14" y="0" width="28" height="92" rx="8" fill="#fff3c4" />
                      {candleLit && (
                        <g>
                          <motion.ellipse cx="0" cy="-14" rx="20" ry="30" fill="url(#fg2)" initial={{ scale: 0.96 }} animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 0.9 }} />
                          <motion.ellipse cx="0" cy="-14" rx="40" ry="12" fill="rgba(255,200,120,0.06)" animate={{ opacity: [0.2, 0.6, 0.2] }} transition={{ repeat: Infinity, duration: 0.9 }} />
                        </g>
                      )}
                    </g>
                    <defs>
                      <radialGradient id="fg2">
                        <stop offset="0%" stopColor="#fff6a3" />
                        <stop offset="40%" stopColor="#ffd24a" />
                        <stop offset="100%" stopColor="#ff6a45" />
                      </radialGradient>
                    </defs>
                  </svg>
                </div>
              </div>
              <div className="flex gap-6">
                <button onClick={decorate} disabled={decorated} className={`px-8 py-4 rounded-full font-semibold ${decorated ? "bg-white/10 text-white/60 cursor-default" : "bg-pink-500 text-white shadow-lg text-lg"}`}>{decorated ? "Decorated" : "Decorate"}</button>
                <button onClick={lightCandle} disabled={candleLit} className={`px-8 py-4 rounded-full font-semibold ${candleLit ? "bg-white/10 text-white/60 cursor-default" : "bg-cyan-400 text-black shadow-lg text-lg"}`}>{candleLit ? "Candle Lit" : "Light the Candle"}</button>
              </div>
              <p className="text-base text-white/85 mt-2">Lighting the candle will brighten the scene, bring in balloons, and make the music bloom ✨</p>
            </motion.section>
          )}
          {scene === "balloons" && (
            <motion.section key="balloons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center justify-center gap-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#fff0ff]">🎈 Pop the balloons — each holds a wish</h2>
              <div className="relative w-full h-[420px] flex items-center justify-center">
                <div className="relative w-96 h-96 flex items-center justify-center">
                  {[...Array(6)].map((_, i) => {
                    const angle = (i - 2.5) * 18;
                    const left = 40 + i * 8;
                    const popped = i < balloonsPopped;
                    return (
                      <motion.div
                        key={i}
                        onClick={() => !popped && popBalloon(i)}
                        initial={{ y: 200, scale: 0.95 }}
                        animate={popped ? { scale: 0, opacity: 0 } : { y: [200, 10, 0, -6], scale: [1, 1.02, 0.98, 1] }}
                        transition={{ duration: 3 + (i % 3) * 0.6, delay: 0.3 + i * 0.08 }}
                        className="absolute flex flex-col items-center cursor-pointer"
                        style={{ left: `${left}%`, transform: `rotate(${angle}deg)` }}
                      >
                        <div style={{ width: 110, height: 140, borderRadius: 84, background: `linear-gradient(180deg, ${["#fb7185","#60a5fa","#a78bfa","#ffd166","#ff7ab6","#9f7aea"][i]}, rgba(255,255,255,0.26))`, boxShadow: "0 18px 40px rgba(0,0,0,0.35)" }} />
                        <div style={{ width: 2, height: 76, background: "rgba(255,255,255,0.12)" }} />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              <div className="text-white/80">{balloonsPopped} / 6 popped</div>
              <button onClick={() => balloonsPopped >= 6 && setScene("letter")} disabled={balloonsPopped < 6} className={`px-8 py-4 rounded-full font-semibold ${balloonsPopped >= 6 ? "bg-gradient-to-r from-[#ff7ab6] to-[#6dd3ff] text-black" : "bg-white/10 text-white/50 cursor-default"}`}>Next → Open Message</button>
            </motion.section>
          )}
          {scene === "letter" && (
            <motion.section key="letter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center justify-center gap-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#fff6ff]">💌 A Love Letter</h2>
              <div className="relative max-w-3xl w-full">
                {!cardOpen && (
                  <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} onClick={openCard} className="mx-auto cursor-pointer">
                    <div className="w-96 h-56 bg-gradient-to-br from-[#ffd9f3] to-[#cfe8ff] rounded-2xl p-6 shadow-2xl border border-white/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-semibold text-[#4b0b6a]">A Special Letter</div>
                        <div className="mt-3 text-sm text-[#2b1a36]">Tap to open ✨</div>
                      </div>
                    </div>
                  </motion.div>
                )}
                {cardOpen && (
                  <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mx-auto bg-[#0f0520]/70 rounded-2xl p-8 shadow-2xl border border-[#a78bfa]/20">
                    <div className="prose prose-invert max-w-none">
                      {letterLines.map((ln, idx) => (
                        <motion.p key={idx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 + idx * 0.5 }} className={`${idx === 0 ? "text-xl font-extrabold text-[#ffe6ff]" : "text-lg text-[#e7e7ff]"}`}>{ln}</motion.p>
                      ))}
                    </div>
                    <div className="mt-6 flex gap-4 justify-center">
                      <button onClick={goSlideshow} className="px-6 py-3 rounded-full bg-gradient-to-r from-[#ff7ab6] to-[#6dd3ff] font-semibold">Show Sweet Moments</button>
                      <button onClick={goFinal} className="px-6 py-3 rounded-full bg-white/10">Skip to Finale</button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}
          {scene === "slideshow" && (
            <motion.section key="slideshow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center justify-center gap-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#fff3ff]">🌸 Our Sweet Moments</h2>
              <div className="relative w-full max-w-3xl h-[520px] rounded-3xl overflow-hidden shadow-2xl border border-[#ffffff10] bg-[#00000010]">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <motion.div initial={{ scale: 0.98 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-2xl h-full rounded-2xl overflow-hidden border-8 border-gradient-purple shadow-2xl bg-gradient-to-br from-[#2a0831]/20 to-[#00000010]">
                    <div className="relative w-full h-full">
                      <motion.img key={slideIndex} src={slides[slideIndex]} alt={`slide-${slideIndex}`} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1.06 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.9 }} className="absolute inset-0 w-full h-full object-contain" />
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-black/40 backdrop-blur-sm">
                        <div className="text-lg font-semibold text-white drop-shadow-lg">{slideCaptions[slideIndex]}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setSlideIndex((s) => (s - 1 + slides.length) % slides.length)} className="px-4 py-2 rounded-full bg-white/10">Prev ❤️</button>
                <button onClick={() => setSlideIndex((s) => (s + 1) % slides.length)} className="px-4 py-2 rounded-full bg-white/10">Next ❤️</button>
              </div>
              <button onClick={goFinal} className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#ff7ab6] to-[#6dd3ff] font-semibold">Finish</button>
            </motion.section>
          )}
          {scene === "final" && (
            <motion.section key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full flex flex-col items-center justify-center gap-6">
              <div className="max-w-3xl w-full bg-gradient-to-br from-[#3b0b4a] to-[#1e1330] p-10 rounded-3xl shadow-2xl text-center border border-[#6d28d9]/30">
                <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#ffdff0] to-[#d6bbff] drop-shadow-2xl">Thank you for being my everything, Cyan 💙</div>
                <p className="mt-3 text-xl text-[#e6e6ff]">Forever yours, Thaibeen 💞</p>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
