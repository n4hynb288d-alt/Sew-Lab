import { brandMarkImage } from "@/lib/brand-mark-image";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  // Full SEW-LAB is unreadable at 32px; SL stays in the same display face.
  return brandMarkImage({ ...size, text: "SL", fontSize: 22 });
}
