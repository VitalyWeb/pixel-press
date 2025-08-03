import React, { useRef } from "react";

export function UploadArea({ onFilesSelected }) {
  const inputRef = useRef();

  const handleFiles = (files) => {
    if (!files.length) return;
    
    const validFiles = Array.from(files).filter((file) =>
      ["image/jpeg", "image/png", "image/webp"].includes(file.type)
    );
    
    const wrapped = validFiles.map((file) => ({
      file,
      processed: false,
      resultBlob: null,
      format: "jpeg",
      lossless: false,
    }));
    
    onFilesSelected(wrapped);
    
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => inputRef.current?.click();

  return (
    <div
      className="upload-area"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleClick}
    >
      <p>Перетащите сюда изображение или нажмите для выбора</p>
      <input
        type="file"
        accept="image/*"
        multiple
        ref={inputRef}
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}