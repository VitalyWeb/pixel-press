import React, { useState, useEffect } from "react";
import { formatSize } from '../utils/fileHelpers';

export function ImageCard({ item, onRemove, onFormatChange, onLosslessChange }) {
  const [preview, setPreview] = useState("");

  const FORMATS = ["jpeg", "png", "webp"];

  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(item.file);
  }, [item.file]);

  return (
    <div className="image-card">
      <div className="remove-btn" onClick={onRemove} title="Удалить">
        ×
      </div>
      {preview && (
        <img
          src={preview}
          alt={item.file.name}
          className="image-preview"
        />
      )}
      <p className="image-name">{item.file.name}</p>
      <p className="image-type">{item.file.type}</p>
      <p className="image-size">{formatSize(item.file.size)}</p>
      <div className="format-selector">
        <label>
          Формат:
          <select
            value={item.format}
            onChange={(e) => onFormatChange(e.target.value)}
          >
            {FORMATS.map((fmt) => (
              <option key={fmt} value={fmt}>
                {fmt.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="lossless-option">
        <label>
          <input
            type="checkbox"
            checked={item.lossless}
            onChange={(e) => onLosslessChange(e.target.checked)}
          />
          Без потери
        </label>
      </div>
    </div>
  );
}