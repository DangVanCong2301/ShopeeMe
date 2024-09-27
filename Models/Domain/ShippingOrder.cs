public class ShippingOrder
{
    public int PK_iShippingOrderID { get; set; }
    public int FK_iShippingUnitID { get; set; }
    public int FK_iOrderID { get; set; }
    public DateTime dShippingTime { get; set; }
}