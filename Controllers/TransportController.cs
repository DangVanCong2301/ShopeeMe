using Microsoft.AspNetCore.Mvc;

public class TransportController : Controller 
{
    [Route("/picker")]
    [HttpGet]
    public IActionResult Picker() {
        return View();
    }    

    [Route("/delivery")]
    [HttpGet]
    public IActionResult Delivery() {
        return View();
    }
}