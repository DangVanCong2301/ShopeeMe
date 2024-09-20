using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;

public class AdminController : Controller {
    private readonly DatabaseContext _context;
    private readonly IAdminResponsitory _adminResponsitory;
    private readonly IHttpContextAccessor _accessor;
    private readonly IOrderResponsitory _orderResponsitory;
    private readonly ICheckoutResponsitory _checkoutResponsitory;
    public AdminController(DatabaseContext context, IAdminResponsitory adminResponsitory, IHttpContextAccessor accessor, IOrderResponsitory orderResponsitory, ICheckoutResponsitory checkoutResponsitory)
    {
        _context = context;
        _adminResponsitory = adminResponsitory;
        _accessor = accessor;
        _orderResponsitory = orderResponsitory;
        _checkoutResponsitory = checkoutResponsitory;
    }

    [Route("/admin")]
    public IActionResult Index() {
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
        IEnumerable<Order> ordersWaitSettlment = _adminResponsitory.getOrdersWaitSettlment().ToList();
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
        AdminViewModel model = new AdminViewModel {
            OrdersWaitSettlment = ordersWaitSettlment,
            HtmlWaitSettlmentItem = htmlWaitSettlmentItem
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
}