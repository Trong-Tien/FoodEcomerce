namespace FoodEcomerce.Modal
{
    public class MenuPermission
    {
        public Guid RoleId { get; set; }
        public Guid MenuId { get; set; }
        public bool? Add { get; set; }
        public bool? Watch { get; set; }
        public bool? Delete { get; set; }
        public bool? Update { get; set; }
    }
}
