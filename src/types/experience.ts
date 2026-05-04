// Shared catalog shape used by cards, filters, detail pages, and profile/favorites views.
export interface Experience {
  // Stable id is used for routes, React keys, and favorites storage.
  id: string;
  // Title/description are the main user-facing content on cards and detail pages.
  title: string;
  description: string;
  // Category powers filter options and category-specific photo matching.
  category: "Adventure" | "Culture" | "Food" | "Wellness" | "Nature";
  // Destination is displayed directly and used by the destination filter.
  destination: string;
  // Price and rating are mock marketplace comparison signals.
  price: number;
  rating: number;
  // Image fields are generated in data/experiences.ts from the photo topic library.
  imageUrl: string;
  detailImageUrl: string;
  galleryImageUrls: string[];
}
