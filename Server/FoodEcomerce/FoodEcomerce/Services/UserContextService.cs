using Microsoft.AspNetCore.Http;
using System.Security.Claims;

public class CurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid? GetUserId()
    {
        var userIdClaim = _httpContextAccessor.HttpContext?.User?.FindFirst("UserId")?.Value;
        return Guid.TryParse(userIdClaim, out var userId) ? userId : (Guid?)null;
    }

    public Guid? GetRoleId()
    {
        var roleClaim = _httpContextAccessor.HttpContext?.User?.FindFirst("Role")?.Value;
        return Guid.TryParse(roleClaim, out var roleId) ? roleId : (Guid?)null;
    }

    public string? GetUserName()
    {
        return _httpContextAccessor.HttpContext?.User?.FindFirst("UserName")?.Value;
    }
}
