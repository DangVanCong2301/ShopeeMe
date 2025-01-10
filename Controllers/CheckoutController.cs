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
        return View(); 
    }

    [HttpGet]
    [Route("/checkout/get-data/{userID?}")]
    public IActionResult GetData(int userID = 0) {
        List<UserInfo> userInfos = _userResponsitory.getUserInfoByID(userID).ToList();
        List<Address> addresses = _checkoutResponsitory.checkAddressAccount(userID).ToList();
        List<City> cities = _checkoutResponsitory.getCities().ToList();
        List<District> districts = _checkoutResponsitory.getDistricts().ToList();
        List<AddressChoose> addressChooses = _checkoutResponsitory.getAddressChoose().ToList();
        List<Payment> paymentTypes = _checkoutResponsitory.checkPaymentsTypeByUserID(userID).ToList();
        CheckoutViewModel model = new CheckoutViewModel {
            UserInfos = userInfos,
            Addresses = addresses,
            Cities = cities,
            Districts = districts,
            AddressChooses = addressChooses,
            PaymentTypes = paymentTypes
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
        Status status;
        if (_checkoutResponsitory.updateAddressAccountUserByID(userID, fullname) && _checkoutResponsitory.updateAddressAccountByID(addressID, userID, phone, address)) {
            status = new Status
            {
                StatusCode = 1,
                Message = "Cập nhật thành công!"
            };
        } else {
            status = new Status
            {
                StatusCode = -1,
                Message = "Cập nhật thất bại!"
            };
        }
        List<Address> addresses = _checkoutResponsitory.checkAddressAccount(Convert.ToInt32(userID)).ToList();
        
        CheckoutViewModel model = new CheckoutViewModel {
            Addresses = addresses,
            Status = status
        };
        return Ok(model);
    }

    [HttpPost]
    [Route("/checkout/add-to-checkout")]
    public IActionResult AddToCheckout(int productID, int shopID, int quantity) {
        IEnumerable<Product> product = _productResponsitory.getProductByID(productID);
        CheckoutViewModel model = new CheckoutViewModel {
            Product = product,
            ShopID = shopID,
            Quantity = quantity
        };
        return Ok(model);
    }

    [HttpPost]
    [Route("/checkout/add-payment")]
    public IActionResult AddPayment(int paymentID) {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        _checkoutResponsitory.insertPaymentType(paymentID, Convert.ToInt32(sessionUserID));
        List<Payment> paymentTypes = _checkoutResponsitory.checkPaymentsTypeByUserID(Convert.ToInt32(sessionUserID)).ToList();
        Status status = new Status {
            StatusCode = 1,
            Message = "Thêm thành công!"
        };
        CheckoutViewModel model = new CheckoutViewModel {
            Status = status,
            PaymentTypes = paymentTypes
        };
        return Ok(model);
    }

    [HttpPost]
    [Route("/checkout/update-payment")]
    public IActionResult UpdatePayment(int paymentID) {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        _checkoutResponsitory.updatePaymentType(paymentID, Convert.ToInt32(sessionUserID));
        List<Payment> paymentTypes = _checkoutResponsitory.checkPaymentsTypeByUserID(Convert.ToInt32(sessionUserID)).ToList();
        Status status = new Status {
            StatusCode = 1,
            Message = "Cập nhật thành công!"
        };
        CheckoutViewModel model = new CheckoutViewModel {
            Status = status,
            PaymentTypes = paymentTypes
        };
        return Ok(model);
    }

    [HttpPost]
    [Route("/checkout/add-to-order")]
    public IActionResult AddToOrder(int userID = 0, int shopID = 0, double totalPrice = 0, int paymentTypeID = 0, int paymentID = 0, int orderStatusID = 0) {
        List<Order> order = _orderResponsitory.getOrderByID(userID, shopID).ToList();
        // Kiểm tra đơn hàng trong ngày của tài khoản đã đăng ký chưa
        int orderID;
        if (order.Count() != 0) {
            orderID = order[0].PK_iOrderID;
        } else {
            if (paymentID == 4) {
                _orderResponsitory.inserOrder(userID, shopID, totalPrice, 6, paymentTypeID);
            } else {
                _orderResponsitory.inserOrder(userID, shopID, totalPrice, orderStatusID, paymentTypeID);
            }
            List<Order> newOrder = _orderResponsitory.getOrderByID(userID, shopID).ToList();
            orderID = newOrder[0].PK_iOrderID;
        }
        CheckoutViewModel model = new CheckoutViewModel {
            OrderID = orderID
        };
        return Ok(model);
    }

    [HttpPost]
    [Route("/checkout/add-to-order-detail")]
    public IActionResult AddToOrderDetail(int userID = 0, int orderID = 0, int productID = 0, int quantity = 0, double price = 0, double money = 0) {
        // Thêm vào chi tiết đơn hàng
        _orderResponsitory.inserOrderDetail(orderID, productID, quantity, price, money);
        // Xoá sản phẩm trong giỏ hàng
        _cartResponsitory.deleteProductInCart(productID, userID);
        return Ok();
    }
}