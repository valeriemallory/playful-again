export interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  // Optional photographer credit, shown below the photo in the Lightbox (not in the grid).
  // Credited photos also skip the Lightbox's "© Valerie Mallory Art" watermark.
  // `creditUrl` (optional) turns the credit into a link that opens in a new tab.
  credit?: string;
  creditUrl?: string;
}

export interface PhotoCell extends Photo {
  displayWidth: number;
  displayHeight: number;
}

export interface GalleryRow {
  photos: PhotoCell[];
  isLast: boolean;
}

export interface PortfolioSection {
  title: string;
  href: string;
  imageSrc: string;
  description?: string;
}

// One image in a HighlightImages layout. `srcSm`/`widthSm`/`heightSm` are an
// optional smaller (usually square) version shown on phones in portrait.
export interface HighlightImage extends Photo {
  srcSm?: string;
  widthSm?: number;
  heightSm?: number;
}
