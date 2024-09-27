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

    public IEnumerable<ShippingOrder> getShippingOrderByID(int shippingOrderID)
    {
        SqlParameter shippingOrderIDParam = new SqlParameter("@PK_iShippingOrderID", shippingOrderID);
        return _context.ShippingOrders.FromSqlRaw("EXEC sp_GetShippingOrderByID @PK_iShippingOrderID", shippingOrderIDParam);
    }

    public IEnumerable<ShippingOrder> getShippingOrderByOrderID(int orderID)
    {
        SqlParameter orderIDParam = new SqlParameter("@FK_iOrderID", orderID);
        return _context.ShippingOrders.FromSqlRaw("EXEC sp_GetShippingOrderByOrderID @FK_iOrderID", orderIDParam);
    }

    public IEnumerable<ShippingOrder> getShippingOrderByShopID(int shopID)
    {
        SqlParameter shopIDParam = new SqlParameter("@FK_iShopID", shopID);
        return _context.ShippingOrders.FromSqlRaw("EXEC sp_GetShippingOrderByShopID @FK_iShopID", shopIDParam);
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