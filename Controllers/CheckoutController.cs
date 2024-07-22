using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Project.Models;

public class CheckoutController : Controller {

    private readonly IHttpContextAccessor _accessor;
    private readonly ICartReponsitory _cartResponsitory;
    private readonly IProductResponsitory _productResponsitory;
    private readonly ICheckoutResponsitory _checkoutResponsitory;
    private readonly IUserResponsitory _userResponsitory;
    public CheckoutController(IHttpContextAccessor accessor, ICartReponsitory cartResponsitory, IProductResponsitory productResponsitory, ICheckoutResponsitory checkoutResponsitory, IUserResponsitory userResponsitory)
    {
        _accessor = accessor;
        _cartResponsitory = cartResponsitory;
        _productResponsitory = productResponsitory;
        _checkoutResponsitory = checkoutResponsitory;
        _userResponsitory = userResponsitory;
    }

    List<Checkout> checkouts => HttpContext.Session.Get<List<Checkout>>("cart_key") ?? new List<Checkout>();

    [HttpGet]
    [Route("/checkout")]
    public IActionResult Index() {
        // Lấy Cookies trên trình duyệt
        var userID = Request.Cookies["UserID"];
        if (userID != null)
        {
            _accessor?.HttpContext?.Session.SetInt32("UserID", Convert.ToInt32(userID));
        }
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");  
        IEnumerable<CartDetail> carts = _cartResponsitory.getCartInfo(Convert.ToInt32(sessionUserID)); 
        // Lấy số lượng giỏ hàng
        int cartCount = carts.Count();
        ShopeeViewModel model = new ShopeeViewModel {
            CartDetails = carts,
            CartCount = cartCount,
            Checkouts = checkouts
        };
        return View(model); 
    }

    [HttpPost]
    [Route("/checkout/get-data")]
    public IActionResult GetData() {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        List<User> users = _userResponsitory.getUserInfoByID(Convert.ToInt32(sessionUserID)).ToList();
        List<Address> addresses = _checkoutResponsitory.checkAddressAccount(Convert.ToInt32(sessionUserID)).ToList();
        List<City> cities = _checkoutResponsitory.getCities().ToList();
        List<District> districts = _checkoutResponsitory.getDistricts().ToList();
        List<AddressChoose> addressChooses = _checkoutResponsitory.getAddressChoose().ToList();
        CheckoutViewModel model = new CheckoutViewModel {
            Users = users,
            Checkouts = checkouts,
            Addresses = addresses,
            Cities = cities,
            Districts = districts,
            AddressChooses = addressChooses
        };
        return Ok(model);
    }

    [HttpPost]
    [Route("/checkout/crud-address")]
    public IActionResult CRUDAddress(string phone = "", string address = "") {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        _checkoutResponsitory.insertAddressAccount(Convert.ToInt32(sessionUserID), phone, address);
        List<Address> addresses = _checkoutResponsitory.checkAddressAccount(Convert.ToInt32(sessionUserID)).ToList();
        Status status = new Status {
            StatusCode = 1,
            Message = "Thêm địa chỉ thành công"
        };
        CheckoutViewModel model = new CheckoutViewModel {
            Status = status,
            Addresses = addresses
        };
        return Ok(model);
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