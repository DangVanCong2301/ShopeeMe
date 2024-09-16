
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Project.Models;

public class SellerResponsitory : ISellerResponsitory
{
    private readonly DatabaseContext _context;
    public SellerResponsitory(DatabaseContext context)
    {
        _context = context;
    }
    public IEnumerable<Seller> loginAccount(string phone, string password)
    {
        SqlParameter phoneParam = new SqlParameter("@sSellerPhone", phone);
        SqlParameter passwordParam = new SqlParameter("@sSellerPassword", password);
        return _context.Sellers.FromSqlRaw("EXEC sp_LoginAccountSeller @sSellerPhone, @sSellerPassword", phoneParam, passwordParam);
    }
}