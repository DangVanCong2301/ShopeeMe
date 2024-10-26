public class OrderViewModel {
    public IEnumerable<Order> TotalMoney { get; set; }
    public IEnumerable<Order> OrdersWaitSettlement { get; set; }
    public IEnumerable<Order> OrdersTransiting { get; set; } 
    public IEnumerable<Order> OrdersWaitDelivery { get; set; }
    public IEnumerable<Order> OrdersDelivered { get; set; }
    public IEnumerable<Checkout> Checkouts { get; set; } 
    public IEnumerable<OrderDetail> OrderDetails { get; set; } 
    public IEnumerable<OrderDetail> OrderDetailsWaitSettlement { get; set; }
    public IEnumerable<OrderDetail> OrderDetailsDelivered { get; set; }
    public int CartCount { get; set; }
    public Status Status { get; set; }
}