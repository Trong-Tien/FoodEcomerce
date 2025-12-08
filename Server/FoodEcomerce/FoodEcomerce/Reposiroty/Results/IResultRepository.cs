using FoodEcomerce.Entity.StoreProcedure;

namespace FoodEcomerce.Reposiroty.Results
{
    public interface IResultRepository
    {
        Task<sp_WebFood_Report_Total> GetReportTotalAsync(int type);
    }
}
