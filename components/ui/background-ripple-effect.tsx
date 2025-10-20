// "use client";
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import ClickableDiv from "../clickable-div";

// export const BackgroundRippleEffect = ({
//   rows = 8,
//   cols = 27,
//   cellSize = 56,
// }: {
//   rows?: number;
//   cols?: number;
//   cellSize?: number;
// }) => {
//   const [clickedCell, setClickedCell] = useState<{
//     row: number;
//     col: number;
//   } | null>(null);
//   const [rippleKey, setRippleKey] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
//   const ref = useRef<any>(null);

//   const handleCellClick = (row: number, col: number, idx: number, rippleDuration: number) => {
//     setClickedCell({ row, col });
//     setRippleKey((k) => k + 1);

//     // Set the selected index
//     setSelectedIdx(idx);

//     // Show modal after ripple effect completes
//     setTimeout(() => {
//       setShowModal(true);
//     }, rippleDuration);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//     setSelectedIdx(null);
//   };

//   return (
//     <div
//       ref={ref}
//       className={cn(
//         "absolute inset-0 h-full w-full",
//         "[--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)]",
//         "dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]"
//       )}
//     >
//       <div className="relative h-auto w-auto overflow-hidden">
//         <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
//         <DivGrid
//           key={`base-${rippleKey}`}
//           className="mask-radial-from-20% mask-radial-at-top opacity-600"
//           rows={rows}
//           cols={cols}
//           cellSize={cellSize}
//           borderColor="var(--cell-border-color)"
//           fillColor="var(--cell-fill-color)"
//           clickedCell={clickedCell}
//           onCellClick={handleCellClick}
//           interactive
//         />
//       </div>

//       {/* Modal - Rendered at parent level so it persists across re-renders */}
//       {showModal && selectedIdx !== null && (
//         <div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
//           onClick={handleCloseModal}
//         >
//           <div
//             className="relative max-w-4xl max-h-[90vh] animate-in zoom-in-95 duration-300"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close button */}
//             <button
//               onClick={handleCloseModal}
//               className="absolute -top-4 -right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg hover:bg-gray-100 transition-colors"
//               aria-label="Close modal"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <line x1="18" y1="6" x2="6" y2="18"></line>
//                 <line x1="6" y1="6" x2="18" y2="18"></line>
//               </svg>
//             </button>

//             {/* Image */}
//             <div className="relative rounded-lg overflow-hidden shadow-2xl bg-white">
//               <Image
//                 src={"/placeholder-user.jpg"}
//                 height={600}
//                 width={600}
//                 className="h-auto w-full max-h-[85vh] object-contain"
//                 alt={`Enlarged image ${selectedIdx}`}
//               />

//               {/* Optional: Image caption */}
//               <div className="p-4 text-center bg-white">
//                 <p className="text-sm text-gray-600">Image {selectedIdx}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// type DivGridProps = {
//   className?: string;
//   rows: number;
//   cols: number;
//   cellSize: number;
//   borderColor: string;
//   fillColor: string;
//   clickedCell: { row: number; col: number } | null;
//   onCellClick?: (row: number, col: number, idx: number, rippleDuration: number) => void;
//   interactive?: boolean;
// };

// type CellStyle = React.CSSProperties & {
//   ["--delay"]?: string;
//   ["--duration"]?: string;
// };

// const DivGrid = ({
//   className,
//   rows = 7,
//   cols = 30,
//   cellSize = 56,
//   borderColor = "#3f3f46",
//   fillColor = "rgba(14,165,233,0.3)",
//   clickedCell = null,
//   onCellClick = () => {},
//   interactive = true,
// }: DivGridProps) => {
//   const cells = useMemo(
//     () => Array.from({ length: rows * cols }, (_, idx) => idx),
//     [rows, cols]
//   );

//   const gridStyle: React.CSSProperties = {
//     display: "grid",
//     gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
//     gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
//     width: cols * cellSize,
//     height: rows * cellSize,
//     marginInline: "auto",
//   };

//   return (
//     <div className={cn("relative z-[3]", className)} style={gridStyle}>
//       {cells.map((idx) => {
//         const rowIdx = Math.floor(idx / cols);
//         const colIdx = idx % cols;
//         const distance = clickedCell
//           ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
//           : 0;
//         const delay = clickedCell ? Math.max(0, distance * 55) : 0;
//         const duration = 200 + distance * 80;

//         const style: CellStyle = clickedCell
//           ? {
//               "--delay": `${delay}ms`,
//               "--duration": `${duration}ms`,
//             }
//           : {};

//         return (
//           <ClickableDiv
//             key={idx}
//             borderColor={borderColor}
//             clickedCell={clickedCell}
//             colIdx={colIdx}
//             fillColor={fillColor}
//             idx={idx}
//             interactive={interactive}
//             rowIdx={rowIdx}
//             style={style}
//             onCellClick={onCellClick}
//           />
//         );
//       })}
//     </div>
//   );
// };

"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ClickableDiv from "../clickable-div";

export const BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
  cellSize = 56,
}: {
  rows?: number;
  cols?: number;
  cellSize?: number;
}) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse move for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center as percentage
      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;

      // Reverse parallax: move opposite to mouse
      // Multiply by a factor to control the intensity (negative for reverse)
      const intensity = -50; // Adjust this value to control movement intensity
      setMousePosition({
        x: deltaX * intensity,
        y: deltaY * intensity,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleCellClick = (
    row: number,
    col: number,
    idx: number,
    rippleDuration: number
  ) => {
    setClickedCell({ row, col });
    setRippleKey((k) => k + 1);

    // Set the selected index
    setSelectedIdx(idx);

    // Show modal after ripple effect completes
    setTimeout(() => {
      setShowModal(true);
    }, rippleDuration);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedIdx(null);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute  inset-0 h-full w-full",
        "[--cell-border-color:var(--color-neutral-300)] [--cell-fill-color:var(--color-neutral-100)] [--cell-shadow-color:var(--color-neutral-500)]",
        "dark:[--cell-border-color:var(--color-neutral-700)] dark:[--cell-fill-color:var(--color-neutral-900)] dark:[--cell-shadow-color:var(--color-neutral-800)]"
      )}
    >
      <div className="relative h-auto w-auto overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
        <div
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        >
          <DivGrid
            key={`base-${rippleKey}`}
            className="mask-radial-from-20% mask-radial-at-top opacity-600"
            rows={rows}
            cols={cols}
            cellSize={cellSize}
            borderColor="var(--cell-border-color)"
            fillColor="var(--cell-fill-color)"
            clickedCell={clickedCell}
            onCellClick={handleCellClick}
            interactive
          />
        </div>
      </div>

      {/* Modal - Rendered at parent level so it persists across re-renders */}
      {showModal && selectedIdx !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute -top-4 -right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-800 shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Image */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl bg-white">
              <Image
                src={"/placeholder-user.jpg"}
                height={600}
                width={600}
                className="h-auto w-full max-h-[85vh] object-contain"
                alt={`Enlarged image ${selectedIdx}`}
              />

              {/* Optional: Image caption */}
              <div className="p-4 text-center bg-white">
                <p className="text-sm text-gray-600">Image {selectedIdx}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number;
  borderColor: string;
  fillColor: string;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (
    row: number,
    col: number,
    idx: number,
    rippleDuration: number
  ) => void;
  interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};

const DivGrid = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "#3f3f46",
  fillColor = "rgba(14,165,233,0.3)",
  clickedCell = null,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols]
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    marginInline: "auto",
  };

  return (
    <div className={cn("relative z-[3]", className)} style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay = clickedCell ? Math.max(0, distance * 55) : 0;
        const duration = 200 + distance * 80;

        const style: CellStyle = clickedCell
          ? {
              "--delay": `${delay}ms`,
              "--duration": `${duration}ms`,
            }
          : {};

        return (
          <ClickableDiv
            key={idx}
            borderColor={borderColor}
            clickedCell={clickedCell}
            colIdx={colIdx}
            fillColor={fillColor}
            idx={idx}
            interactive={interactive}
            rowIdx={rowIdx}
            style={style}
            onCellClick={onCellClick}
          />
        );
      })}
    </div>
  );
};
