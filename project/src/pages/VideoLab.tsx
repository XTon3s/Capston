import { useState } from 'react';

interface Flask {
  id: string;
  type: 'duration' | 'category';
  label: string;
  color: string;
  selected: boolean;
  disabled: boolean;
}

function mixColors(colors: string[]): string {
  if (colors.length === 1) return colors[0];

  const toRGB = (color: string) => {
    const match = color.match(/\d+/g);
    return match ? match.map(Number) : [0, 0, 0];
  };

  const [rSum, gSum, bSum] = colors
    .map(toRGB)
    .reduce(([r1, g1, b1], [r2, g2, b2]) => [r1 + r2, g1 + g2, b1 + b2], [0, 0, 0]);

  const count = colors.length;
  return `rgb(${Math.round(rSum / count)}, ${Math.round(gSum / count)}, ${Math.round(bSum / count)})`;
}

const FlaskButton = ({ flask, onClick }: { flask: Flask; onClick: (f: Flask) => void }) => (
  <button
    onClick={() => onClick(flask)}
    className={`transform transition-transform ${
      flask.disabled ? 'opacity-50 cursor-not-allowed' :
      flask.selected ? 'scale-95' : 'hover:scale-105'
    }`}
    disabled={flask.disabled && !flask.selected}
  >
    <div className="w-24 h-32 relative my-2">
      <div className="absolute bottom-0 w-full h-24 bg-white border-2 border-gray-300 rounded-b-lg overflow-hidden">
        <div
          className="absolute bottom-0 w-full transition-all duration-500"
          style={{
            height: flask.selected ? '0%' : '80%',
            backgroundColor: flask.color,
            borderBottomLeftRadius: '0.5rem',
            borderBottomRightRadius: '0.5rem',
          }}
        ></div>
      </div>
      <div className="absolute bottom-24 w-full h-8 bg-white border-2 border-gray-300 rounded-t-lg"></div>
      <p className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 whitespace-nowrap">
        {flask.label}
      </p>
    </div>
  </button>
);

const Beaker = ({ fillLevel, filledColor, showBubbles }: {
  fillLevel: number;
  filledColor: string;
  showBubbles: boolean;
}) => (
  <div className="w-32 h-48 bg-white rounded-b-full border-2 border-gray-300 relative mx-auto">
    <div
      className="absolute bottom-0 left-0 right-0 rounded-b-full transition-all duration-1000"
      style={{
        height: `${fillLevel}%`,
        backgroundColor: filledColor,
        borderBottomLeftRadius: '6rem',
        borderBottomRightRadius: '6rem',
      }}
    ></div>
    {showBubbles && (
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-1">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-100"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
      </div>
    )}
  </div>
);

function VideoLab() {
  const [flasks, setFlasks] = useState<Flask[]>([
  // Duration flasks
  { id: 'short', type: 'duration', label: '10분 미만', color: 'rgb(255, 99, 132)', selected: false, disabled: false },
  { id: 'medium', type: 'duration', label: '10~20분', color: 'rgb(255, 206, 86)', selected: false, disabled: false },
  { id: 'long', type: 'duration', label: '30분 이상', color: 'rgb(75, 192, 192)', selected: false, disabled: false },
  { id: 'food', type: 'category', label: '먹방', color: 'rgb(255, 159, 64)', selected: false, disabled: false },
  { id: 'stock', type: 'category', label: '주식', color: 'rgb(153, 102, 255)', selected: false, disabled: false },
  { id: 'cooking', type: 'category', label: '요리', color: 'rgb(54, 162, 235)', selected: false, disabled: false },
  { id: 'camping', type: 'category', label: '캠핑', color: 'rgb(201, 203, 207)', selected: false, disabled: false },
  { id: 'fashion', type: 'category', label: '패션', color: 'rgb(255, 99, 71)', selected: false, disabled: false },
  { id: 'fitness', type: 'category', label: '운동', color: 'rgb(106, 90, 205)', selected: false, disabled: false },
  { id: 'animals', type: 'category', label: '동물', color: 'rgb(0, 191, 255)', selected: false, disabled: false },
  { id: 'music', type: 'category', label: '음악', color: 'rgb(255, 105, 180)', selected: false, disabled: false },
  { id: 'gaming', type: 'category', label: '게임', color: 'rgb(144, 238, 144)', selected: false, disabled: false },
  { id: 'news', type: 'category', label: '뉴스', color: 'rgb(255, 215, 0)', selected: false, disabled: false },
  { id: 'travel', type: 'category', label: '여행', color: 'rgb(60, 179, 113)', selected: false, disabled: false },
  { id: 'sports', type: 'category', label: '스포츠', color: 'rgb(255, 140, 0)', selected: false, disabled: false },
  { id: 'comedy', type: 'category', label: '코미디', color: 'rgb(100, 149, 237)', selected: false, disabled: false },
  { id: 'tech', type: 'category', label: '전자기기', color: 'rgb(255, 20, 147)', selected: false, disabled: false },
]);

  const handleFlaskClick = (clickedFlask: Flask) => {
    setFlasks((prev) => {
      const isSelected = prev.find((f) => f.id === clickedFlask.id)?.selected;

      const newFlasks = prev.map((f) => {
        if (f.id === clickedFlask.id) {
          return { ...f, selected: !f.selected };
        }
        if (f.type === clickedFlask.type) {
          return { ...f, disabled: !isSelected };
        }
        return f;
      });

      return newFlasks;
    });
  };

  const selectedFlasks = flasks.filter((f) => f.selected);
  const fillLevel = selectedFlasks.length === 0 ? 0 : selectedFlasks.length === 1 ? 25 : 50;
  const filledColor = selectedFlasks.length === 0 ? 'transparent' : mixColors(selectedFlasks.map((f) => f.color));
  const showBubbles = selectedFlasks.length === 2;

  return (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex justify-between items-center gap-8 w-full max-w-[1400px] px-4">
      {/* Left - duration flasks */}
      <div className="grid grid-cols-3 gap-y-6 gap-x-4">
        {flasks.filter((f) => f.type === 'duration').map((flask) => (
          <FlaskButton key={flask.id} flask={flask} onClick={handleFlaskClick} />
        ))}
      </div>

      {/* Center - beaker */}
      <div className="flex justify-center items-center w-1/3">
        <Beaker fillLevel={fillLevel} filledColor={filledColor} showBubbles={showBubbles} />
      </div>

      {/* Right - category flasks */}
      <div className="grid grid-cols-4 gap-y-6 gap-x-2">
        {flasks.filter((f) => f.type === 'category').map((flask) => (
          <FlaskButton key={flask.id} flask={flask} onClick={handleFlaskClick} />
        ))}
      </div>
    </div>
  </div>
  );
}

export default VideoLab;
