public interface IChatRepository
{
    bool insertMakeFriend(int userID, int sellerID);
    bool updateMakeFriendAboutAcept(int makeFriendID);
    bool insertChat(int makeFriendID, int personID, string chat);
    IEnumerable<MakeFriend> getMakeFriendByUserIDAndShopID(int userID, int shopID);
    IEnumerable<MakeFriend> getMakeFriendBySellerID(int sellerID);
    IEnumerable<Chat> getChatByUserID(int userID);
}