public interface IShopResponsitory
{
    IEnumerable<Category> getCategoriesByShopID(int shopID);
    IEnumerable<Product> getProductsByShopID(int shopID);
    IEnumerable<Store> getShopByID(int shopID);
    IEnumerable<Product> getTop3SellingProductsShop(int shopID);
    IEnumerable<Product> getTop10SellingProductsShop(int shopID);
    IEnumerable<Product> getTop10GoodPriceProductsShop(int shopID);
    IEnumerable<Product> getTop10SuggestProductsShop(int shopID);
}