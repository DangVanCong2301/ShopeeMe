public class TransportViewModel
{
    public IEnumerable<ShippingOrder> OrdersWaitPickup { get; set; }
    public IEnumerable<ShippingPicker> OrdersPickingUp { get; set; }
    public string HtmlOrdersWaitPickupItem { get; set; }
    public string HtmlOrderPickingUpItem { get; set; }
    public IEnumerable<SellerInfo> SellerInfos { get; set; }
    public IEnumerable<OrderDetail> OrderDetails { get; set; }
    public IEnumerable<OrderDetail> orderDetailsPickingUp { get; set; }
    public IEnumerable<Payment> Payments { get; set; }
    public IEnumerable<ShippingOrder> ShippingOrders { get; set; }
    public IEnumerable<ShippingPicker> ShippingPickers { get; set; }
    public Status Status { get; set; }
}