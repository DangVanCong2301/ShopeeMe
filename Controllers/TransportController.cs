using Microsoft.AspNetCore.Mvc;
using Project.Models;

public class TransportController : Controller 
{
    private readonly IHttpContextAccessor _accessor;
    private readonly IUserResponsitory _userResponsitory;
    private readonly ITransportRepository _transportRepository;
    private readonly IShippingOrderRepository _shippingOrderRepository;

    public TransportController(IHttpContextAccessor accessor, IUserResponsitory userResponsitory, ITransportRepository transportRepository, IShippingOrderRepository shippingOrderRepository)
    {
        _accessor = accessor;
        _userResponsitory = userResponsitory;
        _transportRepository = transportRepository;
        _shippingOrderRepository = shippingOrderRepository;
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
        IEnumerable<ShippingOrder> ordersWaitPickup = _transportRepository.getShippingOrdersWaitPickup();
        IEnumerable<ShippingPicker> ordersPickingUp = _transportRepository.getShippingPickerPickingUp();
        string htmlOrdersWaitPickupItem = "";
        foreach (var item in ordersWaitPickup) {
            htmlOrdersWaitPickupItem += $"  <div class='phone-pickup__work'>";
            htmlOrdersWaitPickupItem += $"      <div class='phone-pickup__work-row'>";
            htmlOrdersWaitPickupItem += $"          <div class='phone-pickup__work-col-1'>Mã đơn hàng</div>";
            htmlOrdersWaitPickupItem += $"          <div class='phone-pickup__work-col-2'>ĐH{item.FK_iOrderID}</div>";
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
            htmlOrdersWaitPickupItem += $"              <a href='javascript:openOrderDetail({item.FK_iOrderID})' class='phone-pickup__work-link'>Chi tiết đơn</a>";
            htmlOrdersWaitPickupItem += $"          </div>";
            htmlOrdersWaitPickupItem += $"      </div>";
            htmlOrdersWaitPickupItem += $"  </div>";
        }
        string htmlOrderPickingUpItem = "";
        foreach (var item in ordersPickingUp) {
            htmlOrderPickingUpItem += $"  <div class='phone-pickup__work'>";
            htmlOrderPickingUpItem += $"      <div class='phone-pickup__work-row'>";
            htmlOrderPickingUpItem += $"          <div class='phone-pickup__work-col-1'>Mã đơn hàng</div>";
            htmlOrderPickingUpItem += $"          <div class='phone-pickup__work-col-2'>ĐH{item.FK_iOrderID}</div>";
            htmlOrderPickingUpItem += $"      </div>";
            htmlOrderPickingUpItem += $"      <div class='phone-pickup__work-row'>";
            htmlOrderPickingUpItem += $"          <div class='phone-pickup__work-col-1'>Khách hàng</div>";
            htmlOrderPickingUpItem += $"          <div class='phone-pickup__work-col-2'>{item.sFullName}</div>";
            htmlOrderPickingUpItem += $"      </div>";
            htmlOrderPickingUpItem += $"      <div class='phone-pickup__work-row'>";
            htmlOrderPickingUpItem += $"          <div class='phone-pickup__work-col-1'>Ngày đặt</div>";
            htmlOrderPickingUpItem += $"          <div class='phone-pickup__work-col-2'>{item.dDate.ToString("dd/MM/yyyy")}</div>";
            htmlOrderPickingUpItem += $"      </div>";
            htmlOrderPickingUpItem += $"      <div class='phone-pickup__work-row'>";
            htmlOrderPickingUpItem += $"          <div class='phone-pickup__work-col-1'>Tổng tiền</div>";
            htmlOrderPickingUpItem += $"          <div class='phone-pickup__work-col-2'>{item.fTotalPrice.ToString("#,##0.00")} VNĐ</div>";
            htmlOrderPickingUpItem += $"      </div>";
            htmlOrderPickingUpItem += $"      <div class='phone-pickup__work-row'>";
            htmlOrderPickingUpItem += $"          <div class='phone-pickup__work-col-1'>Trạng thái</div>";
            htmlOrderPickingUpItem += $"          <div class='phone-pickup__work-col-2'>{item.sOrderStatusName}</div>";
            htmlOrderPickingUpItem += $"      </div>";
            htmlOrderPickingUpItem += $"      <div class='phone-pickup__work-row'>";
            htmlOrderPickingUpItem += $"          <div class='phone-pickup__work-col-1'>Thanh toán</div>";
            htmlOrderPickingUpItem += $"          <div class='phone-pickup__work-col-2'>{item.sPaymentName}</div>";
            htmlOrderPickingUpItem += $"      </div>";
            htmlOrderPickingUpItem += $"      <div class='phone-pickup__work-row'>";
            htmlOrderPickingUpItem += $"          <div class='phone-pickup__work-col-1'></div>";
            htmlOrderPickingUpItem += $"          <div class='phone-pickup__work-col-2'>";
            htmlOrderPickingUpItem += $"              <a href='javascript:openOrderDetail({item.FK_iOrderID})' class='phone-pickup__work-link'>Chi tiết đơn</a>";
            htmlOrderPickingUpItem += $"          </div>";
            htmlOrderPickingUpItem += $"      </div>";
            htmlOrderPickingUpItem += $"  </div>";
        }
        IEnumerable<SellerInfo> sellerInfos = _transportRepository.getSellerInfoByOrderID(orderID);
        IEnumerable<OrderDetail> orderDetails = _transportRepository.getOrderDetailWaitPickupByOrderID(orderID);
        IEnumerable<OrderDetail> orderDetailsPickingUp = _transportRepository.getOrderDetailPickingUpByOrderID(orderID);
        IEnumerable<Payment> payments = _transportRepository.getPaymentsTypeByOrderID(orderID);
        IEnumerable<ShippingOrder> shippingOrders = _shippingOrderRepository.getShippingOrderByOrderID(orderID);
        IEnumerable<ShippingPicker> shippingPickers = _shippingOrderRepository.getShippingPickerByOrderID(orderID);
        TransportViewModel model = new TransportViewModel {
            OrdersWaitPickup = ordersWaitPickup,
            OrdersPickingUp = ordersPickingUp,
            HtmlOrdersWaitPickupItem = htmlOrdersWaitPickupItem,
            HtmlOrderPickingUpItem = htmlOrderPickingUpItem,
            SellerInfos = sellerInfos,
            OrderDetails = orderDetails,
            orderDetailsPickingUp = orderDetailsPickingUp,
            Payments = payments,
            ShippingOrders = shippingOrders,
            ShippingPickers = shippingPickers
        };
        return Ok(model);
    }  

    [HttpPost]
    [Route("/picker-api/take")]
    public IActionResult PickerAPITakeOrder(int shippingOrderID = 0) {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        List<Order> order = _transportRepository.getOrderWaitPickupByShippingOrderID(shippingOrderID).ToList();
        // Xác nhận đơn hàng về đang lấy
        _transportRepository.confirmOrderAboutPickingUp(order[0].PK_iOrderID);
        // Thêm đơn hàng lấy
        _transportRepository.insertShippingPicker(shippingOrderID, Convert.ToInt32(sessionUserID));
        IEnumerable<ShippingOrder> ordersWaitPickup = _transportRepository.getShippingOrdersWaitPickup();
        IEnumerable<ShippingPicker> ordersPickingUp = _transportRepository.getShippingPickerPickingUp();
        Status status = new Status {
            StatusCode = 1,
            Message = "Nhận đơn thành công!"
        };
        TransportViewModel model = new TransportViewModel {
            OrdersWaitPickup = ordersWaitPickup,
            OrdersPickingUp = ordersPickingUp,
            Status = status
        };
        return Ok(model);
    }

    [HttpPost]
    [Route("/picker-api/taken")]
    public IActionResult PickerAPITakenOrder(int shippingPickerID = 0, int shippingOrderID = 0, int orderID = 0, string shippingPickerImg = "") {
        System.Console.WriteLine("orderID: " + orderID);
        Status status;
        if (
            _transportRepository.confirmShippingPickerAboutTaken(shippingPickerID) && 
            _transportRepository.confirmShippingOrderAboutDelivered(shippingOrderID) && 
            _transportRepository.updatePickerImage(shippingPickerID, shippingPickerImg)
        ) {
            status = new Status {
                StatusCode = 1,
                Message = "Cập nhật trạng thái thành công!"
            };
        }
        else
        {
            status = new Status
            {
                StatusCode = -1,
                Message = "Cập nhật trạng thái thất bại!"
            };
        }

        IEnumerable<SellerInfo> sellerInfos = _transportRepository.getSellerInfoByOrderID(orderID);
        IEnumerable<OrderDetail> orderDetails = _transportRepository.getOrderDetailWaitPickupByOrderID(orderID);
        IEnumerable<OrderDetail> orderDetailsPickingUp = _transportRepository.getOrderDetailPickingUpByOrderID(orderID);
        IEnumerable<Payment> payments = _transportRepository.getPaymentsTypeByOrderID(orderID);
        IEnumerable<ShippingOrder> shippingOrders = _shippingOrderRepository.getShippingOrderByOrderID(orderID);
        IEnumerable<ShippingPicker> shippingPickers = _shippingOrderRepository.getShippingPickerByOrderID(orderID);
        TransportViewModel model = new TransportViewModel {
            Status = status,
            SellerInfos = sellerInfos,
            OrderDetails = orderDetails,
            orderDetailsPickingUp = orderDetailsPickingUp,
            Payments = payments,
            ShippingOrders = shippingOrders,
            ShippingPickers = shippingPickers
        };
        return Ok(model);
    } 

    [Route("/delivery")]
    [HttpGet]
    public IActionResult Delivery() {
        return View();
    }
}