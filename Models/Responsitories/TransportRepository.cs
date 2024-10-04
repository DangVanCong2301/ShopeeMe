
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

    public bool confirmOrderAboutPickingUp(int orderID)
    {
        SqlParameter orderIDParam = new SqlParameter("@PK_iOrderID", orderID);
        _context.Database.ExecuteSqlRaw("EXEC sp_ConfirmOrderAboutPickingUp @PK_iOrderID", orderIDParam);
        return true;
    }

    public IEnumerable<OrderDetail> getOrderDetailPickingUpByOrderID(int orderID)
    {
        SqlParameter orderIDParam = new SqlParameter("@PK_iOrderID", orderID);
        return _context.OrderDetails.FromSqlRaw("EXEC sp_GetOrderDetailPickingUpByOrderID @PK_iOrderID", orderIDParam);
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

    public IEnumerable<Order> getOrderWaitPickingUp()
    {
        return _context.Orders.FromSqlRaw("EXEC sp_GetOrderWaitPickingUp");
    }

    public IEnumerable<Order> getOrderWaitPickupByShippingOrderID(int shippingOrderID)
    {
        SqlParameter shippingOrderIDParam = new SqlParameter("@PK_iShippingOrderID", shippingOrderID);
        return _context.Orders.FromSqlRaw("EXEC sp_GetOrderWaitPickupByShippingOrderID @PK_iShippingOrderID", shippingOrderIDParam);
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

    public bool insertShippingPicker(int shippingOrderID, int userID)
    {
        SqlParameter shippingOrderIDParam = new SqlParameter("@FK_iShippingOrderID", shippingOrderID);
        SqlParameter userIDParam = new SqlParameter("@FK_iUserID", userID);
        SqlParameter timeParam = new SqlParameter("@dShippingPickerTime", DateTime.Now);
        _context.Database.ExecuteSqlRaw("SET DATEFORMAT dmy EXEC sp_InsertShippingPicker @FK_iShippingOrderID, @FK_iUserID, @dShippingPickerTime", shippingOrderIDParam, userIDParam, timeParam);
        return true;
    }
}