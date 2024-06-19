public interface IShopResponsitory
{
    IEnumerable<Store> getShopByID(int shopID);
    IEnumerable<Product> getTopSellingProductsShop(int shopID);
}