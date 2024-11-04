import React, { useEffect, useRef, useState } from "react";
import Container from "./components/Container";
import TopMenu from "./components/TopMenu";

// Placeholder images for adult animals
import cat from "./images/cat.jpeg";
import dog from "./images/dog.png";
import rabbit from "./images/rabbit.png";
import bird from "./images/bird.png";
import fish from "./images/penguin.jpg";
import fox from "./images/fox_.png";
import lion from "./images/lion_.png";
import elephant from "./images/elephant.png";
import giraffe from "./images/giraffe.webp";

// Placeholder images for baby animals
import babyCat from "./images/baby_cat.png";
import babyDog from "./images/baby_dog.jpg";
import babyRabbit from "./images/baby_rabbit.png";
import babyBird from "./images/baby_bird.png";
import babyFish from "./images/baby_penguin.webp";
import babyFox from "./images/baby_fox.webp";
import babyLion from "./images/baby_lion.webp";
import babyElephant from "./images/baby_elephant.webp";
import babyGiraffe from "./images/baby_giraffe.webp";

// Placeholder images for backgrounds
import bg1 from "./images/bg1.jpeg";
import bg2 from "./images/bg2.jpg";
import bg3 from "./images/bg3.jpg";

// Larger pool of unconnected animals
const allUnconnectedAdultAnimals = [
  { name: "elephant", src: elephant },
  { name: "giraffe", src: giraffe },
  // Add more unconnected adult animals here
];

const allUnconnectedBabyAnimals = [
  { name: "babyElephant", src: babyElephant },
  { name: "babyGiraffe", src: babyGiraffe },
  // Add more unconnected baby animals here
];

const allAdultAnimalImages = [
  { name: "cat", src: cat },
  { name: "dog", src: dog },
  { name: "rabbit", src: rabbit },
  { name: "bird", src: bird },
  { name: "fish", src: fish },
  { name: "fox", src: fox },
  { name: "lion", src: lion },
  { name: "elephant", src: elephant },
  { name: "giraffe", src: giraffe },
];

const allBabyAnimalImages = [
  { name: "cat", src: babyCat },
  { name: "dog", src: babyDog },
  { name: "rabbit", src: babyRabbit },
  { name: "bird", src: babyBird },
  { name: "fish", src: babyFish },
  { name: "fox", src: babyFox },
  { name: "lion", src: babyLion },
  { name: "elephant", src: babyElephant },
  { name: "giraffe", src: babyGiraffe },
];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomAnimals = () => {
  const shuffledAdultAnimals = shuffleArray([...allAdultAnimalImages]);
  const shuffledBabyAnimals = shuffleArray([...allBabyAnimalImages]);

  const connectedAdultAnimals = shuffledAdultAnimals.slice(0, 5);
  const connectedBabyAnimals = connectedAdultAnimals.map((adult) => {
    return shuffledBabyAnimals.find((baby) => baby.name === adult.name);
  });

  const shuffledUnconnectedAdultAnimals = shuffleArray([
    ...allUnconnectedAdultAnimals,
  ]);
  const shuffledUnconnectedBabyAnimals = shuffleArray([
    ...allUnconnectedBabyAnimals,
  ]);

  const unconnectedAdultAnimalsSubset = shuffledUnconnectedAdultAnimals.slice(
    0,
    2
  );
  const unconnectedBabyAnimalsSubset = shuffledUnconnectedBabyAnimals.slice(
    0,
    2
  );

  const adultAnimalImages = [
    ...connectedAdultAnimals,
    ...unconnectedAdultAnimalsSubset,
  ];

  const babyAnimalImages = [
    ...connectedBabyAnimals,
    ...unconnectedBabyAnimalsSubset,
  ];

  return { adultAnimalImages, babyAnimalImages };
};

const { adultAnimalImages, babyAnimalImages } = getRandomAnimals();

const backgroundImages = [bg1, bg2, bg3];
const selectedBackground =
  backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

const animalSize = 50;
const minGap = 10;

const generateAnimalPairs = () => {
  const shuffledAdultAnimals = shuffleArray(adultAnimalImages);
  const shuffledBabyAnimals = shuffleArray(babyAnimalImages);
  const pairs = [];

  for (let i = 0; i < shuffledAdultAnimals.length; i++) {
    pairs.push({
      id: i * 2 + 1,
      name: shuffledAdultAnimals[i].name,
      src: shuffledAdultAnimals[i].src,
    });
  }

  for (let i = 0; i < shuffledBabyAnimals.length; i++) {
    pairs.push({
      id: i * 2 + 2,
      name: shuffledBabyAnimals[i].name,
      src: shuffledBabyAnimals[i].src,
    });
  }

  return pairs;
};

const checkCollision = (x, y, positions) => {
  for (let pos of positions) {
    const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
    if (distance < animalSize + minGap) {
      return true;
    }
  }
  return false;
};

const ConnectPairsCaptcha = () => {
  const canvasRef = useRef(null);
  const [animalPositions, setAnimalPositions] = useState([]);
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  const [connections, setConnections] = useState([]);
  const [isCaptchaSolved, setIsCaptchaSolved] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth * 0.8);
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight * 0.6);

  useEffect(() => {
    const handleResize = () => {
      setCanvasWidth(window.innerWidth * 0.8);
      setCanvasHeight(window.innerHeight * 0.6);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const pairs = generateAnimalPairs();
    const positions = [];

    pairs.forEach((pair) => {
      let x, y;
      do {
        x = Math.random() * (canvasWidth - animalSize);
        y = Math.random() * (canvasHeight - animalSize);
      } while (checkCollision(x, y, positions));
      positions.push({ ...pair, x, y });
    });

    setAnimalPositions(positions);
  }, [canvasWidth, canvasHeight, animalSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Draw background
    const background = new Image();
    background.src = selectedBackground;
    background.onload = () => {
      ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);

      // Draw animals
      animalPositions.forEach((animal) => {
        const img = new Image();
        img.src = animal.src;
        img.onload = () => {
          ctx.drawImage(img, animal.x, animal.y, animalSize, animalSize);
        };
      });

      // Draw connections
      connections.forEach((connection) => {
        const fromAnimal = animalPositions.find(
          (animal) => animal.id === connection.from
        );
        const toAnimal = animalPositions.find(
          (animal) => animal.id === connection.to
        );
        if (fromAnimal && toAnimal) {
          ctx.beginPath();
          ctx.moveTo(
            fromAnimal.x + animalSize / 2,
            fromAnimal.y + animalSize / 2
          );
          ctx.lineTo(toAnimal.x + animalSize / 2, toAnimal.y + animalSize / 2);
          ctx.stroke();
        }
      });
    };
  }, [animalPositions, connections, selectedBackground, canvasWidth]);

  const handleAnimalClick = (id) => {
    if (selectedAnimals.length === 0) {
      setSelectedAnimals([id]);
    } else if (selectedAnimals.length === 1) {
      const [firstId] = selectedAnimals;
      if (firstId !== id) {
        const firstAnimal = animalPositions.find(
          (animal) => animal.id === firstId
        );
        const secondAnimal = animalPositions.find((animal) => animal.id === id);
        if (firstAnimal.name === secondAnimal.name) {
          setConnections([...connections, { from: firstId, to: id }]);
        }
        setSelectedAnimals([]);
      }
    }
  };

  useEffect(() => {
    if (connections.length === 5) {
      setIsCaptchaSolved(true);
    }
  }, [connections]);

  return (
    <Container>
      <TopMenu />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Connect Pairs Captcha</h1>
        {!isCaptchaSolved && (
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              onClick={(e) => {
                const rect = canvasRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const clickedAnimal = animalPositions.find(
                  (animal) =>
                    x >= animal.x &&
                    x <= animal.x + animalSize &&
                    y >= animal.y &&
                    y <= animal.y + animalSize
                );
                if (clickedAnimal) {
                  handleAnimalClick(clickedAnimal.id);
                }
              }}
            />
            <div>Unique Connections made: {connections.length} / 5</div>
          </div>
        )}
        {isCaptchaSolved && (
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            CAPTCHA Solved!
          </div>
        )}
      </div>
    </Container>
  );
};

export default ConnectPairsCaptcha;
