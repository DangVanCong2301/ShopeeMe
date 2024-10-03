public class TransportViewModel
{
    public IEnumerable<Order> OrdersWaitPickup { get; set; }
    public string HtmlOrdersWaitPickupItem { get; set; }
    public IEnumerable<SellerInfo> SellerInfos { get; set; }
    public IEnumerable<OrderDetail> OrderDetails { get; set; }
    public IEnumerable<Payment> Payments { get; set; }
}