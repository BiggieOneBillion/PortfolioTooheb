import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type CellStyle = React.CSSProperties & {
  "--delay"?: string;
  "--duration"?: string;
};

type ClickableDivProps = {
  idx: number;
  clickedCell: {
    row: number;
    col: number;
  } | null;
  interactive: boolean;
  fillColor: string;
  borderColor: string;
  style: CellStyle;
  rowIdx: number;
  colIdx: number;
  onCellClick?: (row: number, col: number, idx: number, rippleDuration: number) => void;
};

const ClickableDiv = ({
  borderColor,
  clickedCell,
  colIdx,
  fillColor,
  idx,
  interactive,
  rowIdx,
  style,
  onCellClick,
}: ClickableDivProps) => {
  // Calculate ripple duration based on the style prop
  const getRippleDuration = () => {
    if (style["--delay"] && style["--duration"]) {
      const delay = parseInt(style["--delay"]);
      const duration = parseInt(style["--duration"]);
      return delay + duration;
    }
    return 0;
  };

  const handleClick = () => {
    if (!interactive) return;
    
    const rippleDuration = getRippleDuration();
    onCellClick?.(rowIdx, colIdx, idx, rippleDuration);
  };

  return (
    <div
      className={cn(
        "cell relative border-[0.5px] opacity-40 transition-opacity duration-150 will-change-transform hover:opacity-80 dark:shadow-[0px_0px_40px_1px_var(--cell-shadow-color)_inset]",
        clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
        !interactive && "pointer-events-none"
      )}
      style={{
        backgroundColor: fillColor,
        borderColor: borderColor,
        ...style,
      }}
      onClick={handleClick}
      data-idx={idx}
    >
      <Image
        src={"/placeholder-user.jpg"}
        alt={`Image ${idx}`}
        height={100}
        width={100}
        className="h-full w-full object-cover opacity-10 pointer-events-none"
      />
    </div>
  );
};

export default ClickableDiv;