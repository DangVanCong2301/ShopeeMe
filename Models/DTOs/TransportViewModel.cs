public class TransportViewModel
{
    public IEnumerable<Order> OrdersWaitPickup { get; set; }
    public IEnumerable<Order> OrdersPickingUp { get; set; }
    public string HtmlOrdersWaitPickupItem { get; set; }
    public string HtmlOrderPickingUpItem { get; set; }
    public IEnumerable<SellerInfo> SellerInfos { get; set; }
    public IEnumerable<OrderDetail> OrderDetails { get; set; }
    public IEnumerable<OrderDetail> orderDetailsPickingUp { get; set; }
    public IEnumerable<Payment> Payments { get; set; }
    public IEnumerable<ShippingOrder> ShippingOrders { get; set; }
    public Status Status { get; set; }
}