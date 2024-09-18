using Microsoft.AspNetCore.Mvc;

public class SellerController : Controller
{
    private readonly IUserResponsitory _userResponsitory;
    private readonly ISellerResponsitory _sellerResponsitory;
    private readonly IHttpContextAccessor _accessor;
    public SellerController(IHttpContextAccessor accessor, IUserResponsitory userResponsitory, ISellerResponsitory sellerResponsitory)
    {
        _accessor = accessor;
        _userResponsitory = userResponsitory;
        _sellerResponsitory = sellerResponsitory;
    }

    [HttpGet]
    [Route("/seller")]
    public IActionResult Index() {
        // Lấy Cookie trên trình duyệt
        var sellerID = Request.Cookies["SellerID"];
        if (sellerID != null) {
            _accessor?.HttpContext?.Session.SetInt32("SellerID", Convert.ToInt32(sellerID));
        } else {
            return Redirect("/seller/login");
        }
        var sessionSellerID = _accessor?.HttpContext?.Session.GetInt32("SellerID");
        List<Seller> seller = _sellerResponsitory.getSellerAccountByID(Convert.ToInt32(sessionSellerID)).ToList();
        _accessor?.HttpContext?.Session.SetString("SellerUsername", seller[0].sSellerUsername);
        return View();
    }

    [HttpPost]
    [Route("/seller")]
    public IActionResult GetData() {
        var sessionSellerID = _accessor?.HttpContext?.Session.GetInt32("SellerID");
        var sessionSellerUsername = _accessor?.HttpContext?.Session.GetString("SellerUsername");
        SellerViewModel model = new SellerViewModel {
            SellerID = Convert.ToInt32(sessionSellerID),
            SellerUsername = sessionSellerUsername
        };
        return Ok(model);
    }

    [HttpGet]
    [Route("/seller/login")]
    public IActionResult Login() {
        // Lấy Cookie trên trình duyệt
        var sellerID = Request.Cookies["SellerID"];
        if (sellerID != null) {
            _accessor?.HttpContext?.Session.SetInt32("SellerID", Convert.ToInt32(sellerID));
            return Redirect("/seller");
        }
        return View();
    }

    [HttpPost]
    [Route("/seller/login")]
    public IActionResult Login(string phone = "", string password = "") {
        password = _userResponsitory.encrypt(password);
        List<Seller> sellerLogin = _sellerResponsitory.loginAccount(phone, password).ToList();
        Status status;
        if (sellerLogin.Count() == 0) {
            status = new Status {
                StatusCode = -1,
                Message = "Tên đăng nhập hoặc mật khẩu không chính xác!"
            };
        } else {
            status = new Status {
                StatusCode = 1,
                Message = "Đăng nhập thành công!"
            };
            string sellerUsername = sellerLogin[0].sSellerUsername;
            string value = sellerLogin[0].PK_iSellerID.ToString();
            // Tạo cookies cho tài khoản người bán
            CookieOptions options = new CookieOptions
            {
                Expires = DateTime.Now.AddDays(1),
                Secure = true,
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Path = "/",
                IsEssential = true
            };
            Response.Cookies.Append("SellerID", value, options);
            _accessor?.HttpContext?.Session.SetString("SellerUsername", sellerUsername);
        }
        SellerViewModel model = new SellerViewModel {
            Status = status
        };
        return Ok(model);
    }

    [HttpGet]
    [Route("/seller/register")]
    public IActionResult Register() {
        return View();
    }

    [HttpGet]
    [Route("/seller/forgot")]
    public IActionResult Forgot() {
        return View();
    }

    [HttpPost]
    [Route("/seller/forgot")]
    public IActionResult Forgot(string phone = "") {
        List<Seller> seller = _sellerResponsitory.getPasswordSellerAccountByPhone(phone).ToList();
        Status status;
        if (seller.Count() == 0) {
            status = new Status {
                StatusCode = -1,
                Message = "Không tồn tại số điện thoại!"
            };
        } else {
            string sellerPassword = _userResponsitory.decrypt(seller[0].sSellerPassword);
            status = new Status {
                StatusCode = 1,
                Message = $"Mật khẩu tài khoản của bạn: {sellerPassword}"
            };
        }
        SellerViewModel model = new SellerViewModel {
            Status = status
        };
        return Ok(model);
    }

    [HttpGet]
    [Route("/seller/change")]
    public IActionResult Change() {
        // Lấy Cookies trên trình duyệt
        var sellerID = Request.Cookies["SellerID"];
        if (sellerID != null)
        {
            _accessor?.HttpContext?.Session.SetInt32("SellerID", Convert.ToInt32(sellerID));
        }
        var sessionSellerID = _accessor?.HttpContext?.Session.GetInt32("SellerID");
        if (sessionSellerID == null)
        {
            _accessor?.HttpContext?.Session.SetInt32("SellerID", 0);
        }
        System.Console.WriteLine("sessionSellerID: " + sellerID);
        return View();
    }

    [HttpPost]
    [Route("/seller/change")]
    public IActionResult Change(string oldPassword = "", string newPassword = "") {
        oldPassword = _userResponsitory.encrypt(oldPassword);
        newPassword = _userResponsitory.encrypt(newPassword);
        var sessionSellerID = _accessor?.HttpContext?.Session.GetInt32("SellerID");
        List<Seller> sellerLogin = _sellerResponsitory.checkSellerAccountByIDAndPass(Convert.ToInt32(sessionSellerID), oldPassword).ToList();
        Status status;
        if (sellerLogin.Count() == 0)
        {
            status = new Status
            {
                StatusCode = -1,
                Message = "Mật khẩu cũ không chính xác!"
            };
        }
        else
        {
            _sellerResponsitory.changePasswordSellerAccount(Convert.ToInt32(sessionSellerID), newPassword);
            status = new Status
            {
                StatusCode = 1,
                Message = "Đổi mật khẩu thành công!"
            };
        }
        SellerViewModel model = new SellerViewModel {
            Status = status
        };
        return Ok(model);
    }

    [HttpGet]
    [Route("/seller/logout")]
    public IActionResult Logout() {
        CookieOptions options = new CookieOptions {
            Expires = DateTime.Now.AddDays(-1)
        };
        Response.Cookies.Append("SellerID", "0", options);
        _accessor?.HttpContext?.Session.SetInt32("SellerID", 0);
        Status status = new Status {
            StatusCode = 1,
            Message = "Đăng xuất thành công!"
        };
        return Ok(status);
    }
}