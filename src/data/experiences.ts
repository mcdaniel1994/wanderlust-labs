import { topicPhotos } from "@/data/photos";
import type { Experience } from "@/types/experience";

type RawExperience = Omit<Experience, "detailImageUrl" | "galleryImageUrls">;

function includesAny(value: string, keywords: string[]) {
  return keywords.some((keyword) => value.includes(keyword));
}

function uniquePhotos(photos: string[]) {
  return Array.from(new Set(photos));
}

function photoSet(photos: string[], minimumLength = 6) {
  const uniquePhotoSet = uniquePhotos(photos);
  const filledPhotos = [...uniquePhotoSet];

  while (filledPhotos.length < minimumLength && uniquePhotoSet.length > 0) {
    filledPhotos.push(
      uniquePhotoSet[filledPhotos.length % uniquePhotoSet.length],
    );
  }

  return filledPhotos.slice(0, minimumLength);
}

function scopedPhoto(photoUrl: string, scope: string, width: number) {
  const url = new URL(photoUrl);

  url.searchParams.set("w", String(width));
  url.searchParams.set("fit", "crop");
  url.searchParams.set("crop", "entropy");
  url.searchParams.set("ux", scope);

  return url.toString();
}

function getExperienceGallery(experience: RawExperience) {
  const topic = `${experience.title} ${experience.destination}`.toLowerCase();

  if (experience.category === "Adventure") {
    if (includesAny(topic, ["rafting", "rapids"])) {
      return photoSet([
        topicPhotos.adventureRafting,
        topicPhotos.adventureWaterfall,
        topicPhotos.adventureForest,
        topicPhotos.adventureCove,
      ]);
    }
    if (includesAny(topic, ["paragliding", "flight"])) {
      return photoSet([
        topicPhotos.adventureParagliding,
        topicPhotos.adventureDolomites,
        topicPhotos.natureLake,
        topicPhotos.adventureTableMountain,
      ]);
    }
    if (includesAny(topic, ["dolomite", "via ferrata"])) {
      return photoSet([
        topicPhotos.adventureDolomites,
        topicPhotos.adventureParagliding,
        topicPhotos.natureLake,
        topicPhotos.adventureGlacier,
      ]);
    }
    if (includesAny(topic, ["table mountain", "climb"])) {
      return photoSet([
        topicPhotos.adventureTableMountain,
        topicPhotos.adventureParagliding,
        topicPhotos.adventureDolomites,
        topicPhotos.natureLake,
      ]);
    }
    if (includesAny(topic, ["kayak", "cave", "paddle", "lagoon", "blue cave"])) {
      return photoSet([
        topicPhotos.adventureKayak,
        topicPhotos.adventureCove,
        topicPhotos.adventureFjordBoat,
        topicPhotos.adventureSailing,
      ]);
    }
    if (includesAny(topic, ["glacier", "snowshoe", "arctic", "fjord"])) {
      return photoSet([
        topicPhotos.adventureGlacier,
        topicPhotos.adventureSnowFjord,
        topicPhotos.adventureFjordBoat,
        topicPhotos.natureAurora,
      ]);
    }
    if (includesAny(topic, ["volcano", "andes", "ridge", "mountain bike"])) {
      return photoSet([
        topicPhotos.adventureVolcano,
        topicPhotos.adventureDolomites,
        topicPhotos.adventureRedRocks,
        topicPhotos.adventureTableMountain,
      ]);
    }
    if (includesAny(topic, ["surf", "taghazout"])) {
      return photoSet([
        topicPhotos.adventureSurf,
        topicPhotos.adventureSailing,
        topicPhotos.adventureCove,
        topicPhotos.wellnessCoastal,
      ]);
    }
    if (includesAny(topic, ["sail", "coast", "island"])) {
      return photoSet([
        topicPhotos.adventureSailing,
        topicPhotos.adventureCove,
        topicPhotos.adventureFjordBoat,
        topicPhotos.adventureSurf,
      ]);
    }
    if (includesAny(topic, ["red rock", "sedona"])) {
      return photoSet([
        topicPhotos.adventureRedRocks,
        topicPhotos.adventureDesert,
        topicPhotos.adventureTableMountain,
      ]);
    }
    if (includesAny(topic, ["desert", "dune", "sahara"])) {
      return photoSet([
        topicPhotos.adventureDesert,
        topicPhotos.adventureRedRocks,
        topicPhotos.natureStargazing,
      ]);
    }
    if (includesAny(topic, ["forest", "jungle", "zipline", "waterfall", "canopy"])) {
      return photoSet([
        topicPhotos.adventureForest,
        topicPhotos.adventureWaterfall,
        topicPhotos.natureRainforest,
        topicPhotos.wellnessForest,
      ]);
    }

    return photoSet([
      topicPhotos.adventureDolomites,
      topicPhotos.adventureParagliding,
      topicPhotos.natureLake,
      topicPhotos.adventureGlacier,
    ]);
  }

  if (experience.category === "Culture") {
    if (includesAny(topic, ["tea ceremony", "kyoto tea"])) {
      return photoSet([
        topicPhotos.cultureTea,
        topicPhotos.foodPastryCafe,
        topicPhotos.cultureUbudTemple,
      ]);
    }
    if (includesAny(topic, ["artisan", "mosaic", "paper", "workshop"])) {
      return photoSet([
        topicPhotos.cultureArtisan,
        topicPhotos.cultureMosaic,
        topicPhotos.cultureAzulejo,
        topicPhotos.cultureOaxacaTextile,
      ]);
    }
    if (includesAny(topic, ["acropolis", "athens"])) {
      return photoSet([
        topicPhotos.cultureAcropolis,
      ]);
    }
    if (includesAny(topic, ["marrakech", "souk", "bazaar", "market"])) {
      return photoSet([
        topicPhotos.cultureSouk,
        topicPhotos.foodMarket,
        topicPhotos.adventureDesert,
      ]);
    }
    if (includesAny(topic, ["istanbul", "continents"])) {
      return photoSet([
        topicPhotos.cultureIstanbul,
        topicPhotos.foodMarket,
        topicPhotos.cultureCairo,
        topicPhotos.adventureSailing,
      ]);
    }
    if (includesAny(topic, ["mural", "mexico city"])) {
      return photoSet([
        topicPhotos.cultureMural,
        topicPhotos.cultureOaxacaTextile,
        topicPhotos.foodTacos,
        topicPhotos.cultureAzulejo,
      ]);
    }
    if (includesAny(topic, ["cairo", "old city"])) {
      return photoSet([
        topicPhotos.cultureCairo,
        topicPhotos.cultureSouk,
        topicPhotos.foodMarket,
        topicPhotos.cultureIstanbul,
      ]);
    }
    if (includesAny(topic, ["ubud", "temple", "bali"])) {
      return photoSet([
        topicPhotos.cultureUbudTemple,
        topicPhotos.wellnessRiceFields,
        topicPhotos.adventureWaterfall,
        topicPhotos.wellnessYoga,
      ]);
    }
    if (includesAny(topic, ["lisbon", "tile", "azulejo"])) {
      return photoSet([
        topicPhotos.cultureAzulejo,
        topicPhotos.foodPastryCafe,
        topicPhotos.wellnessCoastal,
      ]);
    }
    if (includesAny(topic, ["paris", "literature", "book", "left bank"])) {
      return photoSet([
        topicPhotos.cultureParisCafe,
        topicPhotos.foodPastryCafe,
        topicPhotos.cultureArtisan,
      ]);
    }
    if (includesAny(topic, ["cusco", "astronomy", "night"])) {
      return photoSet([
        topicPhotos.cultureAstronomy,
        topicPhotos.natureStargazing,
        topicPhotos.natureAurora,
      ]);
    }
    if (includesAny(topic, ["prague"])) {
      return photoSet([
        topicPhotos.culturePrague,
      ]);
    }
    if (includesAny(topic, ["tango", "buenos aires"])) {
      return photoSet([topicPhotos.cultureTango]);
    }
    if (includesAny(topic, ["hanok", "seoul"])) {
      return photoSet([
        topicPhotos.cultureHanok,
        topicPhotos.cultureTea,
        topicPhotos.cultureUbudTemple,
      ]);
    }
    if (includesAny(topic, ["tokyo", "neon", "photo"])) {
      return photoSet([topicPhotos.cultureTokyoNeon]);
    }
    if (includesAny(topic, ["barcelona", "gaudi", "design"])) {
      return photoSet([
        topicPhotos.cultureGaudi,
        topicPhotos.cultureAzulejo,
      ]);
    }
    if (includesAny(topic, ["hanoi", "old quarter"])) {
      return photoSet([
        topicPhotos.cultureHanoi,
        topicPhotos.foodBangkokNoodles,
        topicPhotos.cultureSouk,
      ]);
    }
    if (includesAny(topic, ["jaipur", "block print"])) {
      return photoSet([
        topicPhotos.cultureJaipurBlock,
        topicPhotos.cultureOaxacaTextile,
        topicPhotos.foodTextilesMarket,
        topicPhotos.cultureAzulejo,
      ]);
    }
    if (includesAny(topic, ["new orleans", "jazz"])) {
      return photoSet([topicPhotos.cultureNewOrleansJazz]);
    }
    if (includesAny(topic, ["oaxaca", "textile"])) {
      return photoSet([
        topicPhotos.cultureOaxacaTextile,
        topicPhotos.cultureJaipurBlock,
        topicPhotos.foodTextilesMarket,
        topicPhotos.cultureMural,
      ]);
    }

    return photoSet([
      topicPhotos.cultureAcropolis,
      topicPhotos.cultureIstanbul,
      topicPhotos.cultureSouk,
      topicPhotos.cultureMural,
    ]);
  }

  if (experience.category === "Food") {
    if (topic.includes("pizza")) {
      return photoSet([topicPhotos.foodPizza]);
    }
    if (topic.includes("ceviche")) {
      return photoSet([
        topicPhotos.foodCeviche,
        topicPhotos.foodTapas,
        topicPhotos.wellnessCoastal,
        topicPhotos.adventureCove,
      ]);
    }
    if (includesAny(topic, ["tapas", "meze", "athens"])) {
      return photoSet([
        topicPhotos.foodTapas,
        topicPhotos.foodTapasBar,
        topicPhotos.cultureAcropolis,
      ]);
    }
    if (includesAny(topic, ["ramen", "noodle", "curry", "hawker", "bangkok", "singapore", "chiang mai", "hoi an"])) {
      return photoSet([
        topicPhotos.foodBangkokNoodles,
        topicPhotos.foodMarket,
        topicPhotos.cultureHanoi,
      ]);
    }
    if (includesAny(topic, ["pastry", "sweet", "bakery", "wagashi"])) {
      return photoSet([
        topicPhotos.foodPastryCafe,
        topicPhotos.cultureTea,
        topicPhotos.cultureParisCafe,
      ]);
    }
    if (includesAny(topic, ["wine", "vineyard", "cellar"])) {
      return photoSet([
        topicPhotos.foodTapasBar,
        topicPhotos.foodTapas,
      ]);
    }
    if (includesAny(topic, ["spice", "tagine", "marrakech"])) {
      return photoSet([
        topicPhotos.foodMarket,
        topicPhotos.cultureSouk,
        topicPhotos.adventureDesert,
      ]);
    }
    if (includesAny(topic, ["mole", "taco", "mexico city", "oaxaca"])) {
      return photoSet([
        topicPhotos.foodTacos,
        topicPhotos.foodMarket,
        topicPhotos.cultureMural,
        topicPhotos.cultureOaxacaTextile,
      ]);
    }
    if (includesAny(topic, ["pasta", "rome"])) {
      return photoSet([topicPhotos.foodPasta]);
    }
    if (includesAny(topic, ["seafood", "sardines", "lisbon"])) {
      return photoSet([
        topicPhotos.foodTapas,
        topicPhotos.wellnessCoastal,
        topicPhotos.cultureAzulejo,
        topicPhotos.foodPastryCafe,
      ]);
    }
    if (includesAny(topic, ["asado", "grill"])) {
      return photoSet([topicPhotos.foodAsado]);
    }

    return photoSet([
      topicPhotos.foodMarket,
      topicPhotos.foodBangkokNoodles,
      topicPhotos.foodTapas,
      topicPhotos.foodCeviche,
    ]);
  }

  if (experience.category === "Wellness") {
    if (topic.includes("lagoon")) {
      return photoSet([
        topicPhotos.wellnessLagoon,
        topicPhotos.wellnessSpa,
        topicPhotos.natureLake,
      ]);
    }
    if (topic.includes("sauna")) {
      return photoSet([
        topicPhotos.natureLake,
        topicPhotos.adventureSnowFjord,
        topicPhotos.wellnessSpa,
      ]);
    }
    if (topic.includes("alpine spa")) {
      return photoSet([
        topicPhotos.adventureSnowFjord,
        topicPhotos.natureLake,
        topicPhotos.wellnessSpa,
      ]);
    }
    if (includesAny(topic, ["onsen", "hammam", "massage"])) {
      return photoSet([topicPhotos.wellnessSpa]);
    }
    if (topic.includes("spa")) {
      return photoSet([
        topicPhotos.wellnessSpa,
        topicPhotos.natureLake,
      ]);
    }
    if (includesAny(topic, ["forest", "hike", "mindfulness", "meditation", "rainforest", "lavender", "pokhara"])) {
      return photoSet([
        topicPhotos.wellnessForest,
        topicPhotos.wellnessRiceFields,
        topicPhotos.natureRainforest,
        topicPhotos.natureLake,
      ]);
    }
    if (includesAny(topic, ["ubud", "bali", "rice", "sound bath", "yoga", "pilates", "breathwork", "art"])) {
      return photoSet([
        topicPhotos.wellnessYoga,
        topicPhotos.wellnessRiceFields,
        topicPhotos.wellnessForest,
        topicPhotos.cultureUbudTemple,
      ]);
    }
    if (topic.includes("cenote")) {
      return photoSet([
        topicPhotos.adventureCove,
        topicPhotos.wellnessCoastal,
        topicPhotos.natureLake,
      ]);
    }
    if (includesAny(topic, ["coastal", "sea", "sunset", "tidal", "tulum", "paros", "santorini"])) {
      return photoSet([
        topicPhotos.wellnessCoastal,
        topicPhotos.adventureCove,
        topicPhotos.wellnessYoga,
        topicPhotos.natureLake,
      ]);
    }

    return photoSet([
      topicPhotos.wellnessYoga,
      topicPhotos.wellnessForest,
      topicPhotos.wellnessCoastal,
      topicPhotos.wellnessSpa,
    ]);
  }

  if (includesAny(topic, ["amazon", "river"])) {
    return photoSet([
      topicPhotos.natureAmazon,
      topicPhotos.natureRainforest,
      topicPhotos.natureOrangutan,
      topicPhotos.adventureWaterfall,
    ]);
  }
  if (includesAny(topic, ["glacier", "patagonia"])) {
    return photoSet([
      topicPhotos.natureGlacier,
      topicPhotos.adventureSnowFjord,
      topicPhotos.natureLake,
      topicPhotos.natureAurora,
    ]);
  }
  if (includesAny(topic, ["safari", "wildlife", "serengeti"])) {
    return photoSet([
      topicPhotos.natureSafari,
    ]);
  }
  if (includesAny(topic, ["banff", "lake", "jasper", "rockies"])) {
    return photoSet([
      topicPhotos.natureLake,
      topicPhotos.natureFjord,
      topicPhotos.adventureGlacier,
      topicPhotos.adventureDolomites,
    ]);
  }
  if (includesAny(topic, ["reef", "snorkel", "galapagos"])) {
    return photoSet([
      topicPhotos.natureReef,
      topicPhotos.natureIsland,
      topicPhotos.adventureCove,
      topicPhotos.wellnessCoastal,
    ]);
  }
  if (includesAny(topic, ["geyser", "yellowstone"])) {
    return photoSet([
      topicPhotos.natureGeyser,
      topicPhotos.natureLake,
      topicPhotos.natureWaterfall,
    ]);
  }
  if (includesAny(topic, ["orangutan", "borneo"])) {
    return photoSet([
      topicPhotos.natureOrangutan,
      topicPhotos.natureRainforest,
      topicPhotos.adventureForest,
      topicPhotos.natureAmazon,
    ]);
  }
  if (includesAny(topic, ["aurora", "night"])) {
    return photoSet([
      topicPhotos.natureAurora,
      topicPhotos.adventureSnowFjord,
      topicPhotos.natureStargazing,
      topicPhotos.natureFjord,
    ]);
  }
  if (includesAny(topic, ["birding", "rainforest", "madeira", "levada"])) {
    return photoSet([
      topicPhotos.natureRainforest,
      topicPhotos.wellnessForest,
      topicPhotos.adventureForest,
      topicPhotos.natureWaterfall,
    ]);
  }
  if (includesAny(topic, ["plitvice", "waterfall", "iceland waterfall"])) {
    return photoSet([
      topicPhotos.natureWaterfall,
      topicPhotos.adventureWaterfall,
      topicPhotos.natureLake,
      topicPhotos.adventureGlacier,
    ]);
  }
  if (includesAny(topic, ["komodo"])) {
    return photoSet([
      topicPhotos.natureKomodo,
      topicPhotos.natureIsland,
      topicPhotos.natureReef,
      topicPhotos.adventureCove,
    ]);
  }
  if (includesAny(topic, ["highlands", "glen", "cappadocia"])) {
    return photoSet([
      topic.includes("cappadocia")
        ? topicPhotos.natureCappadocia
        : topicPhotos.natureFjord,
      topicPhotos.natureLake,
      topicPhotos.natureStargazing,
    ]);
  }
  if (includesAny(topic, ["yosemite"])) {
    return photoSet([
      topicPhotos.natureWaterfall,
      topicPhotos.natureLake,
      topicPhotos.adventureTableMountain,
      topicPhotos.adventureGlacier,
    ]);
  }
  if (includesAny(topic, ["tea hills", "sri lanka", "ella"])) {
    return photoSet([
      topicPhotos.natureTeaHills,
      topicPhotos.wellnessRiceFields,
      topicPhotos.natureRainforest,
      topicPhotos.wellnessForest,
    ]);
  }
  if (includesAny(topic, ["stargazing", "atacama"])) {
    return photoSet([
      topicPhotos.natureStargazing,
      topicPhotos.adventureDesert,
      topicPhotos.cultureAstronomy,
      topicPhotos.natureAurora,
    ]);
  }

  return photoSet([
    topicPhotos.natureLake,
    topicPhotos.natureRainforest,
    topicPhotos.adventureWaterfall,
    topicPhotos.natureFjord,
  ]);
}

const rawExperiences = [
  {
    id: "exp-001",
    title: "Kayak & Cave Tour",
    description:
      "Paddle through emerald water, quiet lagoons, and limestone caves with a local guide who knows the calmest hidden routes.",
    category: "Adventure",
    destination: "Ha Long Bay, Vietnam",
    price: 99,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-002",
    title: "Glacier Hike Expedition",
    description:
      "Strap on crampons for a guided glacier walk across blue ice, volcanic ridges, and sweeping Icelandic views.",
    category: "Adventure",
    destination: "Reykjavik, Iceland",
    price: 145,
    rating: 4.9,
    imageUrl: "",
  },
  {
    id: "exp-003",
    title: "Volcano Ridge Trek",
    description:
      "Follow black-sand trails up a dramatic volcano ridge before settling in for a golden sunset over the highlands.",
    category: "Adventure",
    destination: "Antigua, Guatemala",
    price: 86,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-004",
    title: "Dalmatian Island Sailing Day",
    description:
      "Sail between quiet coves, swim from the deck, and explore stone harbor towns along Croatia's island coast.",
    category: "Adventure",
    destination: "Dubrovnik, Croatia",
    price: 132,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-005",
    title: "Desert Dune Buggy Ride",
    description:
      "Ride rolling dunes in a small convoy, pause for desert photos, and watch the skyline glow at dusk.",
    category: "Adventure",
    destination: "Dubai, UAE",
    price: 118,
    rating: 4.6,
    imageUrl: "",
  },
  {
    id: "exp-006",
    title: "Cloud Forest Zipline",
    description:
      "Glide above misty treetops and hanging bridges in one of Costa Rica's most biodiverse cloud forests.",
    category: "Adventure",
    destination: "Monteverde, Costa Rica",
    price: 74,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-007",
    title: "Alpine Paragliding Flight",
    description:
      "Launch from a mountain meadow for a tandem flight over turquoise lakes, chalets, and snowy peaks.",
    category: "Adventure",
    destination: "Interlaken, Switzerland",
    price: 198,
    rating: 4.9,
    imageUrl: "",
  },
  {
    id: "exp-008",
    title: "Canyon Rafting Run",
    description:
      "Navigate cold-water rapids through a rugged canyon with expert river guides and calm scenic stretches.",
    category: "Adventure",
    destination: "Queenstown, New Zealand",
    price: 121,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-009",
    title: "Sunrise Surf Safari",
    description:
      "Catch beginner-friendly Atlantic waves, learn board control, and warm up with mint tea by the beach.",
    category: "Adventure",
    destination: "Taghazout, Morocco",
    price: 64,
    rating: 4.6,
    imageUrl: "",
  },
  {
    id: "exp-010",
    title: "Red Rock E-Bike Loop",
    description:
      "Cruise quiet desert trails on an e-bike with stops for canyon overlooks and local geology stories.",
    category: "Adventure",
    destination: "Sedona, USA",
    price: 89,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-011",
    title: "Midnight Sun Sea Kayak",
    description:
      "Paddle glassy Arctic water beneath long evening light, with time to spot seabirds and quiet fishing villages.",
    category: "Adventure",
    destination: "Tromso, Norway",
    price: 156,
    rating: 4.9,
    imageUrl: "",
  },
  {
    id: "exp-012",
    title: "Andes Mountain Bike Descent",
    description:
      "Descend from highland viewpoints through Inca paths, eucalyptus groves, and rural valley roads.",
    category: "Adventure",
    destination: "Cusco, Peru",
    price: 104,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-013",
    title: "Rainforest Waterfall Canyoning",
    description:
      "Rappel beside lush waterfalls, float through natural pools, and follow jungle trails with a safety-focused guide.",
    category: "Adventure",
    destination: "Bali, Indonesia",
    price: 92,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-014",
    title: "Table Mountain Climb",
    description:
      "Take a guided route up Table Mountain with panoramic pauses above the city, sea, and rugged cliffs.",
    category: "Adventure",
    destination: "Cape Town, South Africa",
    price: 78,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-015",
    title: "Arctic Fjord Snowshoe Walk",
    description:
      "Walk soft snow above steep fjords, warm up with cocoa, and learn how locals read winter weather.",
    category: "Adventure",
    destination: "Lofoten, Norway",
    price: 112,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-016",
    title: "Blue Cave Paddle",
    description:
      "Kayak to glowing sea caves and hidden swim spots along a coast shaped by limestone and bright Adriatic light.",
    category: "Adventure",
    destination: "Split, Croatia",
    price: 88,
    rating: 4.6,
    imageUrl: "",
  },
  {
    id: "exp-017",
    title: "Sahara Camp Trek",
    description:
      "Walk a camel trail through quiet dunes before arriving at a lantern-lit desert camp for dinner and stars.",
    category: "Adventure",
    destination: "Marrakech, Morocco",
    price: 129,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-018",
    title: "Jungle Canopy Walk",
    description:
      "Cross treetop bridges, trace old forest paths, and listen for birds above a green northern Thai valley.",
    category: "Adventure",
    destination: "Chiang Mai, Thailand",
    price: 68,
    rating: 4.6,
    imageUrl: "",
  },
  {
    id: "exp-019",
    title: "Fjord RIB Boat Adventure",
    description:
      "Speed through steep-sided fjords, slow near waterfalls, and hear stories from a captain raised on the coast.",
    category: "Adventure",
    destination: "Bergen, Norway",
    price: 138,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-020",
    title: "Dolomite Via Ferrata Intro",
    description:
      "Clip into a beginner-friendly mountain route with dramatic ledges, alpine flowers, and expert instruction.",
    category: "Adventure",
    destination: "Cortina d'Ampezzo, Italy",
    price: 149,
    rating: 4.9,
    imageUrl: "",
  },
  {
    id: "exp-021",
    title: "Kyoto Tea Ceremony",
    description:
      "Step into a quiet machiya for a guided tea ritual focused on seasonal sweets, matcha, and graceful tradition.",
    category: "Culture",
    destination: "Kyoto, Japan",
    price: 58,
    rating: 4.9,
    imageUrl: "",
  },
  {
    id: "exp-022",
    title: "Hidden Rome Artisan Walk",
    description:
      "Meet mosaic makers, paper marblers, and family-run workshops tucked behind the city's busiest piazzas.",
    category: "Culture",
    destination: "Rome, Italy",
    price: 72,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-023",
    title: "Acropolis Mythology Morning",
    description:
      "Walk the ancient hill before the crowds while a storyteller connects temples, myths, and Athenian daily life.",
    category: "Culture",
    destination: "Athens, Greece",
    price: 65,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-024",
    title: "Marrakech Souk Stories",
    description:
      "Navigate fragrant spice lanes and craft stalls with a local host who shares the rhythms of market life.",
    category: "Culture",
    destination: "Marrakech, Morocco",
    price: 54,
    rating: 4.6,
    imageUrl: "",
  },
  {
    id: "exp-025",
    title: "Istanbul Two-Continents Walk",
    description:
      "Cross ferries, neighborhoods, and centuries of architecture while tracing the city from Europe to Asia.",
    category: "Culture",
    destination: "Istanbul, Turkey",
    price: 61,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-026",
    title: "Mexico City Mural Route",
    description:
      "Explore bold public art, revolutionary history, and neighborhood murals with an artist-led perspective.",
    category: "Culture",
    destination: "Mexico City, Mexico",
    price: 49,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-027",
    title: "Cairo Old City Heritage Walk",
    description:
      "Visit historic lanes, mosque courtyards, and bazaar corners while learning how the city grew along the Nile.",
    category: "Culture",
    destination: "Cairo, Egypt",
    price: 57,
    rating: 4.6,
    imageUrl: "",
  },
  {
    id: "exp-028",
    title: "Ubud Temple and Craft Trail",
    description:
      "Spend a gentle day with temple etiquette, woodcarving studios, and family compounds in Bali's cultural heart.",
    category: "Culture",
    destination: "Ubud, Indonesia",
    price: 63,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-029",
    title: "Lisbon Tile Studio Visit",
    description:
      "Paint a traditional azulejo tile and learn how ceramic facades became part of Lisbon's visual language.",
    category: "Culture",
    destination: "Lisbon, Portugal",
    price: 52,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-030",
    title: "Paris Left Bank Literature Walk",
    description:
      "Follow cafe tables, bookshops, and hidden courtyards tied to writers, artists, and restless Parisian ideas.",
    category: "Culture",
    destination: "Paris, France",
    price: 69,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-031",
    title: "Cusco Inca Astronomy Night",
    description:
      "Pair Andean sky stories with ancient stonework and a guide who explains how stars shaped local rituals.",
    category: "Culture",
    destination: "Cusco, Peru",
    price: 76,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-032",
    title: "Prague Old Town After Dark",
    description:
      "Discover medieval lanes, quiet courtyards, and legends that unfold best after the day crowds fade.",
    category: "Culture",
    destination: "Prague, Czech Republic",
    price: 48,
    rating: 4.6,
    imageUrl: "",
  },
  {
    id: "exp-033",
    title: "Buenos Aires Tango Salon",
    description:
      "Learn basic steps, hear the music's neighborhood roots, and watch a live salon set with local dancers.",
    category: "Culture",
    destination: "Buenos Aires, Argentina",
    price: 67,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-034",
    title: "Seoul Hanok Neighborhood Walk",
    description:
      "Move through tiled roofs, design shops, and palace views while connecting old Seoul with its modern pulse.",
    category: "Culture",
    destination: "Seoul, South Korea",
    price: 55,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-035",
    title: "Tokyo Neon Night Photography",
    description:
      "Capture reflections, lanterns, and side-street portraits with a photographer who teaches clean city framing.",
    category: "Culture",
    destination: "Tokyo, Japan",
    price: 82,
    rating: 4.9,
    imageUrl: "",
  },
  {
    id: "exp-036",
    title: "Barcelona Gaudi Design Walk",
    description:
      "Trace color, curve, and craft through Barcelona's modernist icons and lesser-known neighborhood details.",
    category: "Culture",
    destination: "Barcelona, Spain",
    price: 64,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-037",
    title: "Hanoi Old Quarter Traditions",
    description:
      "Walk narrow guild streets, family shops, and temple corners while tasting the city's layered daily routines.",
    category: "Culture",
    destination: "Hanoi, Vietnam",
    price: 43,
    rating: 4.6,
    imageUrl: "",
  },
  {
    id: "exp-038",
    title: "Jaipur Block Print Workshop",
    description:
      "Stamp textiles with hand-carved blocks and learn how color, cotton, and craft families shape Jaipur design.",
    category: "Culture",
    destination: "Jaipur, India",
    price: 59,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-039",
    title: "New Orleans Jazz Origins Walk",
    description:
      "Follow brass bands, courtyard stories, and neighborhood music history from Congo Square to Frenchmen Street.",
    category: "Culture",
    destination: "New Orleans, USA",
    price: 51,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-040",
    title: "Oaxaca Textile Village Visit",
    description:
      "Visit a weaving family, see natural dyes in action, and understand the patterns woven into Zapotec textiles.",
    category: "Culture",
    destination: "Oaxaca, Mexico",
    price: 62,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-041",
    title: "Bangkok Street Food Crawl",
    description:
      "Taste smoky noodles, crispy snacks, tropical fruit, and late-night favorites across a lively neighborhood route.",
    category: "Food",
    destination: "Bangkok, Thailand",
    price: 46,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-042",
    title: "Naples Pizza Atelier",
    description:
      "Work dough by hand, learn wood-fired technique, and eat a classic pizza where the style was born.",
    category: "Food",
    destination: "Naples, Italy",
    price: 71,
    rating: 4.9,
    imageUrl: "",
  },
  {
    id: "exp-043",
    title: "Lima Ceviche Counter",
    description:
      "Shop a neighborhood market, slice fresh fish, and balance citrus, chile, and herbs with a Peruvian cook.",
    category: "Food",
    destination: "Lima, Peru",
    price: 68,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-044",
    title: "Barcelona Tapas Table",
    description:
      "Hop between tucked-away bars for vermouth, seafood bites, and the small plates locals order after work.",
    category: "Food",
    destination: "Barcelona, Spain",
    price: 73,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-045",
    title: "Istanbul Spice Kitchen",
    description:
      "Blend warm spices, roll stuffed leaves, and prepare a home-style meal after shopping the market lanes.",
    category: "Food",
    destination: "Istanbul, Turkey",
    price: 66,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-046",
    title: "Tokyo Ramen Lab",
    description:
      "Build broth, noodles, tare, and toppings with a chef who explains the craft behind a perfect bowl.",
    category: "Food",
    destination: "Tokyo, Japan",
    price: 84,
    rating: 4.9,
    imageUrl: "",
  },
  {
    id: "exp-047",
    title: "Porto Cellar Tasting",
    description:
      "Walk riverside cellars, taste reserve pours, and learn how Douro grapes become the city's signature wine.",
    category: "Food",
    destination: "Porto, Portugal",
    price: 58,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-048",
    title: "Marrakech Tagine Class",
    description:
      "Shop for olives, preserved lemon, and spices before slow-cooking a fragrant tagine in a courtyard kitchen.",
    category: "Food",
    destination: "Marrakech, Morocco",
    price: 57,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-049",
    title: "Oaxaca Mole Workshop",
    description:
      "Toast chiles, grind spices, and simmer a rich mole while hearing family stories behind the recipe.",
    category: "Food",
    destination: "Oaxaca, Mexico",
    price: 63,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-050",
    title: "Hoi An Market Lunch",
    description:
      "Follow a lantern-lit market trail, gather herbs and noodles, and cook central Vietnamese classics by the river.",
    category: "Food",
    destination: "Hoi An, Vietnam",
    price: 45,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-051",
    title: "Paris Pastry Morning",
    description:
      "Laminate dough, pipe cream, and taste warm pastries in a small studio led by a patient Parisian baker.",
    category: "Food",
    destination: "Paris, France",
    price: 96,
    rating: 4.9,
    imageUrl: "",
  },
  {
    id: "exp-052",
    title: "Mexico City Taco Route",
    description:
      "Compare al pastor, guisados, and late-night stands with a local who knows which salsa belongs where.",
    category: "Food",
    destination: "Mexico City, Mexico",
    price: 44,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-053",
    title: "Rome Fresh Pasta Studio",
    description:
      "Roll, shape, and sauce fresh pasta in a bright kitchen before sitting down for a relaxed shared lunch.",
    category: "Food",
    destination: "Rome, Italy",
    price: 78,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-054",
    title: "Athens Meze and Market Walk",
    description:
      "Taste olives, cheeses, grilled bites, and bakery staples while moving through markets and family tavernas.",
    category: "Food",
    destination: "Athens, Greece",
    price: 59,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-055",
    title: "Cape Town Vineyard Picnic",
    description:
      "Pair crisp wines with local cheeses and seasonal dishes in a valley framed by mountain views.",
    category: "Food",
    destination: "Cape Town, South Africa",
    price: 92,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-056",
    title: "Singapore Hawker Icons",
    description:
      "Navigate a beloved food center for chicken rice, laksa, satay, and the stories behind each stall.",
    category: "Food",
    destination: "Singapore, Singapore",
    price: 52,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-057",
    title: "Chiang Mai Curry Class",
    description:
      "Pound curry paste, pick herbs from a garden, and cook northern Thai dishes in a relaxed home kitchen.",
    category: "Food",
    destination: "Chiang Mai, Thailand",
    price: 49,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-058",
    title: "Lisbon Seafood Lunch Trail",
    description:
      "Taste grilled sardines, clams, and custard tarts while wandering harbor streets and tiled cafes.",
    category: "Food",
    destination: "Lisbon, Portugal",
    price: 69,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-059",
    title: "Kyoto Seasonal Sweets Class",
    description:
      "Shape delicate wagashi sweets and pair them with matcha in a calm workshop guided by seasonal themes.",
    category: "Food",
    destination: "Kyoto, Japan",
    price: 61,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-060",
    title: "Buenos Aires Asado Evening",
    description:
      "Gather around the grill for slow-cooked cuts, chimichurri, Malbec, and the social rhythm of an asado.",
    category: "Food",
    destination: "Buenos Aires, Argentina",
    price: 88,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-061",
    title: "Ubud Morning Yoga Flow",
    description:
      "Start the day with breath-led movement in a quiet open-air studio surrounded by rice fields and palms.",
    category: "Wellness",
    destination: "Ubud, Indonesia",
    price: 38,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-062",
    title: "Sedona Mindfulness Hike",
    description:
      "Blend easy desert walking, quiet overlooks, and guided reflection in Sedona's red-rock landscape.",
    category: "Wellness",
    destination: "Sedona, USA",
    price: 62,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-063",
    title: "Reykjavik Lagoon Reset",
    description:
      "Soak in mineral-rich warm water, move through steam rooms, and slow down after a day of exploring.",
    category: "Wellness",
    destination: "Reykjavik, Iceland",
    price: 104,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-064",
    title: "Kyoto Forest Meditation",
    description:
      "Walk mossy paths in silence, practice simple meditation, and reconnect with nature near temple gardens.",
    category: "Wellness",
    destination: "Kyoto, Japan",
    price: 55,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-065",
    title: "Tulum Cenote Reset",
    description:
      "Swim in clear cenote water, journal under palms, and follow a gentle breath practice with a local guide.",
    category: "Wellness",
    destination: "Tulum, Mexico",
    price: 74,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-066",
    title: "Bali Sound Bath Evening",
    description:
      "Settle into a candlelit studio for restorative sound, gentle stretching, and a calm closing tea.",
    category: "Wellness",
    destination: "Bali, Indonesia",
    price: 42,
    rating: 4.6,
    imageUrl: "",
  },
  {
    id: "exp-067",
    title: "Chiang Mai Thai Massage Intro",
    description:
      "Learn the basics of Thai bodywork, pressure points, and stretching in a respectful beginner workshop.",
    category: "Wellness",
    destination: "Chiang Mai, Thailand",
    price: 47,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-068",
    title: "Lisbon Coastal Breath Walk",
    description:
      "Follow ocean paths outside the city with mindful breathing, quiet pauses, and a simple picnic by the cliffs.",
    category: "Wellness",
    destination: "Lisbon, Portugal",
    price: 58,
    rating: 4.6,
    imageUrl: "",
  },
  {
    id: "exp-069",
    title: "Santorini Sunset Yoga",
    description:
      "Move through an all-levels sequence on a quiet terrace as the caldera softens into evening color.",
    category: "Wellness",
    destination: "Santorini, Greece",
    price: 69,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-070",
    title: "Marrakech Hammam Ritual",
    description:
      "Experience a traditional hammam sequence with black soap, warm stone rooms, and a restorative mint tea finish.",
    category: "Wellness",
    destination: "Marrakech, Morocco",
    price: 64,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-071",
    title: "Swiss Alpine Spa Day",
    description:
      "Unwind between saunas, mountain pools, and quiet relaxation rooms overlooking crisp alpine scenery.",
    category: "Wellness",
    destination: "Interlaken, Switzerland",
    price: 126,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-072",
    title: "Rainforest Renewal Retreat",
    description:
      "Spend a restorative half-day with gentle movement, fresh fruit, and a guided nature practice by the river.",
    category: "Wellness",
    destination: "Monteverde, Costa Rica",
    price: 83,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-073",
    title: "Pokhara Sunrise Meditation",
    description:
      "Watch first light reach the Himalayas before a simple guided meditation and warm local tea.",
    category: "Wellness",
    destination: "Pokhara, Nepal",
    price: 39,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-074",
    title: "Cappadocia Gentle Yoga",
    description:
      "Practice slow movement above pale valleys and cave homes before a nourishing Turkish breakfast.",
    category: "Wellness",
    destination: "Goreme, Turkey",
    price: 57,
    rating: 4.6,
    imageUrl: "",
  },
  {
    id: "exp-075",
    title: "Queenstown Lakeside Sauna",
    description:
      "Alternate a warm cedar sauna with cold lake dips and sweeping mountain views in a calm small group.",
    category: "Wellness",
    destination: "Queenstown, New Zealand",
    price: 79,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-076",
    title: "Tokyo Onsen Etiquette Visit",
    description:
      "Learn onsen customs, unwind in mineral baths, and enjoy a quiet tea stop in a historic neighborhood.",
    category: "Wellness",
    destination: "Tokyo, Japan",
    price: 72,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-077",
    title: "Paros Pilates by the Sea",
    description:
      "Build strength through a measured mat class beside clear water, followed by fruit and an easy swim.",
    category: "Wellness",
    destination: "Paros, Greece",
    price: 53,
    rating: 4.6,
    imageUrl: "",
  },
  {
    id: "exp-078",
    title: "Cape Town Tidal Pool Morning",
    description:
      "Ease into the day with ocean breathing, a cool tidal pool swim, and coffee along the peninsula.",
    category: "Wellness",
    destination: "Cape Town, South Africa",
    price: 48,
    rating: 4.6,
    imageUrl: "",
  },
  {
    id: "exp-079",
    title: "Provence Lavender Rest Day",
    description:
      "Walk fragrant lanes, practice light stretching, and enjoy a picnic designed around slow seasonal living.",
    category: "Wellness",
    destination: "Provence, France",
    price: 81,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-080",
    title: "Santa Fe Art and Breathwork",
    description:
      "Pair gallery wandering with a grounding breath session inspired by desert color and open skies.",
    category: "Wellness",
    destination: "Santa Fe, USA",
    price: 67,
    rating: 4.6,
    imageUrl: "",
  },
  {
    id: "exp-081",
    title: "Amazon River Wildlife Cruise",
    description:
      "Drift along narrow tributaries to spot birds, river life, and towering trees with a naturalist guide.",
    category: "Nature",
    destination: "Iquitos, Peru",
    price: 148,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-082",
    title: "Patagonia Glacier Viewpoint",
    description:
      "Walk wind-carved paths to a blue glacier viewpoint, with time for photos and local ecology stories.",
    category: "Nature",
    destination: "El Calafate, Argentina",
    price: 137,
    rating: 4.9,
    imageUrl: "",
  },
  {
    id: "exp-083",
    title: "Serengeti Dawn Safari",
    description:
      "Start before sunrise for golden grasslands, wildlife tracking, and quiet observation from an open vehicle.",
    category: "Nature",
    destination: "Serengeti, Tanzania",
    price: 220,
    rating: 4.9,
    imageUrl: "",
  },
  {
    id: "exp-084",
    title: "Banff Lake Photography Walk",
    description:
      "Frame turquoise lakes, pine forests, and mountain reflections with a guide who teaches simple composition.",
    category: "Nature",
    destination: "Banff, Canada",
    price: 92,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-085",
    title: "Galapagos Island Nature Walk",
    description:
      "Observe unique coastal wildlife, volcanic trails, and conservation stories with a certified island naturalist.",
    category: "Nature",
    destination: "Santa Cruz, Ecuador",
    price: 184,
    rating: 4.9,
    imageUrl: "",
  },
  {
    id: "exp-086",
    title: "Yellowstone Geyser Trail",
    description:
      "Follow boardwalks past steaming pools and geysers while learning how the park's thermal features form.",
    category: "Nature",
    destination: "Yellowstone, USA",
    price: 88,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-087",
    title: "Borneo Orangutan Rainforest",
    description:
      "Move quietly through protected forest habitat with a conservation guide focused on respectful wildlife viewing.",
    category: "Nature",
    destination: "Sepilok, Malaysia",
    price: 118,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-088",
    title: "Great Barrier Reef Snorkel",
    description:
      "Snorkel coral gardens with marine guides who point out reef life and explain conservation basics.",
    category: "Nature",
    destination: "Cairns, Australia",
    price: 165,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-089",
    title: "Norwegian Aurora Chase",
    description:
      "Head away from city lights with a guide who reads cloud breaks and helps photograph the northern lights.",
    category: "Nature",
    destination: "Tromso, Norway",
    price: 141,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-090",
    title: "Costa Rica Birding Morning",
    description:
      "Listen for calls, spot bright feathers, and learn field-guide basics along quiet cloud forest paths.",
    category: "Nature",
    destination: "Monteverde, Costa Rica",
    price: 72,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-091",
    title: "Plitvice Lakes Boardwalk",
    description:
      "Walk wooden paths past clear pools and falling water while learning how travertine shapes the lakes.",
    category: "Nature",
    destination: "Plitvice, Croatia",
    price: 96,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-092",
    title: "Madeira Levada Walk",
    description:
      "Follow historic water channels through laurel forest, viewpoints, and fern-lined mountain paths.",
    category: "Nature",
    destination: "Madeira, Portugal",
    price: 74,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-093",
    title: "Komodo Island Ranger Walk",
    description:
      "Explore dry island trails with park rangers while learning about Komodo dragons and fragile habitats.",
    category: "Nature",
    destination: "Labuan Bajo, Indonesia",
    price: 176,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-094",
    title: "Scottish Highlands Glen Walk",
    description:
      "Trace quiet glens, heather slopes, and loch viewpoints while hearing geology and folklore along the way.",
    category: "Nature",
    destination: "Inverness, Scotland",
    price: 89,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-095",
    title: "Yosemite Valley Naturalist Walk",
    description:
      "Look up at granite walls, waterfalls, and meadow ecosystems with a guide focused on park stewardship.",
    category: "Nature",
    destination: "Yosemite, USA",
    price: 84,
    rating: 4.8,
    imageUrl: "",
  },
  {
    id: "exp-096",
    title: "Canadian Rockies Wildlife Drive",
    description:
      "Search for mountain wildlife from scenic pullouts while learning how to observe animals at a safe distance.",
    category: "Nature",
    destination: "Jasper, Canada",
    price: 108,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-097",
    title: "Cappadocia Valley Nature Walk",
    description:
      "Walk soft volcanic valleys, cave homes, and quiet overlooks shaped by wind, ash, and centuries of settlement.",
    category: "Nature",
    destination: "Goreme, Turkey",
    price: 63,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-098",
    title: "Sri Lanka Tea Hills Trail",
    description:
      "Walk green tea terraces, meet growers, and pause for tastings above misty highland valleys.",
    category: "Nature",
    destination: "Ella, Sri Lanka",
    price: 58,
    rating: 4.7,
    imageUrl: "",
  },
  {
    id: "exp-099",
    title: "Atacama Stargazing Night",
    description:
      "Watch desert skies through telescopes while an astronomer explains constellations, planets, and deep space.",
    category: "Nature",
    destination: "San Pedro de Atacama, Chile",
    price: 97,
    rating: 4.9,
    imageUrl: "",
  },
  {
    id: "exp-100",
    title: "Iceland Waterfall Trail",
    description:
      "Follow a south coast route of misty waterfalls, basalt cliffs, and wide-open landscapes with a local guide.",
    category: "Nature",
    destination: "Vik, Iceland",
    price: 115,
    rating: 4.8,
    imageUrl: "",
  },
] satisfies RawExperience[];

export const experiences: Experience[] = rawExperiences.map((experience) => {
  const [coverPhoto, ...galleryPhotos] = getExperienceGallery(experience);

  return {
    ...experience,
    imageUrl: scopedPhoto(coverPhoto, `${experience.id}-card`, 1600),
    detailImageUrl: scopedPhoto(coverPhoto, `${experience.id}-detail`, 1800),
    galleryImageUrls: galleryPhotos.slice(0, 4).map((photo, index) =>
      scopedPhoto(photo, `${experience.id}-gallery-${index + 1}`, 1200),
    ),
  };
});
