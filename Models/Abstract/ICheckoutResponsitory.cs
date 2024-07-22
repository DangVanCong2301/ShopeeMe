public interface ICheckoutResponsitory
{
    IEnumerable<Address> checkAddressAccount(int userID);
    IEnumerable<City> getCities();
    IEnumerable<District> getDistricts();
    IEnumerable<AddressChoose> getAddressChoose();
    bool insertAddressAccount(int userID, string phone = "", string address = "");
}