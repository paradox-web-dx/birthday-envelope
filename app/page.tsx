"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PARTNER_NAME = "For Riyandin";
const BEAT_DROP_MS = 3200;

export default function BirthdayEnvelopeApp() {
  const [open, setOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const [showLetterOpen, setShowLetterOpen] = useState(false);
  const [page, setPage] = useState<
    "home" | "story" | "gallery" | "message" | "promise" | "ending"
  >("home");
  const [night, setNight] = useState(false);

  /* MUSIC */
  useEffect(() => {
    if (!open) return;
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.6;
    audio.play().catch(() => {});
    return () => audio.pause();
  }, [open]);

  /* GOOGLE FONT */
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML =
      "@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600&display=swap');";
    document.head.appendChild(style);
  }, []);

  /* ================= OPENING ENVELOPE ================= */
  if (!open) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-white via-gray-100 to-slate-200 overflow-hidden">
        <motion.div
          onClick={() => {
            if (opening) return;
            setOpening(true);
            setTimeout(() => setShowLetterOpen(true), 1400);
            setTimeout(() => setOpen(true), BEAT_DROP_MS);
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 100, damping: 18 }}
          className="relative w-72 h-44 cursor-pointer"
          style={{ perspective: "1200px" }}
        >
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 h-8 bg-black/10 blur-xl rounded-full" />
          <div className="absolute inset-0 bg-white rounded-xl shadow-xl" />

          <motion.div
            animate={opening ? { rotateX: 180 } : { rotateX: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gray-200 origin-top z-20"
            style={{ clipPath: "polygon(0 0, 50% 100%, 100% 0)" }}
          />

          <motion.div
            animate={
              opening
                ? { y: -60, opacity: 1, rotateY: showLetterOpen ? 180 : 0 }
                : { y: 30, opacity: 0 }
            }
            transition={{ duration: 1.2, delay: 0.9 }}
            className="absolute inset-6 bg-white rounded-lg flex items-center justify-center"
            style={{ boxShadow: opening ? "0 18px 45px rgba(0,0,0,0.15)" : "none" }}
          >
            <p
              style={{ fontFamily: "'Dancing Script', cursive" }}
              className="text-slate-700 text-xl"
            >
              {PARTNER_NAME}
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  /* ================= MAIN APP ================= */
  return (
    <div
      className={`min-h-screen transition-colors duration-700 ${
        night
          ? "bg-slate-900 text-slate-100"
          : "bg-gradient-to-br from-white via-gray-100 to-slate-200 text-slate-800"
      }`}
    >
      <AnimatePresence mode="wait">
        {/* HOME */}
        {page === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center p-6"
          >
            <h1
              style={{ fontFamily: "'Dancing Script', cursive" }}
              className="text-5xl mb-4"
            >
              Happy Birthday 🤍
            </h1>

            <p className="mb-8 opacity-80">Untuk kamu yang selalu aku sayang.</p>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
              <Menu label="Story" onClick={() => setPage("story")} />
              <Menu label="Gallery" onClick={() => setPage("gallery")} />
              <Menu label="Message" onClick={() => setPage("message")} />
              <Menu label="Hope" onClick={() => setPage("promise")} />
            </div>

            <Menu
              label={night ? "Day Mode" : "Night Mode"}
              onClick={() => setNight(!night)}
            />
          </motion.div>
        )}

        {page === "story" && (
          <Page
            title="Story"
            text="Semuanya dimulai dari cerita sederhana yang perlahan jadi bermakna."
            onBack={() => setPage("home")}
          />
        )}

        {page === "message" && (
          <Page
            title="Message"
            text="Terima kasih sudah hadir dan membuat hidupku lebih hangat."
            onBack={() => setPage("home")}
          />
        )}

        {page === "promise" && (
          <Page
            title="Hope"
            text="Semoga kita selalu saling menjaga dan menguatkan."
            onBack={() => setPage("ending")}
          />
        )}

        {page === "ending" && (
          <Page
            title=""
            text="I love you, always."
            onBack={() => setPage("home")}
          />
        )}

        {/* GALLERY — SWIPE LIKE INSTAGRAM */}
        {page === "gallery" && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6"
          >
            <h2
              style={{ fontFamily: "'Dancing Script', cursive" }}
              className="text-4xl text-center mb-6"
            >
              Galeri Kenangan
            </h2>

            <SwipeGallery
              images={["/foto1.jpg", "/foto2.jpg", "/foto3.jpg", "/foto4.jpg"]}
            />

            <div className="mt-8 text-center">
              <Menu label="Kembali" onClick={() => setPage("home")} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= COMPONENTS ================= */
function Menu({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="bg-white px-4 py-3 rounded-full shadow text-slate-700"
    >
      {label}
    </motion.button>
  );
}

function Page({
  title,
  text,
  onBack,
}: {
  title: string;
  text: string;
  onBack: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center p-6"
    >
      {title && (
        <h2
          style={{ fontFamily: "'Dancing Script', cursive" }}
          className="text-4xl mb-4"
        >
          {title}
        </h2>
      )}
      <p className="mb-10 opacity-80 max-w-md mx-auto whitespace-pre-line">
        {text}
      </p>
      <Menu label="Kembali" onClick={onBack} />
    </motion.div>
  );
}

function SwipeGallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="overflow-hidden">
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50 && index < images.length - 1)
            setIndex(index + 1);
          if (info.offset.x > 50 && index > 0) setIndex(index - 1);
        }}
        animate={{ x: -index * 300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex"
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            className="w-72 h-96 object-cover rounded-xl mx-4 shadow"
          />
        ))}
      </motion.div>
    </div>
  );
}