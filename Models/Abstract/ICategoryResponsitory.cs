public interface ICategoryResponsitory
{
    IEnumerable<Category> getCategories();
    IEnumerable<CategoryModel> getAllCategoriesByShopID(int shopID);
    bool inserCategory(Category category);
}