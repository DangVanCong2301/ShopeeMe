public class AdminViewModel
{
    public IEnumerable<Order> OrdersWaitSettlment { get; set; }
    public string HtmlWaitSettlmentItem { get; set; }
    public IEnumerable<OrderDetail> OrderDetails { get; set; }
    public List<Address> Addresses { get; set; }
    public List<Payment> Payments { get; set; }
}