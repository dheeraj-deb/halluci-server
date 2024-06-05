export interface AddProductInput {
  name: string;
  id?:string
  description: string;
  category: string;
  price: number;
  image: string;
  variations: {
    color: string;
  }[];
}
