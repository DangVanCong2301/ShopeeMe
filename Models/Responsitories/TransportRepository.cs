
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Project.Models;

public class TransportRepository : ITransportRepository
{
    private readonly DatabaseContext _context;
    public TransportRepository(DatabaseContext context)
    {
        _context = context;
    }

    public IEnumerable<OrderDetail> getOrderDetailWaitPickupByOrderID(int orderID)
    {
        SqlParameter orderIDParam = new SqlParameter("@PK_iOrderID", orderID);
        return _context.OrderDetails.FromSqlRaw("EXEC sp_GetOrderDetailWaitPickupByOrderID @PK_iOrderID", orderIDParam);
    }

    public IEnumerable<Order> getOrdersWaitPickup()
    {
        return _context.Orders.FromSqlRaw("EXEC sp_GetOrderWaitPickup");
    }

    public IEnumerable<Payment> getPaymentsTypeByOrderID(int orderID)
    {
        SqlParameter orderIDParam = new SqlParameter("@PK_iOrderID", orderID);
        return _context.PaymentTypes.FromSqlRaw("EXEC sp_GetPaymentsTypeByOrderID @PK_iOrderID", orderIDParam);
    }

    public IEnumerable<SellerInfo> getSellerInfoByOrderID(int orderID)
    {
        SqlParameter orderIDParam = new SqlParameter("@PK_iOrderID", orderID);
        return _context.SellerInfos.FromSqlRaw("EXEC sp_GetSellerInfoByOrderID @PK_iOrderID", orderIDParam);
    }
}