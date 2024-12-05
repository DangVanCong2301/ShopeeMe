using System.ComponentModel.DataAnnotations;

public class RegistrastionModel {
    [Required(ErrorMessage = "Tên đăng nhập không được trống!")]
    public string sUserName { get; set; }
    [Required(ErrorMessage = "Email không được trống!")]
    [RegularExpression(@"^[^@\s]+@[^@\s]+\.(com|net|org|gov)$", ErrorMessage = "Email phải chứa @.com/@.net/@.org")]
    public string sEmail { get; set; }
    [Required(ErrorMessage = "Mật khẩu không được trống!")]
    [RegularExpression("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$", ErrorMessage = "Mật khẩu phải lớn hơn 8 ký tự, có ít nhất 1 chữ cái thường, hoa, ký tự đặc biệt ")]
    public string sPassword { get; set; }
    [Required(ErrorMessage = "Nhập lại mật khẩu")]
    [Compare("sPassword", ErrorMessage = "Hai mật khẩu phải giống nhau!")]
    public string sPasswordConfirm { get; set; }
}