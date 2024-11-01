public interface ICategoryResponsitory
{
    IEnumerable<Category> getCategories();
    IEnumerable<CategoryModel> getAllCategories();
    IEnumerable<CategoryModel> getAllCategoriesByShopID(int shopID);
    IEnumerable<CategoryModel> getCategoriesByIndustryID(int industryID);
    IEnumerable<Industry> getIndustries();
    IEnumerable<Industry> getIndustryByID(int industryID);
    bool insertIndustry(string industryName, string industryImage);
    bool updateIndustry(int industryID, string industryName, string industryImage);
    bool deleteIndustryByID(int industryID);
    bool inserCategory(Category category);
}