import { Card, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemsProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItems({ id, name, price, imgUrl }: StoreItemsProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  // Componente com os produtos
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover", width: "140px", marginLeft: "142px" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-space-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>

        <div className="mt-auto">
          {quantity === 0 ? (
            <Button onClick={() => increaseCartQuantity(id)} className="w-100">
              + Adicionar ao carrinho
            </Button>
          ) : (
            <>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <span className="fs-3">{quantity}</span>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: ".5rem" }}
                >
                  <Button
                    onClick={() => removeFromCart(id)}
                    variant="danger"
                    size="sm"
                    style={{ height: "38px" }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
