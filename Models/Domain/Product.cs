using System.ComponentModel.DataAnnotations.Schema;

public class Product {
    public int PK_iProductID { get; set; }
    public int FK_iCategoryID { get; set; }
    public string sProductName { get; set; }
    public string sStoreName { get; set; }
    public string sCategoryName { get; set; }
    public double dPerDiscount { get; set; }
    public string sImageUrl { get; set; }
    public double dPrice { get; set; }
    public int iQuantity { get; set; }
    public string sProductDescription { get; set; }
    public int iIsVisible { get; set; }
    public DateTime dCreateTime {get; set;}
    public DateTime dUpdateTime { get; set; }
    [NotMapped]
    public DateTime dDeleteTime {get; set;}
    
}