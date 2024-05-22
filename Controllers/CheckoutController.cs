using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;

public class CheckoutController : Controller {

    private readonly IHttpContextAccessor _accessor;
    private readonly ICartReponsitory _cartResponsitory;
    private readonly IProductResponsitory _productResponsitory;
    public CheckoutController(IHttpContextAccessor accessor, ICartReponsitory cartResponsitory, IProductResponsitory productResponsitory)
    {
        _accessor = accessor;
        _cartResponsitory = cartResponsitory;
        _productResponsitory = productResponsitory;
    }

    List<CheckoutViewModel> checkouts => HttpContext.Session.Get<List<CheckoutViewModel>>("cart_key") ?? new List<CheckoutViewModel>();

    [HttpGet]
    [Route("/checkout")]
    public IActionResult Index() {
        var userID = _accessor?.HttpContext?.Session.GetInt32("UserID");  
        IEnumerable<CartDetail> carts = _cartResponsitory.getCartInfo(Convert.ToInt32(userID)); 
        // Lấy số lượng giỏ hàng
        int cartCount = carts.Count();
        ProductViewModel model = new ProductViewModel {
            CartDetails = carts,
            CartCount = cartCount,
            CheckoutViewModels = checkouts
        };
        return Json(model); 
    }

    [HttpPost]
    [Route("/checkout/add-to-checkout")]
    public IActionResult AddToCheckout(int productID) {
        var cartsCheckout = checkouts;
        var item = cartsCheckout.SingleOrDefault(p => p.PK_iProductID == productID);
        if (item == null) {
            List<Product> product = _productResponsitory.getProductByID(productID).ToList();
            if (product == null) {
                System.Console.WriteLine($"Không tìm thấy hàng hoá có mã {productID}");
            }
            item = new CheckoutViewModel {
                PK_iProductID = product[0].PK_iProductID,
                sProductName = product[0].sProductName,
                sImageUrl = product[0].sImageUrl
            };
            cartsCheckout.Add(item);
        }
        HttpContext.Session.Set("cart_key", cartsCheckout);
        List<CheckoutViewModel> checkout = HttpContext.Session.Get<List<CheckoutViewModel>>("cart_key") ?? new List<CheckoutViewModel>();
        return Ok(checkouts);
    }
}