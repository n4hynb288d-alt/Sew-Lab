import Header from "@/components/home/Header";
import ComingSoon from "@/components/home/ComingSoon";

// Coming-soon landing — reached from the login chooser "Back to home".
// The full marketing build stays at /preview.
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
