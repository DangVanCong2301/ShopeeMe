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

    public IEnumerable<Chat> getChatByUserID(int userID)
    {
        SqlParameter userIDParam = new SqlParameter("@FK_iUserID", userID);
        return _context.Chats.FromSqlRaw("EXEC sp_GetChatByUserID @FK_iUserID", userIDParam);
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

    public bool insertChat(int makeFriendID, int personID, string chat)
    {
        SqlParameter makeFriendIDParam = new SqlParameter("@PK_iMakeFriendID", makeFriendID);
        SqlParameter personIDParam = new SqlParameter("@iChatPersonID", personID);
        SqlParameter chatParam = new SqlParameter("@sChat", chat);
        SqlParameter timeParam = new SqlParameter("@dTime", DateTime.Now);
        _context.Database.ExecuteSqlRaw("EXEC sp_InsertChat @PK_iMakeFriendID, @iChatPersonID, @sChat, @dTime", makeFriendIDParam, personIDParam, chatParam, timeParam);
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