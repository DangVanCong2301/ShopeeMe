using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;

public class AdminController : Controller {
    private readonly DatabaseContext _context;
    private readonly IUserResponsitory _userResponsitory;
    private readonly IAdminResponsitory _adminResponsitory;
    private readonly IHttpContextAccessor _accessor;
    private readonly IOrderResponsitory _orderResponsitory;
    private readonly ICheckoutResponsitory _checkoutResponsitory;
    public AdminController(DatabaseContext context, IAdminResponsitory adminResponsitory, IHttpContextAccessor accessor, IOrderResponsitory orderResponsitory, ICheckoutResponsitory checkoutResponsitory, IUserResponsitory userResponsitory)
    {
        _context = context;
        _adminResponsitory = adminResponsitory;
        _accessor = accessor;
        _orderResponsitory = orderResponsitory;
        _checkoutResponsitory = checkoutResponsitory;
        _userResponsitory = userResponsitory;
    }

    [Route("/admin")]
    public IActionResult Index() {
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
    public IActionResult Index(Category category) {
        if (!ModelState.IsValid) {
            return View(category);
        }
        TempData["msg"] = "Thêm thể loại thành công!";
        return RedirectToAction("Index");
    }

    [HttpPost]
    [Route("/admin/get-data")]
    public IActionResult GetData() {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        var sellerUsername = _accessor?.HttpContext?.Session.GetString("UserName");
        var sessionRoleID = _accessor?.HttpContext?.Session.GetInt32("RoleID");
        IEnumerable<Order> ordersWaitSettlment = _adminResponsitory.getOrdersWaitSettlment().ToList();
        IEnumerable<Order> ordersWaitPickup = _adminResponsitory.getOrsersWaitPickup();
        string htmlWaitSettlmentItem = "";
        foreach (var item in ordersWaitSettlment) {
            htmlWaitSettlmentItem += $" <div class='admin__order-table-body-row'>";
            htmlWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.PK_iOrderID}</div>";
            htmlWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.sFullName}</div>";
            htmlWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.sStoreName}</div>";
            htmlWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.dDate.ToString("dd/MM/yyyy")}</div>";
            htmlWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.fTotalPrice.ToString("#,##0.00")}VND</div>"; // Đặt tiền: https://www.phanxuanchanh.com/2021/10/26/dinh-dang-tien-te-trong-c/
            htmlWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.sOrderStatusName}</div>";
            htmlWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.sPaymentName}</div>";
            htmlWaitSettlmentItem += $"     <div class='admin__order-table-body-col primary'>";
            htmlWaitSettlmentItem += $"         <a href='/admin/order/{item.PK_iOrderID}' class='admin__order-table-body-col-link'>Chi tiết</a>";
            htmlWaitSettlmentItem += $"     </div>";
            htmlWaitSettlmentItem += $" </div>";
        }
        string htmlWaitPickupItem = "";
        foreach (var item in ordersWaitPickup) {
            htmlWaitPickupItem += $" <div class='admin__order-table-body-row'>";
            htmlWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.PK_iOrderID}</div>";
            htmlWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.sFullName}</div>";
            htmlWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.sStoreName}</div>";
            htmlWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.dDate.ToString("dd/MM/yyyy")}</div>";
            htmlWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.fTotalPrice.ToString("#,##0.00")}VND</div>"; // Đặt tiền: https://www.phanxuanchanh.com/2021/10/26/dinh-dang-tien-te-trong-c/
            htmlWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.sOrderStatusName}</div>";
            htmlWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.sPaymentName}</div>";
            htmlWaitPickupItem += $"     <div class='admin__order-table-body-col primary'>";
            htmlWaitPickupItem += $"         <a href='/admin/order/{item.PK_iOrderID}' class='admin__order-table-body-col-link'>Chi tiết</a>";
            htmlWaitPickupItem += $"     </div>";
            htmlWaitPickupItem += $" </div>";
        }
        AdminViewModel model = new AdminViewModel {
            OrdersWaitSettlment = ordersWaitSettlment,
            HtmlWaitSettlmentItem = htmlWaitSettlmentItem,
            OrdersWaitPickup = ordersWaitPickup,
            HtmlWaitPickupItem = htmlWaitPickupItem,
            RoleID = Convert.ToInt32(sessionRoleID),
            UserID = Convert.ToInt32(sessionUserID),
            Username = sellerUsername
        };
        return Ok(model);
    }

    [HttpGet]
    [Route("/admin/order/{id?}")]
    public IActionResult Order(int id) {
        _accessor?.HttpContext?.Session.SetInt32("CurrentOrderID", id);
        return View();
    }

    [HttpPost]
    [Route("/admin/order")]
    public IActionResult Order() {
        var sessionOrderID = _accessor?.HttpContext?.Session.GetInt32("CurrentOrderID");
        IEnumerable<OrderDetail> orderDetails = _orderResponsitory.getOrderDetailWaitSettlementByOrderID(Convert.ToInt32(sessionOrderID));
        List<Order> order = _orderResponsitory.getOrderWaitSettlementByOrderID(Convert.ToInt32(sessionOrderID)).ToList();
        List<Address> addresses = _checkoutResponsitory.checkAddressAccount(order[0].PK_iUserID).ToList();
        List<Payment> payments = _checkoutResponsitory.checkPaymentsTypeByUserID(Convert.ToInt32(order[0].PK_iUserID)).ToList();
        AdminViewModel model = new AdminViewModel {
            OrdersWaitSettlment = order,
            OrderDetails = orderDetails,
            Addresses = addresses,
            Payments = payments
        };
        return Ok(model);
    }

    [HttpGet]
    [Route("/admin/confirm-order")]
    public IActionResult ConfirmOrder() {
        var sessionOrderID = _accessor?.HttpContext?.Session.GetInt32("CurrentOrderID");
        List<Order> order = _orderResponsitory.getOrderWaitSettlementByOrderID(Convert.ToInt32(sessionOrderID)).ToList();
        _orderResponsitory.confirmOrderAboutPickup(Convert.ToInt32(sessionOrderID), order[0].PK_iUserID);
        Status status = new Status {
            StatusCode = 1,
            Message = "Xác nhận đơn hàng thành công!"
        };
        return Ok(status);
    }
}