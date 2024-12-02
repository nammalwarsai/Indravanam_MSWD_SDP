import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
const ShuffleHero = () => {

  return (
    <section className="w-full h-screen px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-full mx-auto">
      <div>
        <h3 className="text-3xl md:text-4xl font-semibold">
        Tired of wilting plants? we've got your back
        </h3>
        <p className="text-base md:text-lg  my-4 md:my-6">
        Imagine a world where your plants are cared for effortlessly, growing and thriving with minimal effort on your part. Our API automates routine tasks, provides personalized plant care recommendations, and offers expert advice, ensuring your garden flourishes. 
        Experience the joy of gardening without the stress of constant maintenance. Let us be your partner in creating a beautiful and sustainable green space.
        </p>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://i.pinimg.com/564x/00/1a/9a/001a9a43208042f38b8d46660f217604.jpg",
  },
  {
    id: 2,
    src: "https://i.pinimg.com/564x/09/8a/2f/098a2f1c0b8e026db39b463f96272520.jpg",
  },
  {
    id: 3,
    src: "https://i.pinimg.com/564x/7b/7a/40/7b7a40036d7f4321be31d5613cbb2443.jpg",
  },
  {
    id: 4,
    src: "https://i.pinimg.com/564x/fc/c3/8d/fcc38df2bd97813be9aafdee931b837e.jpg",
  },
  {
    id: 5,
    src: "https://i.pinimg.com/564x/8a/f6/91/8af69174c259e81f86659ce622228c48.jpg",
  },
  {
    id: 6,
    src: "https://i.pinimg.com/564x/0d/08/83/0d08834f6d1d9a945fafb5461f71587f.jpg",
  },
  {
    id: 7,
    src: "https://i.pinimg.com/564x/40/32/da/4032da9de4c1a98760bf272b9a782c5d.jpg",
  },
  {
    id: 8,
    src: "https://i.pinimg.com/736x/94/68/cf/9468cf54fb45aa026c096e2ad61609d6.jpg",
  },
  {
    id: 9,
    src: "https://i.pinimg.com/564x/f4/7a/4e/f47a4e90acd427690a7648219c267a16.jpg",
  },
  {
    id: 10,
    src: "https://i.pinimg.com/564x/76/5b/d3/765bd33a6db993ad0301f4047d370095.jpg",
  },
  {
    id: 11,
    src: "https://i.pinimg.com/564x/5a/17/b3/5a17b36bdb7dfe019701cbd152b874e0.jpg",
  },
  {
    id: 12,
    src: "https://i.pinimg.com/564x/f4/cd/c2/f4cdc2064793365000db916c0c7ebe15.jpg",
  },
  {
    id: 13,
    src: "https://i.pinimg.com/564x/0a/4d/46/0a4d46accd9ad6bb60bb6c54ca93a3b7.jpg",
  },
  {
    id: 14,
    src: "https://i.pinimg.com/564x/11/c1/25/11c125d7ff6fe5c9e48fe971b8ce74b0.jpg",
  },
  {
    id: 15,
    src: "https://i.pinimg.com/564x/f5/1c/b7/f51cb71eeef3b3677edc5373f5eeaa4a.jpg",
  },
  {
    id: 16,
    src: "https://i.pinimg.com/564x/32/2e/3a/322e3a0811508ee1edf6cffa2e92fd32.jpg",
  },
];


const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`, // Use backticks for template literals
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    const shuffleSquares = () => {
      setSquares(generateSquares());

      timeoutRef.current = setTimeout(shuffleSquares, 3000);
    };

    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero; 