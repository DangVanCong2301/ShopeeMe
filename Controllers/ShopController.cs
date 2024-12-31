using Microsoft.AspNetCore.Mvc;
using Project.Models;

public class ShopController : Controller
{
    private readonly IHttpContextAccessor _accessor;
        private readonly IHomeResponsitory _homeResponsitory;
        private readonly IShopResponsitory _shopResponsitory;
        private readonly ICartReponsitory _cartResponsitory;
        private readonly IUserResponsitory _userResponsitory;
        private readonly IProductResponsitory _productResponsitory;
        private readonly IChatRepository _chatRepository;

        public ShopController(
            IHttpContextAccessor accessor, 
            IHomeResponsitory homeResponsitory, 
            ICartReponsitory cartReponsitory, 
            IUserResponsitory userResponsitory, 
            IShopResponsitory shopResponsitory,
            IProductResponsitory productResponsitory,
            IChatRepository chatRepository
            )
        {
            _accessor = accessor;
            _homeResponsitory = homeResponsitory;
            _cartResponsitory = cartReponsitory;
            _userResponsitory = userResponsitory;
            _shopResponsitory = shopResponsitory;
            _productResponsitory = productResponsitory;
            _chatRepository = chatRepository;
        }

    [HttpGet]
    [Route("/shop/{name?}")]
    public IActionResult Index() {
        return View();
    }

    [HttpGet]
    [Route("/shop/get-data/{name?}/{userID?}")]
    public IActionResult GetData(string name = "", int userID = 0, int currentPage = 1, int categoryID = 0) {
        List<Store> shop = _shopResponsitory.getShopByUsername(name).ToList();
        List<UserInfo> userInfo = _userResponsitory.getUserInfoByID(userID).ToList();
        IEnumerable<MakeFriend> makeFriends = _chatRepository.getMakeFriendByUserIDAndShopID(userID, shop[0].PK_iStoreID);
        IEnumerable<Product> products;
        IEnumerable<CartDetail> cartDetails = _cartResponsitory.getCartInfo(userID);
        IEnumerable<SliderShop> slidersShop = _shopResponsitory.getSlidersShopByShopID(shop[0].PK_iStoreID);
        IEnumerable<Category> categories = _shopResponsitory.getCategoriesByShopID(shop[0].PK_iStoreID);
        if (categoryID != 0) {
            products = _productResponsitory.getProductsByCategoryID(categoryID);
        } else {
            products = _shopResponsitory.getProductsByShopID(shop[0].PK_iStoreID);
        }
        IEnumerable<Product> top3SellingProducts = _shopResponsitory.getTop3SellingProductsShop(shop[0].PK_iStoreID);
        IEnumerable<Product> top10SellingProducts = _shopResponsitory.getTop10SellingProductsShop(shop[0].PK_iStoreID);
        IEnumerable<Product> top10GoodPriceProducts = _shopResponsitory.getTop10GoodPriceProductsShop(shop[0].PK_iStoreID);
        IEnumerable<Product> top10SuggestProducts = _shopResponsitory.getTop10SuggestProductsShop(shop[0].PK_iStoreID);
        IEnumerable<Chat> chats = _chatRepository.getChatByUserID(userID);
        int totalRecord = products.Count();
        int pageSize = 10;
        int totalPage = (int) Math.Ceiling(totalRecord / (double) pageSize);
        products = products.Skip((currentPage - 1) * pageSize).Take(pageSize);
        ShopViewModel model = new ShopViewModel {
            Stores = shop,
            MakeFriends = makeFriends,
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
            UserInfo = userInfo,
            UserID = userID,
            CartDetails = cartDetails,
            CartCount = cartDetails.Count(),
            CurrentCategoryID = categoryID,
            Chats = chats
        };
        return Ok(model);
    }

    [HttpGet]
    [Route("/shop/sort-price/{sortType?}")]
    public IActionResult SortPrice(string name = "", string sortType = "", int currentPage = 1) {
        List<Store> shop = _shopResponsitory.getShopByUsername(name).ToList();
        IEnumerable<Product> products;
        if (sortType == "asc") {
            products = _productResponsitory.getProductsByShopIDAndSortIncre(shop[0].PK_iStoreID);
        } else {
            products = _productResponsitory.getProductsByShopIDAndSortReduce(shop[0].PK_iStoreID);
        }
        int totalRecord = products.Count();
        int pageSize = 10;
        int totalPage = (int) Math.Ceiling(totalRecord / (double) pageSize);
        products = products.Skip((currentPage - 1) * pageSize).Take(pageSize);
        ShopViewModel model = new ShopViewModel {
            Products = products,
            TotalPage = totalPage,
            PageSize = pageSize,
            CurrentPage = currentPage
        };
        return Ok(model);
    }

    [HttpPost]
    [Route("/shop/send-make-friend")]
    public IActionResult SendFriend(int sellerID = 0) {
        var sessionUserID = _accessor?.HttpContext?.Session.GetInt32("UserID");
        if (sessionUserID == null) {
            sessionUserID = 0;
        } 
        List<User> user = _userResponsitory.checkUserLogin(Convert.ToInt32(sessionUserID)).ToList();
        Status status;
        if (user.Count() == 0) {
            status = new Status {
                StatusCode = -1,
                Message = "Bạn phải đăng nhập thì mới kết bạn được!"
            };
        } else {
            _chatRepository.insertMakeFriend(Convert.ToInt32(sessionUserID), sellerID);
            status = new Status {
                StatusCode = 1,
                Message = "Gửi lời kết bạn thành công!"
            };
        }
        ShopeeViewModel model = new ShopeeViewModel {
            Status = status
        };
        return Ok(model);
    }

    [HttpPost]
    [Route("/shop/acept-friend")]
    public IActionResult AceptFriend(int makeFriendID = 0, int sellerID = 0) {
        Status status;
        List<Store> store = _shopResponsitory.getShopBySellerID(sellerID).ToList();
        if (_chatRepository.updateMakeFriendAboutAcept(makeFriendID)) {
            string automatedChat = "Chào bạn, hiện tại bộ phận CSKH của " + store[0].sStoreName + " đã hết giờ làm việc." 
                                 + " Bạn vui lòng liên hệ vào khung giờ <b>8:00 - 17:00 (T2 - T6) & 8:00 - 14:00 Thứ 7</b> "
                                 + " hoặc để lại lời nhắn, chúng mình sẽ phản hồi ngay với bạn vào giờ làm việc kế tiếp."
                                 + " " + store[0].sStoreName + " Shop xin cảm ơn ❤️";
            _chatRepository.insertChat(makeFriendID, automatedChat);
            List<Chat> chat = _chatRepository.getChatByMakeFriendID(makeFriendID).ToList();
            _chatRepository.insertChatDetail(chat[0].PK_iChatID, sellerID, automatedChat);
            status = new Status {
                StatusCode = 1,
                Message = "Chấp nhận kết bạn thành công!"
            }; 
        } else {
            status = new Status {
                StatusCode = -1,
                Message = "Chấp nhận kết bạn thất bại!"
            };
        }
        ShopViewModel model = new ShopViewModel {
            Status = status
        };
        return Ok(model);
    }

    [HttpPost]
    [Route("/shop/add-chat")]
    public IActionResult AddChat(int chatID = 0, string msg = "") {
        int personID = Convert.ToInt32(_accessor?.HttpContext?.Session.GetInt32("UserID"));
        Status status;
        if (_chatRepository.insertChatDetail(chatID, personID, msg)) {
            status = new Status {
                StatusCode = 1,
                Message = "Thêm trò chuyện thành công!"
            };
        } else {
            status = new Status {
                StatusCode = -1,
                Message = "Thêm trò chuyện thất bại!"
            };
        }
        DataViewModel model = new DataViewModel {
            Status = status
        };
        return Ok(model);
    }
}