using System.Collections;

public class CartViewModel {
    public IEnumerable<CartDetail> CartDetails { get; set; }
    public IEnumerable<Product> Get12ProductsAndSortAsc { get; set; }
    public IEnumerable<UserInfo> UserInfo { get; set; }
    public int CartCount { get; set; }
    public string Message { get; set; }
    public int RoleID { get; set; }
    public int UserID { get; set; }
    public string Username { get; set; }
    public Status Status { get; set; }
    public double Money { get; set; }
}