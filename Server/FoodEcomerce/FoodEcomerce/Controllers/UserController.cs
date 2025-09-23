
using FoodEcomerce.Abstract;
using FoodEcomerce.DTO;
using FoodEcomerce.Modal;
using Microsoft.AspNetCore.Mvc;

namespace FoodEcomerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        public UserController( UnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;   
        }


        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll(int pageNumber, int pageSize)
        {
            try
            {
                var result = await _unitOfWork.UserRepository.GetAll(pageNumber, pageSize , x=> x.Role , x => x.Status);

                var dto = result.Items.Select(u => new UserDTO
                {
                    Id = u.Id,
                    UserName = u.UserName,
                    PhoneNumber = u.PhoneNumber,
                    Email = u.Email,
                    Password = u.Password,  
                    Address = u.Address,
                    Acvite = u.Acvite,
                    IsAdmin = u.IsAdmin,
                    StatusId = u.StatusId,
                    
                    Role = u.Role == null ? null : new RoleDTO
                    {
                        Id = u.Role.Id,
                        OrderNumber = u.Role.OrderNumber,
                        Name = u.Role.Name,
                        Discription = u.Role.Discription
                    },
                    Status = u.Status == null ? null : new StatusDTO
                    {
                        Id=u.Status.Id,
                        Name =u.Status.Name,
                    } 
                   
                }).ToList();

                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var result = await _unitOfWork.UserRepository.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(UserModal modal)
        {
            try
            {
                var result = await _unitOfWork.UserRepository.CreateWithQuery(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("Update")]
        public async Task<IActionResult> Update(UserModal modal)
        {
            try
            {
                var result = await _unitOfWork.UserRepository.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _unitOfWork.UserRepository.Delete(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("DeleteById/{id}")]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            try
            {
                var result = await _unitOfWork.UserRepository.DeleteById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
