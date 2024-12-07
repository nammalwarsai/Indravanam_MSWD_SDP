import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ShuffleHero = () => {
  const [isCookieAccepted, setIsCookieAccepted] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Check cookie consent status from localStorage
    const consent = localStorage.getItem("cookieConsent");
    setIsCookieAccepted(consent === "true" ? true : consent === "false" ? false : null);
  }, []);

  useEffect(() => {
    if (isCookieAccepted === null) {
      // Show popup for 10 seconds after login
      setShowPopup(true);
      const timer = setTimeout(() => setShowPopup(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [isCookieAccepted]);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsCookieAccepted(true);
    setPopupMessage("You have accepted our privacy policy and cookies. We will use your data wisely.");
    setShowPopup(false);
  };

  const handleRejectCookies = () => {
    localStorage.setItem("cookieConsent", "false");
    setIsCookieAccepted(false);
    setPopupMessage("You have rejected all cookies. Thank you for your decision.");
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setPopupMessage("");
    setIsCookieAccepted(true); // Proceed to main content
    setShowPopup(false);
  };

  return (
    <section className="w-full h-screen px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-full mx-auto">
      <div>
        <h3 className="text-3xl md:text-4xl font-semibold">
          Tired of wilting plants? We've got your back
        </h3>
        <p className="text-base md:text-lg my-4 md:my-6">
          Imagine a world where your plants are cared for effortlessly, growing and thriving with minimal effort on your part. Our API automates routine tasks, provides personalized plant care recommendations, and offers expert advice, ensuring your garden flourishes.
        </p>
      </div>
      <ShuffleGrid />

      {/* Initial Cookie Consent Popup */}
      {showPopup && (
        <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex justify-between items-center">
          <p>
            This website uses cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.
          </p>
          <div className="flex gap-2">
            <button onClick={handleAcceptCookies} className="bg-green-500 p-2 rounded">
              Accept All
            </button>
            <button onClick={handleRejectCookies} className="bg-red-500 p-2 rounded">
              Reject All
            </button>
          </div>
        </div>
      )}

      {/* Follow-up Popup */}
      {popupMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg">
            <p>{popupMessage}</p>
            <button
              onClick={handleClosePopup}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

const squareData = [
  { id: 1, src: "https://i.pinimg.com/564x/00/1a/9a/001a9a43208042f38b8d46660f217604.jpg" },
  { id: 2, src: "https://i.pinimg.com/564x/09/8a/2f/098a2f1c0b8e026db39b463f96272520.jpg" },
  { id: 3, src: "https://i.pinimg.com/564x/7b/7a/40/7b7a40036d7f4321be31d5613cbb2443.jpg" },
  { id: 4, src: "https://i.pinimg.com/564x/fc/c3/8d/fcc38df2bd97813be9aafdee931b837e.jpg" },
  { id: 5, src: "https://i.pinimg.com/564x/8a/f6/91/8af69174c259e81f86659ce622228c48.jpg" },
  { id: 6, src: "https://i.pinimg.com/564x/0d/08/83/0d08834f6d1d9a945fafb5461f71587f.jpg" },
  { id: 7, src: "https://i.pinimg.com/564x/40/32/da/4032da9de4c1a98760bf272b9a782c5d.jpg" },
  { id: 8, src: "https://i.pinimg.com/736x/94/68/cf/9468cf54fb45aa026c096e2ad61609d6.jpg" },
  { id: 9, src: "https://i.pinimg.com/564x/f4/7a/4e/f47a4e90acd427690a7648219c267a16.jpg" },
  { id: 10, src: "https://i.pinimg.com/564x/76/5b/d3/765bd33a6db993ad0301f4047d370095.jpg" },
  { id: 11, src: "https://i.pinimg.com/564x/5a/17/b3/5a17b36bdb7dfe019701cbd152b874e0.jpg" },
  { id: 12, src: "https://i.pinimg.com/564x/f4/cd/c2/f4cdc2064793365000db916c0c7ebe15.jpg" },
  { id: 13, src: "https://i.pinimg.com/564x/0a/4d/46/0a4d46accd9ad6bb60bb6c54ca93a3b7.jpg" },
  { id: 14, src: "https://i.pinimg.com/564x/11/c1/25/11c125d7ff6fe5c9e48fe971b8ce74b0.jpg" },
  { id: 15, src: "https://i.pinimg.com/564x/f5/1c/b7/f51cb71eeef3b3677edc5373f5eeaa4a.jpg" },
  { id: 16, src: "https://i.pinimg.com/564x/32/2e/3a/322e3a0811508ee1edf6cffa2e92fd32.jpg" },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    const shuffleSquares = () => {
      setSquares(generateSquares());
    };

    const interval = setInterval(shuffleSquares, 3000);
    return () => clearInterval(interval);
  }, []);

  return <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">{squares}</div>;
};

export default ShuffleHero;
