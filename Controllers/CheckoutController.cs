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

    List<Checkout> checkouts => HttpContext.Session.Get<List<Checkout>>("cart_key") ?? new List<Checkout>();

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
            Checkouts = checkouts
        };
        return View(model); 
    }

    [HttpPost]
    [Route("/checkout/get-data")]
    public IActionResult GetData() {
        return Ok(checkouts);
    }

    [HttpPost]
    [Route("/checkout/add-to-checkout")]
    public IActionResult AddToCheckout(int productID, int quantity) {
        var cartsCheckout = checkouts;
        var item = cartsCheckout.SingleOrDefault(p => p.PK_iProductID == productID);
        if (item == null) {
            List<Product> product = _productResponsitory.getProductByID(productID).ToList();
            if (product == null) {
                System.Console.WriteLine($"Không tìm thấy hàng hoá có mã {productID}");
            }
            item = new Checkout {
                PK_iProductID = product[0].PK_iProductID,
                sProductName = product[0].sProductName,
                sImageUrl = product[0].sImageUrl,
                dUnitPrice = product[0].dPrice, // https://www.phanxuanchanh.com/2021/10/26/dinh-dang-tien-te-trong-c/
                iQuantity = quantity,
                dMoney = product[0].dPrice * quantity
            };
            cartsCheckout.Add(item);
        }
        HttpContext.Session.Set("cart_key", cartsCheckout);
        return Ok(checkouts);
    }
}