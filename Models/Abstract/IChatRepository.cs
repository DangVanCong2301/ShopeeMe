public interface IChatRepository
{
    bool insertMakeFriend(int userID, int sellerID);
    bool updateMakeFriendAboutAcept(int makeFriendID);
    bool insertChat(int makeFriendID, string chat);
    bool insertChatDetail(int chatID, int personID, string chat);
    IEnumerable<MakeFriend> getMakeFriendByUserIDAndShopID(int userID, int shopID);
    IEnumerable<MakeFriend> getMakeFriendBySellerID(int sellerID);
    IEnumerable<Chat> getChatByID(int chatID);
    IEnumerable<Chat> getChatByUserID(int userID);
    IEnumerable<Chat> getChatBySellerID(int sellerID);
    IEnumerable<Chat> getChatByMakeFriendID(int makeFriendID);
    IEnumerable<ChatDetail> getChatDetailByID(int chatID);
}