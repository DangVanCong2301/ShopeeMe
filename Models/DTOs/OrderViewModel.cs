public class OrderViewModel {
    public IEnumerable<Order> TotalMoney { get; set; }
    public IEnumerable<Order> OrdersWaitSettlement { get; set; }
    public IEnumerable<Checkout> Checkouts { get; set; }
    public IEnumerable<OrderDetail> OrderDetails { get; set; }
    public IEnumerable<OrderDetail> OrderDetailsWaitSettlement { get; set; }
    public int CartCount { get; set; }
}