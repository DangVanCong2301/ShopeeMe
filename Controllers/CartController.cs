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

    [Route("/cart")]
    [HttpGet]
    public IActionResult Index() {
        return View(); 
    }

    [HttpGet]
    [Route("/cart-data/{userID?}")]
    public IActionResult GetCartInfo(int userID = 0) {
        IEnumerable<UserInfo> userInfo = _userResponsitory.getUserInfoByID(userID);
        IEnumerable<CartDetail> carts = _cartResponsitory.getCartInfo(userID); 
        IEnumerable<Product> get12ProductsAndSortAsc = _cartResponsitory.get12ProductsAndSortAsc(); 
        int cartCount = carts.Count();
        CartViewModel model = new CartViewModel {
            CartDetails = carts,
            Get12ProductsAndSortAsc = get12ProductsAndSortAsc,
            CartCount = cartCount,
            UserInfo = userInfo,
            UserID = userID
        };
        return Ok(model);  
    }

    [HttpPost]
    [Route("/cart/add-to-cart")]
    public IActionResult AddToCart(int userID = 0, int productID = 0, double unitPrice = 0, int quantity = 0)
    {
        List<User> user = _userResponsitory.checkUserLogin(userID).ToList();
        List<CartDetail> checkProduct = _cartResponsitory.checkProduct(userID, productID).ToList();
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
            _cartResponsitory.changeQuantity(Convert.ToInt32(userID), productID, quantity, money);
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
            _cartResponsitory.insertCartDetail(userID, productID, cartID, quantity, unitPrice);
            status = new Status {
                StatusCode = 1,
                Message = "Thêm vào giỏ hàng thành công!"
            };
        }
        IEnumerable<CartDetail> cartDetails = _cartResponsitory.getCartInfo(userID).ToList();
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
    [HttpPut]
    [Route("/cart/quantity")]
    public IActionResult Quantity(int userID = 0, int productID = 0, int quantity = 0, double unitPrice = 0) {
        double money = quantity * unitPrice;
        _cartResponsitory.changeQuantity(userID, productID, quantity, money);
        return Json(new {money});
    }

    [HttpDelete]
    [Route("/cart/delete-item")]
    public IActionResult DeleteItem(int userID = 0, int productID = 0) {
        Status status;
        if (_cartResponsitory.deleteProductInCart(productID, userID)) {
            status = new Status {
                StatusCode = 1,
                Message = "Sản phẩm đã được xoá khỏi giỏ hàng!"
            };
        } else {
            status = new Status {
                StatusCode = -1,
                Message = "Xoá sản phẩm thất bại!"
            };
        }
        IEnumerable<CartDetail> cartDetails = _cartResponsitory.getCartInfo(userID);
        int cartCount = cartDetails.Count();
        CartViewModel model = new CartViewModel {
            CartCount = cartCount,
            Status = status
        };
        return Ok(model);
    }

    [HttpDelete]
    [Route("/cart/delete-all")]
    public IActionResult DeleteAllProduct(int userID = 0) {
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