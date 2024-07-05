public class OrderViewModel {
    public IEnumerable<Order> TotalMoney { get; set; }
    public IEnumerable<Checkout> Checkouts { get; set; }
    public int CartCount { get; set; }
}