import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  Search,
  ChevronRight,
  Heart,
  AlertCircle,
  Flame,
  Droplet,
  Wind,
  Zap,
  X,
  CheckCircle,
  RefreshCw,
  Upload,
  BarChart3,
  Leaf,
  Coffee,
  Apple,
  Scan,
  TrendingUp,
} from "lucide-react";

// Mock alternatives - Expanded dataset
const foodAlternatives = {
  "instant noodles": {
    name: "Instant Noodles",
    score: 45,
    calories: 380,
    warnings: ["High sodium (1,200mg)", "Low protein (8g)", "Low fiber (2g)"],
    nutrition: { sodium: 1200, protein: 8, fiber: 2, carbs: 62, fat: 14 },
    barcode: "4901234567890",
    alternatives: [
      {
        name: "Quinoa Pasta",
        score: 85,
        calories: 320,
        benefits: ["High protein", "High fiber", "Low sodium"],
        description: "Complete amino acids with nutrient density",
      },
      {
        name: "Brown Rice & Veggies",
        score: 78,
        calories: 350,
        benefits: ["Whole grain", "Balanced nutrition", "Low sodium"],
        description: "Wholesome and filling alternative",
      },
      {
        name: "Buckwheat Noodles",
        score: 80,
        calories: 340,
        benefits: ["Gluten-free", "Rich minerals", "Low sodium"],
        description: "Traditional nutrient-dense option",
      },
    ],
  },
  chips: {
    name: "Chips",
    score: 38,
    calories: 320,
    warnings: ["High sodium (480mg)", "High fat (16g)", "Low protein (2g)"],
    nutrition: { sodium: 480, protein: 2, fiber: 2, carbs: 32, fat: 16 },
    barcode: "4901234567891",
    alternatives: [
      {
        name: "Roasted Almonds",
        score: 88,
        calories: 290,
        benefits: ["Healthy fats", "High protein", "Filling"],
        description: "Perfect protein-packed snack",
      },
      {
        name: "Air-Popped Popcorn",
        score: 82,
        calories: 110,
        benefits: ["High fiber", "Low calorie", "Satisfying"],
        description: "Light and nutritious crunch",
      },
      {
        name: "Roasted Chickpeas",
        score: 85,
        calories: 140,
        benefits: ["Plant-based protein", "High fiber", "Crunchy"],
        description: "Spiced or natural flavor options",
      },
    ],
  },
  burger: {
    name: "Burger",
    score: 42,
    calories: 520,
    warnings: ["High sodium (890mg)", "High fat (28g)", "High calories"],
    nutrition: { sodium: 890, protein: 24, fiber: 2, carbs: 48, fat: 28 },
    barcode: "4901234567892",
    alternatives: [
      {
        name: "Grilled Chicken Wrap",
        score: 76,
        calories: 380,
        benefits: ["Lean protein", "Lower calorie", "Fresh veggies"],
        description: "Lighter alternative with great taste",
      },
      {
        name: "Veggie Burger",
        score: 79,
        calories: 320,
        benefits: ["Plant-based", "High fiber", "Sustainable"],
        description: "Hearty vegetable-based option",
      },
      {
        name: "Grilled Fish Sandwich",
        score: 81,
        calories: 360,
        benefits: ["Omega-3", "Lean protein", "Heart-healthy"],
        description: "Excellent source of healthy fats",
      },
    ],
  },
  pizza: {
    name: "Frozen Pizza",
    score: 35,
    calories: 450,
    warnings: [
      "High sodium (1,100mg)",
      "High saturated fat (12g)",
      "Processed meat",
    ],
    nutrition: { sodium: 1100, protein: 18, fiber: 3, carbs: 55, fat: 18 },
    barcode: "4901234567893",
    alternatives: [
      {
        name: "Cauliflower Crust Pizza",
        score: 82,
        calories: 310,
        benefits: ["Low carb", "Gluten-free", "Veggie-rich"],
        description: "Crispy, delicious and nutritious",
      },
      {
        name: "Zucchini Pizza Bites",
        score: 86,
        calories: 180,
        benefits: ["Low calorie", "High volume", "Rich in vitamins"],
        description: "Perfect for a light meal",
      },
    ],
  },
  soda: {
    name: "Soda",
    score: 20,
    calories: 150,
    warnings: ["High sugar (39g)", "Empty calories", "No nutritional value"],
    nutrition: { sodium: 45, protein: 0, fiber: 0, carbs: 39, fat: 0 },
    barcode: "4901234567894",
    alternatives: [
      {
        name: "Sparkling Water with Fruit",
        score: 92,
        calories: 5,
        benefits: ["Hydrating", "No artificial sweeteners", "Refreshing"],
        description: "Natural fruit essence with bubbles",
      },
      {
        name: "Kombucha",
        score: 78,
        calories: 30,
        benefits: ["Probiotics", "Low sugar", "Digestive health"],
        description: "Fermented tea with benefits",
      },
    ],
  },
};

export default function ScanAndSwap() {
  const [searchInput, setSearchInput] = useState("");
  const [scannedFood, setScannedFood] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [savedIds, setSavedIds] = useState({});
  const [error, setError] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [detectedBarcode, setDetectedBarcode] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Start camera
  const startCamera = async () => {
    setCameraError("");
    setCameraActive(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute("playsinline", true);
        await videoRef.current.play();
      }
    } catch (err) {
      console.error("Camera error:", err);
      setCameraError("Unable to access camera. Please check permissions.");
      setCameraActive(false);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setDetectedBarcode("");
  };

  // Capture frame and simulate barcode detection
  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Simulate barcode detection (in real app, use a library like QuaggaJS or ZXing)
    // For demo, we'll randomly detect after a few frames
    simulateBarcodeDetection();
  };

  let detectionInterval = null;

  const simulateBarcodeDetection = () => {
    if (detectionInterval) clearInterval(detectionInterval);

    detectionInterval = setInterval(() => {
      if (!cameraActive) {
        clearInterval(detectionInterval);
        return;
      }

      // Simulate detection after 3 seconds of scanning
      // In production, this would be replaced with actual barcode detection
      const scanDuration = 3000;
      if (!window.scanStartTime) {
        window.scanStartTime = Date.now();
      }

      if (Date.now() - window.scanStartTime >= scanDuration) {
        clearInterval(detectionInterval);
        window.scanStartTime = null;

        // Simulate finding a barcode
        const barcodes = [
          "4901234567890", // instant noodles
          "4901234567891", // chips
          "4901234567892", // burger
          "4901234567893", // pizza
          "4901234567894", // soda
        ];
        const randomBarcode =
          barcodes[Math.floor(Math.random() * barcodes.length)];
        setDetectedBarcode(randomBarcode);

        // Find matching food
        const foundEntry = Object.entries(foodAlternatives).find(
          ([_, data]) => data.barcode === randomBarcode,
        );

        if (foundEntry) {
          stopCamera();
          setScannedFood(foundEntry[0]);
          setIsScanning(false);
          setCameraActive(false);
        }
        clearInterval(detectionInterval);
      }
    }, 500);
  };

  const handleScan = () => {
    setError("");
    setScannedFood(null);
    setIsScanning(true);
    startCamera();
  };

  const handleManualScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScannedFood("instant noodles");
      setIsScanning(false);
    }, 2000);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");
    const query = searchInput.toLowerCase().trim();

    if (query === "") {
      setError("Please enter a food name");
      return;
    }

    const found = Object.keys(foodAlternatives).find((key) =>
      key.includes(query),
    );

    if (found) {
      setScannedFood(found);
      setSearchInput("");
      setError("");
    } else {
      setError(
        `"${searchInput}" not found. Try: chips, burger, pizza, soda, or instant noodles`,
      );
    }
  };

  const toggleSave = (altName) => {
    setSavedIds((prev) => ({
      ...prev,
      [altName]: !prev[altName],
    }));
  };

  const getScoreColor = (score) => {
    if (score >= 75)
      return {
        bg: "bg-green-50",
        border: "border-green-500",
        text: "text-green-600",
        gradient: "from-green-50 to-emerald-50",
      };
    if (score >= 60)
      return {
        bg: "bg-yellow-50",
        border: "border-yellow-500",
        text: "text-yellow-600",
        gradient: "from-yellow-50 to-amber-50",
      };
    return {
      bg: "bg-red-50",
      border: "border-red-500",
      text: "text-red-600",
      gradient: "from-red-50 to-orange-50",
    };
  };

  const foodData = scannedFood ? foodAlternatives[scannedFood] : null;

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (detectionInterval) clearInterval(detectionInterval);
    };
  }, []);

  // Camera scanning UI
  if (cameraActive) {
    return (
      <div className="min-h-screen bg-black flex flex-col relative">
        {/* Camera View */}
        <video
          ref={videoRef}
          className="w-full h-screen object-cover absolute top-0 left-0"
          onLoadedMetadata={() => {
            // Start capture simulation when video is ready
            if (cameraActive) {
              captureFrame();
            }
          }}
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Scanner Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 flex flex-col items-center justify-center">
          {/* Scanning Frame */}
          <div className="w-[280px] h-[200px] border-2 border-white/80 rounded-2xl relative shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]">
            {/* Corner accents */}
            <div className="absolute -top-0.5 -left-0.5 w-[30px] h-[30px] border-t-3 border-l-3 border-blue-600 rounded-tl-lg" />
            <div className="absolute -top-0.5 -right-0.5 w-[30px] h-[30px] border-t-3 border-r-3 border-blue-600 rounded-tr-lg" />
            <div className="absolute -bottom-0.5 -left-0.5 w-[30px] h-[30px] border-b-3 border-l-3 border-blue-600 rounded-bl-lg" />
            <div className="absolute -bottom-0.5 -right-0.5 w-[30px] h-[30px] border-b-3 border-r-3 border-blue-600 rounded-br-lg" />

            {/* Scan Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-600 animate-scan-move shadow-[0_0_10px_#164bd4]" />
          </div>

          <p className="text-white mt-6 text-sm text-center bg-black/70 px-4 py-2 rounded-full">
            Align barcode within the frame
          </p>

          {cameraError && (
            <p className="text-red-500 mt-3 text-xs bg-black/70 px-4 py-2 rounded-full">
              {cameraError}
            </p>
          )}

          <button
            onClick={stopCamera}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 px-8 py-3.5 bg-white border-none rounded-full text-base font-semibold text-[#0a2366] cursor-pointer flex items-center gap-2"
          >
            <X size={18} />
            Cancel
          </button>
        </div>

        <style jsx>{`
          @keyframes scanMove {
            0% {
              transform: translateY(-80px);
            }
            50% {
              transform: translateY(80px);
            }
            100% {
              transform: translateY(-80px);
            }
          }
          .animate-scan-move {
            animation: scanMove 2s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  // Initial state - scanner hero
  if (!scannedFood && !isScanning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8faff] to-white flex flex-col p-6 relative">
        {/* Background SVG Pattern */}
        <div className="absolute top-0 right-0 w-2/5 h-2/5 opacity-10 pointer-events-none">
          <svg
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M200 50 L250 150 L350 150 L270 220 L300 320 L200 270 L100 320 L130 220 L50 150 L150 150 L200 50Z"
              fill="#164bd4"
              stroke="#164bd4"
              strokeWidth="2"
            />
            <circle cx="200" cy="185" r="30" fill="#164bd4" fillOpacity="0.5" />
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto w-full flex flex-row items-center gap-12 flex-wrap">
          {/* Left Column - Hero Content */}
          <div className="flex-1 min-w-[280px]">
            <div className="mb-8">
              <h1 className="text-5xl font-extrabold text-[#0a2366] m-0 mb-4 leading-tight">
                Scan. Compare.
                <br />
                <span className="text-[#164bd4]">Eat Better.</span>
              </h1>
              <p className="text-base text-gray-500 m-0 mb-8 leading-relaxed max-w-[500px]">
                Point your camera at any food barcode to instantly see nutrition
                scores and discover healthier alternatives.
              </p>
            </div>

            {/* Scanner Buttons */}
            <div className="flex gap-4 flex-wrap mb-8">
              <button
                onClick={handleScan}
                className="px-8 py-4 rounded-full border-none bg-gradient-to-br from-[#164bd4] to-[#1e40af] text-white text-base font-semibold cursor-pointer flex items-center gap-3 shadow-[0_8px_20px_rgba(22,75,212,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(22,75,212,0.4)]"
              >
                <Camera size={20} />
                Scan Barcode
              </button>

              <button
                onClick={handleManualScan}
                className="px-8 py-4 rounded-full border-2 border-[#164bd4] bg-white text-[#164bd4] text-base font-semibold cursor-pointer flex items-center gap-3 transition-all duration-300 hover:bg-[#f8faff]"
              >
                <Upload size={20} />
                Try Demo Scan
              </button>
            </div>

            {/* Manual Search */}
            <div className="max-w-[450px]">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-medium">
                  OR SEARCH MANUALLY
                </span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="e.g., chips, burger, pizza..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className={`w-full py-3.5 pl-11 pr-3.5 border-2 rounded-full text-sm font-inherit box-border bg-white outline-none transition-all duration-200 focus:border-[#164bd4] focus:shadow-[0_0_0_3px_rgba(22,75,212,0.1)] ${
                      error
                        ? "border-red-500"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  />
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="py-3.5 px-7 bg-gradient-to-br from-[#164bd4] to-[#1e40af] text-white border-none rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                >
                  Search
                </button>
              </form>

              {error && (
                <p className="text-xs text-red-500 mt-3 flex items-center gap-1.5">
                  <AlertCircle size={14} />
                  {error}
                </p>
              )}
            </div>
          </div>

          {/* Right Column - SVG Illustration */}
          <div className="flex-1 flex justify-center items-center min-w-[280px]">
            <img
              src="/public/images/choosing-food.svg"
              alt="Choosing healthy food"
              className="max-w-full h-auto max-h-[400px]"
              onError={(e) => {
                e.target.style.display = "none";
                // Fallback if SVG not found
                const fallback = document.createElement("div");
                fallback.innerHTML = `
                  <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
                    <circle cx="150" cy="150" r="140" fill="#f8faff" stroke="#164bd4" strokeWidth="2"/>
                    <path d="M100 120 L200 120 L180 180 L120 180 Z" fill="#164bd4" fillOpacity="0.2"/>
                    <circle cx="120" cy="140" r="8" fill="#0a2366"/>
                    <circle cx="180" cy="140" r="8" fill="#0a2366"/>
                    <path d="M130 200 Q150 220 170 200" stroke="#0a2366" strokeWidth="3" fill="none"/>
                    <path d="M150 100 L150 80 M130 90 L170 90" stroke="#164bd4" strokeWidth="3"/>
                  </svg>
                `;
                e.target.parentNode.appendChild(fallback.firstChild);
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Scanning state
  if (isScanning) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f8faff] to-white flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#164bd4] to-[#1e40af] flex items-center justify-center mx-auto mb-6 animate-pulse-scan">
            <Camera size={50} color="white" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-bold text-[#0a2366] m-0 mb-3">
            Analyzing Product
          </h2>
          <p className="text-sm text-gray-500 m-0">
            Fetching nutrition data and finding alternatives...
          </p>
          <div className="w-[200px] h-1 bg-gray-200 rounded-full mt-6 overflow-hidden">
            <div className="w-3/5 h-full bg-[#164bd4] rounded-full animate-progress" />
          </div>
        </div>
        <style jsx>{`
          @keyframes pulse-scan {
            0%,
            100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.8;
            }
          }
          @keyframes progress {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(200%);
            }
          }
          .animate-pulse-scan {
            animation: pulse-scan 1.5s infinite;
          }
          .animate-progress {
            animation: progress 1s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // Results state
  const scoreColor = getScoreColor(foodData.score);
  const improvement = foodData.alternatives[0].score - foodData.score;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8faff] to-white p-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-[28px] font-extrabold text-[#0a2366] m-0 flex items-center gap-2">
              <Leaf size={28} color="#164bd4" />
              Scan & Swap
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setScannedFood(null)}
              className="px-5 py-2.5 bg-white border border-gray-200 rounded-full text-[13px] font-semibold text-[#164bd4] cursor-pointer transition-all duration-200 flex items-center gap-1.5 hover:bg-[#f8faff] hover:border-[#164bd4]"
            >
              <RefreshCw size={16} />
              New Scan
            </button>
          </div>
        </div>

        {/* Improvement Banner */}
        {improvement > 0 && (
          <div className="p-4 bg-gradient-to-r from-[#10b98110] to-[#05966910] rounded-xl mb-6 flex items-center gap-3 flex-wrap border border-[#10b98130]">
            <div className="w-10 h-10 bg-[#10b98120] rounded-full flex items-center justify-center">
              <TrendingUp size={20} color="#059669" />
            </div>
            <div>
              <p className="m-0 font-bold text-[#065f46]">
                You can improve by +{improvement} points!
              </p>
              <p className="m-0 text-[13px] text-[#059669]">
                Check out the alternatives below for healthier choices
              </p>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Scanned Food Card */}
          <div className="p-7 bg-white rounded-2xl border border-gray-200 shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-transform duration-200">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xs font-bold text-gray-400 uppercase m-0 tracking-wide">
                Scanned Product
              </p>
              <div
                className={`px-3 py-1 rounded-full border ${scoreColor.bg} ${scoreColor.border}`}
              >
                <span className={`text-xs font-bold ${scoreColor.text}`}>
                  Score: {foodData.score}
                </span>
              </div>
            </div>

            <h2 className="text-3xl font-extrabold text-[#0a2366] m-0 mb-5">
              {foodData.name}
            </h2>

            {/* Calories & Quick stats */}
            <div className="flex gap-3 mb-6 flex-wrap">
              <div className="px-5 py-3 bg-gray-100 rounded-xl flex items-center gap-2">
                <Flame size={18} color="#f59e0b" />
                <span className="font-bold text-[#0a2366]">
                  {foodData.calories} cal
                </span>
              </div>
            </div>

            {/* Warnings */}
            <div className="p-[18px] bg-red-50 rounded-xl border border-red-200 mb-5">
              <div className="flex gap-2.5 mb-3 items-center">
                <AlertCircle size={18} color="#dc2626" />
                <p className="text-[13px] font-bold text-red-600 m-0">
                  Health Concerns
                </p>
              </div>
              <ul className="m-0 p-0 list-none">
                {foodData.warnings.map((warning, idx) => (
                  <li
                    key={idx}
                    className="text-[13px] text-red-900 mb-2 font-medium flex items-center gap-1.5"
                  >
                    <div className="w-1 h-1 bg-red-600 rounded-full" />
                    {warning}
                  </li>
                ))}
              </ul>
            </div>

            {/* Nutrition Preview */}
            <div className="grid grid-cols-4 gap-2">
              {[
                {
                  icon: Droplet,
                  label: "Sodium",
                  value: `${foodData.nutrition.sodium}mg`,
                  color: "#ef4444",
                },
                {
                  icon: Zap,
                  label: "Protein",
                  value: `${foodData.nutrition.protein}g`,
                  color: "#f59e0b",
                },
                {
                  icon: Wind,
                  label: "Fiber",
                  value: `${foodData.nutrition.fiber}g`,
                  color: "#10b981",
                },
                {
                  icon: Flame,
                  label: "Carbs",
                  value: `${foodData.nutrition.carbs}g`,
                  color: "#f59e0b",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-2.5 bg-gray-50 rounded-xl text-center"
                  >
                    <Icon
                      size={16}
                      color={item.color}
                      className="mx-auto mb-1.5"
                    />
                    <p className="text-[10px] font-semibold text-gray-500 m-0 mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-xs font-bold text-[#0a2366] m-0">
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alternatives Preview / Best Swap */}
          <div className="p-7 bg-gradient-to-br from-[#164bd405] to-white rounded-2xl border-2 border-[#164bd420] shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-2 mb-5">
              <CheckCircle size={20} color="#164bd4" />
              <p className="text-xs font-bold text-[#164bd4] m-0 uppercase">
                Best Alternative
              </p>
            </div>

            <div className="text-center p-5 bg-white rounded-xl mb-5">
              <h3 className="text-2xl font-extrabold text-[#0a2366] mb-2">
                {foodData.alternatives[0].name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {foodData.alternatives[0].description}
              </p>
              <div className="inline-flex items-center gap-[30px] justify-center">
                <div>
                  <p className="text-[11px] text-gray-500 m-0">Score</p>
                  <p className="text-4xl font-extrabold text-green-500 m-0">
                    {foodData.alternatives[0].score}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 m-0">Calories</p>
                  <p className="text-2xl font-bold text-[#0a2366] m-0">
                    {foodData.alternatives[0].calories}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {foodData.alternatives[0].benefits.map((benefit, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 bg-[#164bd410] rounded-full text-xs font-semibold text-[#164bd4]"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* All Alternatives Section */}
        <div>
          <h2 className="text-[22px] font-extrabold text-[#0a2366] m-0 mb-5 flex items-center gap-2">
            <Apple size={24} color="#164bd4" />
            More Healthy Swaps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {foodData.alternatives.map((alt, idx) => {
              const altScoreColor = getScoreColor(alt.score);
              const isSaved = savedIds[alt.name];

              return (
                <div
                  key={idx}
                  className="p-6 bg-white rounded-2xl border border-gray-200 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.05)] cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_32px_rgba(22,75,212,0.12)] hover:border-[#164bd4]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-extrabold text-[#0a2366] m-0 mb-1.5">
                        {alt.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => toggleSave(alt.name)}
                      className="bg-none border-none cursor-pointer p-1 transition-all duration-200"
                      style={{ color: isSaved ? "#ef4444" : "#d1d5db" }}
                    >
                      <Heart
                        size={20}
                        fill={isSaved ? "currentColor" : "none"}
                      />
                    </button>
                  </div>

                  <p className="text-[13px] text-gray-500 m-0 mb-4 leading-relaxed">
                    {alt.description}
                  </p>

                  <div className="flex gap-2 flex-wrap mb-5">
                    {alt.benefits.map((benefit, bidx) => (
                      <span
                        key={bidx}
                        className="text-[11px] font-semibold px-3 py-1 bg-[#eff4ff] text-[#164bd4] rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3 mb-5">
                    <div
                      className={`flex-1 p-2.5 rounded-xl border text-center ${altScoreColor.bg} ${altScoreColor.border}`}
                    >
                      <p
                        className={`text-[11px] font-semibold m-0 mb-1 ${altScoreColor.text}`}
                      >
                        Score
                      </p>
                      <p
                        className={`text-xl font-extrabold m-0 ${altScoreColor.text}`}
                      >
                        {alt.score}
                      </p>
                    </div>
                    <div className="flex-1 p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-center">
                      <p className="text-[11px] font-semibold text-gray-500 m-0 mb-1">
                        Calories
                      </p>
                      <p className="text-xl font-extrabold text-[#0a2366] m-0">
                        {alt.calories}
                      </p>
                    </div>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-br from-[#164bd4] to-[#1e40af] text-white border-none rounded-full text-[13px] font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 hover:gap-3">
                    Learn More
                    <ChevronRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#164bd408] to-[#164bd402] rounded-2xl border border-[#164bd420] flex gap-4 items-start flex-wrap">
          <div className="w-12 h-12 bg-[#164bd4] rounded-2xl flex items-center justify-center">
            <Coffee size={24} color="white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#164bd4] m-0 mb-1.5">
              Pro Tip: Small Changes, Big Results
            </p>
            <p className="text-sm text-[#0a2366] m-0 leading-relaxed">
              You don't have to eliminate your favorite foods completely. Try
              mixing healthier alternatives or adding nutrient-dense sides like
              fresh vegetables or lean proteins. Every small swap adds up to
              better health!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
