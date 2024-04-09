export class User {
  id: string;
  username: string;
  email: string;
  wishlist: string[];

  constructor(id: string, username: string, email: string, wishlist: string[]) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.wishlist = wishlist;
  }
}
