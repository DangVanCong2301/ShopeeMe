using System.ComponentModel.DataAnnotations;
using Project.Models;

public class UserViewModel
{
    public int UserID { get; set; }
    public IEnumerable<User> Users { get; set; }
    public IEnumerable<User> User { get; set; }
    public IEnumerable<UserInfo> UserInfo { get; set; }
    public Status Status { get; set; }
}