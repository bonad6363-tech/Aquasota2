/** Пути с учётом base (GitHub Pages: /aquasota2/). */
function asset(path: string) {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${path.replace(/^\//, '')}`;
}

/**
 * Медиа сайта.
 * Товарные фото Аквасота-1 / Аквасота-2 — макеты заказчика.
 */
export const images = {
  logo: asset('logo-aquasota.png'),
  heroProduct: asset('images/akvasota-2.png'),
  glassWater: asset('images/akvasota-1.png'),
  scenarioHome: asset('images/scenario-home.webp'),
  scenarioDacha: asset('images/scenario-dacha.webp'),
  scenarioTravel: asset('images/scenario-travel.webp'),
  production: asset('images/production.webp'),
  membrane: asset('images/membrane.webp'),
  productPortable: asset('images/akvasota-1.png'),
  productPortable2: asset('images/akvasota-2.png'),
  productHome: asset('images/disc-filter-housing.png'),
  productTube: asset('images/product-tube.png'),
  videoCover: asset('images/akvasota-2.png'),
  control: asset('images/control.webp'),
  ogCover: asset('images/akvasota-2.png'),
  akvasota1: asset('images/akvasota-1.png'),
  akvasota2: asset('images/akvasota-2.png'),
  discFilterHousing: asset('images/disc-filter-housing.png'),
  discFilterCartridge: asset('images/disc-filter-cartridge.png'),
  discFilterDiscs: asset('images/disc-filter-discs.png'),
  discFilter1Housing: asset('images/disc-filter-1-housing.png'),
  discFilter1Cartridge: asset('images/disc-filter-1-cartridge.png'),
  discFilter1Discs: asset('images/disc-filter-1-discs.png'),
  tank2Gal: asset('images/tank-2-gal.png'),
  tank28Gal: asset('images/tank-2-8-gal.jpg'),
  tank32Gal: asset('images/tank-3-2-gal.jpg'),
  faucetBronze: asset('images/faucet-bronze.png'),
  faucetBronzeKit: asset('images/faucet-bronze-kit.png'),
  faucetBronzeParts: asset('images/faucet-bronze-parts.png'),
  faucetDualSilver: asset('images/faucet-dual-silver.png'),
  aquasotaHowItWorks: asset('images/aquasota-how-it-works.jpg'),
  aquasota2Kit: asset('images/aquasota-2-kit.png'),
  filterAsTf1: asset('images/filter-as-tf1.webp'),
} as const;
