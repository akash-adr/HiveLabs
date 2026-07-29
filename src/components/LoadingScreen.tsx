"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [visible, setVisible] = useState(true)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef(Date.now())

  useEffect(() => {
    // Collect all images and videos on the page
    const getResources = () => {
      const imgs = Array.from(document.querySelectorAll("img")) as HTMLImageElement[]
      const vids = Array.from(document.querySelectorAll("video")) as HTMLVideoElement[]
      return { imgs, vids }
    }

    // Minimum display time so it doesn't flash for 10ms
    const MIN_MS = 2200

    // Track how many resources are loaded
    const checkProgress = () => {
      const { imgs, vids } = getResources()
      const total = imgs.length + vids.length
      if (total === 0) return 100

      let loaded = 0
      imgs.forEach((img) => { if (img.complete && img.naturalWidth > 0) loaded++ })
      vids.forEach((vid) => { if (vid.readyState >= 3) loaded++ })

      return Math.round((loaded / total) * 100)
    }

    // Smoothly animate progress to target value
    let currentProgress = 0
    let targetProgress = 0

    const tick = () => {
      targetProgress = checkProgress()

      // If window already loaded, push to 100
      if (document.readyState === "complete") {
        targetProgress = 100
      }

      // Ease towards target (never go backwards)
      if (currentProgress < targetProgress) {
        currentProgress += Math.max(0.4, (targetProgress - currentProgress) * 0.06)
        currentProgress = Math.min(currentProgress, targetProgress)
      }

      const elapsed = Date.now() - startRef.current
      // Enforce min display time — clamp displayed progress
      const minGateProgress = Math.min(100, (elapsed / MIN_MS) * 100)
      const displayProgress = Math.min(currentProgress, minGateProgress)

      setProgress(Math.floor(displayProgress))

      if (displayProgress >= 99.5 && elapsed >= MIN_MS) {
        setProgress(100)
        setDone(true)
        // Short pause at 100% before exit
        setTimeout(() => setVisible(false), 600)
        return
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    // Also listen for window load event to push things along
    const onLoad = () => { targetProgress = 100 }
    window.addEventListener("load", onLoad)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener("load", onLoad)
    }
  }, [])

  // Prevent body scroll while loading
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [visible])

  const radius = 54
  const circumference = 2 * Math.PI * radius
  const strokeDash = circumference - (progress / 100) * circumference

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center select-none"
          style={{ background: "#ffffff" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Ambient glow behind logo */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(253,185,6,0.10) 0%, transparent 70%)",
              filter: "blur(60px)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Welcome text */}
          <motion.p
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-[11px] font-bold uppercase tracking-[0.35em] mb-10"
            style={{ color: "#fdb906" }}
          >
            Welcome to HiveLabs
          </motion.p>

          {/* Ring + Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
            style={{ width: 152, height: 152 }}
          >
            {/* SVG ring */}
            <svg
              width="152"
              height="152"
              viewBox="0 0 152 152"
              className="absolute inset-0"
              style={{ transform: "rotate(-90deg)" }}
            >
              {/* Track */}
              <circle
                cx="76"
                cy="76"
                r={radius}
                fill="none"
                stroke="rgba(0,0,0,0.07)"
                strokeWidth="4"
              />
              {/* Progress arc */}
              <circle
                cx="76"
                cy="76"
                r={radius}
                fill="none"
                stroke="#fdb906"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDash}
                style={{ transition: "stroke-dashoffset 0.15s linear" }}
              />
              {/* Glow dot at tip */}
              <circle
                cx="76"
                cy="76"
                r={radius}
                fill="none"
                stroke="#fdb906"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`1 ${circumference - 1}`}
                strokeDashoffset={strokeDash}
                style={{
                  filter: "blur(3px)",
                  opacity: 0.8,
                  transition: "stroke-dashoffset 0.15s linear",
                }}
              />
            </svg>

            {/* Spinning outer ring decoration */}
            <svg
              width="168"
              height="168"
              viewBox="0 0 168 168"
              className="absolute"
              style={{
                top: -8,
                left: -8,
                animation: "spin 8s linear infinite",
                opacity: 0.18,
              }}
            >
              <circle
                cx="84"
                cy="84"
                r="80"
                fill="none"
                stroke="#fdb906"
                strokeWidth="1"
                strokeDasharray="6 18"
                strokeLinecap="round"
              />
            </svg>

            {/* Logo */}
            <div
              className="relative flex items-center justify-center"
              style={{
                width: 100,
                height: 100,
              }}
            >
              <Image
                src="/newlogo.png"
                alt="HiveLabs"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 font-heading font-black text-black tabular-nums"
            style={{ fontSize: "clamp(2.4rem, 5vw, 3.2rem)", letterSpacing: "-0.04em" }}
          >
            {progress}
            <span className="text-[#fdb906]">%</span>
          </motion.div>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-3 text-sm text-black/40 font-medium tracking-wide"
          >
            {done ? (
              <span className="text-[#fdb906]/80">Ready ✦</span>
            ) : (
              "Just a min... loading this premium"
            )}
          </motion.p>

          {/* keyframes */}
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
