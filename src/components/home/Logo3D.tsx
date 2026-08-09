import styles from "./Logo3D.module.css";

const TEXT = "SEW-LAB";
// Depth slices between the front and back face — each one is a full copy of
// the wordmark, offset along the Z axis and shaded darker with distance, so
// the stack reads as an extruded/beveled edge rather than flat text.
const SLICE_COUNT = 12;
const CAP_Z = 6;

// Color is a pure function of physical depth (front cap at +CAP_Z is the
// brand orange at full strength, back cap at -CAP_Z is near-black) — both
// the front-facing and back-facing copy of a slice at the same depth use
// this, so the shading is identical no matter which one is currently facing
// the camera.
function colorAtDepth(z: number) {
  const t = (z + CAP_Z) / (CAP_Z * 2); // 0 at back (-CAP_Z), 1 at front (+CAP_Z)
  return `color-mix(in srgb, var(--accent) ${Math.round(100 - t * 65)}%, #1a0f08)`;
}

const depths = Array.from({ length: SLICE_COUNT }, (_, i) => {
  const t = i / (SLICE_COUNT - 1);
  return -CAP_Z + t * CAP_Z * 2;
});

export default function Logo3D() {
  return (
    <div className={styles.stage}>
      <div className={styles.cube} aria-hidden="true">
        {/* Sizer: normal-flow, invisible — establishes the box the
            absolutely-positioned faces below are stacked into. */}
        <span className={styles.sizer}>{TEXT}</span>

        {/* Front-facing edge slices — visible for roughly the front half of
            the spin (facing local +Z). */}
        {depths.map((z) => (
          <span
            key={`f${z}`}
            className={styles.slice}
            style={{ transform: `translateZ(${z.toFixed(2)}px)`, color: colorAtDepth(z) }}
          >
            {TEXT}
          </span>
        ))}

        {/* Back-facing edge slices — copies at the same depths facing local
            -Z. Without these, the extrusion detail vanished once the cube
            turned past 90deg, leaving the back half of the spin flat; these
            hand off seamlessly so the same beveled look holds all the way
            around. (No mirroring needed here: rotateY(180deg) on this span
            combined with the parent's own rotation nets back to the
            original, un-rotated orientation by the time this face is the
            one pointed at the camera.) */}
        {depths.map((z) => (
          <span
            key={`b${z}`}
            className={styles.slice}
            style={{ transform: `rotateY(180deg) translateZ(${(-z).toFixed(2)}px)`, color: colorAtDepth(z) }}
          >
            {TEXT}
          </span>
        ))}

        <span className={styles.face} style={{ transform: `translateZ(${CAP_Z}px)` }}>
          {TEXT}
        </span>

        <span className={styles.back} style={{ transform: `rotateY(180deg) translateZ(${CAP_Z}px)` }}>
          <span className={styles.backInner}>{TEXT}</span>
        </span>
      </div>
      <span className={styles.srOnly}>SEW-LAB</span>
    </div>
  );
}
