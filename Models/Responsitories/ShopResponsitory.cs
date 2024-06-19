
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

    public IEnumerable<Product> getTopSellingProductsShop(int shopID)
    {
        SqlParameter shopIDParam = new SqlParameter("@PK_iShopID", shopID);
        return _context.Products.FromSqlRaw("EXEC sp_GetTopSellingProductsShop @PK_iShopID", shopIDParam);
    }
}