using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Project.Models;

public class CheckoutController : Controller {

    private readonly IHttpContextAccessor _accessor;
    private readonly ICartReponsitory _cartResponsitory;
    private readonly IProductResponsitory _productResponsitory;
    private readonly ICheckoutResponsitory _checkoutResponsitory;
    private readonly IUserResponsitory _userResponsitory;
    private readonly IOrderResponsitory _orderResponsitory;
    public CheckoutController(IHttpContextAccessor accessor, ICartReponsitory cartResponsitory, IProductResponsitory productResponsitory, ICheckoutResponsitory checkoutResponsitory, IUserResponsitory userResponsitory, IOrderResponsitory orderResponsitory)
    {
        _accessor = accessor;
        _cartResponsitory = cartResponsitory;
        _productResponsitory = productResponsitory;
        _checkoutResponsitory = checkoutResponsitory;
        _userResponsitory = userResponsitory;
        _orderResponsitory = orderResponsitory;
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
    [Route("/checkout/address-detail")]
    public IActionResult AddressDetail(int addressID, int userID) {
        var address = _checkoutResponsitory.getAddressesByID(addressID, userID);
        return Ok(address);
    }

    [HttpPost]
    [Route("/checkout/address-update")]
    public IActionResult AddressUpdate(int addressID, int userID, string fullname = "", string phone = "", string address = "") {
        _checkoutResponsitory.updateAddressAccountUserByID(userID, fullname);
        _checkoutResponsitory.updateAddressAccountByID(addressID, userID, phone, address);
        List<Address> addresses = _checkoutResponsitory.checkAddressAccount(Convert.ToInt32(userID)).ToList();
        Status status = new Status {
            StatusCode = 1,
            Message = "Cập nhật thành công"
        };
        CheckoutViewModel model = new CheckoutViewModel {
            Addresses = addresses,
            Status = status
        };
        return Ok(model);
    }

    [HttpPost]
    [Route("/checkout/add-to-checkout")]
    public IActionResult AddToCheckout(int productID, int quantity) {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        var cartsCheckout = checkouts;
        var item = cartsCheckout.SingleOrDefault(p => p.PK_iProductID == productID);
        if (item == null) {
            List<CartDetail> product = _cartResponsitory.getProductCartByID(Convert.ToInt32(sessionUserID), productID).ToList();
            if (product == null) {
                System.Console.WriteLine($"Không tìm thấy hàng hoá có mã {productID}");
            }
            item = new Checkout {
                PK_iProductID = product[0].PK_iProductID,
                sProductName = product[0].sProductName,
                sImageUrl = product[0].sImageUrl,
                dUnitPrice = product[0].dUnitPrice, // https://www.phanxuanchanh.com/2021/10/26/dinh-dang-tien-te-trong-c/
                iQuantity = quantity,
                dMoney = product[0].dUnitPrice * quantity,
                dTransportPrice = product[0].dTransportPrice
            };
            cartsCheckout.Add(item);
        }
        // Đặt lại danh sách session sản phẩm thanh toán 
        HttpContext.Session.Set("cart_key", cartsCheckout);
        return Ok(checkouts);
    }

    [HttpPost]
    [Route("/checkout/add-to-order")]
    public IActionResult AddToOrder(double totalPrice, int paymentID, int orderStatusID) {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        // _orderResponsitory.inserOrder(Convert.ToInt32(sessionUserID), totalPrice, orderStatusID, paymentID);
        List<Order> order = _orderResponsitory.getOrderByID(Convert.ToInt32(sessionUserID)).ToList();
        var orderID = order[0].PK_iOrderID;
        foreach (var item in checkouts) {
            // Thêm vào chi tiết đơn hàng
            _orderResponsitory.inserOrderDetail(orderID, item.PK_iProductID, item.iQuantity, item.dUnitPrice);
            // Xoá sản phẩm trong giỏ hàng
            _cartResponsitory.deleteProductInCart(item.PK_iProductID, Convert.ToInt32(sessionUserID));
        } 
        return Ok("Thêm thành công");
    }
}