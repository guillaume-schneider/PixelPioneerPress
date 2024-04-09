export interface Game {
  id: number;
  title: string;
  developer: string;
  genres: string[];
  description: string;
  image: string;
  linux_requirement: string;
  mac_requirement: string;
  negative_rating: number;
  pc_requirement: string;
  positive_rating: number;
  publisher: string;
  ratio_rating: number;
  release_date: string;
  short_description: string;
}
