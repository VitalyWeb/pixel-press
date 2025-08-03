import React from "react";

export function ProcessingReport({ files }) {
  const totalBefore = files.reduce((sum, f) => sum + f.file.size, 0);
  const totalAfter = files.reduce(
    (sum, f) => sum + (f.resultBlob ? f.resultBlob.size : 0),
    0
  );
  const saved = totalBefore - totalAfter;
  const savedPercent = ((saved / totalBefore) * 100).toFixed(1);

  return (
    <div className="processing-report">
      <h3>Отчёт по обработке</h3>
      <p>Общий размер до: {(totalBefore / 1024 / 1024).toFixed(2)} МБ</p>
      <p>Общий размер после: {(totalAfter / 1024 / 1024).toFixed(2)} МБ</p>
      <p>
        Экономия: {(saved / 1024 / 1024).toFixed(2)} МБ ({savedPercent}%)
      </p>
    </div>
  );
}