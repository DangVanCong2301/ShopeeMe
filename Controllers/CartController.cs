using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Project.Models;

public class CartController : Controller {
    private readonly IHttpContextAccessor _accessor;
    private readonly IHomeResponsitory _homeResponsitory;
    private readonly IProductResponsitory _productResponsitory;
    private readonly ICartReponsitory _cartResponsitory;
    private readonly IUserResponsitory _userResponsitory;
    public CartController(IHttpContextAccessor accessor, DatabaseContext context, ICartReponsitory cartReponsitoty, IUserResponsitory userResponsitory, IHomeResponsitory homeResponsitory, IProductResponsitory productResponsitory)
    {
        _accessor = accessor;
        _homeResponsitory = homeResponsitory;
        _productResponsitory = productResponsitory;
        _cartResponsitory = cartReponsitoty;
        _userResponsitory = userResponsitory;
    }

    [Route("cart")]
    [HttpGet]
    public IActionResult Index() {
        // Lấy Cookies trên trình duyệt
        var userID = Request.Cookies["UserID"];
        if (userID != null)
        {
            _accessor?.HttpContext?.Session.SetInt32("UserID", Convert.ToInt32(userID));
        } else {
            return View();
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
        System.Console.WriteLine("UserID: " + userID);
        if (sessionUserID == 0) {
            return Redirect("/user/login");
        }
        return View(); 
    }

    [HttpPost]
    [Route("/cart")]
    public IActionResult GetCartInfo() {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        var sessionUsername = _accessor?.HttpContext?.Session.GetString("UserName");  
        var sessionRoleID = _accessor?.HttpContext?.Session.GetInt32("RoleID");
        IEnumerable<CartDetail> carts = _cartResponsitory.getCartInfo(Convert.ToInt32(sessionUserID)); 
        IEnumerable<Product> get12ProductsAndSortAsc = _cartResponsitory.get12ProductsAndSortAsc(); 
        int cartCount = carts.Count();
        CartViewModel model = new CartViewModel {
            CartDetails = carts,
            Get12ProductsAndSortAsc = get12ProductsAndSortAsc,
            CartCount = cartCount,
            RoleID = Convert.ToInt32(sessionRoleID),
            UserID = Convert.ToInt32(sessionUserID),
            Username = sessionUsername
        };
        return Json(model);  
    }

    [HttpPost]
    [Route("/cart/add-to-cart")]
    public IActionResult AddToCart(int productID, double unitPrice, int quantity)
    {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        if (sessionUserID == null) {
            sessionUserID = 0;
        } 
        List<User> user = _userResponsitory.checkUserLogin(Convert.ToInt32(sessionUserID)).ToList();
        List<CartDetail> checkProduct = _cartResponsitory.checkProduct(Convert.ToInt32(sessionUserID), productID).ToList();
        List<Product> product = _productResponsitory.getProductByID(productID).ToList();
        Status status;
        if (user.Count() == 0)
        {
            status = new Status {
                StatusCode = -1,
                Message = "Bạn phải đăng nhập mới được thêm vào giỏ hàng!"
            };
        } else if (product[0].iQuantity == 0) {
            status = new Status {
                StatusCode = -2,
                Message = "Sản phẩm đã hết hàng!"
            };
        } else if (product[0].iQuantity < quantity) {
            status = new Status {
                StatusCode = -3,
                Message = "Số lượng sản phẩm hiện có không đủ số lượng bạn cần!"
            };
        } else if (checkProduct.Count() != 0) // Kiểm tra sản phẩm bị trùng trong giỏ hàng
        {
            quantity = checkProduct[0].iQuantity + quantity;
            double money = quantity * unitPrice;
            _cartResponsitory.changeQuantity(Convert.ToInt32(sessionUserID), productID, quantity, money);
            status = new Status {
                StatusCode = 0,
                Message = "Thêm sản phẩm thành công!"
            };
        }
        else
        {
            // https://www.c-sharpcorner.com/blogs/date-and-time-format-in-c-sharp-programming1
            // Thêm mã giỏ hàng
            List<Cart> cart = _cartResponsitory.checkCartIDExist().ToList();
            int cartID;
            if (cart.Count() != 0) {
                cartID = cart[0].PK_iCartID;
            } else {
                _cartResponsitory.insertCart();
                List<Cart> newCart = _cartResponsitory.getCartIDByTime().ToList();
                cartID = newCart[0].PK_iCartID;
            }
            // Thêm vào chi tiết giỏ hàng
            _cartResponsitory.insertCartDetail(Convert.ToInt32(sessionUserID), productID, cartID, quantity, unitPrice);
            status = new Status {
                StatusCode = 1,
                Message = "Thêm vào giỏ hàng thành công!"
            };
        }
        IEnumerable<CartDetail> cartDetails = _cartResponsitory.getCartInfo(Convert.ToInt32(sessionUserID)).ToList();
        int cartCount = cartDetails.Count();
        ProductViewModel model = new ProductViewModel
        {
            Status = status,
            CartCount = cartCount,
            CartDetails = cartDetails
        };
        return Ok(model);
    }

    // Hàm lấy số lượng sản phẩm trong giỏ hàng
    [HttpPost]
    [Route("/cart/quantity")]
    public IActionResult Quantity(int productID, int quantity, double unitPrice) {
        double money = quantity * unitPrice;
        int userID = Convert.ToInt32(_accessor?.HttpContext?.Session.GetInt32("UserID"));
        _cartResponsitory.changeQuantity(userID, productID, quantity, money);
        return Json(new {money});
    }

    [HttpPost]
    [Route("/cart/delete-item")]
    public IActionResult DeleteItem(int productID) {
        int userID = Convert.ToInt32(_accessor?.HttpContext?.Session.GetInt32("UserID"));
        _cartResponsitory.deleteProductInCart(productID, userID);
        string msg = "Sản phẩm đã được xoá khỏi giỏ hàng!";
        IEnumerable<CartDetail> cartDetails = _cartResponsitory.getCartInfo(userID);
        int cartCount = cartDetails.Count();
        CartViewModel model = new CartViewModel {
            CartCount = cartCount,
            Message = msg
        };
        return Ok(model);
    }

    [HttpPost]
    public IActionResult DeleteAllProduct() {
        int userID = Convert.ToInt32(_accessor?.HttpContext?.Session.GetInt32("UserID"));
        List<CartDetail> cartDetails = _cartResponsitory.getCartInfo(userID).ToList(); // Phải sử dụng list thì mới lấy ra được các id
        foreach (var item in cartDetails) {
            _cartResponsitory.deleteProductInCart(item.PK_iProductID, userID);
        }
        
        CartViewModel model = new CartViewModel {
            CartCount = cartDetails.Count(),
            Message = "Xoá thành công"
        };
        return Ok(model);
    }
}