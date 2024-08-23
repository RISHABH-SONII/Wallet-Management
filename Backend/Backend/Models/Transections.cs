using System;

namespace Backend.Models
{
    public class Transections
    {
        public int TransectionID { get; set; }
        public int WalletID { get; set; }

        //public int UserID { get; set; }
        public Decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string Category { get; set; }
        public string Notes { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
