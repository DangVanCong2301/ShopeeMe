
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Project.Models;

public class OrderResponsitory : IOrderResponsitory
{
    private readonly DatabaseContext _context;
    public OrderResponsitory(DatabaseContext context)
    {
        _context = context;
    }
    public IEnumerable<Order> totalMoneyProductInCart(int userID)
    {
        SqlParameter userIDParam = new SqlParameter("@PK_iUserID", userID);
        return _context.Orders.FromSqlRaw("sp_TotalMoneyProductInCart @PK_iUserID", userIDParam);
    }
}