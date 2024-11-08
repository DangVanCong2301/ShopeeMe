using Microsoft.AspNetCore.Mvc;

public class ChatController : Controller
{
    private readonly IChatRepository _chatRepository;
    public ChatController(IChatRepository chatRepository)
    {
        _chatRepository = chatRepository;
    }

    [HttpGet]
    [Route("/chat/detail/{chatID?}")]
    public IActionResult ChatDetail(int chatID = 0) {
        IEnumerable<Chat> chat = _chatRepository.getChatByID(chatID);
        IEnumerable<ChatDetail> chatDetails = _chatRepository.getChatDetailByID(chatID);
        DataViewModel model = new DataViewModel {
            Chat = chat,
            ChatDetails = chatDetails
        };
        return Ok(model);
    }
}