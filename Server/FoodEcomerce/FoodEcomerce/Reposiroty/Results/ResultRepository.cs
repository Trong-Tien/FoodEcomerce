using FoodEcomerce.Entity.StoreProcedure;
using Microsoft.EntityFrameworkCore;

namespace FoodEcomerce.Reposiroty.Results
{
    public class ResultRepository : IResultRepository
    {
        private readonly StoreDbcontext _context;
        public ResultRepository(StoreDbcontext context)
        {
            _context = context;
        }
        public async Task<sp_WebFood_Report_Total> GetReportTotalAsync(int type)
        {
            var result  = await _context.sp_WebFood_Report_Total
                .FromSqlInterpolated($"EXEC sp_WebFood_Report_Total @Type = {type}")
                .AsNoTracking()
                .FirstOrDefaultAsync();
            return result;
        }
    }
}
