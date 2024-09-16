public interface ISellerResponsitory
{
    IEnumerable<Seller> loginAccount(string phone, string password);
}