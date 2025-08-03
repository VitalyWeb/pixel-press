export const formatSize = (size) => {
  return size < 1024 * 1024
    ? `${(size / 1024).toFixed(1)} KB`
    : `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

export const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const processFiles = async (files, compressionFn) => {
  const processedFiles = [];
  for (let file of files) {
    if (!file.processed) {
      const compressed = await compressionFn(file);
      processedFiles.push({ ...file, resultBlob: compressed, processed: true });
    } else {
      processedFiles.push(file);
    }
  }
  return processedFiles;
};