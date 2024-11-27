import React, { useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useTheme } from "./ThemeContext"; 
const indoorCards = [
  { id: 1, title: "Indoor Card 1", image: "https://i.pinimg.com/564x/4c/88/d4/4c88d4a418e8cec4445984d394e0cc5e.jpg" },
  { id: 2, title: "Indoor Card 2", image: "https://i.pinimg.com/736x/91/b2/99/91b29958008789fe762c35a6f94ea275.jpg"},
  { id: 3, title: "Indoor Card 3", image: "https://i.pinimg.com/564x/4a/d4/c3/4ad4c30d4a39c24108d7bba39a4571b1.jpg"},
  { id: 4, title: "Indoor Card 4", image: "https://i.pinimg.com/564x/ca/07/d2/ca07d2aa9a2a619dcde06183313da42d.jpg" },
  { id: 5, title: "Indoor Card 5", image: "https://i.pinimg.com/564x/10/cd/37/10cd37843919953de54585e9521e15fd.jpg" },
  { id: 6, title: "Indoor Card 6", image: "https://i.pinimg.com/564x/92/c5/b2/92c5b24b57f453a0772d65cb15a4c000.jpg" },
  { id: 7, title: "Indoor Card 7", image: "https://i.pinimg.com/564x/84/8d/74/848d74ff8c8594751e67c12200a2191d.jpg" },
  { id: 8, title: "Indoor Card 8", image: "https://i.pinimg.com/564x/5d/d7/a8/5dd7a87d1fe5e4a4c3ee9a11b859f4e4.jpg" },
  { id: 9, title: "Indoor Card 9", image: "https://i.pinimg.com/564x/58/e2/35/58e235e33c130b667e1f2e3eafeb5f4c.jpg" },
];

const outdoorCards = [
  { id: 1, title: "Outdoor Card 1" , image: "https://i.pinimg.com/564x/00/1a/9a/001a9a43208042f38b8d46660f217604.jpg"},
  { id: 2, title: "Outdoor Card 2" , image:"https://i.pinimg.com/564x/09/8a/2f/098a2f1c0b8e026db39b463f96272520.jpg" },
  { id: 3, title: "Outdoor Card 3" , image:"https://i.pinimg.com/564x/7b/7a/40/7b7a40036d7f4321be31d5613cbb2443.jpg"},
  { id: 4, title: "Outdoor Card 4" , image:"https://i.pinimg.com/564x/8a/f6/91/8af69174c259e81f86659ce622228c48.jpg"},
  { id: 5, title: "Outdoor Card 5" , image:"https://i.pinimg.com/564x/fc/c3/8d/fcc38df2bd97813be9aafdee931b837e.jpg"},
  { id: 6, title: "Outdoor Card 6" , image:"https://i.pinimg.com/564x/0d/08/83/0d08834f6d1d9a945fafb5461f71587f.jpg"},
  { id: 7, title: "Outdoor Card 7" , image:"https://i.pinimg.com/564x/f5/1c/b7/f51cb71eeef3b3677edc5373f5eeaa4a.jpg"},
  { id: 8, title: "Outdoor Card 8" , image:"https://i.pinimg.com/564x/f5/1c/b7/f51cb71eeef3b3677edc5373f5eeaa4a.jpg"},
  { id: 9, title: "Outdoor Card 9" , image:"https://i.pinimg.com/564x/0a/4d/46/0a4d46accd9ad6bb60bb6c54ca93a3b7.jpg"},
]

const CardSelection = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null); 

  const handleCardClick = (category) => {
    setSelectedCategory(category);
  };

  const openCard = (card) => {
    setSelectedCard(card); 
  };

  const renderCards = (cards) => (
    <motion.div
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.05 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
    >
      {cards.map((card) => (
        <motion.div
          key={card.id}
          className={twMerge(
            `relative w-[300px] h-[200px] overflow-hidden rounded-lg shadow-lg border p-4 cursor-pointer`,
            theme === "light" ? "bg-white border-gray-300" : "bg-zinc-800 border-zinc-700"
          )}
          whileHover={{ scale: 1.05 }}
          variants={{
            initial: { scale: 0.8, opacity: 0, y: 30 },
            animate: { scale: 1, opacity: 1, y: 0 },
          }}
          onClick={() => openCard(card)} 
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
            <p className="text-white text-lg">{card.title}</p>
          </div>
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover transition duration-500 ease-in-out"
          />
        </motion.div>
      ))}
    </motion.div>
  );

  const renderSelectedCard = () => (
    <section className="w-full h-screen px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-full mx-auto">
      <div className="relative group text-container p-8 md:p-12">
        {/* TOP outline */}
        <span className="absolute -top-4 left-0 h-[2px] w-0 bg-[#4CAF50] transition-all duration-100 group-hover:w-full" />
        {/* RIGHT outline */}
        <span className="absolute top-0 -right-4 h-0 w-[2px] bg-[#4CAF50] transition-all delay-100 duration-100 group-hover:h-full" />
        {/* BOTTOM outline */}
        <span className="absolute -bottom-4 right-0 h-[2px] w-0 bg-[#4CAF50] transition-all delay-200 duration-100 group-hover:w-full" />
        {/* LEFT outline */}
        <span className="absolute bottom-0 -left-4 h-0 w-[2px] bg-[#4CAF50] transition-all delay-300 duration-100 group-hover:h-full" />

        {/* Text Content */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="relative z-10"
        >
          <h3 className="text-4xl md:text-6xl font-semibold">
            {selectedCard.title}
          </h3>
          <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
            This is a detailed view of {selectedCard.title}. You can add a description or more details here.
          </p>
        </motion.div>
      </div>

      <div className="image-container relative w-full h-full">
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${selectedCard.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    </section>
  );

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-12 ${
        theme === "light" ? "text-black" : "text-white"
      }`}
    >
      {selectedCard ? (
        renderSelectedCard() // Render the selected card in ShuffleHero2-like style
      ) : (
        <>
          {selectedCategory === null ? (
            <motion.div
              initial="initial"
              animate="animate"
              transition={{ staggerChildren: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
            >
              {/* Indoor and Outdoor Cards */}
              <motion.div
                className="relative w-[400px] h-[300px] overflow-hidden rounded-lg shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleCardClick("indoor")}
              >
                <img
                  src="https://i.pinimg.com/564x/2e/ad/4f/2ead4fceb71bcff9592e7c590ac0808f.jpg"
                  alt="Indoor Plants"
                  className="w-600 h-500 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                  <p className="text-white text-lg">Indoor Plants</p>
                </div>
              </motion.div>

              <motion.div
                className="relative w-[400px] h-[300px] overflow-hidden rounded-lg shadow-lg cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleCardClick("outdoor")}
              >
                <img
                  src="https://i.pinimg.com/564x/0f/48/a3/0f48a3b395f6bed728606880e4ea2647.jpg"
                  alt="Outdoor Plants"
                  className="w-600 h-500 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                  <p className="text-white text-lg">Outdoor Plants</p>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            renderCards(selectedCategory === "indoor" ? indoorCards : outdoorCards)
          )}
        </>
      )}
    </div>
  );
};

export default CardSelection;
