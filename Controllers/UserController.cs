using System.Reflection.Metadata;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Project.Models;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;


public class UserController : Controller {
    private readonly DatabaseContext _context;
    private readonly IHttpContextAccessor _accessor;
    private readonly IUserResponsitory _userResponsitory;
    private readonly ICartReponsitory _cartResponsitory;
    private readonly IOrderResponsitory _orderResponsitory;
    public UserController(DatabaseContext context, IHttpContextAccessor accessor, IUserResponsitory userResponsitory, ICartReponsitory cartReponsitory, IOrderResponsitory orderResponsitory)
    {
        _context = context;
        _accessor = accessor;
        _userResponsitory = userResponsitory;
        _cartResponsitory = cartReponsitory;
        _orderResponsitory = orderResponsitory;
    }

    [Route("/user/login")]
    [HttpGet("/user/login")]
    public IActionResult Login() {
        string password = "10";
        string encrypted = _userResponsitory.encrypt(password);
        string decryted = _userResponsitory.decrypt(encrypted);
        System.Console.WriteLine("Mat khau ma hoa: " + encrypted);
        System.Console.WriteLine("Mat khau giai ma: " + decryted);
        return View();
    }

    [HttpPost]
    [Route("/user/login")]
    public IActionResult Login(LoginModel user) {
        if (!ModelState.IsValid) {
            return View(user);
        }
        List<User> userLogin = _userResponsitory.login(user.sEmail, user.sPassword).ToList();
        if (userLogin.Count() == 0) {
            TempData["msg"] = "Tài khoản hoặc mật khẩu không chính xác!";
            return Redirect("/user/login");
        }
        string nameUser = userLogin[0].sUserName;
        int value = userLogin[0].PK_iUserID;
        // Tạo Cookies
        CookieOptions options = new CookieOptions {
            Expires = DateTime.Now.AddDays(1),
            Secure = true, // Khi Hacker lấy cookies sẽ không thể lấy
            HttpOnly = true,       
            SameSite = SameSiteMode.None, // Đọc thêm về SameSite (cùng trang): https://developers.google.com/search/blog/2020/01/get-ready-for-new-samesitenone-secure?hl=vi
            Path = "/",
            IsEssential = true
        };
        Response.Cookies.Append("UserID", value.ToString(), options);
        _accessor?.HttpContext?.Session.SetString("UserName", nameUser);
        //_accessor?.HttpContext?.Session.SetInt32("UserID", userLogin[0].PK_iUserID);

        // Lấy số lượng giỏ hàng
        // var userID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        // var userID = Request.Cookies["UserID"];
        // IEnumerable<CartDetail> carts = _cartResponsitory.getCartInfo(Convert.ToInt32(userID));
        // int cartCount = carts.Count();
        // _accessor?.HttpContext?.Session.SetInt32("CartCount", cartCount);

        // return Json(user);
        List<UserInfo> userInfo = _userResponsitory.checkUserInfoByUserID(userLogin[0].PK_iUserID).ToList();
        if (userInfo.Count == 0) {
            _accessor?.HttpContext?.Session.SetInt32("UserID", userLogin[0].PK_iUserID);
            return Redirect("/user/portal");
        }
        return Redirect("/");
    }

    [HttpGet]
    [Route("/user/portal")]
    public IActionResult Portal() {
        return View();
    }

    [HttpPost]
    [Route("/user/get-data-portal")]
    public IActionResult GetDataPortal() {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        IEnumerable<User> users = _userResponsitory.checkUserLogin(Convert.ToInt32(sessionUserID));
        ShopeeViewModel model = new ShopeeViewModel {
            Users = users
        };
        return Ok(model);
    }

    [HttpPost]
    [Route("/user/add-user-portal")]
    public IActionResult AddUserPort(string fullName = "", int gender = 0, string birth = "", string image = "") {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        _userResponsitory.insertUserInfo(Convert.ToInt32(sessionUserID), fullName, gender, birth, image);
        Status status = new Status {
            StatusCode = 1,
            Message = "Cập nhật thành công"
        };
        return Ok(status);
    }

    [HttpGet]
    [Route("/user/forgot")]
    public IActionResult Forgot() {
        return View();
    }

    [Route("/user/forgot")]
    [HttpPost]
    public IActionResult Forgot(ForgotViewModel forgotViewModel) {
        if (!ModelState.IsValid) {
            return View(forgotViewModel);
        }
        List<User> user = _userResponsitory.getPassswordAccountByEmail(forgotViewModel.sEmail).ToList();
        if (user.Count() == 0) {
            TempData["result"] = "Không có Email này, vui lòng nhập lại";
        } else {
            TempData["result"] = $"Mật khẩu của bạn là: {user[0].sPassword}";
        }
        return RedirectToAction("Forgot");
    }

    [Route("/user/change")]
    public IActionResult Change() {
        return View();
    }

    [Route("/user/change")]
    [HttpPost]
    public IActionResult Change(string password) {
        TempData["result"] = "Đổi mật khẩu thành công";
        return RedirectToAction("Change");
    }

    [Route("/user/profile")]
    [HttpGet]
    public IActionResult Profile() {
        // Lấy Cookies trên trình duyệt
        var userID = Request.Cookies["UserID"];
        if (userID != null)
        {
            _accessor?.HttpContext?.Session.SetInt32("UserID", Convert.ToInt32(userID));
        }
        // Phải Refresh lại trang chủ thì mới lấy được sessionUserID
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        System.Console.WriteLine("sessionUserID: " + sessionUserID);
        IEnumerable<User> users = _userResponsitory.getUserInfoByID(Convert.ToInt32(sessionUserID));
        ProductViewModel model = new ProductViewModel
        {
            UserID = Convert.ToInt32(sessionUserID),
            Users = users
        };
        return View(model);
    }

    [HttpPost] 
    public IActionResult Profile(string userName = "", string fullName = "", string email = "", int gender = 0, string birth = "", string avatar = "") {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        _userResponsitory.updateUserInfoByID(Convert.ToInt32(sessionUserID), userName, fullName, email, gender, birth, avatar);
        string msg = "Cập nhật thành công";
        return Ok(new {msg});
    }

    public IActionResult Logout() {
        CookieOptions options = new CookieOptions {
            Expires = DateTime.Now.AddDays(-1)
        };
        Response.Cookies.Append("UserID", "0", options);
        _accessor?.HttpContext?.Session.SetInt32("UserID", 0);
        return Redirect("/");
    }

    [Route("/user/register")]
    public IActionResult Register() {
        return View();
    }

    /// <summary>
    /// Tương tự ViewData và ViewBag, TempData cũng dùng để truyền dữ liệu ra view. 
    /// Tuy nhiên sẽ hơi khác một chút, đó là TempData sẽ tồn tại cho đến khi nó được đọc. 
    /// Tức là ViewBag và ViewData chỉ hiển thị được dữ liệu ngay tại trang người dùng truy cập, 
    /// còn TempData có thể lưu lại và hiển thị ở một trang sau đó và nó chỉ biến mất khi người dùng đã "đọc" nó.
    /// Nguồn: https://techmaster.vn/posts/34556/cach-su-dung-tempdata-trong-aspnet-core-mvc
    /// </summary>

    [Route("/user/register")]
    [HttpPost]
    public IActionResult Register(RegistrastionModel user) {
        System.Console.WriteLine("Password Confirm: " + user.sPasswordConfirm);
        if (!ModelState.IsValid) {
            return View("Register", user);
        }
        _userResponsitory.register(user);
        TempData["msg"] = "Đăng ký tài khoản thành công!";
        return RedirectToAction("Register");
    }

    [HttpPost]
    public IActionResult GetUser() {
        var users = _context.Users.FromSqlRaw("select * from tbl_Users");
        return Ok(users);
    }

    [HttpGet]
    [Route("/user/purchase")]
    public IActionResult Purchase() {
        // Lấy Cookies trên trình duyệt
        var userID = Request.Cookies["UserID"];
        if (userID != null)
        {
            _accessor?.HttpContext?.Session.SetInt32("UserID", Convert.ToInt32(userID));
        }
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        if (sessionUserID == null)
        {
            _accessor?.HttpContext?.Session.SetInt32("UserID", 0);
        }
        return View();
    }

    [HttpPost]
    [Route("/user/purchase")]
    public IActionResult GetDataPurchase() {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        IEnumerable<OrderDetail> orderDetails = _orderResponsitory.getProductsOrderByUserID(Convert.ToInt32(sessionUserID));
        IEnumerable<Order> ordersWaitSettlement = _orderResponsitory.getOrdersByUserIDWaitSettlement(Convert.ToInt32(sessionUserID));
        IEnumerable<OrderDetail> orderDetailsWaitSettlement = _orderResponsitory.getProductsOrderByUserIDWaitSettlement(Convert.ToInt32(sessionUserID));
        OrderViewModel model = new OrderViewModel {
            OrderDetails = orderDetails,
            OrdersWaitSettlement = ordersWaitSettlement,
            OrderDetailsWaitSettlement = orderDetailsWaitSettlement
        };
        return Ok(model);
    }
}