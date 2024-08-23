using Microsoft.AspNetCore.Mvc;

[Route("/payment")]
public class PaymentController : Controller
{
    [HttpGet]
    [Route("momo")]
    public IActionResult Momo() {
        return View();
    }
}