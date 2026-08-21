import { brandMarkImage } from "@/lib/brand-mark-image";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return brandMarkImage({ ...size, text: "SEW-LAB", fontSize: 48 });
}
