using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project.Models;

public class AdminController : Controller {
    private readonly DatabaseContext _context;
    private readonly IAdminResponsitory _adminResponsitory;
    public AdminController(DatabaseContext context, IAdminResponsitory adminResponsitory)
    {
        _context = context;
        _adminResponsitory = adminResponsitory;
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
            htmlWaitSettlmentItem += $"         <a href='#' class='admin__order-table-body-col-link'>Chi tiết</a>";
            htmlWaitSettlmentItem += $"     </div>";
            htmlWaitSettlmentItem += $" </div>";
        }
        AdminViewModel model = new AdminViewModel {
            OrdersWaitSettlment = ordersWaitSettlment,
            HtmlWaitSettlmentItem = htmlWaitSettlmentItem
        };
        return Ok(model);
    }
}