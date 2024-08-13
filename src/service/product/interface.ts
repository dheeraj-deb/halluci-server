type Variations = {
  color:string,
  size:string,
  image?:string
}


export interface AddProductInput {
  name: string;
  id?:string
  description: string;
  category: string;
  price: number;
  image?: string;
  stock:number;
  variations: Variations[];
}
