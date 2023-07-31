interface ItemsTyping {
  title: string;
  price: number;
  id: string;
  imageUrl: string;
  selectType: number;
  selectSize: number;
  count: number;
}

interface CartSliceTyping {
  totalPrice: number;
  items: ItemsTyping[];
}
