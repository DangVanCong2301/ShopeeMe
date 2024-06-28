public class ShopViewModel
{
    public IEnumerable<Store> Stores { get; set; }
    public IEnumerable<Category> Categories { get; set;}
    public IEnumerable<Product> Products { get; set; }
    public IEnumerable<Product> Top3SellingProducts { get; set; }
    public IEnumerable<Product> Top10SellingProducts { get; set; }
    public IEnumerable<Product> Top10GoodPriceProducts { get; set; }
    public IEnumerable<Product> Top10SuggestProducts { get; set; }
}