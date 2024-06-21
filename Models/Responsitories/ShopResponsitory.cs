
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Project.Models;

public class ShopResponsitory : IShopResponsitory
{
    private readonly DatabaseContext _context;
    public ShopResponsitory(DatabaseContext context)
    {
        _context = context;
    }
    public IEnumerable<Store> getShopByID(int shopID)
    {
        SqlParameter shopIDParam = new SqlParameter("@PK_iShopID", shopID);
        return _context.Stores.FromSqlRaw("EXEC sp_GetShopByID @PK_iShopID", shopIDParam);
    }

    public IEnumerable<Product> getTop10GoodPriceProductsShop(int shopID)
    {
        SqlParameter shopIDParam = new SqlParameter("@PK_iShopID", shopID);
        return _context.Products.FromSqlRaw("EXEC sp_GetTop10GoodPriceProductsShop @PK_iShopID", shopIDParam);
    }

    public IEnumerable<Product> getTop10SellingProductsShop(int shopID)
    {
        SqlParameter shopIDParam = new SqlParameter("@PK_iShopID", shopID);
        return _context.Products.FromSqlRaw("EXEC sp_GetTop10SellingProductsShop @PK_iShopID", shopIDParam);
    }

    public IEnumerable<Product> getTop3SellingProductsShop(int shopID)
    {
        SqlParameter shopIDParam = new SqlParameter("@PK_iShopID", shopID);
        return _context.Products.FromSqlRaw("EXEC sp_GetTop3SellingProductsShop @PK_iShopID", shopIDParam);
    }
}