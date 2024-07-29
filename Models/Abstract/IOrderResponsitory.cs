public interface IOrderResponsitory
{
    IEnumerable<Order> totalMoneyProductInCart(int userID);
    IEnumerable<Order> getOrderByID(int userID);
    bool inserOrder(int userID, double totalPrice, int orderStatusID, int paymentID);
    bool inserOrderDetail(int orderID, int productID, int quantity, double unitPrice);
}