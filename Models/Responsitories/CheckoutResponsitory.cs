
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Project.Models;

public class CheckoutResponsitory : ICheckoutResponsitory
{
    private readonly DatabaseContext _context;
    public CheckoutResponsitory(DatabaseContext context)
    {
        _context = context;
    }
    public IEnumerable<Address> checkAddressAccount(int userID)
    {
        SqlParameter userIDParam = new SqlParameter("@FK_iUserID", userID);
        return _context.Addresses.FromSqlRaw("EXEC sp_CheckAddressAccount @FK_iUserID", userIDParam);
    }

    public IEnumerable<AddressChoose> getAddressChoose()
    {
        return _context.AddressChooses.FromSqlRaw("EXEC sp_GetAddressChoose");
    }

    public IEnumerable<City> getCities()
    {
        return _context.Cities.FromSqlRaw("EXEC sp_GetCities");
    }

    public IEnumerable<District> getDistricts()
    {
        return _context.Districts.FromSqlRaw("EXEC sp_GetDistricts");
    }
}