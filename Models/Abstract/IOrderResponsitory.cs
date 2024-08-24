public interface IOrderResponsitory
{
    IEnumerable<Order> totalMoneyProductInCart(int userID);
    IEnumerable<Order> getOrderByID(int userID);
    IEnumerable<Order> getOrdersByUserIDWaitSettlement(int userID);
    IEnumerable<OrderDetail> getProductsOrderByUserIDWaitSettlement(int userID);
    IEnumerable<OrderDetail> getProductsOrderByUserID(int userID);
    bool inserOrder(int userID, double totalPrice, int orderStatusID, int paymentID);
    bool inserOrderDetail(int orderID, int productID, int quantity, double unitPrice, double money);
}