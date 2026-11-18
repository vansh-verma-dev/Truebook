import { motion } from "framer-motion";

function SplashScreen() {
  return (
    <section className="w-full h-screen bg-[#0F172A] flex items-center justify-center overflow-hidden">

      <div className="text-center">

        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl font-bold text-white tracking-wide"
        >
          True
          <span className="text-orange-500">Book</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gray-400 mt-4 text-lg tracking-[3px]"
        >
          BUSINESS OPERATING SYSTEM
        </motion.p>

        {/* Loading Bar */}
        <div className="w-[250px] h-[4px] bg-white/10 rounded-full mx-auto mt-10 overflow-hidden">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2 }}
            className="h-full bg-orange-500 rounded-full"
          />

        </div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-gray-500 mt-5 text-sm"
        >
          Initializing Workspace...
        </motion.p>

      </div>

    </section>
  );
}

export default SplashScreen;