import JSZip from 'jszip';

export const createZip = async (files) => {
  const zip = new JSZip();
  files.forEach((f) => {
    if (f.processed && f.resultBlob) {
      const name = f.file.name.replace(/\.[^.]+$/, `.${f.format}`);
      zip.file(name, f.resultBlob);
    }
  });
  return await zip.generateAsync({ type: 'blob' });
};