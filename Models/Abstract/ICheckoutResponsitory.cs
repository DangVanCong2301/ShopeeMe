public interface ICheckoutResponsitory
{
    IEnumerable<Address> checkAddressAccount(int userID);
    IEnumerable<City> getCities();
    IEnumerable<District> getDistricts();
    IEnumerable<AddressChoose> getAddressChoose();
    bool insertAddressAccount(int userID, string phone = "", string address = "");
    IEnumerable<Address> getAddressesByID(int addressID, int userID);
    bool updateAddressAccountUserByID (int userID, string fullname = "");
    bool updateAddressAccountByID(int addressID, int userID, string phone = "", string address = "");
}