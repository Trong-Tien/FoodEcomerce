using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FoodEcomerce.Entity.StoreProcedure
{
    public class sp_WebFood_Report_Total
    {
        [Key]
        [Column("Id")]
        public Guid Id { get; set; }
        public decimal TotalOrders_Current { get; set; }
        public decimal TotalOrders_Previous { get; set; }
        public decimal TotalOrders_Change { get; set; }
        public decimal SuccessOrders_Current { get; set; }
        public decimal SuccessOrders_Previous { get; set; } 
        public decimal SuccessOrders_Change { get; set; }
        public decimal DeliceOrders_Current { get; set; }
        public decimal DeliceOrders_Previous    { get; set; }
        public decimal DeliceOrders  { get; set; } 
        public decimal Revenues_Current    { get; set; }
        public decimal Revenues_Previous   { get; set; }
        public decimal Revenues_Change  { get; set; }
    }
}
