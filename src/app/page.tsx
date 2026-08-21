import Header from "@/components/home/Header";
import ComingSoon from "@/components/home/ComingSoon";

// Temporary front door while the full build (still complete and reviewable
// at /preview) isn't ready to launch yet.
export default function Home() {
  return (
    <div id="top">
      <Header cycleMark />
      <main>
        <ComingSoon />
      </main>
    </div>
  );
}
