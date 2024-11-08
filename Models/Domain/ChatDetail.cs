public class ChatDetail
{
    public int PK_iChatID { get; set; }
    public int FK_iMakeFriendID { get; set; }
    public int FK_iUserID { get; set; }
    public int FK_iSellerID { get; set; }
    public int iChatPersonID { get; set; }
    public string sChat { get; set; }
    public DateTime dTime { get; set; }
    public string sStoreName { get; set; }
    public string sImageAvatar { get; set; }
    public string sUserName { get; set; }
    public string sImageProfile { get; set; }
}