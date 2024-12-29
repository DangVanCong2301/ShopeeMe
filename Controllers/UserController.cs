using System.Reflection.Metadata;
using System.Text.RegularExpressions;
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
    private readonly IShopResponsitory _shopResponsitory;
    private readonly ICheckoutResponsitory _checkoutResponsitory;
    private readonly IShippingOrderRepository _shippingOrderRepository;
    public UserController(
        DatabaseContext context, 
        IHttpContextAccessor accessor, 
        IUserResponsitory userResponsitory, 
        ICartReponsitory cartReponsitory, 
        IOrderResponsitory orderResponsitory,
        IShopResponsitory shopResponsitory,
        ICheckoutResponsitory checkoutResponsitory,
        IShippingOrderRepository shippingOrderRepository
    )
    {
        _context = context;
        _accessor = accessor;
        _userResponsitory = userResponsitory;
        _cartResponsitory = cartReponsitory;
        _orderResponsitory = orderResponsitory;
        _shopResponsitory = shopResponsitory;
        _checkoutResponsitory = checkoutResponsitory;
        _shippingOrderRepository = shippingOrderRepository;
    }

    [Route("/user/login")]
    [HttpGet("/user/login")]
    public IActionResult Login() {
        string password = "1";
        string encrypted = _userResponsitory.encrypt(password);
        string decryted = _userResponsitory.decrypt("Zt5vN8IGHVA=");
        System.Console.WriteLine("Mat khau ma hoa: " + encrypted);
        System.Console.WriteLine("Mat khau giai ma: " + decryted);
        return View();
    }

    [HttpPost]
    [Route("/user/login")]
    public IActionResult Login(string email = "", string password = "") {
        string regexEmail = @"^[^@\s]+@[^@\s]+\.(com|net|org|gov)$";
        Status status;
        List<User> userLogin = null;
        if (!Regex.IsMatch(email, regexEmail)) {
            status = new Status {
                StatusCode = -1,
                Message = "Email phải chứa @.com/@.net/@.org"
            };
        } else if (!Regex.IsMatch(password, "^.{8,}$")) {
            status = new Status {
                StatusCode = -2,
                Message = "Mật khẩu phải lớn hơn 8 ký tự"
            };
        } else if (!Regex.IsMatch(password, "^(?=.*?[A-Z]).{8,}$")) {
            status = new Status {
                StatusCode = -2,
                Message = "Mật khẩu phải chứa ít nhất một chữ cái tiếng Anh viết hoa!"
            };
        } else if (!Regex.IsMatch(password, "^(?=.*?[A-Z])(?=.*?[a-z]).{8,}$")) {
            status = new Status {
                StatusCode = -2,
                Message = "Mật khẩu phải chứa ít nhất một chữ cái tiếng Anh viết thường!"
            };
        } else if (!Regex.IsMatch(password, "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")) {
            status = new Status {
                StatusCode = -2,
                Message = "Mật khẩu phải chứa ít nhất một chữ số!"
            };
        } else if (!Regex.IsMatch(password, "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")) {
            status = new Status {
                StatusCode = -2,
                Message = "Mật khẩu phải chứa ít nhất một ký tự đặc biệt!"
            };
        } else {
            string passwordEncrypted = _userResponsitory.encrypt(password);
            userLogin = _userResponsitory.login(email, passwordEncrypted).ToList();
            IEnumerable<UserInfo> userInfo = _userResponsitory.getUserInfoByEmailAndPassword(email, password);
            if (userLogin.Count() != 0 && userInfo.Count() != 0) {
                status = new Status {
                    StatusCode = 1,
                    Message = "Đăng nhập thành công!"
                };
            } else if (userInfo.Count() == 0) {
                status = new Status {
                    StatusCode = -4,
                    Message = "Tài khoản người bán chưa đầy đủ thông tin!"
                };
            } else {
                status = new Status {
                    StatusCode = -3,
                    Message = "Tên đăng nhập hoặc mật khẩu không chính xác!"
                };
            }
        }
        UserViewModel model = new UserViewModel {
            Status = status,
            User = userLogin
        };
        return Ok(model);
    }

    [HttpGet]
    [Route("/user/portal")]
    public IActionResult Portal() {
        return View();
    }

    [HttpGet]
    [Route("/user/get-data-portal/{userID?}")]
    public IActionResult GetDataPortal(int userID = 0) {
        IEnumerable<User> user = _userResponsitory.checkUserLogin(userID);
        ShopeeViewModel model = new ShopeeViewModel {
            User = user
        };
        return Ok(model);
    }

    [HttpPost]
    [Route("/user/add-user-portal")]
    public IActionResult AddUserPort(int userID = 0, string fullName = "", int gender = 0, string birth = "", string image = "") {
        Status status;
        IEnumerable<UserInfo> userInfo = null;
        if (_userResponsitory.insertUserInfo(userID, fullName, gender, birth, image)) {
            status = new Status {
                StatusCode = 1,
                Message = "Cập nhật thành công"
            };
            userInfo = _userResponsitory.getUserInfoByID(userID);
        } else {
            status = new Status {
                StatusCode = 1,
                Message = "Cập nhật thất bại"
            };
        }
        UserViewModel model = new UserViewModel {
            Status = status,
            UserInfo = userInfo
        };
        return Ok(model);
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
            string passwordDecrypted = _userResponsitory.decrypt(user[0].sPassword);
            TempData["result"] = $"Mật khẩu của bạn là: {passwordDecrypted}";
        }
        return RedirectToAction("Forgot");
    }

    [Route("/user/change")]
    public IActionResult Change() {
        return View();
    }

    [Route("/user/change")]
    [HttpPost]
    public IActionResult Change(ChangePasswordModel model) {
        if (!ModelState.IsValid) {
            return View(model);
        }
        System.Console.WriteLine("Old password: " + model.sOldPassword);
        int userID = Convert.ToInt32(_accessor?.HttpContext?.Session.GetInt32("UserID"));
        List<User> user = _userResponsitory.getUserByIDAndPassword(userID, model.sOldPassword).ToList();
        if (user.Count() == 0) {
            TempData["result"] = "Mật khẩu cũ không chính xác";
        } else {
            string passwordEncrypted = _userResponsitory.encrypt(model.sNewPassword);
            _userResponsitory.changePasswordByUserID(userID, passwordEncrypted);
            TempData["result"] = "Đổi mật khẩu thành công";
        }
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
        IEnumerable<UserInfo> userInfos = _userResponsitory.getUserInfoByID(Convert.ToInt32(sessionUserID));
        ShopeeViewModel model = new ShopeeViewModel
        {
            UserID = Convert.ToInt32(sessionUserID),
            UserInfos = userInfos
        };
        return View(model);
    }

    [Route("/user/update-profile")]
    [HttpPost] 
    public IActionResult UpdateProfile(string fullName = "", int gender = 0, string birth = "", string image = "") {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        _userResponsitory.updateUserInfoByID(Convert.ToInt32(sessionUserID), fullName, gender, birth, image);
        Status status = new Status {
            StatusCode = 1,
            Message = "Cập nhật thành công"
        };
        return Ok(status);
    }

    [HttpGet]
    [Route("/user/logout")]
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
        List<User> userCheck = _userResponsitory.checkEmailUserIsRegis(user.sEmail).ToList();
        if (userCheck.Count() != 0 && userCheck[0].sEmail != null) {
            TempData["msg"] = "Email này đã tồn tại!";
            return RedirectToAction("Register");
        }
        user.sPassword = _userResponsitory.encrypt(user.sPassword);
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
        } else {
            return Redirect("/user/login");
        }
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        if (sessionUserID != null)
        {
            List<User> users = _userResponsitory.checkUserLogin(Convert.ToInt32(sessionUserID)).ToList();
            _accessor?.HttpContext?.Session.SetString("UserName", users[0].sUserName);
            _accessor?.HttpContext?.Session.SetInt32("RoleID", users[0].FK_iRoleID);
        }
        else
        {
            _accessor?.HttpContext?.Session.SetString("UserName", "");
        }
        return View();
    }

    [HttpPost]
    [Route("/user/purchase")]
    public IActionResult GetDataPurchase(int currentPage = 1) {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        IEnumerable<OrderDetail> orderDetails = _orderResponsitory.getProductsOrderByUserID(Convert.ToInt32(sessionUserID));
        IEnumerable<Order> ordersWaitSettlement = _orderResponsitory.getOrdersByUserIDWaitSettlement(Convert.ToInt32(sessionUserID));
        IEnumerable<OrderDetail> orderDetailsWaitSettlement = _orderResponsitory.getProductsOrderByUserIDWaitSettlement(Convert.ToInt32(sessionUserID));
        IEnumerable<Order> ordersTransiting = _orderResponsitory.getOrderByUserIDTransiting(Convert.ToInt32(sessionUserID));
        IEnumerable<OrderDetail> orderDetailsTransiting = _orderResponsitory.getProductsOrderByUserIDTransiting(Convert.ToInt32(sessionUserID));
        IEnumerable<Order> ordersDelivering = _orderResponsitory.getOrderByUserIDWaitDelivery(Convert.ToInt32(sessionUserID));
        IEnumerable<OrderDetail> orderDetailsDelivering = _orderResponsitory.getProductsOrderByUserIDDelivering(Convert.ToInt32(sessionUserID));
        IEnumerable<Order> ordersDelivered = _orderResponsitory.getOrderByUserIDDeliverd(Convert.ToInt32(sessionUserID));
        IEnumerable<OrderDetail> orderDetailsDelivered = _orderResponsitory.getProductsOrderByUserIDDelivered(Convert.ToInt32(sessionUserID));
        IEnumerable<Order> ordersDestroy = _orderResponsitory.getOrderByUserIDDestroy(Convert.ToInt32(sessionUserID));
        IEnumerable<OrderDetail> orderDetailsDestroy = _orderResponsitory.getProductsOrderByUserIDDestroy(Convert.ToInt32(sessionUserID));
        int totalRecord = orderDetails.Count();
        int pageSize = 4;
        int totalPage = (int) Math.Ceiling(totalRecord / (double) pageSize);
        orderDetails = orderDetails.Skip((currentPage - 1) * pageSize).Take(pageSize);
        OrderViewModel model = new OrderViewModel {
            OrderDetails = orderDetails,
            OrdersWaitSettlement = ordersWaitSettlement,
            OrderDetailsWaitSettlement = orderDetailsWaitSettlement,
            OrdersTransiting = ordersTransiting,
            OrderDetailsTransiting = orderDetailsTransiting,
            OrdersDelivering = ordersDelivering,
            OrderDetailsDelivering = orderDetailsDelivering,
            OrdersDelivered = ordersDelivered,
            OrderDetailsDelivered = orderDetailsDelivered,
            OrdersDestroy = ordersDestroy,
            OrderDetailsDestroy = orderDetailsDestroy,
            TotalPage = totalPage,
            PageSize = pageSize,
            CurrentPage = currentPage
        };
        return Ok(model);
    }

    [HttpGet]
    [Route("/user/purchase/order/{orderID?}")]
    public IActionResult Order() {
        // Lấy Cookies trên trình duyệt
        var userID = Request.Cookies["UserID"];
        if (userID != null)
        {
            _accessor?.HttpContext?.Session.SetInt32("UserID", Convert.ToInt32(userID));
        } else {
            return Redirect("/user/login");
        }
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        if (sessionUserID != null)
        {
            List<User> users = _userResponsitory.checkUserLogin(Convert.ToInt32(sessionUserID)).ToList();
            _accessor?.HttpContext?.Session.SetString("UserName", users[0].sUserName);
            _accessor?.HttpContext?.Session.SetInt32("RoleID", users[0].FK_iRoleID);
        }
        else
        {
            _accessor?.HttpContext?.Session.SetString("UserName", "");
        }
        ShopeeViewModel model = new ShopeeViewModel {

        };
        return View(model);
    }

    [HttpGet]
    [Route("/user/purchase/order-data/{orderID?}")]
    public IActionResult OrderData(int orderID = 0) {
        int userID = Convert.ToInt32(_accessor?.HttpContext?.Session.GetInt32("UserID"));
        IEnumerable<Order> order = _orderResponsitory.getOrderByOrderID(orderID);
        IEnumerable<Store> store = _shopResponsitory.getShopByOrderID(orderID);
        List<Address> address = _checkoutResponsitory.checkAddressAccount(userID).ToList();
        List<ShippingOrder> shippingOrder = _shippingOrderRepository.getShippingOrderByOrderID(orderID).ToList();
        ShopeeViewModel model = new ShopeeViewModel {
            Order = order,
            Store = store,
            Address = address,
            ShippingOrder = shippingOrder
        };
        return Ok(model);
    }
}