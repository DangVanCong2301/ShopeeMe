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
        return View();
    }

    [HttpGet]
    [Route("/seller/login")]
    public IActionResult Login() {
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
            string value = _userResponsitory.encrypt(sellerLogin[0].PK_iSellerID.ToString());
            // // Tạo cookies cho tài khoản người bán
            // CookieOptions options = new CookieOptions
            // {
            //     Expires = DateTime.Now.AddDays(1),
            //     Secure = true,
            //     HttpOnly = true,
            //     SameSite = SameSiteMode.None,
            //     Path = "/",
            //     IsEssential = true
            // };
            // Response.Cookies.Append("SellerID", value, options);
            // _accessor?.HttpContext?.Session.SetString("SellerUsername", sellerUsername);
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
}