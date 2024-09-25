using Microsoft.AspNetCore.Mvc;

public class SellerController : Controller
{
    private readonly IUserResponsitory _userResponsitory;
    private readonly ISellerResponsitory _sellerResponsitory;
    private readonly IShopResponsitory _shopResponsitory;
    private readonly IOrderResponsitory _orderResponsitory;
    private readonly IHttpContextAccessor _accessor;
    public SellerController(IHttpContextAccessor accessor, IUserResponsitory userResponsitory, ISellerResponsitory sellerResponsitory, IShopResponsitory shopResponsitory, IOrderResponsitory orderResponsitory)
    {
        _accessor = accessor;
        _userResponsitory = userResponsitory;
        _sellerResponsitory = sellerResponsitory;
        _shopResponsitory = shopResponsitory;
        _orderResponsitory = orderResponsitory;
    }

    [HttpGet]
    [Route("/seller")]
    public IActionResult Index() {
        // Lấy Cookie trên trình duyệt
        var sellerID = Request.Cookies["SellerID"];
        List<Store> store = _shopResponsitory.getShopBySellerID(Convert.ToInt32(sellerID)).ToList();
        if (sellerID != null) {
            _accessor?.HttpContext?.Session.SetInt32("SellerID", Convert.ToInt32(sellerID));
            _accessor?.HttpContext?.Session.SetInt32("SellerShopID", store[0].PK_iStoreID);
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
        var sessionShopID = _accessor?.HttpContext?.Session.GetInt32("SellerShopID");
        IEnumerable<Order> ordersWaitSettlement = _orderResponsitory.getOrderWaitSettlementByShopID(Convert.ToInt32(sessionShopID));
        IEnumerable<Order> ordersWaitPickup = _orderResponsitory.getOrderWaitPickupByShopID(Convert.ToInt32(sessionShopID));
        string htmlOrdersWaitSettlmentItem = "";
        string htmlOrdersWaitPickupItem = "";
        foreach (var item in ordersWaitSettlement) {
            htmlOrdersWaitSettlmentItem += $" <div class='admin__order-table-body-row'>";
            htmlOrdersWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.PK_iOrderID}</div>";
            htmlOrdersWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.sFullName}</div>";
            htmlOrdersWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.sStoreName}</div>";
            htmlOrdersWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.dDate.ToString("dd/MM/yyyy")}</div>";
            htmlOrdersWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.fTotalPrice.ToString("#,##0.00")}VND</div>"; // Đặt tiền: https://www.phanxuanchanh.com/2021/10/26/dinh-dang-tien-te-trong-c/
            htmlOrdersWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.sOrderStatusName}</div>";
            htmlOrdersWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.sPaymentName}</div>";
            htmlOrdersWaitSettlmentItem += $"     <div class='admin__order-table-body-col primary'>";
            htmlOrdersWaitSettlmentItem += $"         30:00";
            htmlOrdersWaitSettlmentItem += $"     </div>";
            htmlOrdersWaitSettlmentItem += $" </div>";
        }

        foreach (var item in ordersWaitPickup) {
            htmlOrdersWaitPickupItem += $" <div class='admin__order-table-body-row'>";
            htmlOrdersWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.PK_iOrderID}</div>";
            htmlOrdersWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.sFullName}</div>";
            htmlOrdersWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.sStoreName}</div>";
            htmlOrdersWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.dDate.ToString("dd/MM/yyyy")}</div>";
            htmlOrdersWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.fTotalPrice.ToString("#,##0.00")}VND</div>"; // Đặt tiền: https://www.phanxuanchanh.com/2021/10/26/dinh-dang-tien-te-trong-c/
            htmlOrdersWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.sOrderStatusName}</div>";
            htmlOrdersWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.sPaymentName}</div>";
            htmlOrdersWaitPickupItem += $"     <div class='admin__order-table-body-col primary'>";
            htmlOrdersWaitPickupItem += $"         <a href='/admin/order/{item.PK_iOrderID}' class='admin__order-table-body-col-link'>Chuẩn bị hàng</a>";
            htmlOrdersWaitPickupItem += $"     </div>";
            htmlOrdersWaitPickupItem += $" </div>";
        }

        SellerViewModel model = new SellerViewModel {
            SellerID = Convert.ToInt32(sessionSellerID),
            SellerUsername = sessionSellerUsername,
            OrdersWaitSettlement = ordersWaitSettlement,
            OrdersWaitPickup = ordersWaitPickup,
            HtmlOrdersWaitSettlementItem = htmlOrdersWaitSettlmentItem,
            HtmlOrdersWaitPickupItem = htmlOrdersWaitPickupItem
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