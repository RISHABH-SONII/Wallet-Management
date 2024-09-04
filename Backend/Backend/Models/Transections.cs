using System;

namespace Backend.Models
{
    public class Transections
    {
        public int TransactionID { get; set; }
        public int UserID { get; set; }
        public int WalletID { get; set; }
        public string WalletType { get; set; }
        public int CurrentBalance { get; set; }
        public string TransactionType { get; set; }
        public string CategoryType { get; set; }
        public DateTime TransactionDate { get; set; }
        public string Description { get; set; }
        public Decimal Amount { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
