import React from "react";

export function Controls({ onDownloadAll, onDownloadSingle }) {
  return (
    <div className="controls">
      <button
        onClick={onDownloadAll}
        className="download-all"
      >
        Скачать архивом
      </button>
    </div>
  );
}