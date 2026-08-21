import { brandMarkImage } from "@/lib/brand-mark-image";

export const alt = "SEW-LAB";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return brandMarkImage({ ...size, text: "SEW-LAB", fontSize: 200 });
}
