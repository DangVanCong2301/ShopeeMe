using Project.Models;

public interface IUserResponsitory
{
    IEnumerable<User> login(string email, string password);
    bool register(RegistrastionModel user);
    bool insertUserInfoWithUserID(int userID);
    IEnumerable<User> checkUserLogin(int userID);
    IEnumerable<UserInfo> checkUserInfoByUserID(int userID);
    IEnumerable<User> getUserInfoByID(int userID);
    IEnumerable<User> getPassswordAccountByEmail(string email);
    IEnumerable<User> getUserIDAccountByEmail(string email);
    bool updateUserInfoByID(int userID, string userName = "", string fullName = "", string email = "", int gender = 0, string birth = "", string avatar = "");
    string encrypt(string decryted);
    string decrypt(string encrypted);
}