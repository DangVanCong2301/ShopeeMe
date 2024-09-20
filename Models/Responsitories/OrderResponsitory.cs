
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

    public IEnumerable<Order> getOrderByID(int userID, int shopID)
    {
        SqlParameter userIDParam = new SqlParameter("@FK_iUserID", userID);
        SqlParameter shopIDParam = new SqlParameter("@FK_iShopID", shopID);
        SqlParameter dateParam = new SqlParameter("@dDate", DateTime.Now.ToString("dd/MM/yyyy"));
        //SqlParameter dateParam = new SqlParameter("@dDate", "29/7/2024");
        return _context.Orders.FromSqlRaw("SET DATEFORMAT dmy EXEC sp_GetOrderByID @FK_iUserID, @FK_iShopID, @dDate", userIDParam, shopIDParam, dateParam);
    }

    public IEnumerable<OrderDetail> getOrderDetailWaitSettlementByOrderID(int orderID)
    {
        SqlParameter orderIDParam = new SqlParameter("@PK_iOrderID", orderID);
        return _context.OrderDetails.FromSqlRaw("sp_GetOrderDetailWaitSettlementByOrderID @PK_iOrderID", orderIDParam);
    }

    public IEnumerable<Order> getOrdersByUserIDWaitSettlement(int userID)
    {
        SqlParameter userIDParam = new SqlParameter("@FK_iUserID", userID);
        return _context.Orders.FromSqlRaw("EXEC sp_GetOrderByUserIDWaitSettlement @FK_iUserID", userIDParam);
    }

    public IEnumerable<Order> getOrderWaitSettlementByOrderID(int orderID)
    {
        SqlParameter orderIDParam = new SqlParameter("@PK_iOrderID", orderID);
        return _context.Orders.FromSqlRaw("EXEC sp_GetOrderWaitSettlementByOrderID @PK_iOrderID", orderIDParam);
    }

    public IEnumerable<OrderDetail> getProductsOrderByUserID(int userID)
    {
        SqlParameter userIDParam = new SqlParameter("@PK_iUserID", userID);
        return _context.OrderDetails.FromSqlRaw("EXEC sp_GetProductsOrderByUserID @PK_iUserID", userIDParam);
    }

    public IEnumerable<OrderDetail> getProductsOrderByUserIDWaitSettlement(int userID)
    {
        SqlParameter userIDParam = new SqlParameter("@PK_iUserID", userID);
        return _context.OrderDetails.FromSqlRaw("EXEC sp_GetProductsOrderByUserIDWaitSettlement @PK_iUserID", userIDParam);
    }

    public bool inserOrder(int userID, int shopID, double totalPrice, int orderStatusID, int paymentID)
    {
        SqlParameter userIDParam = new SqlParameter("@FK_iUserID", userID);
        SqlParameter shopIDParam = new SqlParameter("@FK_iShopID", shopID);
        SqlParameter dataParam = new SqlParameter("@dDate", DateTime.Now.ToString("dd/MM/yyyy"));
        SqlParameter totalPriceParam = new SqlParameter("@dTotalPrice", totalPrice);
        SqlParameter orderStatusIDParam = new SqlParameter("@FK_iOrderStatusID", orderStatusID);
        SqlParameter paymentIDParam = new SqlParameter("@FK_iPaymentTypeID", paymentID);
        _context.Database.ExecuteSqlRaw("SET DATEFORMAT dmy EXEC sp_InsertOrder @FK_iUserID, @FK_iShopID, @dDate, @dTotalPrice, @FK_iOrderStatusID, @FK_iPaymentTypeID", userIDParam, shopIDParam, dataParam, totalPriceParam, orderStatusIDParam, paymentIDParam);
        return true;
    }

    public bool inserOrderDetail(int orderID, int productID, int quantity, double unitPrice, double money)
    {
        SqlParameter orderIDParam = new SqlParameter("@PK_iOrderID", orderID);
        SqlParameter productIDParam = new SqlParameter("@PK_iProductID", productID);
        SqlParameter quantityParam = new SqlParameter("@iQuantity", quantity);
        SqlParameter unitPriceParam = new SqlParameter("@iUnitPrice", unitPrice);
        SqlParameter moneyParam = new SqlParameter("@dMoney", money);
        _context.Database.ExecuteSqlRaw("sp_InserProductIntoOrderDetail @PK_iOrderID, @PK_iProductID, @iQuantity, @iUnitPrice, @dMoney", orderIDParam, productIDParam, quantityParam, unitPriceParam, moneyParam);
        return true;
    }

    public IEnumerable<Order> totalMoneyProductInCart(int userID)
    {
        SqlParameter userIDParam = new SqlParameter("@PK_iUserID", userID);
        return _context.Orders.FromSqlRaw("sp_TotalMoneyProductInCart @PK_iUserID", userIDParam);
    }
}