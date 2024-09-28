public class AdminViewModel
{
    public IEnumerable<Order> OrdersWaitSettlment { get; set; }
    public IEnumerable<Order> OrdersWaitPickup { get; set; }
    public string HtmlWaitSettlmentItem { get; set; }
    public string HtmlWaitPickupItem { get; set; }
    public string HtmlUsersInfoItem { get; set; }
    public IEnumerable<OrderDetail> OrderDetails { get; set; }
    public List<Address> Addresses { get; set; }
    public List<Payment> Payments { get; set; }
    public IEnumerable<UserInfo> UserInfos { get; set; }
    public int RoleID { get; set; }
    public int UserID { get; set; }
    public string Username { get; set; }
}