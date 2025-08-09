"use client";

interface Props {
  onAnalyze: () => void;
}

export default function AnalyzeButton({ onAnalyze }: Props) {
  return <button onClick={onAnalyze}>Analysera</button>;
}
