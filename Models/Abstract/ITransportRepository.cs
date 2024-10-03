public interface ITransportRepository
{
    public IEnumerable<Order> getOrdersWaitPickup();
    public IEnumerable<OrderDetail> getOrderDetailWaitPickupByOrderID(int orderID);
    public IEnumerable<SellerInfo> getSellerInfoByOrderID(int orderID);
    public IEnumerable<Payment> getPaymentsTypeByOrderID(int orderID);
}