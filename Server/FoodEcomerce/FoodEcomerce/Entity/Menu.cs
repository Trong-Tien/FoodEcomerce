namespace FoodEcomerce.Entity
{
    public class Menu : BaseEntity
    {
        public Guid Id { get; set; }   
        public int OrderNumber { get; set; }
        public string? Name  { get; set; } 
        public string? Icon { get; set; }    
        public string? Url { get; set; }
        public bool IsActive { get; set; }
        public Guid? ParentId { get; set; }
        public Menu? MenuParent { get; set; }
        public virtual ICollection<Menu> Menus { get; set; }  = new List<Menu>();   
        public virtual ICollection<MenuRole> MenuRoles { get; set; }   = new List<MenuRole>();  

    }
}
