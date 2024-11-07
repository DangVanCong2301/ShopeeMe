public class Chat
{
    public int PK_iChatID { get; set; }
    public int FK_iMakeFriendID { get; set; }
    public int FK_iUserID { get; set; }
    public int FK_iSellerID { get; set; }
    public string sLastChat { get; set; }
    public DateTime dTime { get; set; }
    public string sStoreName { get; set; }
    public string sImageAvatar { get; set; }
    public string sUserName { get; set; }
    public string sImageProfile { get; set; }
}