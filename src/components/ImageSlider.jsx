import React from "react";
import { ImageCard } from "./ImageCard";

export function ImageSlider({ files, onRemove, onFormatChange, onLosslessChange }) {
  return (
    <div className="image-slider">
      {files.map((item, idx) => (
        <ImageCard
          key={idx}
          item={item}
          onRemove={() => onRemove(idx)}
          onFormatChange={(format) => onFormatChange(idx, format)}
          onLosslessChange={(lossless) => onLosslessChange(idx, lossless)}
        />
      ))}
    </div>
  );
}