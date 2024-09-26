public class SellerViewModel
{
    public Status Status { get; set; }
    public int SellerID { get; set; }
    public string SellerUsername { get; set; }
    public string HtmlOrdersWaitSettlementItem { get; set; }
    public string HtmlOrdersWaitPickupItem { get; set; }
    public IEnumerable<Order> OrdersWaitSettlement { get; set; }
    public IEnumerable<Order> OrdersWaitPickup { get; set; }
    public IEnumerable<SellerInfo> SellerInfos { get; set; }
}