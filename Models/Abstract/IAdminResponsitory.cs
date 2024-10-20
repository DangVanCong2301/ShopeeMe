public interface IAdminResponsitory
{
    IEnumerable<Order> getOrdersWaitSettlment();
    IEnumerable<ShippingOrder> getOrsersWaitPickup();
}