namespace FoodEcomerce.Modal
{
    public class UnitCaculateModal
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }
        public string? Description { get; set; }
        public double ConservationRate { get; set; }
        public bool IsBaseUnit { get; set; }
        public Guid? BaseUnitId { get; set; } = Guid.Empty;
    }
}
