using AutoMapper;
using FoodEcomerce.DTO;
using FoodEcomerce.Entity;
using FoodEcomerce.Modal;
using Microsoft.EntityFrameworkCore;

namespace FoodEcomerce.Reposiroty.UnitCaculates
{
    public class UnitCaculateRepository : BaseRepository<UnitCaculate, UnitCaculateModal, UnitCaculateDTO, Guid>, IUnitCaculateRepository
    {
        private readonly IMapper _mapper;
        private readonly FoodDbContex _context;
        public UnitCaculateRepository(FoodDbContex dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            _mapper = mapper;
            _context = dbContext;   
        }

        public async Task<ResultModal> CreateByQuery(UnitCaculateModal Modal)
        {
           var data = _context.UnitCaculates.FirstOrDefault(r=> r.Id == Modal.Id);
            if (data == null) { 
                UnitCaculate unitCaculate = new UnitCaculate();
                unitCaculate.Id = Modal.Id;
                unitCaculate.Name = Modal.Name; 
                unitCaculate.Code = Modal.Code; 
                unitCaculate.ConservationRate = Modal.ConservationRate; 
                unitCaculate.BaseUnitId = Modal.BaseUnitId == Guid.Empty ? null : Modal.BaseUnitId ;
                unitCaculate.Description = Modal.Description;   
                _context.UnitCaculates.Add(unitCaculate);   
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200  , Message ="Thêm mới thành công" , Success = true };   
            }else
            {
                return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
            }    
        }

        public async Task<List<UnitCaculateDTO>> GetByParent()
        {
            return _mapper.Map<List<UnitCaculateDTO>>(await _context.UnitCaculates.Where(r => r.BaseUnitId != null).ToListAsync());
        }
    }
}
