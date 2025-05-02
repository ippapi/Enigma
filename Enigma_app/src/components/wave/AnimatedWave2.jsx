const AnimatedWave2 = () => {
  return (
    <div className="relative w-full h-[35rem] overflow-hidden bg-background">
      {/* Sóng 1 - Biên độ lớn nhất, chậm nhất */}
      <div className="absolute bottom-0 left-0 flex w-[400%] h-full opacity-30 animate-wave-x-slow">
        <Wave path="M0,190 C720,330 2160,50 2880,190 L2880,320 L0,320 Z" />
        <Wave path="M0,190 C720,330 2160,50 2880,190 L2880,320 L0,320 Z" />
      </div>

      {/* Sóng 2 - Trung bình, lệch rõ hơn */}
      <div
        className="absolute bottom-0 left-0 flex w-[400%] h-full opacity-50 animate-wave-x-medium"
        style={{ animationDelay: "3s" }}
      >
        <Wave path="M0,200 C720,340 2160,60 2880,200 L2880,320 L0,320 Z" />
        <Wave path="M0,200 C720,340 2160,60 2880,200 L2880,320 L0,320 Z" />
      </div>

      {/* Sóng 3 - Nhanh, giao động gắt, lệch sâu nhất */}
      <div
        className="absolute bottom-0 left-0 flex w-[400%] h-full opacity-60 animate-wave-x-fast"
        style={{ animationDelay: "6s" }}
      >
        <Wave path="M0,210 C720,350 2160,70 2880,210 L2880,320 L0,320 Z" />
        <Wave path="M0,210 C720,350 2160,70 2880,210 L2880,320 L0,320 Z" />
      </div>

      {/* Sóng 4 - dày hơn, thêm 1 lớp nhỏ nữa cho chiều sâu */}
      <div
        className="absolute bottom-0 left-0 flex w-[400%] h-full opacity-20 animate-wave-x-medium"
        style={{ animationDelay: "9s" }}
      >
        <Wave path="M0,220 C720,360 2160,80 2880,220 L2880,320 L0,320 Z" />
        <Wave path="M0,220 C720,360 2160,80 2880,220 L2880,320 L0,320 Z" />
      </div>
    </div>
  );
};

const Wave = ({ path }) => (
  <svg
    className="w-[200%] h-full"
    viewBox="0 0 2880 320"
    preserveAspectRatio="none"
  >
    <path fill="#957FC1" d={path} />
  </svg>
);

export default AnimatedWave2;