using Project.Models.Domain;

public interface IProductResponsitory {
    IEnumerable<Product> getProductsByParentCategoryID(int parentCategoryID);
    IEnumerable<Product> getProductsByCategoryID(int categoryID);
    IEnumerable<Product> getProductsByParentCategoryIDIfRoleAdmin(int parentCategoryID);
    IEnumerable<Product> getProductsByCategoryIDIfRoleAdmin(int categoryID);
    IEnumerable<Product> getProductByID(int productID);
    IEnumerable<Product> getProductsByCategoryIDAndSortIncre(int categoryID);
    IEnumerable<Product> getProductsByCategoryIDAndSortReduce(int categoryID);
    IEnumerable<Product> searchProductByKeyword(string keyword);
    IEnumerable<Product> checkProductInCart(int productID);
    IEnumerable<Product> checkProductInOrder(int productID);
    IEnumerable<Product> getProductsByIndustryIDAndSortIncre(int industryID);
    IEnumerable<Product> getProductsByIndutryIDAndSortReduce(int industryID);
    IEnumerable<Product> getProductsByShopIDAndSortIncre(int shopID);
    IEnumerable<Product> getProductsByShopIDAndSortReduce(int shopID);
    bool insertProduct(int storeID, int categoryID, int discountID, int transportID, string productName, int quantity, string productDescription, string imageUrl, double price);
    bool updateProduct(int productID, int storeID, int categoryID, int discountID, int transportID, string productName, int quantity, string productDescription, string imageUrl, double price);
    bool deleteProductByID(int productID);
    bool insertProductReviewer(int userID, int productID, int star, string comment, string image);
    // product discount
    IEnumerable<Discount> getDiscounts();
    IEnumerable<TransportPrice> getTransportPrice();
    // Reviewer
    IEnumerable<Reviewer> getReviewerByProductID(int productID);
    IEnumerable<Reviewer> getReviewerByID(int reviewerID);
    bool updateReviewer(int reviewerID, int userID, int productID, int star, string comment, string image);
    bool deleteReviewer(int reviewerID);
    // Favorite
    IEnumerable<Favorite> getFavoritesByProductID(int productID);
    IEnumerable<Favorite> getFavoritesByProductIDAndUserID(int productID, int userID);
    bool insertFavorite(int userID, int productID);
    bool deleteFavorite(int userID, int productID);
}