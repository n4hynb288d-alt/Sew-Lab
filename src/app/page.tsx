import { redirect } from "next/navigation";

// Public front door is the login chooser. The coming-soon landing lives at
// /home and is only linked from Login → Back to home.
export default function Root() {
  redirect("/login");
}
