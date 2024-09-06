public class Order {
    public int PK_iOrderID { get; set; }
    public string sFullName { get; set; }
    public string sStoreName { get; set; }
    public DateTime dDate { get; set; }
    public double fTotalPrice { get; set; }
    public string sOrderStatusName { get; set; }
    public string sPaymentName { get; set; }
}