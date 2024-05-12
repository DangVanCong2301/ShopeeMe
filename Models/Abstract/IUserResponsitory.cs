using Project.Models;

public interface IUserResponsitory
{
    IEnumerable<User> login(string email, string password);
    bool register(RegistrastionModel user);
    IEnumerable<User> checkUserLogin(int userID);
    IEnumerable<User>getUserInfoByID(int userID);
    bool updateUserInfoByID(int userID, string userName = "", string fullName = "", string email = "", int gender = 0, string birth = "", string avatar = "");
    string encrypt(string decryted);
    string decrypt(string encrypted);
}