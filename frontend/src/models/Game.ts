export class Game {
  id: string;
  name: string;
  description: string;
  genre: string;
  platform: string;

  constructor(id: string, name: string, description: string, genre: string, platform: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.genre = genre;
    this.platform = platform;
  }
}
