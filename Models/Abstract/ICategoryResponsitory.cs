public interface ICategoryResponsitory
{
    IEnumerable<Category> getCategories();
    bool inserCategory(Category category);
}