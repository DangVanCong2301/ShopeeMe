using Microsoft.AspNetCore.Mvc;
using Project.Models;

public class TransportController : Controller 
{
    private readonly IHttpContextAccessor _accessor;
    private readonly IUserResponsitory _userResponsitory;
    private readonly ITransportRepository _transportRepository;

    public TransportController(IHttpContextAccessor accessor, IUserResponsitory userResponsitory, ITransportRepository transportRepository)
    {
        _accessor = accessor;
        _userResponsitory = userResponsitory;
        _transportRepository = transportRepository;
    }

    [Route("/picker")]
    [HttpGet]
    public IActionResult Picker() {
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

    [HttpGet]
    [Route("/picker-api/{orderID?}")]
    public IActionResult PickerAPI(int orderID = 0) {
        IEnumerable<Order> ordersWaitPickup = _transportRepository.getOrdersWaitPickup();
        string htmlOrdersWaitPickupItem = "";
        foreach (var item in ordersWaitPickup) {
            htmlOrdersWaitPickupItem += $"  <div class='phone-pickup__work'>";
            htmlOrdersWaitPickupItem += $"      <div class='phone-pickup__work-row'>";
            htmlOrdersWaitPickupItem += $"          <div class='phone-pickup__work-col-1'>Mã đơn hàng</div>";
            htmlOrdersWaitPickupItem += $"          <div class='phone-pickup__work-col-2'>ĐH{item.PK_iOrderID}</div>";
            htmlOrdersWaitPickupItem += $"      </div>";
            htmlOrdersWaitPickupItem += $"      <div class='phone-pickup__work-row'>";
            htmlOrdersWaitPickupItem += $"          <div class='phone-pickup__work-col-1'>Khách hàng</div>";
            htmlOrdersWaitPickupItem += $"          <div class='phone-pickup__work-col-2'>{item.sFullName}</div>";
            htmlOrdersWaitPickupItem += $"      </div>";
            htmlOrdersWaitPickupItem += $"      <div class='phone-pickup__work-row'>";
            htmlOrdersWaitPickupItem += $"          <div class='phone-pickup__work-col-1'>Ngày đặt</div>";
            htmlOrdersWaitPickupItem += $"          <div class='phone-pickup__work-col-2'>{item.dDate.ToString("dd/MM/yyyy")}</div>";
            htmlOrdersWaitPickupItem += $"      </div>";
            htmlOrdersWaitPickupItem += $"      <div class='phone-pickup__work-row'>";
            htmlOrdersWaitPickupItem += $"          <div class='phone-pickup__work-col-1'>Tổng tiền</div>";
            htmlOrdersWaitPickupItem += $"          <div class='phone-pickup__work-col-2'>{item.fTotalPrice.ToString("#,##0.00")} VNĐ</div>";
            htmlOrdersWaitPickupItem += $"      </div>";
            htmlOrdersWaitPickupItem += $"      <div class='phone-pickup__work-row'>";
            htmlOrdersWaitPickupItem += $"          <div class='phone-pickup__work-col-1'>Trạng thái</div>";
            htmlOrdersWaitPickupItem += $"          <div class='phone-pickup__work-col-2'>{item.sOrderStatusName}</div>";
            htmlOrdersWaitPickupItem += $"      </div>";
            htmlOrdersWaitPickupItem += $"      <div class='phone-pickup__work-row'>";
            htmlOrdersWaitPickupItem += $"          <div class='phone-pickup__work-col-1'>Thanh toán</div>";
            htmlOrdersWaitPickupItem += $"          <div class='phone-pickup__work-col-2'>{item.sPaymentName}</div>";
            htmlOrdersWaitPickupItem += $"      </div>";
            htmlOrdersWaitPickupItem += $"      <div class='phone-pickup__work-row'>";
            htmlOrdersWaitPickupItem += $"          <div class='phone-pickup__work-col-1'></div>";
            htmlOrdersWaitPickupItem += $"          <div class='phone-pickup__work-col-2'>";
            htmlOrdersWaitPickupItem += $"              <a href='javascript:openOrderDetail({item.PK_iOrderID})' class='phone-pickup__work-link'>Chi tiết đơn</a>";
            htmlOrdersWaitPickupItem += $"          </div>";
            htmlOrdersWaitPickupItem += $"      </div>";
            htmlOrdersWaitPickupItem += $"  </div>";
        }
        IEnumerable<SellerInfo> sellerInfos = _transportRepository.getSellerInfoByOrderID(orderID);
        IEnumerable<OrderDetail> orderDetails = _transportRepository.getOrderDetailWaitPickupByOrderID(orderID);
        IEnumerable<Payment> payments = _transportRepository.getPaymentsTypeByOrderID(orderID);
        TransportViewModel model = new TransportViewModel {
            OrdersWaitPickup = ordersWaitPickup,
            HtmlOrdersWaitPickupItem = htmlOrdersWaitPickupItem,
            SellerInfos = sellerInfos,
            OrderDetails = orderDetails,
            Payments = payments
        };
        return Ok(model);
    }  

    [Route("/delivery")]
    [HttpGet]
    public IActionResult Delivery() {
        return View();
    }
}