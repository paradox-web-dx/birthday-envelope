"use client";

import { useState, useEffect, useRef } from "react";
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

  /* MUSIC */
  useEffect(() => {
    if (!open) return;
    const audio = new Audio("/Tulus - Monokrom (Instrumental).mp3");
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
    <div className="min-h-screen bg-slate-900 text-slate-100 transition-colors duration-700">

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
              Happy Birthday My Someone🤍
            </h1>

           <p className="mb-8 opacity-80">Untuk Riyandin dari Dipadin😌</p>
            <div className="mb-8 opacity-80"> Sebelumnya maaf kalo tampilannya kurang bagus, karena aku sendiri gak terbayang sama sekali bakalan membuat yang seperti ini, jujur dari aku gak nyangka bakalan ada hari dimana aku membuat yang seperti ini untuk seseorang, jadi bisa dibilang first time lahh yaa heheh. Jadi maaf kalo tampilannya sederhana, walaupun sederhana tapi membuatnya lumayan sekali heheh bagi aku yang bukan ahli dibidangnya. Inipun bisa buat karena dibantu oleh Jin heheee, Jin Ai maksudnya😅. Yahh begitulah sedikit cerita heheh, selamat membaca xixixixi</div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
              <Menu label="Story" onClick={() => setPage("story")} />
              <Menu label="Gallery" onClick={() => setPage("gallery")} />
              <Menu label="Message" onClick={() => setPage("message")} />
              <Menu label="Hope" onClick={() => setPage("promise")} />
            </div>

          </motion.div>
        )}

        {page === "story" && (
          <Page
            title="Story"
            text="Semuanya berawal dari kata Assalamualaikum Mister …….. [
8/7, 22.47] Riyanti | Alumni SMK KP: Iyahhh kerasa banget hhe
[8/7, 22.48] Riyanti | Alumni SMK KP: Ehh iya Riyanti mau ngucapin makasih banyak sama mister, mister udhh ngasih ilmu yang bermanfaat juga udhh bantu Riyanti buat ngelewatin ujikom dll nya mister. Sampai sekarang ini yang dimana sudah melewati lumayan banyak hal, seperti Bahagia bareng, ketawa bareng, berantem bareng, badmood an, pundungan dsb. Pokoknya sudah terjadi banyak hal lahh, dan moment yang paling berkesan ialah pas moment awal itu dan pada saat aku nembak kamu hehee……
"
            onBack={() => setPage("home")}
          />
        )}

        {page === "message" && (
          <Page
            title="Message"
            text="Selamat ulang tahun yaa Riyandin 🤍
Aku cuma mau bilang klo keberadaan kamu itu berarti banget (klo gk ngeselin)🗿. Terima kasih yaa sudah jadi perempuan yang apa adanya dengan senyumnya, ngeselinnya, pundungannya, keberadaannya dan semua hal kecil yang bikin hari-hariku lebih berwarna hehee😌
Di usia mu yang bertambah ini, ehhh bentarr bertambah apa berkurang? 🤔 hmmm…….. yahhh begitulah. Intinya aku doain semoga kamu selalu diberi kesehatan, kelancaran dan kemudahan, juga Kesehatan lahir, batin. Semoga semua hal yang lagi kamu perjuangkan pelan-pelan dipermudah, dilancarkan, dan hasilnya sesuai dengan yang kamu harapkan. Semoga juga  rezekinya lancar, mimpinya satu per satu tercapai, dan hidupnya dipenuhi hal-hal baik, ntah itu dengan keluarga, teman, aku, atau siapapun yang ada dikehidupan kamu heheee
Aku juga berharap kamu engga lupa buat selalu memikirkan diri kamu sendiri. Jangan terlalu mementingkan orang lain daripada diri kamu sendiri yaa. Kalau suatu hari capek, sedih, atau ngerasa sendirian, ingat selalu ada aku yang siap dengerin, nemenin, dan ada buat kamu, walaupun aku sendiri yang seringkali buat kamu kecewa ataupun yg membuat kamu sedih, semoga kuat dan gk cape sama aku hehee…..
Semoga di tahun ini kamu lebih sering senyumnya, sedikit sedih dan manyunnya (walaupun aku yg sering bikin kamu gitu heheh), yaaa intinya semoga kamu Bahagia terus lah yaaaa 🤗
Selamat ulang tahun, yaaa Riyandin 🤍
 
Dari pacarmu Dipaa hehehe
"
            onBack={() => setPage("home")}
          />
        )}

        {page === "promise" && (
          <Page
            title="Hope"
            text="Harapan aku buat kedepannya ialah semoga kita lebih sering Bahagia dan ketawanya dibanding berantem dan sedihnya yaaa 🤗
Itu saja gak lebih, itupun berarti buat akumah karena aku gak mau klo semisalkan lebih sering berantem mah akunya sendiri gak tau kedepannya bakalan kuat atau engga, begitupun juga kamu hehee
"
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
              images={["/foto12.jpg", "/foto2.jpg", "/foto3.jpg", "/foto4.jpg", "/foto5.jpg", "/foto6.jpg", "/foto7.jpg", "/foto8.jpg", "/foto9.jpg", "/foto10.jpg", "/foto11.jpg" ]}/>

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
      className="bg-slate-800 px-4 py-3 rounded-full shadow text-slate-100"
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Ambil lebar container agar responsive
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageWidth = 288 + 32; // w-72 + mx-4

  // Maksimal offset agar tidak kelebihan drag
  const maxOffset = Math.max((images.length * imageWidth) - containerWidth, 0);

  return (
    <div ref={containerRef} className="overflow-hidden w-full">
      <motion.div
        drag="x"
        dragConstraints={{ left: -maxOffset, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -50 && index < images.length - 1) setIndex(index + 1);
          if (info.offset.x > 50 && index > 0) setIndex(index - 1);
        }}
        animate={{ x: -index * imageWidth }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex"
      >
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            className="w-72 h-96 object-cover rounded-xl mx-4 shadow flex-shrink-0"
          />
        ))}
      </motion.div>
    </div>
  );
}