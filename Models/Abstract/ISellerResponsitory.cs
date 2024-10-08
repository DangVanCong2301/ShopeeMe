public interface ISellerResponsitory
{
    IEnumerable<Seller> loginAccount(string phone, string password);
    IEnumerable<Seller> getSellerAccountByID(int sellerID);
    IEnumerable<Seller> getPasswordSellerAccountByPhone(string phone);
    IEnumerable<Seller> checkSellerAccountByIDAndPass(int sellerID, string password);
    IEnumerable<SellerInfo> getSellerInfoBySellerID(int sellerID);
    IEnumerable<SellerInfo> getSellerInfoByShippingOrderID(int shippingOrderID);
    bool changePasswordSellerAccount(int sellerID, string password);
}