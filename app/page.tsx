import ImageUploader from "../components/ImageUploader";
import AnalyzeButton from "../components/AnalyzeButton";

export default function Home() {
  return (
    <main className="p-4 flex flex-col gap-4">
      <ImageUploader />
      <AnalyzeButton />
    </main>
  );
}
