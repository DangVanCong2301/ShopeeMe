using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Project.Models;
using Project.Models.Domain;

public class ProductResponsitory : IProductResponsitory {
    private readonly DatabaseContext _context;
    public ProductResponsitory(DatabaseContext context)
    {
        _context = context;
    }

    public IEnumerable<Product> getProductsByCategoryID(int categoryID)
    {
        SqlParameter categoryIDParam = new SqlParameter("@FK_iCategoryID", categoryID);
        return _context.Products.FromSqlRaw("EXEC sp_SelectProductsByCategoryID @FK_iCategoryID", categoryIDParam);
    }

    public IEnumerable<Product> getProductByID(int productID) {
        SqlParameter productIDParam = new SqlParameter("@PK_iProductID", productID);
        return _context.Products.FromSqlRaw("EXEC sp_SelectProductByID @PK_iProductID", productIDParam);
    }

    public IEnumerable<Product> getProductsByCategoryIDAndSortIncre(int categoryID)
    {
        SqlParameter categoryIDParam = new SqlParameter("@FK_iCategoryID", categoryID);
        return _context.Products.FromSqlRaw("sp_SelectProductsByCategoryIDAndSortIncre @FK_iCategoryID", categoryIDParam);
    }

    public IEnumerable<Product> getProductsByCategoryIDAndSortReduce(int categoryID)
    {
        SqlParameter categoryIDParam = new SqlParameter("@FK_iCategoryID", categoryID);
        return _context.Products.FromSqlRaw("sp_SelectProductsByCategoryIDAndSortReduce @FK_iCategoryID", categoryIDParam); // Đúng tên thủ tục lưu sắp xếp giảm dần
    }

    public IEnumerable<Product> getProductsByCategoryIDIfRoleAdmin(int categoryID)
    {
        SqlParameter categoryIDParam = new SqlParameter("@FK_iCategoryID", categoryID);
        return _context.Products.FromSqlRaw("sp_SelectProductsByCategoryIDIfRoleAdmin @FK_iCategoryID", categoryIDParam);
    }

    public IEnumerable<Product> getProductsByParentCategoryID(int parentCategoryID)
    {
        SqlParameter parentCategoryParam = new SqlParameter("@FK_iParentCategoryID", parentCategoryID);
        return _context.Products.FromSqlRaw("EXEC sp_SelectProductsByParentCategoryID @FK_iParentCategoryID", parentCategoryParam);
    }

    public IEnumerable<Product> getProductsByParentCategoryIDIfRoleAdmin(int parentCategoryID)
    {
        SqlParameter parentCategoryParam = new SqlParameter("@FK_iParentCategoryID", parentCategoryID);
        return _context.Products.FromSqlRaw("EXEC sp_SelectProductsByParentCategoryIDIfRoleAdmin @FK_iParentCategoryID", parentCategoryParam);
    }

    public IEnumerable<Discount> getDiscounts()
    {
        return _context.Discounts.FromSqlRaw("sp_GetDiscounts");
    }

    public IEnumerable<TransportPrice> getTransportPrice()
    {
        return _context.TransportPrices.FromSqlRaw("sp_GetTransportPrice");
    }
}