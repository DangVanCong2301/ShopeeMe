using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Project.Models;

public class OrderController : Controller {
    private readonly DatabaseContext _context;
    private readonly IOrderResponsitory _orderResponsitory;
    private readonly ICartReponsitory _cartReponsitory;
    private readonly IHttpContextAccessor _accessor;
    public OrderController(DatabaseContext context, IHttpContextAccessor accessor, IOrderResponsitory orderResponsitory, ICartReponsitory cartReponsitory)
    {
        _context = context;
        _accessor = accessor;
        _orderResponsitory = orderResponsitory;
        _cartReponsitory = cartReponsitory;
    }

    public IActionResult Index() {
        return View();
    }

    [HttpPost]
    public IActionResult Checkout() {
        // Fix cứng cũng phải khai báo SqlParameter
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        IEnumerable<CartDetail> carts = _cartReponsitory.getCartInfo(Convert.ToInt32(sessionUserID));
        var totalMoney = _orderResponsitory.totalMoneyProductInCart(Convert.ToInt32(sessionUserID));
        OrderViewModel model = new OrderViewModel {
            TotalMoney = totalMoney,
            CartCount = carts.Count()
        };
        return Json(model); 
    }
}