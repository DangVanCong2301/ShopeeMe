using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Project.Models;

[Route("/product")]
public class ProductController : Controller {
    private readonly IProductResponsitory _productResponsitory;
    private readonly IHttpContextAccessor _accessor;
    private readonly ICartReponsitory _cartResponsitory;
    private readonly IHomeResponsitory _homeResponsitory;
    private readonly IUserResponsitory _userResponsitory;
    private readonly IShopResponsitory _shopResponsitory;
    private readonly IChatRepository _chatRepository;
    public ProductController(
        IProductResponsitory productResponsitory, 
        ICartReponsitory cartReponsitoty, 
        IHttpContextAccessor accessor, 
        IHomeResponsitory homeResponsitory, 
        IUserResponsitory userResponsitory, 
        IShopResponsitory shopResponsitory,
        IChatRepository chatRepository
        )
    {
        _productResponsitory = productResponsitory;
        _cartResponsitory = cartReponsitoty;
        _accessor = accessor;
        _homeResponsitory = homeResponsitory;
        _userResponsitory = userResponsitory;
        _shopResponsitory = shopResponsitory;
        _chatRepository = chatRepository;
    }

    [Route("{parentCategoryID?}/{categoryID?}")]
    [HttpGet]
    public IActionResult Index(int parentCategoryID = 0, int categoryID = 0) {
        _accessor?.HttpContext?.Session.SetInt32("CurrentParentCategoryID", parentCategoryID);
        _accessor?.HttpContext?.Session.SetInt32("CurrentCategoryID", categoryID);
        // Vì mình lấy layout của _Layout của kiểu là @model ProducdViewModel nó sẽ chung cho tất cả các trang, ta lấy riêng nó sẽ lỗi
        return View();
    }

    [HttpPost("get-data")]
    [Route("get-data")]
    public IActionResult GetData(int categoryID = 0, int currentPage = 1) {
        IEnumerable<Product> products;
        IEnumerable<Product> productsByCategoryID;
        int currentCategory = Convert.ToInt32(_accessor?.HttpContext?.Session.GetInt32("CurrentCategoryID"));
        System.Console.WriteLine("currentCategory: " + currentCategory);
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        var sessionParentCategoryID = _accessor?.HttpContext?.Session.GetInt32("CurrentParentCategoryID");
        List<User> user = _userResponsitory.checkUserLogin(Convert.ToInt32(sessionUserID)).ToList();
        if (user.Count() == 0 && currentCategory == 0 && categoryID == 0) {
            products = _productResponsitory.getProductsByParentCategoryID(Convert.ToInt32(sessionParentCategoryID));
        } else if (user.Count() != 0 && user[0].FK_iRoleID == 2 && currentCategory == 0 && categoryID == 0) {
            products = _productResponsitory.getProductsByParentCategoryID(Convert.ToInt32(sessionParentCategoryID));
        } else if (user.Count() != 0 && user[0].FK_iRoleID == 1 && currentCategory == 0 && categoryID == 0) {
            products = _productResponsitory.getProductsByParentCategoryID(Convert.ToInt32(sessionParentCategoryID));
        } else if (categoryID != 0) {
            currentCategory = categoryID;
            products = _productResponsitory.getProductsByCategoryID(currentCategory);
        } else {
            products = _productResponsitory.getProductsByCategoryID(currentCategory);
        }
        int totalRecord = products.Count();
        int pageSize = 10;
        int totalPage = (int) Math.Ceiling(totalRecord / (double) pageSize);
        products = products.Skip((currentPage - 1) * pageSize).Take(pageSize);
        IEnumerable<CartDetail> cartDetails = _cartResponsitory.getCartInfo(Convert.ToInt32(sessionUserID)).ToList();
        IEnumerable<Store> stores = _shopResponsitory.getShopByParentCategoryID(Convert.ToInt32(sessionParentCategoryID));
        IEnumerable<Category> categories = _homeResponsitory.getCategoriesByParentCategoryID(Convert.ToInt32(sessionParentCategoryID));
        // Vì mình lấy layout của _Layout của kiểu là @model ProducdViewModel nó sẽ chung cho tất cả các trang, ta lấy riêng nó sẽ lỗi
        ShopeeViewModel model = new ShopeeViewModel {
            Products = products,
            Stores = stores,
            Categories = categories,
            CartDetails = cartDetails,
            CurrentCategoryID = currentCategory,
            TotalPage = totalPage,
            PageSize = pageSize,
            CurrentPage = currentPage,
            CartCount = cartDetails.Count(),
            User = user,
            UserID = Convert.ToInt32(sessionUserID)
        };
        return Ok(model);
    }

    /// <summary>
    /// Nguồn: https://xuanthulab.net/asp-net-core-mvc-chi-tiet-ve-route-trong-asp-net-mvc.html
    /// </summary>
    [Route("detail/{id?}")]
    public IActionResult Detail(int id)
    {
        _accessor?.HttpContext?.Session.SetInt32("CurrentProductID", id);
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
        return View();
    }

    [HttpPost]
    [Route("/product/get-data-detail")]
    public IActionResult GetDetail() {
        int userID = Convert.ToInt32(_accessor?.HttpContext?.Session.GetInt32("UserID"));
        int productID = Convert.ToInt32(_accessor?.HttpContext?.Session.GetInt32("CurrentProductID"));
        var product = _productResponsitory.getProductByID(productID);
        IEnumerable<Favorite> favorites = _productResponsitory.getFavoritesByProductID(productID);
        IEnumerable<Favorite> favorite = _productResponsitory.getFavoritesByProductIDAndUserID(productID, userID);
        List<Store> store = _shopResponsitory.getShopByProductID(productID).ToList();
        IEnumerable<UserInfo> userInfo = _userResponsitory.checkUserInfoByUserID(userID);
        IEnumerable<Reviewer> reviewers = _productResponsitory.getReviewerByProductID(productID);
        ProductViewModel model = new ProductViewModel {
            Product = product,
            Favorites = favorites,
            Favorite = favorite,
            Store = store,
            UserInfo = userInfo,
            Reviewers = reviewers
        };
        return Ok(model);
    }

    [HttpGet]
    [Route("/product/reviewer-detail/{reviewerID?}")]
    public IActionResult ReviewerDetail(int reviewerID = 0) {
        int productID = Convert.ToInt32(_accessor?.HttpContext?.Session.GetInt32("CurrentProductID"));
        IEnumerable<Product> product = _productResponsitory.getProductByID(productID);
        IEnumerable<Reviewer> reviewer = _productResponsitory.getReviewerByID(reviewerID);
        ProductViewModel model = new ProductViewModel {
            Product = product,
            Reviewer = reviewer
        };
        return Ok(model);
    }

    [HttpPut]
    [Route("/product/reviewer-update")]
    public IActionResult UpdateReviewer(int reviewerID = 0, int userID = 0, int productID = 0, int star = 0, string comment = "", string image = "") {
        Status status;
        if (_productResponsitory.updateReviewer(reviewerID, userID, productID, star, comment, image)) {
            status = new Status {
                StatusCode = 1,
                Message = "Cập nhật đánh giá thành công"
            };
        } else {
            status = new Status {
                StatusCode = -1,
                Message = "Cập nhật đánh giá thành công"
            };
        }
        IEnumerable<Reviewer> reviewers = _productResponsitory.getReviewerByProductID(productID);
        IEnumerable<UserInfo> userInfo = _userResponsitory.checkUserInfoByUserID(userID);
        ProductViewModel model = new ProductViewModel {
            Status = status,
            Reviewers = reviewers,
            UserInfo = userInfo
        };
        return Ok(model);
    }

    [HttpDelete]
    [Route("/product/reviewer-delete")]
    public IActionResult DeleteReviewer(int reviewerID = 0, int userID = 0, int productID = 0) {
        Status status;
        if (_productResponsitory.deleteReviewer(reviewerID)) {
            status = new Status {
                StatusCode = 1,
                Message = "Xoá đánh giá thành công"
            };
        } else {
            status = new Status {
                StatusCode = -1,
                Message = "Xoá đánh giá thành công"
            };
        }
        IEnumerable<Reviewer> reviewers = _productResponsitory.getReviewerByProductID(productID);
        IEnumerable<UserInfo> userInfo = _userResponsitory.checkUserInfoByUserID(userID);
        ProductViewModel model = new ProductViewModel {
            Status = status,
            Reviewers = reviewers,
            UserInfo = userInfo
        };
        return Ok(model);
    }

    [HttpGet]
    [Route("/product/sort/{sortType?}")]
    public IActionResult Sort(string sortType = "", int currentPage = 1) {
        int industryID = Convert.ToInt32(_accessor?.HttpContext?.Session.GetInt32("CurrentParentCategoryID"));
        IEnumerable<Product> products;
        if (sortType == "asc") {
            products = _productResponsitory.getProductsByIndustryIDAndSortIncre(industryID); // Gọi đúng phương thức sắp xếp tăng dần nhé
        } else {
            products = _productResponsitory.getProductsByIndutryIDAndSortReduce(industryID); // Gọi đúng phương thức sắp xếp giảm dần nhé
        }
        int totalRecord = products.Count();
        int pageSize = 10;
        int totalPage = (int) Math.Ceiling(totalRecord / (double) pageSize);
        products = products.Skip((currentPage - 1) * pageSize).Take(pageSize);
        ProductViewModel model = new ProductViewModel {
            Products = products,
            TotalPage = totalPage,
            PageSize = pageSize,
            CurrentPage = currentPage
        };
        return Ok(model);
    }

    [HttpGet]
    [Route("/product/similar/{productSimilarID?}/{categorySimilar?}")]
    public IActionResult Similar(int productSimilarID, int categorySimilar)
    {
        _accessor?.HttpContext?.Session.SetInt32("ProductSimilarID", productSimilarID);
        _accessor?.HttpContext?.Session.SetInt32("CategorySimilarID", categorySimilar);
        return View();
    }

    [HttpPost]
    [Route("/product/similar/get-data")]
    public IActionResult Similar(int currentPage = 1) {
        var sessionProductSimilarID = _accessor?.HttpContext?.Session.GetInt32("ProductSimilarID");
        var sessionCategorySimilarID = _accessor?.HttpContext?.Session.GetInt32("CategorySimilarID");
        List<Product> product = _productResponsitory.getProductByID(Convert.ToInt32(sessionProductSimilarID)).ToList();
        List<Store> store = _shopResponsitory.getShopByProductID(Convert.ToInt32(sessionProductSimilarID)).ToList();
        IEnumerable<Product> products = _productResponsitory.getProductsByCategoryID(Convert.ToInt32(sessionCategorySimilarID));
        int totalRecord = products.Count();
        int pageSize = 6;
        int totalPage = (int) Math.Ceiling(totalRecord / (double) pageSize);
        products = products.Skip((currentPage - 1) * pageSize).Take(pageSize);
        ProductViewModel model = new ProductViewModel {
            Product = product,
            Store = store,
            Products = products,
            TotalPage = totalPage,
            PageSize = pageSize,
            CurrentPage = currentPage
        };
        return Ok(model);
    }

    [HttpPost]
    [Route("/product/add-favorite")]
    public IActionResult AddFavorite(int userID = 0, int productID = 0) {
        Status status;
        if (_productResponsitory.insertFavorite(userID, productID)) {
            status = new Status {
                StatusCode = 1,
                Message = "Thêm yêu thích thành công!"
            };
        } else {
            status = new Status {
                StatusCode = -1,
                Message = "Thêm yêu thích thất bại!"
            };
        }
        ProductViewModel model = new ProductViewModel {
            Status = status
        };
        return Ok(model);
    }

    [HttpPost]
    [Route("/product/delete-favorite")]
    public IActionResult DeleteFavorite(int userID = 0, int productID = 0) {
        Status status;
        if (_productResponsitory.deleteFavorite(userID, productID)) {
            status = new Status {
                StatusCode = 1,
                Message = "Bỏ yêu thích thành công!"
            };
        } else {
            status = new Status {
                StatusCode = -1,
                Message = "Bỏ yêu thích thất bại!"
            };
        }
        ProductViewModel model = new ProductViewModel {
            Status = status
        };
        return Ok(model);
    }

    [HttpPost]
    [Route("/product/reviewer")]
    public IActionResult Reviewer(int productID = 0, string comment = "", int star = 0, string image = "") {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        Status status;
        if (_productResponsitory.insertProductReviewer(Convert.ToInt32(sessionUserID), productID, star, comment, image)) {
            status = new Status {
                StatusCode = 1,
                Message = "Thêm đánh giá thành công!"
            };
        } else {
            status = new Status {
                StatusCode = -1,
                Message = "Thêm đánh giá thất bại!"
            };
        }
        ProductViewModel model = new ProductViewModel {
            Status = status
        };
        return Ok(model);
    }
}