public interface IShopResponsitory
{
    IEnumerable<Store> getShopByID(int shopID);
    IEnumerable<Product> getTop3SellingProductsShop(int shopID);
    IEnumerable<Product> getTop10SellingProductsShop(int shopID);
    IEnumerable<Product> getTop10GoodPriceProductsShop(int shopID);
}