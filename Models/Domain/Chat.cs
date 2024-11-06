public class Chat
{
    public int PK_iMakeFriendID { get; set; }
    public int FK_iUserID { get; set; }
    public int FK_iSellerID { get; set; }
    public int iChatPersonID { get; set; }
    public string sChat { get; set; }
    public DateTime dTime { get; set; }
    public string sStoreName { get; set; }
    public string sImageAvatar { get; set; }
}