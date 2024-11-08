using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Project.Models;

public class ChatRepository : IChatRepository
{
    private readonly DatabaseContext _context;
    public ChatRepository(DatabaseContext context)
    {
        _context = context;
    }

    public IEnumerable<Chat> getChatByID(int chatID)
    {
        SqlParameter chatIDParam = new SqlParameter("@PK_iChatID", chatID);
        return _context.Chats.FromSqlRaw("EXEC sp_GetChatByID @PK_iChatID", chatIDParam);
    }

    public IEnumerable<Chat> getChatByMakeFriendID(int makeFriendID)
    {
        SqlParameter makeFriendIDParam = new SqlParameter("@FK_iMakeFriendID", makeFriendID);
        return _context.Chats.FromSqlRaw("EXEC sp_GetChatByMakeFriendID @FK_iMakeFriendID", makeFriendIDParam);
    }

    public IEnumerable<Chat> getChatBySellerID(int sellerID)
    {
        SqlParameter sellerIDParam = new SqlParameter("@FK_iSellerID", sellerID);
        return _context.Chats.FromSqlRaw("EXEC sp_GetChatBySellerID @FK_iSellerID", sellerIDParam);
    }

    public IEnumerable<Chat> getChatByUserID(int userID)
    {
        SqlParameter userIDParam = new SqlParameter("@FK_iUserID", userID);
        return _context.Chats.FromSqlRaw("EXEC sp_GetChatByUserID @FK_iUserID", userIDParam);
    }

    public IEnumerable<ChatDetail> getChatDetailByID(int chatID)
    {
        SqlParameter chatIDParam = new SqlParameter("@PK_iChatID", chatID);
        return _context.ChatDetails.FromSqlRaw("EXEC sp_GetChatDetailByID @PK_iChatID", chatIDParam);
    }

    public IEnumerable<MakeFriend> getMakeFriendBySellerID(int sellerID)
    {
        SqlParameter sellerIDParam = new SqlParameter("@FK_iSellerID", sellerID);
        return _context.MakeFriends.FromSqlRaw("EXEC sp_GetMakeFriendBySellerID @FK_iSellerID", sellerIDParam);
    }

    public IEnumerable<MakeFriend> getMakeFriendByUserIDAndShopID(int userID, int shopID)
    {
        SqlParameter userIDParam = new SqlParameter("@FK_iUserID", userID);
        SqlParameter shopIDParam = new SqlParameter("@FK_iShopID", shopID);
        return _context.MakeFriends.FromSqlRaw("EXEC sp_GetMakeFriendByUserIDAndShopID @FK_iUserID, @FK_iShopID", userIDParam, shopIDParam);
    }

    public bool insertChat(int makeFriendID, string lastChat)
    {
        int isRead = 0;
        SqlParameter makeFriendIDParam = new SqlParameter("@FK_iMakeFriendID", makeFriendID);
        SqlParameter chatParam = new SqlParameter("@sLastChat", lastChat);
        SqlParameter isReadParam = new SqlParameter("@iIsRead", isRead);
        SqlParameter timeParam = new SqlParameter("@dTime", DateTime.Now);
        _context.Database.ExecuteSqlRaw("EXEC sp_InsertChat @FK_iMakeFriendID, @sLastChat, @iIsRead, @dTime", makeFriendIDParam, chatParam, isReadParam, timeParam);
        return true;
    }

    public bool insertChatDetail(int chatID, int personID, string chat)
    {
        SqlParameter chatIDParam = new SqlParameter("@PK_iChatID", chatID);
        SqlParameter persionIDParam = new SqlParameter("@iChatPersonID", personID);
        SqlParameter chatParam = new SqlParameter("@sChat", chat);
        SqlParameter timeParam = new SqlParameter("@dTime", DateTime.Now);
        _context.Database.ExecuteSqlRaw("EXEC sp_InsertChatDetail @PK_iChatID, @iChatPersonID, @sChat, @dTime", chatIDParam, persionIDParam, chatParam, timeParam);
        return true;
    }

    public bool insertMakeFriend(int userID, int sellerID)
    {
        SqlParameter userIDParam = new SqlParameter("@FK_iUserID", userID);
        SqlParameter sellerIDParam = new SqlParameter("@FK_iSellerID", sellerID);
        SqlParameter makeStatusIDParam = new SqlParameter("@FK_iMakeStatusID", 2);
        SqlParameter timeParam = new SqlParameter("@dTime", DateTime.Now);
        _context.Database.ExecuteSqlRaw("EXEC sp_InsertMakeFriend @FK_iUserID, @FK_iSellerID, @FK_iMakeStatusID, @dTime", userIDParam, sellerIDParam, makeStatusIDParam, timeParam);
        return true;
    }

    public bool updateMakeFriendAboutAcept(int makeFriendID)
    {
        SqlParameter makeFriendIDParam = new SqlParameter("@PK_iMakeFriendID", makeFriendID);
        _context.Database.ExecuteSqlRaw("EXEC sp_UpdateMakeFriendAboutAcept @PK_iMakeFriendID", makeFriendIDParam);
        return true;
    }
}