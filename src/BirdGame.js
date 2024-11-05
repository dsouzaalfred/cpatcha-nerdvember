import React, { useRef, useEffect, useState } from "react";
import Container from "./components/Container";
import TopMenu from "./components/TopMenu";

const BirdGame = () => {
  const canvasRef = useRef(null);
  const [targetColor, setTargetColor] = useState("");
  const [remainingCount, setRemainingCount] = useState(0);
  const [isRobot, setIsRobot] = useState(true);
  const containerRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth * 0.8);
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight * 0.6);

  const generateRandomBirds = () => {
    const colors = ["red", "blue", "green", "yellow", "purple", "orange"];
    const birds = [];
    let id = 0;

    colors.forEach((color) => {
      const numBirds = Math.floor(Math.random() * 2) + 4; // Ensure at least 4 birds of each color
      for (let i = 0; i < numBirds; i++) {
        const x = Math.random() * canvasWidth;
        const y = Math.random() * canvasHeight;
        const vx = (Math.random() * 2 - 1) * 2; // Slower velocity
        const vy = (Math.random() * 2 - 1) * 2; // Slower velocity
        birds.push({ id: id++, color, x, y, vx, vy, clicked: false });
      }
    });

    return birds;
  };

  const birdsRef = useRef(generateRandomBirds()); // Generate birds with the new rule

  useEffect(() => {
    const containerWidth = containerRef?.current?.clientWidth;
    const top = containerRef?.current?.getBoundingClientRect().top * 4;
    setCanvasWidth(containerWidth);
    setCanvasHeight(window.innerHeight - top);

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;

    const drawBirds = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      birdsRef.current.forEach((bird) => {
        context.fillStyle = bird.color;
        context.beginPath();
        context.arc(bird.x, bird.y, 15, 0, 2 * Math.PI); // Increase radius to 15
        context.fill();

        if (bird.clicked) {
          context.strokeStyle = "black"; // Border color for clicked birds
          context.lineWidth = 3;
          context.stroke();
        }
      });
    };

    const updateBirds = () => {
      birdsRef.current = birdsRef.current.map((bird) => {
        let { x, y, vx, vy } = bird;

        // Update position
        x += vx;
        y += vy;

        // Check for collision with canvas edges and reverse direction if needed
        if (x <= 15 || x >= canvas.width - 15) vx = -vx; // Adjust for new radius
        if (y <= 15 || y >= canvas.height - 15) vy = -vy; // Adjust for new radius

        return { ...bird, x, y, vx, vy };
      });
    };

    const animate = () => {
      updateBirds();
      drawBirds();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Select a random target color from the birds
    const colors = birdsRef.current.map((bird) => bird.color);
    const uniqueColors = [...new Set(colors)];
    const selectedColor =
      uniqueColors[Math.floor(Math.random() * uniqueColors.length)];
    setTargetColor(selectedColor);
    console.log({ selectedColor });

    // Set the initial remaining count
    console.log(birdsRef.current);
    const initialCount = birdsRef.current.filter(
      (bird) => bird.color === selectedColor
    ).length;
    console.log({ initialCount });
    setRemainingCount(initialCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    birdsRef.current = birdsRef.current.map((bird) => {
      const distance = Math.sqrt((bird.x - x) ** 2 + (bird.y - y) ** 2);
      if (distance < 20 && bird.color === targetColor && !bird.clicked) {
        // Increase clickable area
        setRemainingCount((prevCount) => prevCount - 1);
        return { ...bird, clicked: true };
      }
      return bird;
    });

    setBirds([...birdsRef.current]);

    if (
      birdsRef.current
        .filter((bird) => bird.color === targetColor)
        .every((bird) => bird.clicked)
    ) {
      setIsRobot(false);
    }
  };

  return (
    <Container>
      <TopMenu />
      <div
        ref={containerRef}
        className="flex flex-col items-center min-h-screen bg-gray-100 max-w-screen-lg"
      >
        <h1 className="text-2xl font-bold mb-4">Catch the dots</h1>
        {isRobot && (
          <>
            <h2 className="text-xl font-bold mb-2">
              Click all the{" "}
              <span style={{ color: targetColor }}>{targetColor}</span> birds!
            </h2>
            <p>Birds left to click: {remainingCount}</p>
            <canvas
              ref={canvasRef}
              width={canvasWidth}
              height={canvasHeight}
              onClick={handleCanvasClick}
              style={{ border: "1px solid black" }}
            />
          </>
        )}
        {!isRobot && <h2>You are not a robot!</h2>}
      </div>
    </Container>
  );
};

export default BirdGame;
