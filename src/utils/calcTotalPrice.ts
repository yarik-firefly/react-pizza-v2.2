import { ItemTyping } from "../components/Cart/CartItem";

const calcTotalPrice = (items: ItemTyping[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};

export default calcTotalPrice;
