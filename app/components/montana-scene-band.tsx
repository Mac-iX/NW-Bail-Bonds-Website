/* eslint-disable @next/next/no-img-element */

const scenes = {
  city: { src: "/scene-city-stencil.png", width: 1983, height: 793 },
  river: { src: "/scene-river-stencil.png", width: 2172, height: 724 },
  courthouse: { src: "/scene-courthouse-stencil.png", width: 2172, height: 724 },
  detention: { src: "/scene-detention-stencil.png", width: 2172, height: 724 },
} as const;

export function MontanaSceneBand({ scene }: { scene: keyof typeof scenes }) {
  const artwork = scenes[scene];
  return (
    <div className={`montana-scene montana-scene-${scene}`} id={`transition-${scene}`} aria-hidden="true">
      <img src={artwork.src} alt="" width={artwork.width} height={artwork.height} loading="lazy" />
    </div>
  );
}
