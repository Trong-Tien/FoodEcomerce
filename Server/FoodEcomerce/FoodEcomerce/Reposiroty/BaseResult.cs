namespace FoodEcomerce.Reposiroty
{
    public class BaseResult<T> where T : class
    {
            public List<T> Items { get; set; } = new List<T>();
            public int TotalCount { get; set; }
            public int PageNumber { get; set; }
            public int PageSize { get; set; }
    }
}
