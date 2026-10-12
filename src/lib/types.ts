export interface Photo {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
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
