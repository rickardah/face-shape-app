"use client";

import { useRef, useEffect, useImperativeHandle, useState, forwardRef } from "react";
import { FaceMesh, FACEMESH_TESSELATION } from "@mediapipe/face_mesh";
import { drawConnectors } from "@mediapipe/drawing_utils";

export interface FaceMeshViewerHandle {
  analyze: () => Promise<void>;
}

interface Props {
  imageUrl: string;
}

const FaceMeshViewer = forwardRef<FaceMeshViewerHandle, Props>(({ imageUrl }, ref) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.style.width = `${img.width}px`;
    canvas.style.height = `${img.height}px`;

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });
    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    let foundFace = false;
    faceMesh.onResults((results) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        foundFace = true;
        for (const landmarks of results.multiFaceLandmarks) {
          drawConnectors(ctx, landmarks, FACEMESH_TESSELATION, {
            color: "#0f0",
            lineWidth: 1,
          });
        }
        setError(null);
      } else {
        setError("Inget ansikte hittades");
      }
    });

    await faceMesh.send({ image: img });
    if (!foundFace) {
      setError("Inget ansikte hittades");
    }
    faceMesh.close();
  };

  useImperativeHandle(ref, () => ({ analyze }));

  useEffect(() => {
    analyze();
  }, [imageUrl]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img
        ref={imgRef}
        src={imageUrl}
        alt="uploaded"
        style={{ maxWidth: "300px" }}
      />
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", top: 0, left: 0 }}
      />
      {error && <p>{error}</p>}
    </div>
  );
});

FaceMeshViewer.displayName = "FaceMeshViewer";
export default FaceMeshViewer;
