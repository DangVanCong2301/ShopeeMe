
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

    public IEnumerable<Order> getOrderByID(int userID)
    {
        SqlParameter userIDParam = new SqlParameter("@FK_iUserID", userID);
        SqlParameter dateParam = new SqlParameter("@dDate", DateTime.Now.ToString("dd/MM/yyyy"));
        return _context.Orders.FromSqlRaw("SET DATEFORMAT dmy EXEC sp_GetOrderByID @FK_iUserID, @dDate", userIDParam, dateParam);
    }

    public bool inserOrder(int userID, double totalPrice, int orderStatusID, int paymentID)
    {
        SqlParameter userIDParam = new SqlParameter("@FK_iUserID", userID);
        SqlParameter dataParam = new SqlParameter("@dDate", DateTime.Now.ToString("dd/MM/yyyy"));
        SqlParameter totalPriceParam = new SqlParameter("@dTotalPrice", totalPrice);
        SqlParameter orderStatusIDParam = new SqlParameter("@FK_iOrderStatusID", orderStatusID);
        SqlParameter paymentIDParam = new SqlParameter("@FK_iPaymentID", paymentID);
        _context.Database.ExecuteSqlRaw("SET DATEFORMAT dmy EXEC sp_InsertOrder @FK_iUserID, @dDate, @dTotalPrice, @FK_iOrderStatusID, @FK_iPaymentID", userIDParam, dataParam, totalPriceParam, orderStatusIDParam, paymentIDParam);
        return true;
    }

    public bool inserOrderDetail(int orderID, int productID, int quantity, double unitPrice)
    {
        SqlParameter orderIDParam = new SqlParameter("@PK_iOrderID", orderID);
        SqlParameter productIDParam = new SqlParameter("@PK_iProductID", productID);
        SqlParameter quantityParam = new SqlParameter("@iQuantity", quantity);
        SqlParameter unitPriceParam = new SqlParameter("@iUnitPrice", unitPrice);
        _context.Database.ExecuteSqlRaw("sp_InserProductIntoOrderDetail @PK_iOrderID, @PK_iProductID, @iQuantity, @iUnitPrice", orderIDParam, productIDParam, quantityParam, unitPriceParam);
        return true;
    }

    public IEnumerable<Order> totalMoneyProductInCart(int userID)
    {
        SqlParameter userIDParam = new SqlParameter("@PK_iUserID", userID);
        return _context.Orders.FromSqlRaw("sp_TotalMoneyProductInCart @PK_iUserID", userIDParam);
    }
}