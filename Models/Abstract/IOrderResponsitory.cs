public interface IOrderResponsitory
{
    IEnumerable<Order> totalMoneyProductInCart(int userID);
    IEnumerable<Order> getOrderByID(int userID, int shopID);
    IEnumerable<Order> getOrdersByUserIDWaitSettlement(int userID);
    IEnumerable<Order> getOrderWaitSettlementByOrderID(int orderID);
    IEnumerable<Order> getOrderWaitSettlementByShopID(int shopID);
    IEnumerable<Order> getOrderWaitPickupByShopID(int shopID);
    IEnumerable<OrderDetail> getProductsOrderByUserIDWaitSettlement(int userID);
    IEnumerable<OrderDetail> getProductsOrderByUserID(int userID);
    IEnumerable<OrderDetail> getOrderDetailWaitSettlementByOrderID(int orderID);
    bool confirmOrderAboutPickup(int orderID, int userID);
    bool inserOrder(int userID, int shopID, double totalPrice, int orderStatusID, int paymentID);
    bool inserOrderDetail(int orderID, int productID, int quantity, double unitPrice, double money);
}