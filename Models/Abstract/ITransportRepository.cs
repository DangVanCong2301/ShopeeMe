public interface ITransportRepository
{
    public IEnumerable<Order> getOrdersWaitPickup();
    public IEnumerable<Order> getOrderWaitPickingUp();
    public IEnumerable<OrderDetail> getOrderDetailWaitPickupByOrderID(int orderID);
    public IEnumerable<OrderDetail> getOrderDetailPickingUpByOrderID(int orderID);
    public IEnumerable<SellerInfo> getSellerInfoByOrderID(int orderID);
    public IEnumerable<Payment> getPaymentsTypeByOrderID(int orderID);
    public IEnumerable<Order> getOrderWaitPickupByShippingOrderID(int shippingOrderID);
    public bool insertShippingPicker(int shippingOrderID, int userID);
    public bool confirmOrderAboutPickingUp(int orderID);
}