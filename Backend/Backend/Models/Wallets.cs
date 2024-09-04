using System;

namespace Backend.Models
{
    public class Wallets
    {
        public int WalletID { get; set; }
        public int UserID { get; set; }
        public string Type { get; set; }
        public Decimal InitialBalance { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
