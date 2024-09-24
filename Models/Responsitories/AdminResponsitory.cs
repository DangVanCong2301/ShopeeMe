
using Microsoft.EntityFrameworkCore;
using Project.Models;

public class AdminResponsitory : IAdminResponsitory
{
    private readonly DatabaseContext _context;
    public AdminResponsitory(DatabaseContext context)
    {
        _context = context;
    }
    public IEnumerable<Order> getOrdersWaitSettlment()
    {
        return _context.Orders.FromSqlRaw("EXEC sp_GetOrderWaitSettlement");
    }

    public IEnumerable<Order> getOrsersWaitPickup()
    {
        return _context.Orders.FromSqlRaw("EXEC sp_GetOrderWaitPickup");
    }
}