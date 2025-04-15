const AnimatedWave = () => {
    return (
      <div className="relative w-full h-[35rem] overflow-hidden bg-background mt-0">
        {/* Sóng 1 - Biên độ lớn nhất, chậm nhất */}
        <div className="absolute bottom-0 left-0 w-[200%] h-full opacity-30 animate-wave-x-slow">
          <svg
            className="w-full h-full"
            viewBox="0 0 2880 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#38255E"
              d="M0,180 C720,320 2160,40 2880,180 L2880,320 L0,320 Z"
            />
          </svg>
        </div>
  
        {/* Sóng 2 - Trung bình, lệch rõ hơn */}
        <div className="absolute bottom-0 left-0 w-[200%] h-full opacity-50 animate-wave-x-medium" style={{ animationDelay: "3s" }}>
          <svg
            className="w-full h-full"
            viewBox="0 0 2880 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#38255E"
              d="M0,200 C720,340 2160,60 2880,200 L2880,320 L0,320 Z"
            />
          </svg>
        </div>
  
        {/* Sóng 3 - Nhanh, giao động gắt, lệch sâu nhất */}
        <div className="absolute bottom-0 left-0 w-[200%] h-full opacity-70 animate-wave-x-fast" style={{ animationDelay: "6s" }}>
          <svg
            className="w-full h-full"
            viewBox="0 0 2880 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#38255E"
              d="M0,220 C720,360 2160,80 2880,220 L2880,320 L0,320 Z"
            />
          </svg>
        </div>
  
        {/* Sóng 4 - dày hơn, thêm 1 lớp nhỏ nữa cho chiều sâu */}
        <div className="absolute bottom-0 left-0 w-[200%] h-full opacity-20 animate-wave-x-medium" style={{ animationDelay: "9s" }}>
          <svg
            className="w-full h-full"
            viewBox="0 0 2880 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#38255E"
              d="M0,240 C720,380 2160,100 2880,240 L2880,320 L0,320 Z"
            />
          </svg>
        </div>
      </div>
    );
  };
  
  export default AnimatedWave;
  