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

    [Route("{industryID?}/{categoryID?}")]
    [HttpGet]
    public IActionResult Index() {
        return View();
    }

    [HttpGet("get-data/{industryID?}/{categoryID?}")]
    [Route("get-data/{industryID?}/{categoryID?}")]
    public IActionResult GetData(int userID = 0, int industryID = 0, int categoryID = 0, int currentPage = 1) {
        IEnumerable<Product> products;
        IEnumerable<Product> productsByCategoryID;
        List<User> user = _userResponsitory.checkUserLogin(userID).ToList();
        if (user.Count() == 0 && categoryID == 0) {
            products = _productResponsitory.getProductsByParentCategoryID(industryID);
        } else if (user.Count() != 0 && user[0].FK_iRoleID == 2 && categoryID == 0) {
            products = _productResponsitory.getProductsByParentCategoryID(industryID);
        } else if (user.Count() != 0 && user[0].FK_iRoleID == 1 && categoryID == 0) {
            products = _productResponsitory.getProductsByParentCategoryID(industryID);
        } else if (categoryID != 0) {
            products = _productResponsitory.getProductsByCategoryID(categoryID);
        } else {
            products = _productResponsitory.getProductsByCategoryID(categoryID);
        }
        int totalRecord = products.Count();
        int pageSize = 10;
        int totalPage = (int) Math.Ceiling(totalRecord / (double) pageSize);
        products = products.Skip((currentPage - 1) * pageSize).Take(pageSize);
        IEnumerable<CartDetail> cartDetails = _cartResponsitory.getCartInfo(userID).ToList();
        IEnumerable<Store> stores = _shopResponsitory.getShopByParentCategoryID(industryID);
        IEnumerable<Category> categories = _homeResponsitory.getCategoriesByParentCategoryID(industryID);
        // Vì mình lấy layout của _Layout của kiểu là @model ProducdViewModel nó sẽ chung cho tất cả các trang, ta lấy riêng nó sẽ lỗi
        ShopeeViewModel model = new ShopeeViewModel {
            Products = products,
            Stores = stores,
            Categories = categories,
            CartDetails = cartDetails,
            CurrentCategoryID = categoryID,
            TotalPage = totalPage,
            PageSize = pageSize,
            CurrentPage = currentPage,
            CartCount = cartDetails.Count(),
            User = user,
            UserID = userID
        };
        return Ok(model);
    }

    /// <summary>
    /// Nguồn: https://xuanthulab.net/asp-net-core-mvc-chi-tiet-ve-route-trong-asp-net-mvc.html
    /// </summary>
    [Route("detail/{id?}")]
    public IActionResult Detail()
    {
        return View();
    }

    [HttpGet]
    [Route("/product/get-data-detail/{userID?}/{id?}")]
    public IActionResult GetDetail(int userID = 0, int id = 0) {
        var product = _productResponsitory.getProductByID(id);
        IEnumerable<Favorite> favorites = _productResponsitory.getFavoritesByProductID(id);
        IEnumerable<Favorite> favorite = _productResponsitory.getFavoritesByProductIDAndUserID(id, userID);
        List<Store> store = _shopResponsitory.getShopByProductID(id).ToList();
        IEnumerable<UserInfo> userInfo = _userResponsitory.checkUserInfoByUserID(userID);
        IEnumerable<Reviewer> reviewers = _productResponsitory.getReviewerByProductID(id);
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
    [Route("/product/reviewer-detail/{productID?}/{reviewerID?}")]
    public IActionResult ReviewerDetail(int productID = 0, int reviewerID = 0) {
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
    [Route("/product/sort/{industryID?}/{sortType?}")]
    public IActionResult Sort(int industryID = 0, string sortType = "", int currentPage = 1) {
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
    [Route("/product/similar/{productID?}/{categoryID?}")]
    public IActionResult Similar()
    {
        return View();
    }

    [HttpGet]
    [Route("/product/similar/get-data/{productID?}/{categoryID?}")]
    public IActionResult Similar(int productID = 0, int categoryID = 0, int currentPage = 1) {
        List<Product> product = _productResponsitory.getProductByID(productID).ToList();
        List<Store> store = _shopResponsitory.getShopByProductID(Convert.ToInt32(productID)).ToList();
        IEnumerable<Product> products = _productResponsitory.getProductsByCategoryID(categoryID);
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
    public IActionResult Reviewer(int userID = 0, int productID = 0, string comment = "", int star = 0, string image = "") {
        Status status;
        if (_productResponsitory.insertProductReviewer(userID, productID, star, comment, image)) {
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