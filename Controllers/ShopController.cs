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
    [Route("/shop/{shopUsername?}")]
    public IActionResult Index(string shopUsername = "") {
        // Lấy Cookies trên trình duyệt
        var userID = Request.Cookies["UserID"];
        if (userID != null)
        {
            _accessor?.HttpContext?.Session.SetInt32("UserID", Convert.ToInt32(userID));
        }
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        System.Console.WriteLine("sessionUserID: " + sessionUserID);
        if (userID != null)
        {
            List<User> users = _userResponsitory.checkUserLogin(Convert.ToInt32(sessionUserID)).ToList();
            _accessor?.HttpContext?.Session.SetString("UserName", users[0].sUserName);
            _accessor?.HttpContext?.Session.SetInt32("RoleID", users[0].FK_iRoleID);
        }
        else
        {
            _accessor?.HttpContext?.Session.SetString("UserName", "");
        }
        List<Store> store = _shopResponsitory.getShopByUsername(shopUsername).ToList();
        _accessor?.HttpContext?.Session.SetInt32("CurrentShopID", store[0].PK_iStoreID);
        _accessor?.HttpContext?.Session.SetString("CurrentShopUsername", shopUsername);
        return View();
    }

    [HttpPost]
    [Route("/shop/get-data")]
    public IActionResult GetData(int currentPage = 1) {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        var sessionUsername = _accessor?.HttpContext?.Session?.GetString("UserName");
        var sessionRoleID = _accessor?.HttpContext?.Session?.GetInt32("RoleID");
        var sessionCurrentShopUsername = _accessor?.HttpContext?.Session.GetString("CurrentShopUsername");
        var sessionCurrentShopID = _accessor?.HttpContext?.Session.GetInt32("CurrentShopID");
        var shop = _shopResponsitory.getShopByUsername(sessionCurrentShopUsername);
        IEnumerable<CartDetail> cartDetails = _cartResponsitory.getCartInfo(Convert.ToInt32(sessionUserID));
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
            CurrentPage = currentPage,
            RoleID = Convert.ToInt32(sessionRoleID),
            UserID = Convert.ToInt32(sessionUserID),
            Username = sessionUsername,
            CartDetails = cartDetails,
            CartCount = cartDetails.Count()
        };
        return Ok(model);
    }
}