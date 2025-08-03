import imageCompression from 'browser-image-compression';

export const compressImage = async (fileObj) => {
  const options = {
    maxSizeMB: fileObj.lossless ? 0.1 : 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: fileObj.lossless ? 1 : 0.7,
    fileType: `image/${fileObj.format}`,
  };

  try {
    const compressedBlob = await imageCompression(fileObj.file, options);
    return compressedBlob;
  } catch (e) {
    console.warn('Ошибка сжатия', e);
    return fileObj.file;
  }
};

export const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};