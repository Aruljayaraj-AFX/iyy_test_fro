import { useState, useEffect } from 'react';
import { FiSun } from 'react-icons/fi'; // Bulb/Light icon

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [active, setActive] = useState(null); // Track ON/OFF state
  const [loading, setLoading] = useState(false); // optional: track API call

  useEffect(() => {
    window.scrollTo(0, 0);

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = async (state) => {
    setActive(state);
    setLoading(true);

    try {
      const url = state === 'on'
        ? 'https://iyy-test.onrender.com/ON'
        : 'https://iyy-test.onrender.com/OFF';

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
      });

      const data = await response.json();
      console.log(`${state.toUpperCase()} Response:`, data);
    } catch (error) {
      console.error(`Error turning ${state} the light:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="text-center pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        {/* Buttons with bulb concept */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-1000 ease-out ${
            isLoaded ? 'transform translate-y-0 opacity-100 scale-100' : 'transform translate-y-8 opacity-0 scale-105'
          }`}
        >
          {/* ON Button */}
          <button
            onClick={() => handleClick('on')}
            className={`w-full sm:w-36 py-3 sm:py-4 bg-yellow-400 font-bold text-black border-2 text-base sm:text-lg shadow-[4px_4px_0px_black] rounded-lg
              transform transition-all duration-150 flex items-center justify-center gap-2
              hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_black]
              active:translate-y-[2px] active:shadow-[1px_1px_0px_black]
              ${active === 'on' ? 'bg-green-400 scale-105' : ''}`}
            disabled={loading}
          >
            <FiSun className={`text-xl ${active === 'on' ? 'text-yellow-300 animate-pulse' : 'text-black'}`} />
            ON
          </button>

          {/* OFF Button */}
          <button
            onClick={() => handleClick('off')}
            className={`w-full sm:w-36 py-3 sm:py-4 bg-yellow-400 font-bold text-black border-2 text-base sm:text-lg shadow-[4px_4px_0px_black] rounded-lg
              transform transition-all duration-150 flex items-center justify-center gap-2
              hover:translate-y-[-2px] hover:shadow-[2px_2px_0px_black]
              active:translate-y-[2px] active:shadow-[1px_1px_0px_black]
              ${active === 'off' ? 'bg-red-400 scale-105' : ''}`}
            disabled={loading}
          >
            <FiSun className={`text-xl ${active === 'off' ? 'text-gray-500' : 'text-black'}`} />
            OFF
          </button>
        </div>
      </div>
    </section>
  );
}
