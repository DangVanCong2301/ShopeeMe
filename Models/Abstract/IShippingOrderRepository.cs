public interface IShippingOrderRepository
{
    bool insertShippingOrder(int shippingUnitID, int orderID);
    IEnumerable<ShippingOrder> getShippingOrderByOrderID(int orderID);
    IEnumerable<ShippingOrder> getShippingOrderByID(int shippingOrderID);
    IEnumerable<ShippingOrder> getShippingOrderByShopID(int shopID);
}
