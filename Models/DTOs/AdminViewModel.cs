public class AdminViewModel
{
    public IEnumerable<Order> OrdersWaitSettlment { get; set; }
    public IEnumerable<ShippingOrder> OrdersWaitPickup { get; set; }
    public IEnumerable<Order> OrdersPickingUp { get; set; }
    public IEnumerable<ShippingOrder> ShippingOrders { get; set; }
    public IEnumerable<SellerInfo> SellerInfos { get; set; }
    public IEnumerable<ShippingPicker> ShippingPickers { get; set; }
    public string HtmlWaitSettlmentItem { get; set; }
    public string HtmlWaitPickupItem { get; set; }
    public string HtmlUsersInfoItem { get; set; }
    public string HtmlShippingPickerItem { get; set; }
    public IEnumerable<OrderDetail> OrderDetails { get; set; }
    public IEnumerable<OrderDetail> OrderDetailsPickingUp { get; set; }
    public List<Address> Addresses { get; set; }
    public List<Payment> Payments { get; set; }
    public IEnumerable<UserInfo> UserInfos { get; set; }
    public int RoleID { get; set; }
    public int UserID { get; set; }
    public string Username { get; set; }
}