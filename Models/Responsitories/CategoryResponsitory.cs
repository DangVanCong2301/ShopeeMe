using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Project.Models;

public class CategoryResponsitory : ICategoryResponsitory
{
    private readonly DatabaseContext _context;
    public CategoryResponsitory(DatabaseContext context)
    {
        _context = context;
    }

    public bool deleteIndustryByID(int industryID)
    {
        SqlParameter industryIDParam = new SqlParameter("@PK_iIndustryID", industryID);
        _context.Database.ExecuteSqlRaw("EXEC sp_DeleteIndustryByID @PK_iIndustryID", industryIDParam);
        return true;
    }

    public IEnumerable<CategoryModel> getAllCategories()
    {
        return _context.CategoryModels.FromSqlRaw("EXEC sp_GetAllCategories");
    }

    public IEnumerable<CategoryModel> getAllCategoriesByShopID(int shopID)
    {
        SqlParameter shopIDParam = new SqlParameter("@FK_iShopID", shopID);
        return _context.CategoryModels.FromSqlRaw("EXEC sp_GetAllCategoriesByShopID @FK_iShopID", shopIDParam);
    }

    public IEnumerable<Category> getCategories()
    {
        return _context.Categories.FromSqlRaw("EXEC sp_SelectCategories");
    }

    public IEnumerable<CategoryModel> getCategoriesByIndustryID(int industryID)
    {
        SqlParameter industryIDParam = new SqlParameter("@FK_iIndustryID", industryID);
        return _context.CategoryModels.FromSqlRaw("EXEC sp_GetCategoriesByIndustryID @FK_iIndustryID", industryIDParam);
    }

    public IEnumerable<Industry> getIndustries()
    {
        return _context.Industries.FromSqlRaw("EXEC sp_GetIndustries");
    }

    public IEnumerable<Industry> getIndustryByID(int industryID)
    {
        SqlParameter industryIDParam = new SqlParameter("@PK_iIndustryID", industryID);
        return _context.Industries.FromSqlRaw("EXEC sp_GetIndustryByID @PK_iIndustryID", industryIDParam);
    }

    public bool inserCategory(Category category)
    {
        SqlParameter categoryNameParam = new SqlParameter("@sCategoryName", category.sCategoryName);
        SqlParameter categoryDescParam = new SqlParameter("@sCategoryDescription", category.sCategoryDescription);
        _context.Database.ExecuteSqlRaw("sp_InsertCategory @sCategoryName, @sCategoryDescription", categoryNameParam, categoryDescParam);
        return true;
    }

    public bool insertIndustry(string industryName, string industryImage)
    {
        SqlParameter industryNameParam = new SqlParameter("@sIndustryName", industryName);
        SqlParameter industryImageParam = new SqlParameter("@sIndustryImage", industryImage);
        SqlParameter createTimeParam = new SqlParameter("@dCreateTime", DateTime.Now);
        SqlParameter updateTimeParam = new SqlParameter("@dUpdateTime", DateTime.Now);
        _context.Database.ExecuteSqlRaw("EXEC sp_InsertIndustry @sIndustryName, @sIndustryImage, @dCreateTime, @dUpdateTime", industryNameParam, industryImageParam, createTimeParam, updateTimeParam);
        return true;
    }

    public bool updateIndustry(int industryID, string industryName, string industryImage)
    {
        SqlParameter industryIDParam = new SqlParameter("@PK_iIndustryID", industryID);
        SqlParameter industryNameParam = new SqlParameter("@sIndustryName", industryName);
        SqlParameter industryImageParam = new SqlParameter("@sIndustryImage", industryImage);
        SqlParameter updateTimeParam = new SqlParameter("@dUpdateTime", DateTime.Now);
        _context.Database.ExecuteSqlRaw("EXEC sp_UpdateIndustry @PK_iIndustryID, @sIndustryName, @sIndustryImage, @dUpdateTime", industryIDParam, industryNameParam, industryImageParam, updateTimeParam);
        return true;
    }
}