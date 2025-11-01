namespace FoodEcomerce.Entity.StoreProcedure
{
    public class sp_WebFood_GetAllOrders
    {
        public Guid Id  { get; set; }
        public Guid UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalPrice { get; set; }

    }
}
