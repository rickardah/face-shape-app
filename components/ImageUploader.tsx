"use client";

import { useState, ChangeEvent, useRef, useEffect } from "react";
import FaceMeshViewer, { FaceMeshViewerHandle } from "./FaceMeshViewer";
import AnalyzeButton from "./AnalyzeButton";

export default function ImageUploader() {
  const [preview, setPreview] = useState<string | null>(null);
  const viewerRef = useRef<FaceMeshViewerHandle>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  function runAnalysis() {
    viewerRef.current?.analyze();
  }

  useEffect(() => {
    if (preview) {
      runAnalysis();
    }
  }, [preview]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      {preview && (
        <>
          <FaceMeshViewer ref={viewerRef} imageUrl={preview} />
          <AnalyzeButton onAnalyze={runAnalysis} />
        </>
      )}
    </div>
  );
}
