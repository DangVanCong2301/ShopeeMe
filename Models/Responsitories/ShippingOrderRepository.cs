using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Project.Models;

public class ShippingOrderRepository : IShippingOrderRepository
{
    private readonly DatabaseContext _context;

    public ShippingOrderRepository(DatabaseContext context)
    {
        _context = context;
    }
    
    public bool insertShippingOrder(int shippingUnitID, int orderID)
    {
        SqlParameter shippingUnitIDParam = new SqlParameter("@FK_iShippingUnitID", shippingUnitID);
        SqlParameter orderIDParam = new SqlParameter("@FK_iOrderID", orderID);
        SqlParameter shippingTimeParam = new SqlParameter("@ShippingTime", DateTime.Now);
        _context.Database.ExecuteSqlRaw("SET DATEFORMAT dmy EXEC sp_InsertShippingOrder @FK_iShippingUnitID, @FK_iOrderID, @ShippingTime", shippingUnitIDParam, orderIDParam, shippingTimeParam);
        return true;
    }
}