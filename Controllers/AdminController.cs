using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Project.Models;

public class AdminController : Controller {
    private readonly DatabaseContext _context;
    private readonly IUserResponsitory _userResponsitory;
    private readonly IAdminResponsitory _adminResponsitory;
    private readonly IHttpContextAccessor _accessor;
    private readonly IOrderResponsitory _orderResponsitory;
    private readonly ICheckoutResponsitory _checkoutResponsitory;
    private readonly IShippingOrderRepository _shippingOrderRepository;
    private readonly ISellerResponsitory _sellerResponsitory;
    public AdminController(
        DatabaseContext context, 
        IAdminResponsitory adminResponsitory, 
        IHttpContextAccessor accessor, 
        IOrderResponsitory orderResponsitory, 
        ICheckoutResponsitory checkoutResponsitory, 
        IUserResponsitory userResponsitory, 
        IShippingOrderRepository shippingOrderRepository,
        ISellerResponsitory sellerResponsitory)
    {
        _context = context;
        _adminResponsitory = adminResponsitory;
        _accessor = accessor;
        _orderResponsitory = orderResponsitory;
        _checkoutResponsitory = checkoutResponsitory;
        _userResponsitory = userResponsitory;
        _shippingOrderRepository = shippingOrderRepository;
        _sellerResponsitory = sellerResponsitory;
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
        IEnumerable<ShippingOrder> ordersWaitPickup = _adminResponsitory.getOrsersWaitPickup();
        IEnumerable<ShippingPicker> shippingPickers = _shippingOrderRepository.getShippingPickers();
        IEnumerable<UserInfo> userInfos = _userResponsitory.getUsersInfo();
        string htmlWaitSettlmentItem = "";
        foreach (var item in ordersWaitSettlment) {
            htmlWaitSettlmentItem += $" <div class='admin__order-table-body-row'>";
            htmlWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.PK_iOrderID}</div>";
            htmlWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.sFullName}</div>";
            htmlWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.sStoreName}</div>";
            htmlWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.dDate.ToString("dd/MM/yyyy")}</div>";
            htmlWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.fTotalPrice.ToString("#,##0.00")}VND</div>"; // Đặt tiền: https://www.phanxuanchanh.com/2021/10/26/dinh-dang-tien-te-trong-c/
            htmlWaitSettlmentItem += $"     <div class='admin__order-table-body-col'>{item.sOrderStatusName}</div>";
            htmlWaitSettlmentItem += $"     <div class='admin__order-table-body-col payment'>";
            htmlWaitSettlmentItem += $"            <div class='admin__order-table-body-col-payment-name'>{item.sPaymentName}</div>";
            htmlWaitSettlmentItem += $"     </div>";
            htmlWaitSettlmentItem += $"     <div class='admin__order-table-body-col primary'>";
            htmlWaitSettlmentItem += $"         <a href='/admin/order/{item.PK_iOrderID}' class='admin__order-table-body-col-link'>Chi tiết</a>";
            htmlWaitSettlmentItem += $"     </div>";
            htmlWaitSettlmentItem += $" </div>";
        }
        string htmlWaitPickupItem = "";
        foreach (var item in ordersWaitPickup) {
            htmlWaitPickupItem += $" <div class='admin__order-table-body-row'>";
            htmlWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.FK_iOrderID}</div>";
            htmlWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.sFullName}</div>";
            htmlWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.sStoreName}</div>";
            htmlWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.dDate.ToString("dd/MM/yyyy")}</div>";
            htmlWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.fTotalPrice.ToString("#,##0.00")}VND</div>"; // Đặt tiền: https://www.phanxuanchanh.com/2021/10/26/dinh-dang-tien-te-trong-c/
            htmlWaitPickupItem += $"     <div class='admin__order-table-body-col'>{item.sOrderStatusName}</div>";
            htmlWaitPickupItem += $"     <div class='admin__order-table-body-col payment'>{item.sPaymentName}</div>";
            htmlWaitPickupItem += $"     <div class='admin__order-table-body-col primary'>";
            htmlWaitPickupItem += $"         <a href='/admin/bill/{item.FK_iOrderID}' class='admin__order-table-body-col-link'>Chi tiết</a>";
            htmlWaitPickupItem += $"     </div>";
            htmlWaitPickupItem += $" </div>";
        }

        string htmlShippingPickerItem = "";
        foreach (var item in shippingPickers) {
            htmlShippingPickerItem += $" <div class='admin__order-table-body-row'>";
            htmlShippingPickerItem += $"     <div class='admin__order-table-body-col'>ĐH{item.FK_iOrderID}</div>";
            htmlShippingPickerItem += $"     <div class='admin__order-table-body-col'>{item.sStoreName}</div>";
            htmlShippingPickerItem += $"     <div class='admin__order-table-body-col'>{item.dShippingPickerTime.ToString("dd/MM/yyyy")}</div>";
            htmlShippingPickerItem += $"     <div class='admin__order-table-body-col'>{item.fTotalPrice.ToString("#,##0.00")}VND</div>"; // Đặt tiền: https://www.phanxuanchanh.com/2021/10/26/dinh-dang-tien-te-trong-c/
            htmlShippingPickerItem += $"     <div class='admin__order-table-body-col'>{item.sOrderStatusName}</div>";
            htmlShippingPickerItem += $"     <div class='admin__order-table-body-col primary'>";
            htmlShippingPickerItem += $"         <a href='/admin/bill/{item.FK_iOrderID}' class='admin__order-table-body-col-link'>Chi tiết</a>";
            htmlShippingPickerItem += $"     </div>";
            htmlShippingPickerItem += $" </div>";
        }

        string htmlUsersInfoItem = "";
        foreach (var item in userInfos) {
            htmlUsersInfoItem += $" <div class='admin__order-table-body-row'>";
            htmlUsersInfoItem += $"     <div class='admin__order-table-body-col'>{item.sUserName}</div>";
            htmlUsersInfoItem += $"     <div class='admin__order-table-body-col'>{item.sEmail}</div>";
            htmlUsersInfoItem += $"     <div class='admin__order-table-body-col'>{item.sDescription}</div>";
            htmlUsersInfoItem += $"     <div class='admin__order-table-body-col'>{item.dUpdateTime.ToString("dd/MM/yyyy")}</div>";
            htmlUsersInfoItem += $"     <div class='admin__order-table-body-col islock'>";
            if (item.iIsLock == 0) {
                htmlUsersInfoItem += $"     <div class='admin-account__control active'>"; 
                htmlUsersInfoItem += $"         <div class='admin-account__control-circle'></div>";      
                htmlUsersInfoItem += $"     </div>";
            } else {
                htmlUsersInfoItem += $"     <div class='admin-account__control'>"; 
                htmlUsersInfoItem += $"         <div class='admin-account__control-circle'></div>";      
                htmlUsersInfoItem += $"     </div>";
            }
            htmlUsersInfoItem += $"     </div>";
            htmlUsersInfoItem += $"     <div class='admin__order-table-body-col del'>";
            htmlUsersInfoItem += $"         <div class='admin-account__more' onclick='showAccountTool(event)'>";
            htmlUsersInfoItem += $"             <i class='uil uil-ellipsis-v admin-account__more-icon'></i>";
            htmlUsersInfoItem += $"             <div class='admin-account__more-container'>";
            htmlUsersInfoItem += $"                 <div class='admin-account__more-item' onclick='openUpdateAccount()'>";
            htmlUsersInfoItem += $"                     <i class='uil uil-pen admin-account__more-item-icon'></i>";
            htmlUsersInfoItem += $"                     <span>Chỉnh sửa</span>";
            htmlUsersInfoItem += $"                 </div>";
            htmlUsersInfoItem += $"                 <div class='admin-account__more-item' onclick='openDeleteAccount()'>";
            htmlUsersInfoItem += $"                     <i class='uil uil-trash admin-account__more-item-icon'></i>";
            htmlUsersInfoItem += $"                     <span>Xoá</span>";
            htmlUsersInfoItem += $"                 </div>";
            htmlUsersInfoItem += $"             </div>";
            htmlUsersInfoItem += $"         </div>";
            htmlUsersInfoItem += $"     </div>";
            htmlUsersInfoItem += $" </div>";
        }
        AdminViewModel model = new AdminViewModel {
            OrdersWaitSettlment = ordersWaitSettlment,
            HtmlWaitSettlmentItem = htmlWaitSettlmentItem,
            OrdersWaitPickup = ordersWaitPickup,
            HtmlWaitPickupItem = htmlWaitPickupItem,
            ShippingPickers = shippingPickers,
            HtmlShippingPickerItem = htmlShippingPickerItem,
            UserInfos = userInfos,
            HtmlUsersInfoItem = htmlUsersInfoItem,
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
        Status status;
        List<Order> order = _orderResponsitory.getOrderWaitSettlementByOrderID(Convert.ToInt32(sessionOrderID)).ToList();
        if (_orderResponsitory.confirmOrderAboutWaitPickup(Convert.ToInt32(sessionOrderID), order[0].PK_iUserID)) {
            status = new Status {
                StatusCode = 1,
                Message = "Xác nhận đơn hàng thành công!"
            };
        } else {
            status = new Status {
                StatusCode = 1,
                Message = "Xác nhận đơn hàng thất bại!"
            };
        }
        return Ok(status);
    }

    [HttpGet]
    [Route("/admin/bill/{orderID?}")]
    public IActionResult Bill(int orderID = 0) {
        // Lấy Cookie tài khoản người dùng trên trình duyệt
        var userID = Request.Cookies["UserID"];
        if (userID != null) {
            _accessor?.HttpContext?.Session.SetInt32("UserID", Convert.ToInt32(userID));
        } else {
            return Redirect("/user/login");
        }
        // Lấy đơn vận theo mã đơn hàng
        List<ShippingOrder> shippingOrder = _shippingOrderRepository.getShippingOrderByOrderID(orderID).ToList();
        _accessor?.HttpContext?.Session.SetInt32("CurrentShippingOrderID", shippingOrder[0].PK_iShippingOrderID);
        return View();
    }

    [HttpGet]
    [Route("/admin/bill-api")]
    public IActionResult BillAPI() {
        var sessionShippingOrderID = _accessor?.HttpContext?.Session.GetInt32("CurrentShippingOrderID");
        IEnumerable<SellerInfo> sellerInfos = _sellerResponsitory.getSellerInfoByShippingOrderID(Convert.ToInt32(sessionShippingOrderID));
        List<ShippingOrder> shippingOrders = _shippingOrderRepository.getShippingOrderByID(Convert.ToInt32(sessionShippingOrderID)).ToList();
        IEnumerable<Order> ordersPickingUp = _orderResponsitory.getOrderWaitPickingUpByOrderID(shippingOrders[0].FK_iOrderID);
        IEnumerable<OrderDetail> orderDetailsPickingUp = _orderResponsitory.getOrderDetailPickingUpByOrderID(shippingOrders[0].FK_iOrderID);
        List<Address> deliveryAddresses = _checkoutResponsitory.getAddressAccountByOrderID(shippingOrders[0].FK_iOrderID).ToList();
        AdminViewModel model = new AdminViewModel {
            ShippingOrders = shippingOrders,
            SellerInfos = sellerInfos,
            OrdersPickingUp = ordersPickingUp,
            OrderDetailsPickingUp = orderDetailsPickingUp,
            Addresses = deliveryAddresses
        };
        return Ok(model); 
    }
}