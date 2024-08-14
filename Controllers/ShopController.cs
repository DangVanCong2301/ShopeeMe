using Microsoft.AspNetCore.Mvc;
using Project.Models;

public class ShopController : Controller
{
    private readonly IHttpContextAccessor _accessor;
        private readonly IHomeResponsitory _homeResponsitory;
        private readonly IShopResponsitory _shopResponsitory;
        private readonly ICartReponsitory _cartResponsitory;
        private readonly IUserResponsitory _userResponsitory;

        public ShopController(IHttpContextAccessor accessor, IHomeResponsitory homeResponsitory, ICartReponsitory cartReponsitory, IUserResponsitory userResponsitory, IShopResponsitory shopResponsitory)
        {
            _accessor = accessor;
            _homeResponsitory = homeResponsitory;
            _cartResponsitory = cartReponsitory;
            _userResponsitory = userResponsitory;
            _shopResponsitory = shopResponsitory;
        }

    [HttpGet]
    [Route("/shop/{shopID?}")]
    public IActionResult Index(int currentPage = 1, int shopID = 1) {
        // Lấy Cookies trên trình duyệt
        var userID = Request.Cookies["UserID"];
        if (userID != null)
        {
            _accessor?.HttpContext?.Session.SetInt32("UserID", Convert.ToInt32(userID));
        }
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        _accessor?.HttpContext?.Session.SetInt32("CurrentShopID", shopID);
        System.Console.WriteLine("sessionUserID: " + sessionUserID);
        IEnumerable<Product> products = _homeResponsitory.getProducts().ToList();
        int totalRecord = products.Count();
        int pageSize = 12;
        int totalPage = (int)Math.Ceiling(totalRecord / (double) pageSize);
        products = products.Skip((currentPage - 1) * pageSize).Take(pageSize);
        IEnumerable<Store> store = _shopResponsitory.getShopByID(shopID);
        IEnumerable<Category> categories = _homeResponsitory.getCategories().ToList();
        IEnumerable<CartDetail> cartDetails = _cartResponsitory.getCartInfo(Convert.ToInt32(sessionUserID)).ToList();
        IEnumerable<CartDetail> carts = _cartResponsitory.getCartInfo(Convert.ToInt32(sessionUserID));
        if (userID != null)
        {
            List<User> users = _userResponsitory.checkUserLogin(Convert.ToInt32(sessionUserID)).ToList();
            _accessor?.HttpContext?.Session.SetString("UserName", users[0].sFullName);
            _accessor?.HttpContext?.Session.SetInt32("RoleID", users[0].FK_iRoleID);
        }
        else
        {
            _accessor?.HttpContext?.Session.SetString("UserName", "");
        }
        int cartCount = carts.Count();
        System.Console.WriteLine("Role ID: " + Convert.ToInt32(_accessor?.HttpContext?.Session.GetInt32("RoleID")));
        ShopeeViewModel model = new ShopeeViewModel
        {
            Products = products,
            Stores = store,
            Categories = categories,
            CartDetails = cartDetails,
            TotalPage = totalPage,
            PageSize = pageSize,
            CurrentPage = currentPage,
            UserID = Convert.ToInt32(sessionUserID),
            CartCount = cartCount,
            RoleID = Convert.ToInt32(_accessor?.HttpContext?.Session.GetInt32("RoleID"))
        };
        return View(model);
    }

    [HttpPost]
    [Route("/shop/get-data")]
    public IActionResult GetData(int currentPage = 1) {
        var sessionCurrentShopID = _accessor?.HttpContext?.Session.GetInt32("CurrentShopID");
        var shop = _shopResponsitory.getShopByID(Convert.ToInt32(sessionCurrentShopID));
        IEnumerable<SliderShop> slidersShop = _shopResponsitory.getSlidersShopByShopID(Convert.ToInt32(sessionCurrentShopID));
        IEnumerable<Category> categories = _shopResponsitory.getCategoriesByShopID(Convert.ToInt32(sessionCurrentShopID));
        IEnumerable<Product> products = _shopResponsitory.getProductsByShopID(Convert.ToInt32(sessionCurrentShopID));
        IEnumerable<Product> top3SellingProducts = _shopResponsitory.getTop3SellingProductsShop(Convert.ToInt32(sessionCurrentShopID));
        IEnumerable<Product> top10SellingProducts = _shopResponsitory.getTop10SellingProductsShop(Convert.ToInt32(sessionCurrentShopID));
        IEnumerable<Product> top10GoodPriceProducts = _shopResponsitory.getTop10GoodPriceProductsShop(Convert.ToInt32(sessionCurrentShopID));
        IEnumerable<Product> top10SuggestProducts = _shopResponsitory.getTop10SuggestProductsShop(Convert.ToInt32(sessionCurrentShopID));
        int totalRecord = products.Count();
        int pageSize = 10;
        int totalPage = (int) Math.Ceiling(totalRecord / (double) pageSize);
        products = products.Skip((currentPage - 1) * pageSize).Take(pageSize);
        ShopViewModel model = new ShopViewModel {
            Stores = shop,
            SlidersShop = slidersShop,
            Categories = categories,
            Products = products,
            Top3SellingProducts = top3SellingProducts,
            Top10SellingProducts = top10SellingProducts,
            Top10GoodPriceProducts = top10GoodPriceProducts,
            Top10SuggestProducts = top10SuggestProducts,
            TotalPage = totalPage,
            PageSize = pageSize,
            CurrentPage = currentPage
        };
        return Ok(model);
    }
}