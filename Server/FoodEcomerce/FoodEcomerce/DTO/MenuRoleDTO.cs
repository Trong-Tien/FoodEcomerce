namespace FoodEcomerce.DTO
{
    public class MenuRoleDTO
    {
        public Guid MenuId { get; set; }
        public Guid RoleId { get; set; }
        public bool? Add { get; set; }
        public bool? Watch { get; set; }
        public bool? Delete { get; set; }
        public bool? Update { get; set; }
    }
}
