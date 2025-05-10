export type TilesProps = Array<{
  title: string;
  category: string;
  h1: string;
  logo: string;
  'logo-alt': string;
  'main-image': string;
  'main-image-zoom': {
    scale: number;
    translateX: number;
    translateY: number;
  };
  'main-image-zoom-start': {
    scale: number;
    translateX: number;
    translateY: number;
  };
  'right-title': string;
  'right-description': string;
  'right-button-text': string;
  'right-button-href': string;
}>;
