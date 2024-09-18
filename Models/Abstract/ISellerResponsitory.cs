public interface ISellerResponsitory
{
    IEnumerable<Seller> loginAccount(string phone, string password);
    IEnumerable<Seller> getSellerAccountByID(int sellerID);
    IEnumerable<Seller> getPasswordSellerAccountByPhone(string phone);
    IEnumerable<Seller> checkSellerAccountByIDAndPass(int sellerID, string password);
    bool changePasswordSellerAccount(int sellerID, string password);
}