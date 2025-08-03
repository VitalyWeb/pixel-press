import React, { useState } from 'react';
import { UploadArea } from '../components/UploadArea';
import { ImageSlider } from '../components/ImageSlider';
import { Controls } from '../components/Controls';
import { ProcessingReport } from '../components/ProcessingReport';
import { Home } from './Home';
import { compressImage } from '../utils/imageCompressor';
import { processFiles, downloadFile } from '../utils/fileHelpers';
import { createZip } from '../utils/zipHelpers';

export function PageTemplate({ mode, files, setFiles }) {
  const [processing, setProcessing] = useState(false);

  const handleFiles = (newFiles) => {
    setFiles(newFiles);
  };

  const handleClearAll = () => {
  setFiles([]);
  setProcessing(false);
};

  const removeFile = (index) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const setFormat = (index, format) => {
    const updated = [...files];
    updated[index].format = format;
    setFiles(updated);
  };

  const setLossless = (index, lossless) => {
    const updated = [...files];
    updated[index].lossless = lossless;
    setFiles(updated);
  };

  const processAll = async () => {
    setProcessing(true);
    const processedFiles = await processFiles(files, compressImage);
    setFiles(processedFiles);
    setProcessing(false);
  };

  const downloadAllZip = async () => {
    const content = await createZip(files);
    downloadFile(content, 'pixel-press-processed.zip');
  };

  if (mode === 'home') {
    return <Home />;
  }

  return (
    <div className="page-template">
      <UploadArea onFilesSelected={handleFiles} />
      {files.length > 0 && (
        <>
          <ImageSlider
            files={files}
            onRemove={removeFile}
            onFormatChange={setFormat}
            onLosslessChange={setLossless}
          />
          <div className="action-buttons">
            <button
              disabled={processing}
              onClick={processAll}
              className={`process-btn ${processing ? 'disabled' : ''}`}
            >
              {processing ? "Обработка..." : "Сжать изображения"}
            </button>
            <button
              disabled={processing}
              onClick={handleClearAll}
              className={`clear-btn ${processing ? 'disabled' : ''}`}
            >
              Удалить все
            </button>
          </div>
          {files.some((f) => f.processed) && (
            <>
              <Controls onDownloadAll={downloadAllZip} />
              <ProcessingReport files={files} />
            </>
          )}
        </>
      )}
      {files.length === 0 && <p className="no-files">Нет файлов</p>}
    </div>
  );
}