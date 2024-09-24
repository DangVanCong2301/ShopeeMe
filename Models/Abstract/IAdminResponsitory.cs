public interface IAdminResponsitory
{
    IEnumerable<Order> getOrdersWaitSettlment();
    IEnumerable<Order> getOrsersWaitPickup();
}