public class DataViewModel
{
    public IEnumerable<Chat> Chat { get; set; }
    public IEnumerable<ChatDetail> ChatDetails { get; set; }
    public Status Status { get; set; }
    public int OrderID { get; set; }
}