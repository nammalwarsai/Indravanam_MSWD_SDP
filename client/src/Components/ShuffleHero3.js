import { motion } from "framer-motion";

const ShuffleHero3 = () => {
  return (
    <section className="w-full h-screen px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-full mx-auto">
      <div className="image-container relative w-full h-full">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 w-full h-full animate-fade-in"
          style={{
            backgroundImage: `url('https://imgs.search.brave.com/CFBSgM5mA8exAOz-_PTFqaeh-4UF4UhcW_1LA9jme1c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW5zcGlyZWRleHRl/cmlvcnMuY29tLmF1/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIx/LzA3L1RoZS1IaWdo/LVRlY2gtR2FyZGVu/LTAxLmpwZw')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>

      <div className="relative group text-container p-8 md:p-12">
        {/* DrawOutline for the entire content */}
        {/* TOP */}
        <span className="absolute -top-4 left-0 h-[2px] w-0 bg-[#4CAF50] transition-all duration-100 group-hover:w-full" />

        {/* RIGHT */}
        <span className="absolute top-0 -right-4 h-0 w-[2px] bg-[#4CAF50] transition-all delay-100 duration-100 group-hover:h-full" />

        {/* BOTTOM */}
        <span className="absolute -bottom-4 right-0 h-[2px] w-0 bg-[#4CAF50] transition-all delay-200 duration-100 group-hover:w-full" />

        {/* LEFT */}
        <span className="absolute bottom-0 -left-4 h-0 w-[2px] bg-[#4CAF50] transition-all delay-300 duration-100 group-hover:h-full" />

        {/* Content */}
        <motion.div
          whileHover={{ scale: 1.05 }} // Optional: Adds a zoom effect on hover
          className="relative z-10"
        >
          <h3 className="text-4xl md:text-6xl font-semibold animate-fly-in">
            Let's change it up a bit
          </h3>
          <p className="text-base md:text-lg text-slate-700 my-4 md:my-6 animate-fly-in">
            we provide our coustomers with the top quality techonology and perfect planning for future needs 
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ShuffleHero3;
