using System.Text;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Project.Models;
using System.Security.Cryptography;
using Azure;

public class UserResponsitory : IUserResponsitory
{
    private readonly DatabaseContext _context;
    public UserResponsitory(DatabaseContext context)
    {
        _context = context;
    }

    public IEnumerable<User> checkUserLogin(int userID)
    {
        SqlParameter userIDParam = new SqlParameter("@PK_iUserID", userID);
        return _context.Users.FromSqlRaw("EXEC sp_CheckUserLogin @PK_iUserID", userIDParam).ToList();
    }

    // Phương thức giải mã
    public string decrypt(string encrypted)
    {
        string hash = "cong@gmail.com";
        byte[] data = Convert.FromBase64String(encrypted);
        MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
        TripleDESCryptoServiceProvider tripDES = new TripleDESCryptoServiceProvider();
        tripDES.Key = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(hash));
        tripDES.Mode = CipherMode.ECB;
        ICryptoTransform transform = tripDES.CreateDecryptor();
        byte[] result = transform.TransformFinalBlock(data, 0, data.Length);
        return UTF8Encoding.UTF8.GetString(result);
    }

    // Phương thức mã hoá
    public string encrypt(string decryted)
    {
        string hash = "cong@gmail.com";
        byte[] data = UTF8Encoding.UTF8.GetBytes(decryted);
        MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider();
        TripleDESCryptoServiceProvider tripDES = new TripleDESCryptoServiceProvider();
        tripDES.Key = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(hash));
        tripDES.Mode = CipherMode.ECB;
        ICryptoTransform transform = tripDES.CreateEncryptor();
        byte[] result = transform.TransformFinalBlock(data, 0, data.Length);

        return Convert.ToBase64String(result);
    }

    public IEnumerable<User> getPassswordAccountByEmail(string email)
    {
        SqlParameter emailParam = new SqlParameter("@sEmail", email);
        return _context.Users.FromSqlRaw("EXEC sp_GetPasswordAccountByEmail @sEmail", emailParam);
    }

    public IEnumerable<User> getUserIDAccountByEmail(string email)
    {
        SqlParameter emailParam = new SqlParameter("@sEmail", email);
        return _context.Users.FromSqlRaw("EXEC sp_GetUserIDAccountByEmail @sEmail", emailParam);
    }

    public IEnumerable<User> getUserInfoByID(int userID)
    {
        SqlParameter userIDParam = new SqlParameter("@PK_iUserID", userID);
        return _context.Users.FromSqlRaw("EXEC sp_GetUserInfoByID @PK_iUserID", userIDParam);
    }

    public bool insertUserInfoWithUserID(int userID)
    {
        SqlParameter userIDParam = new SqlParameter("@FK_iUserID", userID);
        _context.Database.ExecuteSqlRaw("EXEC sp_InsertUserInfo @FK_iUserID", userIDParam);
        return true;
    }

    public IEnumerable<User> login(string email, string password)
    {
        SqlParameter emailParam = new SqlParameter("@sEmail", email);
        SqlParameter passwordParam = new SqlParameter("@sPassword", password);
        return _context.Users.FromSqlRaw("EXEC sp_LoginEmailAndPassword @sEmail, @sPassword", emailParam, passwordParam);
    }

    public bool register(RegistrastionModel user)
    {
        // Phải đặt enctype="multipart/form-data" thì IFromFile mới có giá trị
        SqlParameter roleIdParam = new SqlParameter("@FK_iRoleID", 1);
        SqlParameter nameParam = new SqlParameter("@sUserName", user.sUserName);
        SqlParameter emailParam = new SqlParameter("@sEmail", user.sEmail);
        SqlParameter createTimeParam = new SqlParameter("@dCreateTime", DateTime.Now);
        SqlParameter passwordParam = new SqlParameter("@sPassword", user.sPassword);
        _context.Database.ExecuteSqlRaw(
            "EXEC sp_InsertUser @FK_iRoleID, @sUserName, @sEmail, @dCreateTime, @sPassword", 
            roleIdParam, nameParam, emailParam, createTimeParam, passwordParam
        );
        return true;
    }

    public bool updateUserInfoByID(int userID, string userName = "", string fullName = "", string email = "", int gender = 0, string birth = "", string avatar = "")
    {
        SqlParameter userIDParam = new SqlParameter("@PK_iUserID", userID);
        SqlParameter userNameParam = new SqlParameter("@sUserName", userName);
        SqlParameter fullNameParam = new SqlParameter("@sFullName", fullName);
        SqlParameter emailParam = new SqlParameter("@sEmail", email);
        SqlParameter genderParam = new SqlParameter("@iGender", gender);
        SqlParameter birthParam = new SqlParameter("@DateBirth", birth);
        SqlParameter avatarParam = new SqlParameter("@sImageProfile", avatar);
        _context.Database.ExecuteSqlRaw(
            "sp_UpdateProfile @PK_iUserID, @sUserName, @sFullName, @sEmail, @iGender, @DateBirth, @sImageProfile", 
            userIDParam, 
            userNameParam,
            fullNameParam,
            emailParam,
            genderParam,
            birthParam,
            avatarParam
        );
        return true;
    }
}