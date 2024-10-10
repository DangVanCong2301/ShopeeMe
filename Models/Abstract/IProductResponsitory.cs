using Project.Models.Domain;

public interface IProductResponsitory {
    IEnumerable<Product> getProductsByParentCategoryID(int parentCategoryID);
    IEnumerable<Product> getProductsByCategoryID(int categoryID);
    IEnumerable<Product> getProductsByParentCategoryIDIfRoleAdmin(int parentCategoryID);
    IEnumerable<Product> getProductsByCategoryIDIfRoleAdmin(int categoryID);
    IEnumerable<Product> getProductByID(int productID);
    IEnumerable<Product> getProductsByCategoryIDAndSortIncre(int categoryID);
    IEnumerable<Product> getProductsByCategoryIDAndSortReduce(int categoryID);
    // product discount
    IEnumerable<Discount> getDiscounts();
}