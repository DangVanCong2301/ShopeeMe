public interface ITransportRepository
{
    public IEnumerable<ShippingOrder> getShippingOrdersWaitPickup();
    public IEnumerable<ShippingPicker> getShippingPickerPickingUp();
    public IEnumerable<OrderDetail> getOrderDetailWaitPickupByOrderID(int orderID);
    public IEnumerable<OrderDetail> getOrderDetailPickingUpByOrderID(int orderID);
    public IEnumerable<SellerInfo> getSellerInfoByOrderID(int orderID);
    public IEnumerable<Payment> getPaymentsTypeByOrderID(int orderID);
    public IEnumerable<Order> getOrderWaitPickupByShippingOrderID(int shippingOrderID);
    public bool insertShippingPicker(int shippingOrderID, int userID);
    public bool updatePickerImage(int shippingPickerID, string pickerImage);
    public bool confirmOrderAboutPickingUp(int orderID);
    public bool confirmShippingOrderAboutDelivered(int shippingOrderID);
    public bool confirmShippingPickerAboutTaken(int shippingPickerID);
    public bool confirmShippingPickerAboutingWarehouse(int shippingPickerID);
    public bool confirmShippingPickerAboutedWarehouse(int shippingPickerID);
}