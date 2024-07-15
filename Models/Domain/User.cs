using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Models
{
    public class User
    {
        public int PK_iUserID { get; set; }
        public string sUserName { get; set; }
        [Required(ErrorMessage = "Bạn chưa nhập tên!")]
        public string sFullName { get; set; }
        public int iGender { get; set; }
        public string sImageProfile { get; set; }
        [Required(ErrorMessage = "Bạn chưa nhập email")]
        public string sEmail { get; set; }
        public int FK_iRoleID { get; set; }
        [Required(ErrorMessage = "Bạn chưa nhập mật khẩu")]
        public string sPassword { get; set; }
        public DateTime dDateBirth {  get; set; }
        [NotMapped]
        public DateTime dCreatedTime { get; set; }
        [NotMapped]
        public DateTime dUpdatedTime { get; set;}
        [NotMapped]
        public DateTime? dDeletedTime { get; set; }

    }
}
